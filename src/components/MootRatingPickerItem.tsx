import { moodRatingToBgColor, moodRatingToMoodName } from "../lib/mood";

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
      )} flex-1 py-2 px-1 text-center font-semibold lg:cursor-pointer lg:hover:scale-105 transition-all`}
    >
      {moodRatingToMoodName(props.rating)}
    </div>
  );
}
