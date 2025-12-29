"use client";

import { InterviewsGrid } from '@/components/InterviewsGrid';
import { DashboardBanner } from '@/components/DashboardBanner';
import { LeftSidebarCard } from '@/components/LeftSidebarCard';
import { DashboardContentWrapper } from '@/components/DashboardContentWrapper';
import { colors } from '@/lib/design-system';
import { useQuery } from '@tanstack/react-query';

function InterviewsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const response = await fetch('/api/interviews');
      if (!response.ok) {
        throw new Error('Failed to fetch interviews');
      }
      return response.json();
    },
  });

  const interviews = data || [];

  if (isLoading) {
    return (
      <>
        <LeftSidebarCard />
        <DashboardBanner title="MY INTERVIEWS" />
        <DashboardContentWrapper>
          <div
            className="border-4 p-8"
            style={{
              backgroundColor: colors.componentBg,
              borderColor: colors.border,
              boxShadow: `6px 6px 0px ${colors.border}`,
              minHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: colors.text }}>Loading...</p>
          </div>
        </DashboardContentWrapper>
      </>
    );
  }

  return (
    <>
      {/* Left Sidebar - Columns 1-2 */}
      <LeftSidebarCard />

      {/* Banner - Columns 3-11 */}
      <DashboardBanner
        title="MY INTERVIEWS"
        subtitle={`${interviews.length} interview${interviews.length !== 1 ? 's' : ''} scheduled`}
      />

      {/* Main Content - Columns 3-11 */}
      <DashboardContentWrapper>
        {interviews.length === 0 ? (
          <div
            className="border-4 flex flex-col items-center justify-center p-8"
            style={{
              backgroundColor: colors.componentBg,
              borderColor: colors.border,
              boxShadow: `6px 6px 0px ${colors.border}`,
              minHeight: '100%',
            }}
          >
            <p className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
              No Interviews Yet
            </p>
            <p className="text-sm" style={{ color: colors.text }}>
              Track your interview rounds across all job applications
            </p>
          </div>
        ) : (
          <InterviewsGrid interviews={interviews} />
        )}
      </DashboardContentWrapper>
    </>
  );
}

export default InterviewsPage;
