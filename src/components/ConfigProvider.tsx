import { ReactNode, useEffect, useState } from "react";
import {
  ConfigContext,
  MoodData,
  YearlyData,
  loadConfig,
  saveConfig,
} from "../lib/config";

export function ConfigProvider({ children }: { children: ReactNode }) {
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

  function updateConfigMoodColor(moodIndex: number, color: string) {
    const newData: MoodData = config.moodData.map((data, i) =>
      i === moodIndex ? { ...data, color } : data
    );
    setConfig({ ...config, moodData: newData });
  }

  return (
    <ConfigContext.Provider
      value={{
        config,
        upsertConfigDayRating,
        deleteConfigDayRating,
        updateConfigMoodColor,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
