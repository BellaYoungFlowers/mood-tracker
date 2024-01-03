import { daysInMonth, monthNumberToName } from "../lib/dates";
import { useConfig } from "../lib/config";
import { useState } from "react";
import { MoodRatingPicker } from "./MoodRatingPicker";

type MonthlyCalendarProps = {
  year: number;
  month: number;
};

export function MonthlyCalendar(props: MonthlyCalendarProps) {
  const { config, upsertConfigDayRating, deleteConfigDayRating } = useConfig();

  const numDaysInMonth = daysInMonth(props.year, props.month);
  const dayIndexes = [...Array(numDaysInMonth).keys()];

  const dailyMoodRatings = (() => {
    if (
      props.year in config.yearlyData &&
      props.month in config.yearlyData[props.year]
    ) {
      return config.yearlyData[props.year][props.month];
    }
    return {};
  })();

  const [ratingPickerOpen, setRatingPickerOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);

  function onPickCalendarDay(dayIndex: number) {
    setSelectedDayIndex(dayIndex);
    setRatingPickerOpen(true);
  }

  function clearSelectedState() {
    setSelectedDayIndex(-1);
    setRatingPickerOpen(false);
  }

  function onPickRating(rating: number) {
    clearSelectedState();
    upsertConfigDayRating(props.year, props.month, selectedDayIndex, rating);
  }

  function onClearRating() {
    clearSelectedState();
    deleteConfigDayRating(props.year, props.month, selectedDayIndex);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        {monthNumberToName(props.month)} {props.year}
      </h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayIndexes.map((dayIndex) => {
          const moodRating = dailyMoodRatings[dayIndex] ?? null;
          let bgColor = "";
          if (moodRating !== null) {
            bgColor = config.moodData[moodRating].color;
          }
          const isActive = dayIndex === selectedDayIndex;
          const isActiveStyles =
            "bg-black text-white dark:bg-white dark:text-black";

          return (
            <li
              key={dayIndex}
              onClick={() => onPickCalendarDay(dayIndex)}
              className={`aspect-square font-bold  p-1 lg:hover:cursor-pointer lg:hover:scale-105 dark:lg:hover:bg-white dark:lg:hover:text-black lg:hover:bg-black lg:hover:text-white ${
                isActive && isActiveStyles
              }`}
              style={{ backgroundColor: bgColor }}
            >
              <span>{dayIndex + 1}</span>
            </li>
          );
        })}
      </ol>
      <div className="space-y-2">
        <MoodRatingPicker open={ratingPickerOpen} onPickRating={onPickRating} />
        {ratingPickerOpen && (
          <button
            className="font-semibold bg-red-600 text-white w-full py-2 lg:hover:scale-105 transition-all"
            onClick={onClearRating}
          >
            Clear rating
          </button>
        )}
      </div>
    </div>
  );
}
