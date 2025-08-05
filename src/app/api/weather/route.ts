// src/app/api/weather/route.ts
import { NextResponse } from 'next/server';
import { getWeatherFromStation } from '@/lib/weather-utils';

export async function GET() {
  try {
    const data = await getWeatherFromStation();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed fetching weather data' },
      { status: 500 }
    );
  }
}
