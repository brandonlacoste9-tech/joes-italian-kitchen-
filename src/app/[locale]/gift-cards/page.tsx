import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locations } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gifts' });
  return { title: t('title') };
}

export default async function GiftCardsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gifts');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <ul className="mt-10 grid gap-6">
        {locations.map((loc) => (
          <li key={loc.id} className="border border-line p-5">
            <h2 className="font-heading text-2xl">{loc.name[lang]}</h2>
            {loc.gift ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={loc.gift} className="btn btn-red" target="_blank" rel="noreferrer">
                  {t('buy')}
                </a>
                {loc.giftBalance ? (
                  <a href={loc.giftBalance} className="btn btn-ghost" target="_blank" rel="noreferrer">
                    {t('balance')}
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">{t('preston')}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
