import { moodRatingToBgColor, moodRatingToMoodName } from "../lib/mood";

type MoodRatingLegendItemProps = {
  rating: number;
};

export function MoodRatingLegendItem(props: MoodRatingLegendItemProps) {
  return (
    <div
      key={props.rating}
      className={`${moodRatingToBgColor(props.rating)} flex-1 py-2 px-4`}
    >
      {moodRatingToMoodName(props.rating)}
    </div>
  );
}
