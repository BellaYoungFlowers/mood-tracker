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
      className="flex-1 py-2 px-1 text-center font-semibold lg:cursor-pointer lg:hover:scale-105 transition-all"
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
      className="font-semibold bg-red-600 text-white w-full py-2 lg:hover:scale-105 transition-all"
      onClick={props.onClick}
    >
      Reset rating
    </button>
  );
}
