"use client";

import { JobsGrid } from '@/components/web/grids/JobsGrid';
import { CreateJobForm } from '@/components/web/forms/CreateJobForm';
import { NeoButton } from '@/components/buttons/Neobutton';
import { DashboardBanner } from '@/components/DashboardBanner';
import { LeftSidebarCard } from '@/components/LeftSidebarCard';
import { useState } from 'react';
import { colors, buttonVariants } from '@/lib/design-system';
import { useQuery } from '@tanstack/react-query';

type ViewState = 'grid' | 'create';

function JobTrackerPage() {
  const [view, setView] = useState<ViewState>('grid');

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: async () => {
      const response = await fetch('/api/jobs?page=1&limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;

  if (isLoading) {
    return (
      <>
        <LeftSidebarCard />
        <div
          style={{
            gridColumn: '3 / 12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
          }}
        >
          <p style={{ color: colors.text }}>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Left Sidebar - Columns 1-2 */}
      <LeftSidebarCard />

      {/* Banner - Columns 3-11 */}
      <DashboardBanner
        title={view === 'grid' ? 'JOB TRACKER' : 'ADD NEW JOB'}
        subtitle={view === 'grid' ? `${count} applications tracked` : undefined}
        actions={
          <>
            {view === 'create' && (
              <button
                onClick={() => setView('grid')}
                className={buttonVariants.outline}
              >
                ← Back to Grid
              </button>
            )}
            {view === 'grid' && count > 0 && (
              <NeoButton onClick={() => setView('create')}>
                + Add New Job
              </NeoButton>
            )}
          </>
        }
      />

      {/* Main Content - Columns 3-11 */}
      <div
        style={{
          gridColumn: '3 / 12',
        }}
      >
        {view === 'grid' && (
          <JobsGrid
            jobs={jobs}
            onAddJobClick={() => setView('create')}
          />
        )}

        {view === 'create' && (
          <CreateJobForm
            onSuccess={() => setView('grid')}
            onCancel={() => setView('grid')}
          />
        )}
      </div>
    </>
  );
}

export default JobTrackerPage;
