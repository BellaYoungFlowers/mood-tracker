import { createContext, useContext } from "react";

export type YearlyData = Record<number, Record<number, Record<number, number>>>;

type Mood = { color: string; name: string };

export type MoodData = Array<Mood>;

export type Config = {
  yearlyData: YearlyData;
  moodData: MoodData;
};

const defaultConfig: Config = {
  yearlyData: {},
  moodData: [
    { color: "#ef4444", name: "Awful" },
    { color: "#f97316", name: "Bad" },
    { color: "#eab308", name: "Okay" },
    { color: "#0ea5e9", name: "Good" },
    { color: "#22c55e", name: "Great" },
  ],
};

const localStorageKey = "config";

export function saveConfig(config: Config) {
  try {
    const configString = JSON.stringify(config);
    localStorage.setItem(localStorageKey, configString);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn("Unable to save config into localStorage");
    }
  }
}

export function loadConfig(): Config {
  const configString = localStorage.getItem(localStorageKey);
  if (!configString) {
    console.warn(
      "Could not retrieve config from localStorage, falling back to default."
    );
    return defaultConfig;
  }

  let config: Config | null = null;
  try {
    config = JSON.parse(configString);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn(
        "Could not parse config from localStorage, falling back to default."
      );
      return defaultConfig;
    }
  }

  console.log("Loaded config:", config);
  return config as Config;
}

type ConfigContext = {
  config: Config;
  upsertConfigDayRating: (
    year: number,
    month: number,
    day: number,
    rating: number
  ) => void;
  deleteConfigDayRating: (year: number, month: number, day: number) => void;
  updateConfigMoodColor: (moodIndex: number, hexColor: string) => void;
};

export const ConfigContext = createContext<ConfigContext>({
  config: defaultConfig,
  upsertConfigDayRating: () => {},
  deleteConfigDayRating: () => {},
  updateConfigMoodColor: () => {},
});

export function useConfig() {
  return useContext(ConfigContext);
}
