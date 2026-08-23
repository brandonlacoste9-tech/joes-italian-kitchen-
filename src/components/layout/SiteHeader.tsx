'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { house, locations } from '@/content/house';
import { Link, usePathname } from '@/i18n/navigation';

const navItems = [
  { href: '/locations', key: 'locations' },
  { href: '/pinsa', key: 'pinsa' },
  { href: '/menu', key: 'menu' },
  { href: '/hours', key: 'hours' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
  { href: '/gift-cards', key: 'gifts' },
] as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function navClass(href: string) {
    const active =
      href === '/locations'
        ? pathname === '/locations' || locations.some((loc) => pathname === `/${loc.id}`)
        : pathname === href;
    return active
      ? 'text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase'
      : 'text-[0.72rem] font-bold tracking-[0.14em] text-white/75 uppercase hover:text-gold';
  }

  return (
    <div className={open ? 'sticky top-0 z-[70]' : 'sticky top-0 z-30'}>
      <div className="bg-red text-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[0.78rem] font-bold tracking-[0.08em] uppercase md:px-6">
          <nav aria-label={t('locations')} className="flex flex-wrap items-center gap-x-2">
            <Link href="/almonte" className="underline-offset-2 hover:underline">
              {t('almonte')}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/wellington" className="underline-offset-2 hover:underline">
              {t('wellingtonWest')}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/preston" className="underline-offset-2 hover:underline">
              {t('littleItaly')}
            </Link>
          </nav>
          <Link href="/hours" className="text-white/90 underline-offset-2 hover:text-white hover:underline">
            {t('openTable')}
          </Link>
        </div>
      </div>
      <header className="border-b border-gold/40 bg-night text-white">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-ink"
        >
          {t('skip')}
        </a>
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 md:px-6">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">{t('menu')}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="block h-0.5 bg-white" />
              <span className="block h-0.5 bg-white" />
              <span className="block h-0.5 bg-white" />
            </span>
          </button>

          <Link href="/" className="min-w-0 flex-1 md:flex-none">
            <img src={house.logo} alt={house.name} width={220} height={80} className="h-12 w-auto object-contain md:h-14" />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-x-5 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={navClass(item.href)}>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 md:gap-5">
            <div className="hidden xl:block">
              <SocialLinks tone="cream" compact />
            </div>
            <a
              href={house.orderOnline}
              className="btn btn-gold hidden py-2 sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              {t('order')}
            </a>
            <div className="hidden md:block">
              <LocaleSwitch tone="dark" />
            </div>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col bg-night text-white md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
          >
            <div className="flex items-center justify-between border-b border-gold/40 px-4 py-3">
              <img src={house.logo} alt="" width={180} height={60} className="h-10 w-auto object-contain" />
              <button type="button" className="h-11 px-2 text-sm font-bold uppercase" onClick={() => setOpen(false)}>
                {t('close')}
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-8" aria-label="Primary">
              {locations.map((loc) => (
                <Link key={loc.id} href={`/${loc.id}`} className="border-b border-white/10 py-4 font-heading text-3xl">
                  {t(loc.id)}
                </Link>
              ))}
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-white/10 py-4 font-heading text-3xl">
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 px-6 py-6">
              <SocialLinks tone="cream" />
              <div className="flex items-center justify-between gap-4">
                <a href={house.orderOnline} className="btn btn-gold" target="_blank" rel="noreferrer">
                  {t('order')}
                </a>
                <LocaleSwitch tone="dark" />
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
