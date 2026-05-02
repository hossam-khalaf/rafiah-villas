'use client';

import dynamic from 'next/dynamic';
import config from '../../../../../sanity.config';
import { useParams } from 'next/navigation';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  const params = useParams();
  const locale = params?.locale as string || 'ar';
  
  // Dynamically configure basePath to match the locale route
  const dynamicConfig = {
    ...config,
    basePath: `/${locale}/studio`,
  };

  return <NextStudio config={dynamicConfig} />;
}
