"use client";

import { colors } from '@/lib/design-system';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, FileText, MessageSquare } from 'lucide-react';

export function LeftSidebarCard() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/job-tracker', label: 'Job Tracker', icon: Briefcase },
    { href: '/resumes', label: 'Resumes', icon: FileText },
  ];

  return (
    <div
      className="border-4 p-4"
      style={{
        backgroundColor: colors.componentBg,
        borderColor: colors.border,
        boxShadow: `6px 6px 0px ${colors.border}`,
        gridColumn: '1 / 3', // Spans columns 1-2
        gridRow: 'span 2', // Spans 2 rows (banner + content)
        height: '100%', // Fill the grid container height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="p-3 border-3 flex items-center gap-3 transition-all"
              style={{
                backgroundColor: isActive ? colors.accent : colors.componentBg,
                borderColor: colors.border,
                color: colors.text,
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                border: `3px solid ${colors.border}`,
                boxShadow: isActive ? `4px 4px 0px ${colors.border}` : `2px 2px 0px ${colors.border}`,
              }}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Leave Feedback Link at Bottom */}
      <Link
        href="mailto:feedback@example.com"
        className="p-3 border-3 flex items-center gap-3 transition-all"
        style={{
          backgroundColor: colors.componentBg,
          borderColor: colors.border,
          color: colors.text,
          textDecoration: 'none',
          border: `3px solid ${colors.border}`,
          boxShadow: `2px 2px 0px ${colors.border}`,
        }}
      >
        <MessageSquare size={20} />
        <span>Leave Feedback</span>
      </Link>
    </div>
  );
}
