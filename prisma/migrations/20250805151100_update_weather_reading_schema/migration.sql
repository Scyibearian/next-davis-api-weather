/*
  Warnings:

  - You are about to drop the column `rainfallMM` on the `WeatherReading` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureC` on the `WeatherReading` table. All the data in the column will be lost.
  - Added the required column `dewPointC` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dewPointF` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indoorTempC` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indoorTempF` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outdoorTempC` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outdoorTempF` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressureInHg` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressurehPa` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rainfall24hIn` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rainfall24hMM` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solarRadiation` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uvIndex` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windAvgMph` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windDirDeg` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windGustMph` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windSpeedMph` to the `WeatherReading` table without a default value. This is not possible if the table is not empty.
  - Made the column `humidityPercent` on table `WeatherReading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `windSpeedKmh` on table `WeatherReading` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeatherReading" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outdoorTempC" REAL NOT NULL,
    "outdoorTempF" REAL NOT NULL,
    "humidityPercent" REAL NOT NULL,
    "dewPointC" REAL NOT NULL,
    "dewPointF" REAL NOT NULL,
    "indoorTempC" REAL NOT NULL,
    "indoorTempF" REAL NOT NULL,
    "rainfall24hIn" REAL NOT NULL,
    "rainfall24hMM" REAL NOT NULL,
    "uvIndex" REAL NOT NULL,
    "solarRadiation" REAL NOT NULL,
    "pressureInHg" REAL NOT NULL,
    "pressurehPa" REAL NOT NULL,
    "windSpeedMph" REAL NOT NULL,
    "windSpeedKmh" REAL NOT NULL,
    "windDirDeg" REAL NOT NULL,
    "windAvgMph" REAL NOT NULL,
    "windGustMph" REAL NOT NULL
);
INSERT INTO "new_WeatherReading" ("humidityPercent", "id", "timestamp", "windSpeedKmh") SELECT "humidityPercent", "id", "timestamp", "windSpeedKmh" FROM "WeatherReading";
DROP TABLE "WeatherReading";
ALTER TABLE "new_WeatherReading" RENAME TO "WeatherReading";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
