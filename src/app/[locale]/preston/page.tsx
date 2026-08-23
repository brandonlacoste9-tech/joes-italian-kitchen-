import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LocationRoom } from '@/components/LocationRoom';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Preston' };
}

export default async function PrestonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LocationRoom id="preston" locale={locale as Locale} />;
}
