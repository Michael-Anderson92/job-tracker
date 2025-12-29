import Navbar from '@/components/navigation/Navbar';
import { colors } from '@/lib/design-system';
import { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <main
      className='w-screen'
      style={{
        backgroundColor: colors.pageBackground,
        backgroundImage: `
          linear-gradient(rgba(27, 166, 138, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27, 166, 138, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}
    >
      <Navbar />
      <div
        className='py-8'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'auto 1fr', // Banner row (auto-height), Content row (fill remaining space)
          gap: '24px',
          margin: '0 auto',
          paddingLeft: '16px', // Small gap from left edge
          paddingRight: '16px',
          minHeight: 'calc(100vh - 120px)', // Full viewport minus navbar (~100px) and padding
        }}
      >
        {children}
      </div>
    </main>
  );
}
export default layout;