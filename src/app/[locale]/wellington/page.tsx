import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LocationRoom } from '@/components/LocationRoom';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Wellington' };
}

export default async function WellingtonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LocationRoom id="wellington" locale={locale as Locale} />;
}
