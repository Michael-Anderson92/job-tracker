import { colors } from '@/lib/design-system';
import { Archivo_Black } from 'next/font/google';
import { ReactNode } from 'react';

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type DashboardBannerProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function DashboardBanner({ title, subtitle, actions }: DashboardBannerProps) {
  return (
    <div
      className="p-6 border-solid border-4"
      style={{
        backgroundColor: 'rgb(174, 195, 232)',
        borderColor: colors.border,
        boxShadow: `8px 8px 0px ${colors.border}`,
        minHeight: '120px',
        gridColumn: '3 / 12', // Spans columns 3-11 (9 columns)
      }}
    >
      <div className="flex justify-between items-center h-full">
        <div>
          <h1
            className={`text-4xl ${archivoBlack.className}`}
            style={{
              color: colors.text,
              letterSpacing: '0.05em'
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm mt-2" style={{ color: colors.text }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
