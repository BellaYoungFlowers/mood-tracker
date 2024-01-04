import { type KeyboardEvent, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { color: moodColor, name: moodName } = config.moodData[props.rating];

  function onPressEnter(e: KeyboardEvent<HTMLLabelElement>) {
    if (!inputRef.current) {
      return;
    }
    if (e.key === "Enter") {
      inputRef.current.click();
    }
  }

  return (
    <label
      className="flex-1 rounded p-1 text-center font-semibold transition-all lg:px-4 lg:py-2 lg:hover:scale-105 lg:hover:cursor-pointer"
      style={{ backgroundColor: moodColor }}
      tabIndex={0}
      onKeyDown={(e) => onPressEnter(e)}
    >
      <span>{moodName}</span>
      <input
        ref={inputRef}
        type="color"
        className="hidden"
        value={moodColor}
        onChange={(e) => props.onSelectColor(e.target.value)}
      />
    </label>
  );
}
