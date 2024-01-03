export const moodRatingNumbers = [1, 2, 3, 4, 5] as const;

const moodRatingToBgColorMap: Record<number, string> = {
  0: "",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-sky-500",
  5: "bg-green-500",
};

export function moodRatingToBgColor(moodRating: number) {
  return moodRatingToBgColorMap[moodRating];
}

const moodRatingToMoodNameMap: Record<number, string> = {
  1: "Awful",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export function moodRatingToMoodName(moodRating: number) {
  return moodRatingToMoodNameMap[moodRating];
}
