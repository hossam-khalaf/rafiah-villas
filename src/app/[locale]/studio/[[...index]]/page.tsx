'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';
import { useParams } from 'next/navigation';

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
