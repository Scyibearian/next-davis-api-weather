// src/app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://192.168.10.231/v1/current_conditions');
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed fetching weather data' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
