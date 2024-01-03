import { moodRatingNumbers } from "../lib/mood";
import { MoodRatingPickerItem } from "./MootRatingPickerItem";

type MoodRatingPickerProps = {
  open: boolean;
  onPickRating: (rating: number) => void;
};

export function MoodRatingPicker(props: MoodRatingPickerProps) {
  if (!props.open) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      {moodRatingNumbers.map((rating) => (
        <MoodRatingPickerItem
          key={rating}
          rating={rating}
          onClick={() => props.onPickRating(rating)}
        />
      ))}
    </div>
  );
}
