import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house, liveMenuUrl, locations } from '@/content/house';
import { menu, menuNote } from '@/content/menu';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'menu' });
  return { title: t('title') };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('menu');
  const lang = locale as Locale;

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-20">
      <p className="kicker text-red">{t('kicker')}</p>
      <h1 className="mt-2 text-6xl md:text-8xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <p className="mt-3 max-w-2xl text-sm text-muted">{menuNote[lang]}</p>
      <nav aria-label={t('jump')} className="mt-8 flex flex-wrap gap-2">
        {menu.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="border border-line bg-cream px-3 py-1.5 text-[0.72rem] font-bold tracking-[0.08em] uppercase"
          >
            {section.title[lang]}
          </a>
        ))}
      </nav>
      {menu.map((section) => (
        <div key={section.id} id={section.id} className="mt-14 scroll-mt-28">
          <h2 className="border-b border-red pb-2 text-3xl">{section.title[lang]}</h2>
          {'note' in section && section.note ? (
            <p className="mt-3 max-w-3xl text-sm text-muted">{section.note[lang]}</p>
          ) : null}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item.id} className="border border-line p-4">
                <h3 className="text-lg">{item.title[lang]}</h3>
                {item.body[lang] ? <p className="mt-2 text-sm text-muted">{item.body[lang]}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-10 text-sm text-muted">{t('note')}</p>
      <ul className="mt-6 flex flex-col gap-2 text-sm font-bold uppercase tracking-wide">
        {locations.map((loc) => (
          <li key={loc.id}>
            <a href={liveMenuUrl(loc)} target="_blank" rel="noreferrer">
              {t('live')} — {loc.name[lang]} →
            </a>
          </li>
        ))}
      </ul>
      <a href={house.orderOnline} className="btn btn-red mt-8" target="_blank" rel="noreferrer">
        {house.orderOnline.replace('https://', '')}
      </a>
    </div>
  );
}
