import { useConfig } from "../lib/config";

type MoodRatingPickerItemProps = {
  rating: number;
  onClick: () => void;
};

export function MoodRatingPickerItem(props: MoodRatingPickerItemProps) {
  const { config } = useConfig();

  const bgColor = config.moodData[props.rating].color;
  const moodName = config.moodData[props.rating].name;

  return (
    <div
      key={props.rating}
      onClick={props.onClick}
      className="flex-1 py-2 px-1 text-center font-semibold lg:cursor-pointer lg:hover:scale-105 transition-all"
      style={{ backgroundColor: bgColor }}
    >
      {moodName}
    </div>
  );
}
