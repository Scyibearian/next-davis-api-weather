import { prisma } from './prisma';
import { getWeatherFromStation } from './weather-utils';

let isLoggingStarted = false;

export async function startWeatherLogging() {
    if (isLoggingStarted) {
        console.log('Weather logging already started, skipping...');
        return;
    }

    isLoggingStarted = true;
    console.log('Starting weather logging every 5 minutes at', new Date().toISOString());

    //Log weather immediately on start
    await logWeatherOnce();

    //Then continue every 5 minutes
    setInterval(logWeatherOnce, 5 * 60 * 1000);
}

//Extracted to a reusable function
async function logWeatherOnce() {
    try {
        const data = await getWeatherFromStation();

        await prisma.weatherReading.create({
            data: {
                timestamp: new Date(),
                outdoorTempC: data.outdoorTempC ?? 0,
                outdoorTempF: data.outdoorTempF ?? 0,
                humidityPercent: data.humidityPercent ?? 0,
                dewPointC: data.dewPointC ?? 0,
                dewPointF: data.dewPointF ?? 0,
                indoorTempC: data.indoorTempC ?? 0,
                indoorTempF: data.indoorTempF ?? 0,
                rainfall24hIn: data.rainfall24hIn ?? 0,
                rainfall24hMM: data.rainfall24hMM ?? 0,
                uvIndex: data.uvIndex ?? 0,
                solarRadiation: data.solarRadiation ?? 0,
                pressureInHg: data.pressureInHg ?? 0,
                pressurehPa: data.pressurehPa ?? 0,
                windSpeedMph: data.windSpeedMph ?? 0,
                windSpeedKmh: data.windSpeedKmh ?? 0,
                windDirDeg: data.windDirDeg ?? 0,
                windAvgMph: data.windAvgMph ?? 0,
                windGustMph: data.windGustMph ?? 0
            },
        });

        console.log('Weather data logged:', data, 'at',  new Date().toISOString()); //Output logged data for debug
    } catch (err) {
        console.error('Error logging weather:', err);
    }
}
