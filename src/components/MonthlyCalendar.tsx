import { daysInMonth, monthNumberToName } from "../lib/dates";
import { moodRatingToBgColor } from "../lib/mood";
import { YearlyData, useConfig } from "../lib/config";
import { useState, useRef } from "react";
import { MoodRatingPicker } from "./MoodRatingPicker";

type MonthlyCalendarProps = {
  year: number;
  month: number;
};

export function MonthlyCalendar(props: MonthlyCalendarProps) {
  const { config, setConfig } = useConfig();

  const ratingPickerRef = useRef<HTMLDivElement>(null);

  const numDaysInMonth = daysInMonth(props.year, props.month);
  const dayIndexes = [...Array(numDaysInMonth).keys()];

  const [dailyMoodRatings, setDailyMoodRatings] = useState<
    Record<number, number>
  >(() => {
    if (
      props.year in config.yearlyData &&
      props.month in config.yearlyData[props.year]
    ) {
      return config.yearlyData[props.year][props.month];
    }
    return {};
  });

  const [ratingPickerOpen, setRatingPickerOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);

  function onPickCalendarDay(dayIndex: number) {
    setSelectedDayIndex(dayIndex);
    setRatingPickerOpen(true);
    if (ratingPickerRef.current) {
      ratingPickerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  function onPickRating(rating: number) {
    setDailyMoodRatings((prev) => ({ ...prev, [selectedDayIndex]: rating }));
    setRatingPickerOpen(false);
    setSelectedDayIndex(-1);

    const newData: YearlyData = { ...config.yearlyData };
    if (!config.yearlyData[props.year]) {
      newData[props.year] = {
        [props.month]: {},
      };
    }
    if (
      config.yearlyData[props.year] &&
      !config.yearlyData[props.year][props.month]
    ) {
      newData[props.year][props.month] = {};
    }
    newData[props.year][props.month][selectedDayIndex] = rating;
    setConfig({ ...config, yearlyData: newData });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        {monthNumberToName(props.month)} {props.year}
      </h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayIndexes.map((dayIndex) => {
          const moodRating = dailyMoodRatings[dayIndex] ?? null;
          const bgColor = (moodRating && moodRatingToBgColor(moodRating)) ?? "";
          const isActive = dayIndex === selectedDayIndex;
          const isActiveStyles =
            "bg-black text-white dark:bg-white dark:text-black";

          return (
            <li
              key={dayIndex}
              onClick={() => onPickCalendarDay(dayIndex)}
              className={`${bgColor} aspect-square font-bold  p-1 lg:hover:cursor-pointer lg:hover:scale-105 dark:lg:hover:bg-white dark:lg:hover:text-black lg:hover:bg-black lg:hover:text-white ${
                isActive && isActiveStyles
              }`}
            >
              <span>{dayIndex + 1}</span>
            </li>
          );
        })}
      </ol>
      <div ref={ratingPickerRef}>
        <MoodRatingPicker open={ratingPickerOpen} onPickRating={onPickRating} />
      </div>
    </div>
  );
}
