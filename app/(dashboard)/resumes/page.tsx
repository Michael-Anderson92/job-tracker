"use client";

import { ResumesGrid } from '@/components/ResumesGrid';
import { DashboardBanner } from '@/components/DashboardBanner';
import { LeftSidebarCard } from '@/components/LeftSidebarCard';
import { DashboardContentWrapper } from '@/components/DashboardContentWrapper';
import { colors } from '@/lib/design-system';
import { useQuery } from '@tanstack/react-query';

function ResumesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const response = await fetch('/api/resumes');
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      return response.json();
    },
  });

  const resumes = data || [];

  if (isLoading) {
    return (
      <>
        <LeftSidebarCard />
        <DashboardBanner title="MY RESUMES" />
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
        title="MY RESUMES"
        subtitle={`${resumes.length} resume${resumes.length !== 1 ? 's' : ''} tracked`}
      />

      {/* Main Content - Columns 3-11 */}
      <DashboardContentWrapper>
        {resumes.length === 0 ? (
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
              No Resumes Yet
            </p>
            <p className="text-sm" style={{ color: colors.text }}>
              Create resume records to track which versions you use for different applications
            </p>
          </div>
        ) : (
          <ResumesGrid resumes={resumes} />
        )}
      </DashboardContentWrapper>
    </>
  );
}

export default ResumesPage;
