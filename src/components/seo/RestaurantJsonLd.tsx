import { house, locations } from '@/content/house';

const dayIds = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

function closesFor(id: string, day: (typeof dayIds)[number]) {
  if (id === 'almonte') return '20:00';
  if (day === 'Friday' || day === 'Saturday') return '22:00';
  return '21:00';
}

export function RestaurantJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': locations.map((loc) => ({
      '@type': 'Restaurant',
      '@id': `${house.liveSite}/#${loc.id}`,
      name: `${house.name} — ${loc.name.en}`,
      url: house.liveSite,
      telephone: loc.phoneHref.replace('tel:', ''),
      email: loc.email,
      servesCuisine: 'Italian',
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.lines.en[0],
        addressLocality: loc.id === 'almonte' ? 'Almonte' : 'Ottawa',
        addressRegion: 'ON',
        postalCode: loc.postal,
        addressCountry: 'CA',
      },
      openingHoursSpecification: dayIds.map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: '11:30',
        closes: closesFor(loc.id, day),
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
