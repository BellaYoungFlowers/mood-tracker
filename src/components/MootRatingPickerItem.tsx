import { moodRatingToBgColor } from "../lib/mood";

type MoodRatingPickerItemProps = {
  rating: number;
  onClick: () => void;
};

export function MoodRatingPickerItem(props: MoodRatingPickerItemProps) {
  return (
    <div
      key={props.rating}
      onClick={props.onClick}
      className={`${moodRatingToBgColor(
        props.rating
      )} flex-1 py-4 px-4 lg:cursor-pointer lg:hover:scale-105`}
    ></div>
  );
}
