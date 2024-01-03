import { useConfig } from "../lib/config";

type MoodRatingLegendItemProps = {
  rating: number;
  onChangeColor: (color: string) => void;
};

export function MoodRatingLegendItem(props: MoodRatingLegendItemProps) {
  const { config } = useConfig();

  const bgColor = config.moodData[props.rating].color;
  const moodName = config.moodData[props.rating].name;

  return (
    <label
      className="space-x-2 flex-1 font-semibold text-center py-2 px-1 lg:px-4 border-none lg:hover:cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <span>{moodName}</span>
      <input
        key={props.rating}
        type="color"
        className="hidden"
        value={bgColor}
        onChange={(e) => props.onChangeColor(e.target.value)}
      />
    </label>
  );
}
