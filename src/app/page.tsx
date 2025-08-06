'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import WeatherGraph from '@/components/WeatherGraph';
import { SunIcon, ArrowPathIcon, ArrowUpIcon, CloudIcon, HomeIcon } from '@heroicons/react/24/outline';

// Helper to convert Fahrenheit to Celsius
const toCelsius = (f: number) => ((f - 32) * 5) / 9;
const toFahrenheit = (c: number) => (c * 9) / 5 + 32;

// Helper to format temperature display safely
function formatTemp(c: number | null | undefined) {
  if (c == null) return 'N/A';
  return `${c.toFixed(1)}°C / ${toFahrenheit(c).toFixed(1)}°F`;
}

// Helper to format simple numbers with units, safely
function formatNumber(value: number | null | undefined, unit = '') {
  if (value == null) return 'N/A';
  return `${value}${unit}`;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch('/api/weather');
      const json = await res.json();
      setWeatherData(json.data);
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!weatherData) {
    return <p className="text-center text-gray-500 mt-10">Loading weather data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-8 overflow-x-auto">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">Stone Lane Weather</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🌡️ Temperature Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">
            🌡️ Temperature
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Card label="Outdoor Temp" value={formatTemp(weatherData.outdoorTempC)} unit="" />
            <Card label="Humidity" value={formatNumber(weatherData.humidityPercent, '%')} unit="" />
            <Card label="Indoor Temp" value={formatTemp(weatherData.indoorTempC)} unit="" icon={HomeIcon} />
            <Card label="Dew Point" value={formatTemp(weatherData.dewPointC)} unit="" />
          </div>
        </section>

        {/* 🌤️ Weather Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">
            🌤️ Weather
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Card label="UV Index" value={formatNumber(weatherData.uvIndex)} unit="" />
            <Card label="Solar Radiation" value={formatNumber(weatherData.solarRadiation, 'W/m²')} unit="" icon={SunIcon} spin />
            <Card label="Rain (24h)" value={formatNumber(weatherData.rainfall24hMM, 'mm')} unit="" />
            <Card label="Pressure" value={formatNumber(weatherData.pressureInHg, 'inHg')} unit="" />
          </div>
        </section>

        {/* 💨 Wind Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">
            💨 Wind
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Card label="Wind Speed (Last)" value={formatNumber(weatherData.windSpeedMph, 'mph')} unit="" />
            <Card label="Wind Dir (Last)" value={formatNumber(weatherData.windDirDeg, '°')} unit="" />
            <Card label="Wind Avg (10 min)" value={formatNumber(weatherData.windAvgMph, 'mph')} unit="" icon={ArrowPathIcon} spin />
            <Card label="Wind Gust (10 min)" value={formatNumber(weatherData.windGustMph, 'mph')} unit="" />
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <WeatherGraph metric="windSpeedKmh" defaultHours={6} label="Wind Speed" unit=" km/h" />
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <WeatherGraph metric="outdoorTempC" defaultHours={24} label="Outdoor Temperature" unit=" °C" />
        </div>
      </div>

    </div>
  );
}
