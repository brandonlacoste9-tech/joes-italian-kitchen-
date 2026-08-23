import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function CallBar() {
  const t = await getTranslations('callbar');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-night text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-3 py-2 md:px-6 md:py-3">
        <p className="hidden min-w-0 truncate text-sm font-semibold sm:block">{t('line')}</p>
        <p className="min-w-0 truncate text-xs font-semibold sm:hidden">{t('short')}</p>
        <Link href="/locations" className="btn btn-gold shrink-0 py-2 text-sm md:text-base">
          {t('rooms')}
        </Link>
      </div>
    </div>
  );
}
