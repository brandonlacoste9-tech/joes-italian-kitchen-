import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { camelot, house } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <p className="mt-6">{t('pinsa')}</p>
      <div className="relative mt-10 min-h-[18rem] overflow-hidden border border-line">
        <img src="/loc-almonte.jpg" alt={t('photoAlt')} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <p className="mt-10 text-sm text-muted">{t('camelot')}</p>
      <p className="mt-2 text-sm">
        {camelot.name} · {camelot.lines[lang].join(', ')} · {camelot.status[lang]}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/locations" className="btn btn-red">
          Locations
        </Link>
        <Link href="/pinsa" className="btn btn-ghost">
          Pinsa
        </Link>
        <Link href="/menu" className="btn btn-ghost">
          Menu
        </Link>
        <a href={house.liveSite} className="btn btn-ghost" target="_blank" rel="noreferrer">
          joesitaliankitchen.ca
        </a>
      </div>
    </div>
  );
}
