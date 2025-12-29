import { ReactNode, CSSProperties } from 'react';

interface DashboardContentWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Reusable wrapper for dashboard page content areas.
 * Provides consistent grid column positioning.
 * Use this component to wrap all main content in dashboard pages.
 */
export function DashboardContentWrapper({
  children,
  style = {}
}: DashboardContentWrapperProps) {
  return (
    <div
      style={{
        gridColumn: '3 / 12',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
