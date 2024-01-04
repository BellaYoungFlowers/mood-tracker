import { useConfig } from "../lib/config";

export function MoodColorSelector() {
  const { config, updateConfigMoodColor } = useConfig();

  return (
    <div className="space-y-4 font-semibold">
      <h2 className="text-2xl">Edit Colors</h2>
      <div className="flex items-center gap-2 text-center">
        {[...Array(config.moodData.length).keys()].map((rating, index) => (
          <MoodColorSelectorItem
            key={rating}
            rating={rating}
            onSelectColor={(color: string) =>
              updateConfigMoodColor(index, color)
            }
          />
        ))}
      </div>
    </div>
  );
}

type MoodColorSelectorItemProps = {
  rating: number;
  onSelectColor: (color: string) => void;
};

function MoodColorSelectorItem(props: MoodColorSelectorItemProps) {
  const { config } = useConfig();
  const { color: moodColor, name: moodName } = config.moodData[props.rating];

  return (
    <label
      className="flex-1 space-x-2 border-none px-1 py-2 text-center font-semibold lg:px-4 lg:hover:cursor-pointer"
      style={{ backgroundColor: moodColor }}
    >
      <span>{moodName}</span>
      <input
        key={props.rating}
        type="color"
        className="hidden"
        value={moodColor}
        onChange={(e) => props.onSelectColor(e.target.value)}
      />
    </label>
  );
}
