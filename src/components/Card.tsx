import React from 'react';
import { IconType } from 'react-icons';

type CardProps = {
  label: string;
  value: number | string | null | undefined;
  unit: string;
  icon?: IconType;
  spin?: boolean;
};

export const Card: React.FC<CardProps> = ({ label, value, unit, icon: Icon, spin = false }) => (
  <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center">
    {Icon && (
      <Icon className={`h-6 w-6 text-blue-400 mb-1 ${spin ? 'animate-spin-slow' : ''}`} />
    )}
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold text-blue-600">
      {value} <span className="text-sm">{unit}</span>
    </p>
  </div>
);
