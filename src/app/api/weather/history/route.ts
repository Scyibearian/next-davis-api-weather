import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const metric = searchParams.get('metric') || 'outdoorTempC';
  const hours = parseInt(searchParams.get('hours') || '24', 10);

  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  // Only select needed fields
  const readings = await prisma.weatherReading.findMany({
    where: { timestamp: { gte: since } },
    orderBy: { timestamp: 'asc' },
    select: {
      timestamp: true,
      [metric]: true,
    },
  });

  return NextResponse.json({ metric, readings });
}
