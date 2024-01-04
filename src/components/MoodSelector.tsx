import { useConfig } from "../lib/config";

type MoodSelectorProps = {
  open: boolean;
  onSelect: (rating: number) => void;
  onReset: () => void;
};

export function MoodSelector(props: MoodSelectorProps) {
  const { config } = useConfig();

  if (!props.open) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-2 ">
        {[...Array(config.moodData.length).keys()].map((rating) => (
          <MoodSelectorItem
            key={rating}
            rating={rating}
            onClick={() => props.onSelect(rating)}
          />
        ))}
      </div>
      <MoodResetButton onClick={props.onReset} />
    </div>
  );
}

type MoodSelectorItemProps = {
  rating: number;
  onClick: () => void;
};

function MoodSelectorItem(props: MoodSelectorItemProps) {
  const { config } = useConfig();
  const { color: moodColor, name: moodName } = config.moodData[props.rating];

  return (
    <div
      key={props.rating}
      onClick={props.onClick}
      className="flex-1 rounded px-1 py-2 text-center font-semibold transition-all lg:cursor-pointer lg:hover:scale-105"
      style={{ backgroundColor: moodColor }}
    >
      {moodName}
    </div>
  );
}

type MoodResetButtonProps = {
  onClick: () => void;
};

function MoodResetButton(props: MoodResetButtonProps) {
  return (
    <button
      className="w-full rounded bg-red-600 py-2 font-semibold text-white transition-all lg:hover:scale-105"
      onClick={props.onClick}
    >
      Reset rating
    </button>
  );
}
