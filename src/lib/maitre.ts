import { camelot, house, locations } from '@/content/house';
import { menu } from '@/content/menu';

export type Tongue = 'en' | 'it';
export type MaitreLink = { href: string; label: string; external?: boolean };
export type MaitreReply = { text: string; tongue: Tongue; links?: MaitreLink[] };

function fold(raw: string) {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(text: string, ...needles: string[]) {
  return needles.some((n) => text.includes(n));
}

const IT_HINTS = [
  'ciao',
  'buon',
  'grazie',
  'prego',
  'orario',
  'orari',
  'prenot',
  'tavolo',
  'dove',
  'siete',
  'avete',
  'vorrei',
  'quanto',
  'apert',
  'chius',
  'sala',
  'sale',
  'telefono',
  'indirizzo',
  'italiano',
  'parli',
  'menu',
  'piatti',
  'antipasti',
  'pasta',
  'pinsa',
];

export function detectTongue(raw: string, fallback: Tongue): Tongue {
  const q = fold(raw);
  const hits = IT_HINTS.filter((w) => q.includes(w)).length;
  if (hits >= 2) return 'it';
  if (hits === 1 && !has(q, 'the', 'what', 'hours', 'where', 'book', 'please')) return 'it';
  if (has(q, 'in italian', 'parla italiano', 'in italiano')) return 'it';
  return fallback;
}

export function opening(tongue: Tongue) {
  return tongue === 'it'
    ? 'Buonasera. Sono il maître di Joe’s. Orari, le tre sale, la pinsa, il menu — chieda. Non prendo tavoli: quello è OpenTable, per sala.'
    : 'Buonasera. I’m the maître at Joe’s. Hours, the three rooms, the pinsa, the board — ask. I don’t take tables. That’s OpenTable, per room.';
}

function locOf(q: string) {
  if (has(q, 'almonte', 'mill', 'woolen', 'mulino')) return locations[0];
  if (has(q, 'wellington', '1323', 'village')) return locations[1];
  if (has(q, 'preston', 'little italy', 'piccola italia', '330')) return locations[2];
  return null;
}

const DAYS_IT: Record<string, string> = {
  Monday: 'lunedì',
  Tuesday: 'martedì',
  Wednesday: 'mercoledì',
  Thursday: 'giovedì',
  Friday: 'venerdì',
  Saturday: 'sabato',
  Sunday: 'domenica',
};

function hoursBlock(tongue: Tongue, loc: (typeof locations)[number]) {
  const rows = loc.hours
    .map((row) => {
      const day = tongue === 'it' ? DAYS_IT[row.day.en] ?? row.day.en : row.day.en;
      return `${day} ${row.hours.en}`;
    })
    .join('. ');
  const note = loc.hoursNote.en;
  if (tongue === 'it') {
    return `${loc.name.en}, ${loc.lines.en[0]}. ${rows}. Nota: ${note} Telefono ${loc.phone}.`;
  }
  return `${loc.name.en}, ${loc.lines.en[0]}. ${rows} ${note} Phone ${loc.phone}.`;
}

function allHours(tongue: Tongue) {
  return locations.map((loc) => `${loc.name.en}: ${loc.hoursShort.en}, ${loc.phone}`).join(' ');
}

function dishHits(q: string) {
  const words = q.split(' ').filter((w) => w.length > 2);
  const scored = menu.flatMap((section) =>
    section.items.map((item) => {
      const hay = fold(`${item.title.en} ${item.body.en} ${section.title.en}`);
      let score = 0;
      for (const w of words) {
        if (hay.includes(w)) score += 2;
        if (fold(item.title.en).includes(w)) score += 3;
      }
      return { item, section, score };
    }),
  );
  return scored.filter((h) => h.score >= 3).sort((a, b) => b.score - a.score).slice(0, 3);
}

export function reply(raw: string, tongue: Tongue): MaitreReply {
  const q = fold(raw);
  const loc = locOf(q);
  const it = tongue === 'it';

  if (has(q, 'ciao', 'hello', 'hi ', 'hey', 'buonasera', 'buongiorno', 'good evening', 'good morning')) {
    return { text: opening(tongue), tongue };
  }

  if (has(q, 'italiano', 'italian please', 'speak italian', 'parla italiano', 'in italiano')) {
    return {
      tongue: 'it',
      text: 'Certo. Parlo italiano e inglese. Orari, sale, pinsa, menu. I tavoli: OpenTable.',
    };
  }

  if (has(q, 'english', 'inglese', 'speak english', 'in inglese')) {
    return {
      tongue: 'en',
      text: 'Of course. English or Italian. Hours, rooms, pinsa, the board. Tables: OpenTable, not me.',
    };
  }

  if (has(q, 'price', 'prices', 'cost', 'how much', 'quanto costa', 'prezzo', 'prezzi', 'dollari', 'dollar')) {
    return {
      tongue,
      text: it
        ? 'Sui menu dine-in non ci sono prezzi in dollari nel HTML. Non li invento. Chieda in sala, o veda il menu sul sito.'
        : 'No dollar prices print in their dine-in HTML. I don’t invent them. Ask the room, or see the menu on the site.',
      links: [{ href: '/menu', label: it ? 'Menu' : 'Menu' }],
    };
  }

  if (has(q, 'reserv', 'book', 'table', 'tavolo', 'prenot', 'opentable', 'open table')) {
    const room = loc ?? null;
    if (room) {
      return {
        tongue,
        text: it
          ? `Non prendo tavoli. ${room.name.en}: OpenTable, o ${room.phone}.`
          : `I don’t take tables. ${room.name.en}: OpenTable, or ${room.phone}.`,
        links: [
          { href: room.openTable, label: `OpenTable · ${room.name.en}`, external: true },
          { href: `/${room.id}`, label: room.name.en },
        ],
      };
    }
    return {
      tongue,
      text: it
        ? 'Non prendo tavoli. OpenTable per sala: Almonte, Wellington, Preston. O chiami la sala.'
        : 'I don’t take tables. OpenTable is per room: Almonte, Wellington, Preston. Or call the room.',
      links: locations.map((l) => ({
        href: l.openTable,
        label: `OpenTable · ${l.name.en}`,
        external: true,
      })),
    };
  }

  if (has(q, 'hour', 'hours', 'open', 'close', 'orario', 'orari', 'aperto', 'aperti', 'chius', 'when')) {
    if (loc) {
      return {
        tongue,
        text: hoursBlock(tongue, loc),
        links: [
          { href: `/${loc.id}`, label: loc.name.en },
          { href: loc.openTable, label: 'OpenTable', external: true },
        ],
      };
    }
    return {
      tongue,
      text: it
        ? `Tre sale. ${allHours('it')} Quale sala? Almonte, Wellington o Preston. Qualche riga sul loro sito è vuota — lo dico sulla pagina della sala.`
        : `Three rooms. ${allHours('en')} Which room — Almonte, Wellington, or Preston? A few weekday lines on their site are blank. We note that on each room page.`,
      links: [
        { href: '/hours', label: it ? 'Orari' : 'Hours' },
        { href: '/almonte', label: 'Almonte' },
        { href: '/wellington', label: 'Wellington' },
        { href: '/preston', label: 'Preston' },
      ],
    };
  }

  if (has(q, 'where', 'address', 'location', 'locations', 'dove', 'indirizzo', 'sala', 'sale', 'room')) {
    if (loc) {
      return {
        tongue,
        text: it
          ? `${loc.name.en}: ${loc.lines.en.join(', ')} ${loc.postal}. ${loc.phone}. ${loc.lead.en}`
          : `${loc.name.en}: ${loc.lines.en.join(', ')} ${loc.postal}. ${loc.phone}. ${loc.lead.en}`,
        links: [{ href: `/${loc.id}`, label: loc.name.en }],
      };
    }
    return {
      tongue,
      text: it
        ? 'Tre sale aperte: Almonte, 7 Mill Street; Wellington, 1323 Wellington Street West — non il diner al 1385; Preston, 330 Preston Street, Little Italy. Camelot Drive è CLOSED.'
        : 'Three open rooms: Almonte, 7 Mill Street; Wellington, 1323 Wellington Street West — not the diner at 1385; Preston, 330 Preston, Little Italy. Camelot Drive prints CLOSED.',
      links: [
        { href: '/almonte', label: 'Almonte' },
        { href: '/wellington', label: 'Wellington' },
        { href: '/preston', label: 'Preston' },
        { href: '/locations', label: it ? 'Sale' : 'Locations' },
      ],
    };
  }

  if (has(q, 'phone', 'call', 'telefono', 'chiama', 'number')) {
    if (loc) {
      return {
        tongue,
        text: `${loc.name.en}: ${loc.phone}`,
        links: [{ href: loc.phoneHref, label: loc.phone, external: true }],
      };
    }
    return {
      tongue,
      text: it
        ? `Almonte ${locations[0].phone}. Wellington ${locations[1].phone}. Preston ${locations[2].phone}.`
        : `Almonte ${locations[0].phone}. Wellington ${locations[1].phone}. Preston ${locations[2].phone}.`,
    };
  }

  if (has(q, 'order', 'takeout', 'delivery', 'mobi', 'asporto', 'consegna')) {
    return {
      tongue,
      text: it
        ? 'Almonte e Wellington condividono un link Mobi2go. Preston non ha Order Online nel loro menu. Io non prendo ordini qui.'
        : 'Almonte and Wellington share one Mobi2go order link. Preston has no Order Online in their nav. I don’t take orders here.',
      links: loc?.hasOrder || !loc
        ? [{ href: house.orderOnline, label: it ? 'Ordina' : 'Order online', external: true }]
        : [{ href: '/preston', label: 'Preston' }],
    };
  }

  if (has(q, 'gift', 'carta', 'cadeau', 'toast')) {
    return {
      tongue,
      text: it
        ? 'Carte-cadeau Toast: Almonte e Wellington. Preston: nessun bottone sul loro sito.'
        : 'Gift cards on Toast: Almonte and Wellington. No Preston gift-card button on their live site.',
      links: [{ href: '/gift-cards', label: it ? 'Carte' : 'Gift cards' }],
    };
  }

  if (has(q, 'camelot', 'panini', 'express', 'nepean')) {
    return {
      tongue,
      text: it
        ? `${camelot.name}, ${camelot.lines.en.join(', ')}: ${camelot.status.en}. ${camelot.note.en}`
        : `${camelot.name}, ${camelot.lines.en.join(', ')}: ${camelot.status.en}. ${camelot.note.en}`,
    };
  }

  if (has(q, 'pinsa', 'pinsaria', 'what is pinsa', 'cos e la pinsa', 'pizza')) {
    const hits = dishHits(q);
    const extra =
      hits.length && !has(q, 'what is', 'cos e')
        ? ` ${hits[0].item.title.en}: ${hits[0].item.body.en}`
        : '';
    return {
      tongue,
      text: it
        ? `Joe’s stampa: prima Pinsaria certificata in Canada. Farine di levain, riz, soja e grano, da Roma. Caputo 00, DiMarco, San Marzano DOP. Ovale, non tonda.${extra} Pagina pinsa sul sito.`
        : `Joe’s prints Canada’s first certified Pinsaria. Sourdough, rice, soy and wheat flour from Rome. Caputo 00, DiMarco, San Marzano DOP. Oval, not round pizza.${extra}`,
      links: [
        { href: '/pinsa', label: 'Pinsa' },
        { href: '/menu#pinsa', label: it ? 'Le pinsa' : 'Pinsa board' },
      ],
    };
  }

  if (has(q, 'allergen', 'gluten', 'nut', 'allerg')) {
    return {
      tongue,
      text: it
        ? 'Allergie: chiedere in cucina. Sui menu: pizza senza glutine disponibile, come stampato. Non invento altro.'
        : 'Allergies: ask the kitchen. They print gluten-free pizza available. I don’t invent the rest.',
    };
  }

  const dishes = dishHits(q);
  if (dishes.length) {
    const lines = dishes.map((d) => `${d.item.title.en} — ${d.item.body.en}`).join(' ');
    return {
      tongue,
      text: it
        ? `Dal menu, senza prezzi (non sono stampati): ${lines}`
        : `From the board, no invented prices: ${lines}`,
      links: [{ href: '/menu', label: 'Menu' }],
    };
  }

  if (has(q, 'menu', 'dish', 'food', 'eat', 'pasta', 'antipast', 'insalat', 'wine', 'vino', 'piatt')) {
    return {
      tongue,
      text: it
        ? 'Antipasti, insalate, pinsa, pasta, dolci, vini. Nomi sul menu. Nessun prezzo in dollari nel HTML. Allergie: la cucina.'
        : 'Antipasti, salads, pinsa, pasta, dolci, drinks. Names on the menu. No dollar prices in their HTML. Allergies: ask the kitchen.',
      links: [{ href: '/menu', label: 'Menu' }],
    };
  }

  return {
    tongue,
    text: it
      ? 'Posso dire orari, le tre sale, OpenTable, la pinsa, il menu. Non prendo tavoli e non invento i prezzi. Cosa le serve?'
      : 'I can do hours, the three rooms, OpenTable, pinsa, the board. I don’t take tables and I don’t invent prices. What do you need?',
    links: [
      { href: '/hours', label: it ? 'Orari' : 'Hours' },
      { href: '/menu', label: 'Menu' },
      { href: '/pinsa', label: 'Pinsa' },
    ],
  };
}
