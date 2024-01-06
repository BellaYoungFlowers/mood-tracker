import { type Config } from "./config";

/**
 * @param config
 * @returns An object whose keys are mood ratings and values are the frequency at which each mood
 * rating occurred.
 */
export function computeMoodRatingFrequency(config: Config) {
  const moodRatingFrequency: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  Object.values(config.yearlyData).map((months) => {
    Object.values(months).map((days) => {
      Object.values(days).reduce((acc, rating) => {
        acc[rating] += 1;
        return acc;
      }, moodRatingFrequency);
    });
  });
  return moodRatingFrequency;
}
