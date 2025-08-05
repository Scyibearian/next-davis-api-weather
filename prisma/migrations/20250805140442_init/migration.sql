-- CreateTable
CREATE TABLE "WeatherReading" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL,
    "temperatureC" REAL,
    "rainfallMM" REAL,
    "windSpeedKmh" REAL,
    "humidityPercent" REAL
);
