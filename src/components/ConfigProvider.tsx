import { type ReactNode, useState } from "react";
import {
  type Config,
  ConfigContext,
  loadConfig,
  saveConfig,
} from "../lib/config";

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState(() => loadConfig());

  function upsertConfigDayRating(
    year: number,
    month: number,
    day: number,
    rating: number
  ) {
    const newConfig: Config = structuredClone(config);
    if (!config.yearlyData[year]) {
      newConfig.yearlyData[year] = {
        [month]: {},
      };
    }
    if (config.yearlyData[year] && !config.yearlyData[year][month]) {
      newConfig.yearlyData[year][month] = {};
    }
    newConfig.yearlyData[year][month][day] = rating;
    setConfig(newConfig);
    saveConfig(newConfig);
  }

  function deleteConfigDayRating(year: number, month: number, day: number) {
    const newConfig: Config = structuredClone(config);
    if (!config.yearlyData[year] || !config.yearlyData[year][month]) {
      return;
    }
    delete newConfig.yearlyData[year][month][day];
    setConfig(newConfig);
    saveConfig(newConfig);
  }

  function updateConfigMoodColor(moodIndex: number, color: string) {
    const newConfig: Config = structuredClone(config);
    newConfig.moodData = config.moodData.map((data, i) =>
      i === moodIndex ? { ...data, color } : data
    );
    setConfig(newConfig);
    saveConfig(newConfig);
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
