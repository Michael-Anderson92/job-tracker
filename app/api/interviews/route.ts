/**
 * API Route: /api/interviews
 *
 * Handles interview-related HTTP requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/utils/db';

/**
 * GET /api/interviews
 * Fetches all interviews for the authenticated user
 * Includes related job information (company and position)
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch interviews with related job data
    // We need to get interviews where the job belongs to the user
    const interviews = await prisma.interview.findMany({
      where: {
        job: {
          clerkId: userId,
        },
      },
      include: {
        job: {
          select: {
            position: true,
            company: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}
