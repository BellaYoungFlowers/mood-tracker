import { moodRatingToBgColor, moodRatingToMoodName } from "../lib/mood";

type MoodRatingLegendItemProps = {
  rating: number;
};

export function MoodRatingLegendItem(props: MoodRatingLegendItemProps) {
  return (
    <div
      key={props.rating}
      className={`${moodRatingToBgColor(
        props.rating
      )} flex-1 font-semibold text-center py-2 px-1 lg:px-4`}
    >
      {moodRatingToMoodName(props.rating)}
    </div>
  );
}
