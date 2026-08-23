import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hours' });
  return { title: t('title') };
}

export default async function HoursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hours');
  const locT = await getTranslations('loc');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {locations.map((loc) => (
          <li key={loc.id} className="border border-line p-5">
            <Link href={`/${loc.id}`} className="font-heading text-2xl">
              {loc.name[lang]}
            </Link>
            <p className="mt-2 text-sm text-muted">{loc.hoursNote[lang]}</p>
            <ul className="mt-4 text-sm">
              {loc.hours.map((row) => (
                <li key={row.day.en} className="flex justify-between gap-2 border-b border-line py-2 last:border-b-0">
                  <span>{row.day[lang]}</span>
                  <span>{row.hours[lang]}</span>
                </li>
              ))}
            </ul>
            <a href={loc.openTable} className="mt-4 inline-block text-sm font-bold uppercase" target="_blank" rel="noreferrer">
              {t('reserve')} →
            </a>
            <p className="mt-2">
              <a href={loc.phoneHref} className="text-sm font-bold text-red">
                {locT('call')} {loc.phone}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
