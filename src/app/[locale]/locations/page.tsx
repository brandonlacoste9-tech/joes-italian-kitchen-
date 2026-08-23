import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { camelot, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locationsPage' });
  return { title: t('title') };
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('locationsPage');
  const locT = await getTranslations('loc');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {locations.map((loc) => (
          <li key={loc.id} className="flex flex-col overflow-hidden border border-line">
            <Link href={`/${loc.id}`} className="relative block min-h-[16rem] overflow-hidden">
              <img src={loc.locPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[0.72rem] tracking-[0.16em] text-muted uppercase">{t('open')}</p>
              <h2 className="mt-1 text-3xl">{loc.name[lang]}</h2>
              <p className="mt-3 text-sm text-muted">{loc.tag[lang]}</p>
              {loc.lines[lang].map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>{loc.postal}</p>
              <a href={loc.phoneHref} className="mt-3 font-bold text-red">
                {loc.phone}
              </a>
              <p className="mt-2 text-sm">{loc.hoursShort[lang]}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold tracking-[0.12em] uppercase">
                <Link href={`/${loc.id}`}>{loc.name[lang]} →</Link>
                <a href={loc.openTable} target="_blank" rel="noreferrer">
                  {locT('reserve')} →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <article className="mt-12 border border-line p-5">
        <p className="text-[0.72rem] font-bold tracking-[0.16em] text-red uppercase">{camelot.status[lang]}</p>
        <h2 className="mt-2 text-2xl">{camelot.name}</h2>
        <p className="mt-2">{camelot.lines[lang].join(', ')}</p>
        <p className="mt-3 text-sm text-muted">{camelot.note[lang]}</p>
      </article>
    </div>
  );
}
