import "./lib/logger";
import {
  ConfigContext,
  YearlyData,
  loadConfig,
  saveConfig,
} from "./lib/config";
import { getCurrentYearNumber, monthNumbers } from "./lib/dates";
import { moodRatingNumbers } from "./lib/mood";
import { Header } from "./components/Header";
import { MoodRatingLegendItem } from "./components/MoodRatingLegendItem";
import { MonthlyCalendar } from "./components/MonthlyCalendar";
import { useEffect, useState } from "react";

const year = getCurrentYearNumber();

function App() {
  const [config, setConfig] = useState(() => loadConfig());

  /* Save config whenever it changes */
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  /**
   *
   * @param year Year number
   * @param month 0-indexed month from 0 (January) to 11 (December)
   * @param day 0-index day of month
   * @param rating Mood rating
   */
  function upsertConfigDayRating(
    year: number,
    month: number,
    day: number,
    rating: number
  ) {
    const newData: YearlyData = { ...config.yearlyData };
    if (!config.yearlyData[year]) {
      newData[year] = {
        [month]: {},
      };
    }
    if (config.yearlyData[year] && !config.yearlyData[year][month]) {
      newData[year][month] = {};
    }
    newData[year][month][day] = rating;
    setConfig({ ...config, yearlyData: newData });
  }

  function deleteConfigDayRating(year: number, month: number, day: number) {
    const newData: YearlyData = { ...config.yearlyData };
    if (!config.yearlyData[year] || !config.yearlyData[year][month]) {
      return;
    }
    delete newData[year][month][day];
    setConfig({ ...config, yearlyData: newData });
  }

  return (
    <ConfigContext.Provider
      value={{ config, upsertConfigDayRating, deleteConfigDayRating }}
    >
      <main className="bg-white dark:bg-black text-black dark:text-white space-y-8 p-8 lg:p-16">
        <Header />
        <div className="font-semibold space-y-4">
          <h2 className="text-2xl">Legend</h2>
          <div className="flex items-center gap-2 text-center">
            {moodRatingNumbers.map((rating) => (
              <MoodRatingLegendItem key={rating} rating={rating} />
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {monthNumbers.map((month) => (
            <MonthlyCalendar
              key={`${year}-${month}`}
              year={year}
              month={month}
            />
          ))}
        </div>
      </main>
    </ConfigContext.Provider>
  );
}

export default App;
