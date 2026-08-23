export const house = {
  name: "Joe's Italian Kitchen",
  shortName: "Joe's",
  liveSite: 'https://joesitaliankitchen.ca',
  email: 'info@joesitaliankitchen.ca',
  emailHref: 'mailto:info@joesitaliankitchen.ca',
  instagram: 'https://www.instagram.com/joesitalkitchen/',
  facebook: 'https://www.facebook.com/Joes-Italian-Kitchen-102957067729590/',
  orderOnline: 'https://joesitaliankitchen-1asc.mobi2go.com/',
  logo: '/logo.png',
  logoGold: '/logo-gold.png',
  hero: '/banner.jpg',
  benvenuti: '/benvenuti.jpg',
  pinsaBoard: '/interior.jpg',
} as const;

export const socials = [
  { id: 'instagram' as const, label: 'Instagram', href: house.instagram },
  { id: 'facebook' as const, label: 'Facebook', href: house.facebook },
] as const;

export const locations = [
  {
    id: 'almonte',
    name: { en: 'Almonte', fr: 'Almonte' },
    tag: { en: 'Heritage mill · countryside room', fr: 'Moulin patrimonial' },
    lead: {
      en: 'Nestled in a heritage woolen mill in historic Almonte. They invite you to sit back, relax, and soak in the rustic atmosphere.',
      fr: 'Dans un moulin de laine patrimonial à Almonte. Ils invitent à s’asseoir et à prendre le temps.',
    },
    lines: {
      en: ['7 Mill Street, Unit 2 & 3', 'Almonte, ON'],
      fr: ['7 Mill Street, unités 2 et 3', 'Almonte, Ont.'],
    },
    postal: 'K0A 1A0',
    phone: '(613) 256-4033',
    phoneHref: 'tel:+16132564033',
    email: 'almonte@joesitaliankitchen.ca',
    emailHref: 'mailto:almonte@joesitaliankitchen.ca',
    openTable: 'https://www.opentable.ca/restref/client/?rid=1364059&restref=1364059&lang=en-CA&ot_source=Restaurant%20website',
    menuPath: '/almonte-dine-in-menu/',
    photo: '/hero-almonte.jpg',
    locPhoto: '/loc-almonte.jpg',
    gift: 'https://order.toasttab.com/egiftcards/joes-italian-kitchen-almonte-7-mill-street',
    giftBalance: 'https://www.toasttab.com/joes-italian-kitchen-almonte-7-mill-street/findcard',
    hasOrder: true,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=7+Mill+Street+Unit+2+Almonte+ON+K0A+1A0',
    hoursShort: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' },
    hoursNote: {
      en: 'Monday and Sunday print 11:30 am–8:00 pm on their Almonte page. Tuesday’s line is blank there. We print the 11:30–8 window those days show, not a third-party fill-in.',
      fr: 'Lundi et dimanche : 11 h 30 – 20 h sur leur page Almonte. La ligne du mardi est vide. Nous imprimons cette fenêtre, pas une invention.',
    },
    hours: [
      { day: { en: 'Monday', fr: 'Lundi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Tuesday', fr: 'Mardi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Wednesday', fr: 'Mercredi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Thursday', fr: 'Jeudi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Friday', fr: 'Vendredi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Saturday', fr: 'Samedi' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
      { day: { en: 'Sunday', fr: 'Dimanche' }, hours: { en: '11:30 am–8:00 pm', fr: '11 h 30 – 20 h' } },
    ],
    schema: { opens: '11:30', closes: '20:00' },
  },
  {
    id: 'wellington',
    name: { en: 'Wellington', fr: 'Wellington' },
    tag: { en: 'Wellington West Village · Ottawa', fr: 'Wellington West Village · Ottawa' },
    lead: {
      en: 'Joe’s Wellington West Village. Favourite Joe’s dishes in the heart of Wellington Village, downtown Ottawa. They call it a fast casual atmosphere.',
      fr: 'Joe’s à Wellington West Village. Leurs plats dans le quartier Wellington, au centre-ville d’Ottawa.',
    },
    lines: {
      en: ['1323 Wellington Street West', 'Ottawa, ON'],
      fr: ['1323 Wellington Street West', 'Ottawa, Ont.'],
    },
    postal: 'K1Y 3B6',
    phone: '(613) 798-1111',
    phoneHref: 'tel:+16137981111',
    email: 'info@joesitaliankitchen.ca',
    emailHref: 'mailto:info@joesitaliankitchen.ca',
    openTable: 'https://www.opentable.ca/restref/client/?rid=1231693&restref=1231693&lang=en-CA&ot_source=Restaurant%20website',
    menuPath: '/wellington-dine-in-menu/',
    photo: '/hero-wellington.jpg',
    locPhoto: '/loc-wellington.jpg',
    gift: 'https://order.toasttab.com/egiftcards/joes-italian-kitchen-wellington-1323-wellington-street-west',
    giftBalance: 'https://www.toasttab.com/joes-italian-kitchen-wellington-1323-wellington-street-west/findcard',
    hasOrder: true,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=1323+Wellington+Street+West+Ottawa+ON+K1Y+3B6',
    hoursShort: { en: '11:30 am–9:00 pm · Fri–Sat until 10:00 pm', fr: '11 h 30 – 21 h · ven.–sam. jusqu’à 22 h' },
    hoursNote: {
      en: 'Sunday’s time is sometimes blank on their Wellington page. When they print it, it is 11:30 am–9:00 pm (the line has also shown a doubled “– 9:00pm”).',
      fr: 'L’heure du dimanche est parfois vide sur leur page Wellington. Quand elle est imprimée : 11 h 30 – 21 h.',
    },
    hours: [
      { day: { en: 'Monday', fr: 'Lundi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Tuesday', fr: 'Mardi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Wednesday', fr: 'Mercredi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Thursday', fr: 'Jeudi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Friday', fr: 'Vendredi' }, hours: { en: '11:30 am–10:00 pm', fr: '11 h 30 – 22 h' } },
      { day: { en: 'Saturday', fr: 'Samedi' }, hours: { en: '11:30 am–10:00 pm', fr: '11 h 30 – 22 h' } },
      { day: { en: 'Sunday', fr: 'Dimanche' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
    ],
    schema: { opens: '11:30', closes: '21:00' },
  },
  {
    id: 'preston',
    name: { en: 'Preston', fr: 'Preston' },
    tag: { en: 'Little Italy · Ottawa', fr: 'La Petite-Italie · Ottawa' },
    lead: {
      en: 'Now in the vibrant heart of Preston Street, Ottawa’s Little Italy. They invite you to unwind while they craft dishes inspired by Italy and modern culinary artistry.',
      fr: 'Au cœur de Preston Street, Petite-Italie d’Ottawa. Ils invitent à se poser pendant qu’ils préparent des plats inspirés de l’Italie.',
    },
    lines: {
      en: ['330 Preston Street', 'Ottawa, ON'],
      fr: ['330 Preston Street', 'Ottawa, Ont.'],
    },
    postal: 'K1S 4M6',
    phone: '(613) 233-4982',
    phoneHref: 'tel:+16132334982',
    email: 'info@joesitaliankitchen.ca',
    emailHref: 'mailto:info@joesitaliankitchen.ca',
    openTable: 'https://www.opentable.ca/r/joes-italian-kitchen-preston-reservations-ottawa?restref=1384099&lang=en-CA&ot_source=Restaurant%20website',
    menuPath: '/preston-dine-in-menu/',
    photo: '/hero-preston.jpg',
    locPhoto: '/hero-preston.jpg',
    gift: null,
    giftBalance: null,
    hasOrder: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=330+Preston+Street+Ottawa+ON+K1S+4M6',
    hoursShort: { en: '11:30 am–9:00 pm · Fri–Sat until 10:00 pm', fr: '11 h 30 – 21 h · ven.–sam. jusqu’à 22 h' },
    hoursNote: {
      en: 'Tuesday’s line on their Preston page sometimes prints only “11:30am” with no close. Other days print a close time. We use the close times they print on the fuller days, not a guess invented for Tuesday.',
      fr: 'Le mardi, leur page Preston imprime parfois seulement 11 h 30, sans fermeture. Nous gardons les heures des autres jours tels quels.',
    },
    hours: [
      { day: { en: 'Monday', fr: 'Lundi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Tuesday', fr: 'Mardi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Wednesday', fr: 'Mercredi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Thursday', fr: 'Jeudi' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
      { day: { en: 'Friday', fr: 'Vendredi' }, hours: { en: '11:30 am–10:00 pm', fr: '11 h 30 – 22 h' } },
      { day: { en: 'Saturday', fr: 'Samedi' }, hours: { en: '11:30 am–10:00 pm', fr: '11 h 30 – 22 h' } },
      { day: { en: 'Sunday', fr: 'Dimanche' }, hours: { en: '11:30 am–9:00 pm', fr: '11 h 30 – 21 h' } },
    ],
    schema: { opens: '11:30', closes: '21:00' },
  },
] as const;

export type LocationId = (typeof locations)[number]['id'];
export type Location = (typeof locations)[number];

export function locationById(id: string) {
  return locations.find((loc) => loc.id === id);
}

export function liveMenuUrl(loc: Location) {
  return `${house.liveSite}${loc.menuPath}`;
}

export const camelot = {
  name: "Joe's Pinsa & Panini",
  lines: { en: ['60 Camelot Drive', 'Nepean, ON'], fr: ['60 Camelot Drive', 'Nepean, Ont.'] },
  status: { en: 'CLOSED', fr: 'FERMÉ' },
  note: {
    en: 'Their Pinsa & Panini / Express page still exists. It prints CLOSED for 60 Camelot Drive. We do not list it as an open room.',
    fr: 'Leur page Pinsa & Panini existe encore. Elle imprime FERMÉ pour 60 Camelot Drive. Nous ne la présentons pas comme ouverte.',
  },
} as const;
