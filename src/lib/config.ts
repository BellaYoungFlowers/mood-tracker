import { createContext, useContext } from "react";

export type YearlyData = Record<number, Record<number, Record<number, number>>>;

export type Config = {
  yearlyData: YearlyData;
};

const defaultConfig: Config = {
  yearlyData: {
    2024: {
      0: {
        0: 3,
      },
    },
  },
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
  setConfig: (config: Config) => void;
};

export const ConfigContext = createContext<ConfigContext>({
  config: defaultConfig,
  setConfig: () => {},
});

export function useConfig() {
  return useContext(ConfigContext);
}
