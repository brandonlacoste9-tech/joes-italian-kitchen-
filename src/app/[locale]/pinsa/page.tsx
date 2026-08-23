import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WallpaperFrame } from '@/components/layout/WallpaperFrame';
import { pinsaCanada, pinsaFacts } from '@/content/pinsa';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pinsa' });
  return { title: t('title'), description: t('lead') };
}

const shots = [
  { src: '/banner.jpg', alt: 'A Joe’s pinsa with tomatoes and basil.' },
  { src: '/benvenuti.jpg', alt: 'A sliced pinsa with basil and green olives.' },
  { src: '/interior.jpg', alt: 'Pinsa with arugula, prosciutto, and balsamic.' },
  { src: '/hero-preston.jpg', alt: 'Pinsas lined up by the oven.' },
] as const;

export default async function PinsaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pinsa');
  const lang = locale as Locale;

  return (
    <WallpaperFrame>
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {shots.map((shot) => (
          <li key={shot.src} className="relative min-h-[14rem] overflow-hidden border border-line">
            <img src={shot.src} alt={shot.alt} className="absolute inset-0 h-full w-full object-cover" />
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-3xl md:text-4xl">{t('joesTitle')}</h2>
      <ul className="mt-6 max-w-2xl space-y-3 text-muted">
        {pinsaFacts.joes[lang].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <Link href="/menu#pinsa" className="btn btn-red mt-8">
        {t('menu')}
      </Link>

      <h2 className="mt-16 text-3xl md:text-4xl">{t('canadaTitle')}</h2>
      <p className="mt-4 max-w-2xl text-muted">{t('canadaLead')}</p>
      <ul className="mt-6 max-w-2xl space-y-3 text-muted">
        {pinsaFacts.canada[lang].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={pinsaCanada.url} className="btn btn-gold" target="_blank" rel="noreferrer">
          {t('canadaSite')}
        </a>
        <a href={pinsaCanada.vsPizza} className="btn btn-ghost" target="_blank" rel="noreferrer">
          {t('vs')}
        </a>
        <a href={pinsaCanada.flour} className="btn btn-ghost" target="_blank" rel="noreferrer">
          {t('flour')}
        </a>
      </div>
      <p className="mt-8 max-w-2xl text-sm text-muted">{t('note')}</p>
    </WallpaperFrame>
  );
}
