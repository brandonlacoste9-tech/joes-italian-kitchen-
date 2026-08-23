import { getTranslations } from 'next-intl/server';
import { house, liveMenuUrl, locationById, type LocationId } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  id: LocationId;
  locale: Locale;
};

export async function LocationRoom({ id, locale }: Props) {
  const loc = locationById(id);
  if (!loc) return null;
  const t = await getTranslations('loc');
  const lang = locale;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night">
        <div className="relative min-h-[min(70vh,38rem)]">
          <img src={loc.photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/20" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[min(70vh,38rem)] max-w-[1280px] flex-col justify-end px-6 pb-14 pt-24">
            <p className="kicker">{loc.tag[lang]}</p>
            <h1 className="mt-3 text-5xl text-white md:text-7xl">{loc.name[lang]}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{loc.lead[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={loc.openTable} className="btn btn-gold" target="_blank" rel="noreferrer">
                {t('reserve')}
              </a>
              <a href={loc.phoneHref} className="btn btn-ghost border-white text-white">
                {t('call')} {loc.phone}
              </a>
              {loc.hasOrder ? (
                <a href={house.orderOnline} className="btn btn-ghost border-white text-white" target="_blank" rel="noreferrer">
                  {t('order')}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-2 md:py-16">
          <article>
            {loc.lines[lang].map((line) => (
              <p key={line} className="text-lg">
                {line}
              </p>
            ))}
            <p>{loc.postal}</p>
            <a href={loc.phoneHref} className="mt-4 block text-2xl font-semibold text-red">
              {loc.phone}
            </a>
            <a href={loc.emailHref} className="mt-1 block">
              {loc.email}
            </a>
            {id === 'almonte' ? (
              <a href={house.emailHref} className="mt-1 block text-sm text-muted">
                {house.email}
              </a>
            ) : null}
            <p className="mt-4 text-muted">{loc.hoursShort[lang]}</p>
            <p className="mt-3 max-w-xl text-sm text-muted">{loc.hoursNote[lang]}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold tracking-[0.12em] uppercase">
              <a href={loc.mapUrl} target="_blank" rel="noreferrer">
                {t('map')} →
              </a>
              <a href={liveMenuUrl(loc)} target="_blank" rel="noreferrer">
                {t('liveMenu')} →
              </a>
              <Link href="/menu">{t('menu')} →</Link>
              {loc.gift ? (
                <a href={loc.gift} target="_blank" rel="noreferrer">
                  {t('gift')} →
                </a>
              ) : null}
            </div>
            {loc.hasOrder ? null : <p className="mt-6 max-w-xl text-sm text-muted">{t('orderNote')}</p>}
          </article>
          <div className="relative min-h-[18rem] overflow-hidden border border-line">
            <img src={loc.locPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-6 py-14">
        <h2 className="text-3xl">{t('hours')}</h2>
        <ul className="mt-6 border border-line">
          {loc.hours.map((row) => (
            <li key={row.day.en} className="flex justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0">
              <span className="font-semibold">{row.day[lang]}</span>
              <span>{row.hours[lang]}</span>
            </li>
          ))}
        </ul>
        <a href={loc.openTable} className="btn btn-red mt-8" target="_blank" rel="noreferrer">
          {t('reserve')}
        </a>
      </section>
    </>
  );
}
