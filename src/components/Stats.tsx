import { useConfig } from "../lib/config";
import { computeMoodRatingFrequency } from "../lib/stats";

export function Stats() {
  const { config } = useConfig();
  const moodRatingFrequency = computeMoodRatingFrequency(config);

  return (
    <div className="space-y-4 font-semibold">
      <h2 className="text-2xl">Stats</h2>
      <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center">
        {Object.entries(moodRatingFrequency).map(([rating, freq]) => {
          const { color: moodColor, name: moodName } =
            config.moodData[parseInt(rating, 10)];
          return (
            <div
              key={rating}
              className="rounded p-2 font-semibold lg:px-4"
              style={{ backgroundColor: moodColor }}
            >
              {moodName} days: {freq}
            </div>
          );
        })}
      </div>
    </div>
  );
}
