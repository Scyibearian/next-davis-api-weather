'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface WeatherGraphProps {
  metric: string;
  label: string;
  unit: string;
  defaultHours?: number; // optional prop for initial hours
}

export default function WeatherGraph({
  metric,
  label,
  unit,
  defaultHours = 24, // default fallback to 24 if not provided
}: WeatherGraphProps) {
  const [hours, setHours] = useState(defaultHours);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/weather/history?metric=${metric}&hours=${hours}`)
      .then(res => res.json())
      .then(json => {
        const formatted = json.readings.map((r: any) => ({
          time: new Date(r.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          value: r[metric],
        }));
        setData(formatted);
      });
  }, [metric, hours]);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      {/* Title */}
      <h2 className="font-semibold">{label} (last {hours === 168 ? 'week' : hours + 'h'})</h2>

      {/* Controls */}
      <div className="flex gap-2">
        {[1, 6, 24, 168].map(h => (
          <button
            key={h}
            onClick={() => setHours(h)}
            className={`px-3 py-1 rounded ${
              hours === h ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {h === 168 ? '1 Week' : `${h}h`}
          </button>
        ))}
      </div>

      {/* Graph */}
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis unit={unit} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
      </LineChart>
    </div>
  );
}
