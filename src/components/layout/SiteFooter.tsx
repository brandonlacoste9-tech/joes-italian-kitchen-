import { getLocale, getTranslations } from 'next-intl/server';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { camelot, house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;

  return (
    <footer className="mt-auto border-t border-gold/30 bg-night pb-24 text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <img src={house.logo} alt="" width={200} height={70} className="h-12 w-auto object-contain" />
          <p className="mt-4 text-sm text-white/70">{t('line')}</p>
          <a href={house.emailHref} className="mt-3 block text-gold">
            {house.email}
          </a>
        </div>
        {locations.map((loc) => (
          <address key={loc.id} className="not-italic text-sm leading-relaxed text-white/85">
            <Link href={`/${loc.id}`} className="font-heading text-xl text-white">
              {loc.name[locale]}
            </Link>
            {loc.lines[locale].map((line) => (
              <span key={line} className="mt-1 block">
                {line}
              </span>
            ))}
            <span className="block">{loc.postal}</span>
            <a href={loc.phoneHref} className="mt-2 block font-bold text-gold">
              {loc.phone}
            </a>
          </address>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase">
          <Link href="/menu">{nav('menu')}</Link>
          <Link href="/hours">{nav('hours')}</Link>
          <Link href="/gift-cards">{nav('gifts')}</Link>
          <Link href="/contact">{nav('contact')}</Link>
        </div>
        <SocialLinks tone="cream" />
      </div>
      <p className="mx-auto max-w-[1280px] px-6 pb-2 text-xs text-white/45">
        {camelot.name} · {camelot.lines[locale].join(', ')} · {camelot.status[locale]}
      </p>
      <p className="mx-auto max-w-[1280px] px-6 pb-6 text-xs text-white/45">{t('copy')}</p>
    </footer>
  );
}
