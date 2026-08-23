import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WallpaperFrame } from '@/components/layout/WallpaperFrame';
import { house, locations, plates } from '@/content/house';
import { homePicks, menu } from '@/content/menu';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const locT = await getTranslations('loc');
  const lang = locale as Locale;
  const picks = menu
    .flatMap((section) => section.items.map((item) => ({ ...item, section: section.id })))
    .filter((item) => (homePicks as readonly string[]).includes(item.id));

  return (
    <>
      <section className="relative isolate min-h-[min(86vh,48rem)] overflow-hidden bg-night">
        <img src={house.hero} alt={t('heroAlt')} className="absolute inset-0 h-full w-full object-cover object-[center_62%]" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/15 to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[min(86vh,48rem)] max-w-[1280px] flex-col justify-end px-6 pb-16 pt-28 md:pb-20">
          <h1 className="hero-name max-w-xl">
            <span className="hero-name-stroke hero-name-stroke-black" aria-hidden="true">
              {house.name}
            </span>
            <span className="hero-name-stroke hero-name-stroke-gold" aria-hidden="true">
              {house.name}
            </span>
            <span className="hero-name-fill">{house.name}</span>
          </h1>
          <span className="hero-rule mt-5" aria-hidden="true" />
          <p className="hero-line mt-5 max-w-md">{t('title')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/locations" className="btn btn-gold">
              {t('ctaLocations')}
            </Link>
            <Link href="/menu" className="btn border border-[#fbf6ee]/70 bg-night/35 text-[#fbf6ee]">
              {t('ctaMenu')}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
          <h2 className="text-4xl md:text-5xl">{t('roomsTitle')}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">{t('roomsLead')}</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {locations.map((loc) => (
              <li key={loc.id} className="flex flex-col overflow-hidden border border-line bg-paper">
                <Link href={`/${loc.id}`} className="relative block min-h-[14rem] overflow-hidden">
                  <img src={loc.locPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[0.72rem] tracking-[0.16em] text-muted uppercase">{loc.tag[lang]}</p>
                  <h3 className="mt-1 text-2xl">{loc.name[lang]}</h3>
                  <p className="mt-3 text-sm text-muted">{loc.lead[lang]}</p>
                  <p className="mt-3 text-sm">{loc.hoursShort[lang]}</p>
                  <a href={loc.phoneHref} className="mt-1 text-sm font-bold text-red">
                    {loc.phone}
                  </a>
                  <div className="mt-5 flex flex-wrap gap-3 text-[0.72rem] font-bold tracking-[0.12em] uppercase">
                    <Link href={`/${loc.id}`}>{loc.name[lang]} →</Link>
                    <a href={loc.openTable} target="_blank" rel="noreferrer">
                      {locT('reserve')} →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <div className="relative min-h-[18rem] overflow-hidden border border-line">
          <img src={house.benvenuti} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl">{t('pinsaTitle')}</h2>
          <p className="mt-4 text-lg text-muted">{t('pinsaLead')}</p>
          <Link href="/menu" className="mt-6 inline-block text-sm font-bold tracking-[0.12em] uppercase">
            {t('menuMore')} →
          </Link>
        </div>
      </section>

      <WallpaperFrame innerClassName="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <h2 className="text-4xl md:text-5xl">{t('menuTitle')}</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t('menuLead')}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((item) => (
            <li key={item.id} className="border border-line bg-cream p-5">
              <h3 className="text-xl">{item.title[lang]}</h3>
              <p className="mt-2 text-sm text-muted">{item.body[lang]}</p>
            </li>
          ))}
        </ul>
        <Link href="/menu" className="mt-8 inline-block text-sm font-bold tracking-[0.12em] uppercase">
          {t('menuMore')} →
        </Link>
      </WallpaperFrame>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
        <h2 className="text-4xl md:text-5xl">{t('photosTitle')}</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t('photosLead')}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {plates.map((plate) => (
            <li key={plate.src} className="relative min-h-[14rem] overflow-hidden border border-line">
              <img src={plate.src} alt={plate.alt[lang]} className="absolute inset-0 h-full w-full object-cover" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
