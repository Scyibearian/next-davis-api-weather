'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { SunIcon, ArrowPathIcon, ArrowUpIcon, CloudIcon } from '@heroicons/react/24/outline';

//const WEATHERLINK_URL = "http://192.168.10.231/v1/current_conditions";

// Helper to convert Fahrenheit to Celsius
const toCelsius = (f: number) => ((f - 32) * 5) / 9;

export default function Home() {
  const [mainSensor, setMainSensor] = useState<any>(null);
  const [indoor, setIndoor] = useState<any>(null);
  const [pressure, setPressure] = useState<any>(null);
  const [windSensor, setWindSensor] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch('/api/weather');
      const json = await res.json();
      const conditions = json.data.conditions;

      setMainSensor(conditions.find((d: any) => d.txid === 1));
      setIndoor(conditions.find((d: any) => d.data_structure_type === 4));
      setPressure(conditions.find((d: any) => d.data_structure_type === 3));
      setWindSensor(conditions.find((d: any) => d.txid === 6));
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mainSensor || !indoor || !pressure || !windSensor) {
    return <p className="text-center text-gray-500 mt-10">Loading weather data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-8 overflow-x-auto">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Stone Lane Weather</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🌡️ Temperature Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">🌡️ Temperature</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card label="Outdoor Temp" value={`${mainSensor.temp}°F / ${toCelsius(mainSensor.temp).toFixed(1)}°C`} unit="" />
            <Card label="Humidity" value={mainSensor.hum} unit="%" />
            <Card label="Indoor Temp" value={`${indoor.temp_in}°F / ${toCelsius(indoor.temp_in).toFixed(1)}°C`} unit="" />
            <Card label="Dew Point" value={`${mainSensor.dew_point}°F / ${toCelsius(mainSensor.dew_point).toFixed(1)}°C`} unit="" />
          </div>
        </section>

        {/* 🌤️ Weather Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">🌤️ Weather</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card label="UV Index" value={mainSensor.uv_index} unit="" />
            <Card label="Solar Radiation" value={mainSensor.solar_rad} unit="W/m²" icon={SunIcon} spin />
            <Card label="Rain (24h)" value={mainSensor.rainfall_last_24_hr} unit="in" />
            <Card label="Pressure" value={pressure.bar_sea_level} unit="inHg" />
          </div>
        </section>

        {/* 💨 Wind Column */}
        <section className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2 text-center">💨 Wind</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card label="Wind Speed (Last)" value={windSensor.wind_speed_last} unit="mph" icon={ArrowPathIcon} spin />
            <Card label="Wind Dir (Last)" value={windSensor.wind_dir_last} unit="°" icon={ArrowUpIcon} />
            <Card label="Wind Avg (10 min)" value={windSensor.wind_speed_avg_last_10_min} unit="mph" icon={ArrowPathIcon} spin />
            <Card label="Wind Gust (10 min)" value={windSensor.wind_speed_hi_last_10_min} unit="mph" icon={CloudIcon} />
          </div>
        </section>
      </div>
    </div>
  );
}
