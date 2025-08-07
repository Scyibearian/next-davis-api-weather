import './globals.css';
import type { Metadata } from 'next';
//import { startWeatherLogging } from '@/lib/weather-logger';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather tracking app',
};

// Start logger only in dev or production server mode (not in build)
// if (typeof window === 'undefined') {
//   startWeatherLogging();
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
