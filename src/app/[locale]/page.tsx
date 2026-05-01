import { useTranslations } from 'next-intl';
import { getVillaStats } from '@/data/villas';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('Hero');
  const stats = getVillaStats();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{t('title')} - {t('subtitle')}</h1>
      <p>{t('description')}</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Data Load Test</h2>
        <ul>
          <li>Total Villas: {stats.total}</li>
          <li>Available: {stats.available}</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/ar" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Arabic Route</Link>
        <Link href="/en" style={{ textDecoration: 'underline' }}>English Route</Link>
      </div>
    </main>
  );
}
