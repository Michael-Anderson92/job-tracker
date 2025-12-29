"use client";

import { DashboardBanner } from '@/components/DashboardBanner';
import { LeftSidebarCard } from '@/components/LeftSidebarCard';
import { DashboardContentWrapper } from '@/components/DashboardContentWrapper';
import { colors } from '@/lib/design-system';

function HomePage() {
  return (
    <>
      {/* Left Sidebar - Columns 1-2 */}
      <LeftSidebarCard />

      {/* Banner - Columns 3-11 */}
      <DashboardBanner
        title="HOME"
        subtitle="Welcome to your job application dashboard"
      />

      {/* Main Content - Columns 3-11 */}
      <DashboardContentWrapper>
        <div
          className="border-4 p-8"
          style={{
            backgroundColor: colors.componentBg,
            borderColor: colors.border,
            boxShadow: `6px 6px 0px ${colors.border}`,
            minHeight: '100%',
          }}
        >
          <p style={{ color: colors.text }}>
            {/* Blank home page - ready for content */}
          </p>
        </div>
      </DashboardContentWrapper>
    </>
  );
}

export default HomePage;
