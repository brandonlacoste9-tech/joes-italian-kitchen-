import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { house, locations } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const locT = await getTranslations('loc');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <a href={house.emailHref} className="mt-4 block text-xl font-semibold text-red">
        {house.email}
      </a>
      <div className="mt-6">
        <SocialLinks />
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {locations.map((loc) => (
          <li key={loc.id} className="border border-line p-5">
            <h2 className="font-heading text-2xl">{loc.name[lang]}</h2>
            <p className="mt-3">
              {loc.lines[lang].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{loc.postal}</span>
            </p>
            <a href={loc.phoneHref} className="mt-3 block font-bold text-red">
              {loc.phone}
            </a>
            <a href={loc.emailHref} className="mt-1 block text-sm">
              {loc.email}
            </a>
            <a href={loc.mapUrl} className="mt-4 inline-block text-sm font-bold uppercase" target="_blank" rel="noreferrer">
              {t('map')} →
            </a>
            <p className="mt-2">
              <a href={loc.openTable} className="text-sm font-bold uppercase" target="_blank" rel="noreferrer">
                {locT('reserve')} →
              </a>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted">{t('emailNote')}</p>
    </div>
  );
}
