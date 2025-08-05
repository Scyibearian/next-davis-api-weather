// src/lib/weather-utils.ts
export async function getWeatherFromStation() {
  //const url = 'http://192.168.10.231/v1/current_conditions';
  //const res = await fetch(url);
  const res = await fetch('http://192.168.10.231/v1/current_conditions');


  if (!res.ok) {
    throw new Error(`Weather station fetch failed: ${res.statusText}`);
  }

  const json = await res.json();
  const conditions = json.data.conditions;

  // Find sensors by txid or data_structure_type
  const mainSensor = conditions.find((d: any) => d.txid === 1);
  const indoor = conditions.find((d: any) => d.data_structure_type === 4);
  const pressure = conditions.find((d: any) => d.data_structure_type === 3);
  const windSensor = conditions.find((d: any) => d.txid === 6);

  // Helper: Fahrenheit → Celsius
  const toCelsius = (f: number) => ((f - 32) * 5) / 9;

  return {
    // Outdoor
    outdoorTempC: mainSensor?.temp ? toCelsius(mainSensor.temp) : null,
    outdoorTempF: mainSensor?.temp ?? null,
    humidityPercent: mainSensor?.hum ?? null,
    dewPointC: mainSensor?.dew_point ? toCelsius(mainSensor.dew_point) : null,
    dewPointF: mainSensor?.dew_point ?? null,

    // Indoor
    indoorTempC: indoor?.temp_in ? toCelsius(indoor.temp_in) : null,
    indoorTempF: indoor?.temp_in ?? null,

    //Rain
    rainfall24hIn:
      mainSensor?.rainfall_last_24_hr !== null && mainSensor?.rainfall_last_24_hr !== undefined
        ? mainSensor.rainfall_last_24_hr
        : null,
    rainfall24hMM:
      mainSensor?.rainfall_last_24_hr !== null && mainSensor?.rainfall_last_24_hr !== undefined
        ? mainSensor.rainfall_last_24_hr * 25.4
        : null,


    // UV & Solar
    uvIndex: mainSensor?.uv_index ?? null,
    solarRadiation: mainSensor?.solar_rad ?? null, // W/m²

    // Pressure
    pressureInHg: pressure?.bar_sea_level ?? null,
    pressurehPa: pressure?.bar_sea_level
      ? pressure.bar_sea_level * 33.8639
      : null,

    // Wind
    windSpeedMph: windSensor?.wind_speed_last ?? null,
    windSpeedKmh: windSensor?.wind_speed_last
      ? windSensor.wind_speed_last * 1.60934
      : null,
    windDirDeg: windSensor?.wind_dir_last ?? null,
    windAvgMph: windSensor?.wind_speed_avg_last_10_min ?? null,
    windGustMph: windSensor?.wind_speed_hi_last_10_min ?? null,

    // Raw data (optional for debugging)
    rawConditions: conditions
  };
}
