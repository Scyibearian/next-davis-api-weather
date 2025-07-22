'use client';

import { Card } from '@/components/Card';
import { SunIcon, ArrowPathIcon, ArrowUpIcon, CloudIcon } from '@heroicons/react/24/outline';

const mockData = {
  mainSensor: { temp: 75.7, hum: 100, dew_point: 75.7, uv_index: 2.9, solar_rad: 336, rainfall_last_24_hr: 0 },
  indoor: { temp_in: 84.5 },
  pressure: { bar_sea_level: 30.116 },
  windSensor: {
    wind_speed_last: 2,
    wind_dir_last: 185,
    wind_speed_avg_last_10_min: 2.5,
    wind_speed_hi_last_10_min: 8,
  },
};

export default function Home() {
  const { mainSensor, indoor, pressure, windSensor } = mockData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">🌤️ Stone Lane Weather</h1>
        <div className="grid grid-cols-3 gap-6">
          <Card label="Outdoor Temp" value={mainSensor.temp} unit="°F" />
          <Card label="Humidity" value={mainSensor.hum} unit="%" />
          <Card label="Dew Point" value={mainSensor.dew_point} unit="°F" />
          <Card label="UV Index" value={mainSensor.uv_index} unit="" />
          <Card label="Solar Radiation" value={mainSensor.solar_rad} unit="W/m²" icon={SunIcon} spin />
          <Card label="Rain (24h)" value={mainSensor.rainfall_last_24_hr} unit="in" />
          <Card label="Indoor Temp" value={indoor.temp_in} unit="°F" />
          <Card label="Pressure" value={pressure.bar_sea_level} unit="inHg" />
          <Card label="Wind Speed (Last)" value={windSensor.wind_speed_last} unit="mph" icon={ArrowPathIcon} spin />
          <Card label="Wind Dir (Last)" value={windSensor.wind_dir_last} unit="°" icon={ArrowUpIcon} />
          <Card label="Wind Avg (10 min)" value={windSensor.wind_speed_avg_last_10_min} unit="mph" icon={ArrowPathIcon} spin />
          <Card label="Wind Gust (10 min)" value={windSensor.wind_speed_hi_last_10_min} unit="mph" icon={CloudIcon} />
        </div>
      </div>
    </div>
  );
}
