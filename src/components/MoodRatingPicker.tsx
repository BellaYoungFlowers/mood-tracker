import { useConfig } from "../lib/config";
import { MoodRatingPickerItem } from "./MootRatingPickerItem";

type MoodRatingPickerProps = {
  open: boolean;
  onPickRating: (rating: number) => void;
};

export function MoodRatingPicker(props: MoodRatingPickerProps) {
  const { config } = useConfig();

  if (!props.open) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      {[...Array(config.moodData.length).keys()].map((rating) => (
        <MoodRatingPickerItem
          key={rating}
          rating={rating}
          onClick={() => props.onPickRating(rating)}
        />
      ))}
    </div>
  );
}
