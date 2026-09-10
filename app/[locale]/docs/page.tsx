import { notFound } from 'next/navigation';
import { DocsClient } from '../../components/DocsClient';

const supportedLocales = ['zh-CN', 'en-US'] as const;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocalizedDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) notFound();
  return <DocsClient locale={locale as 'zh-CN' | 'en-US'} />;
}
