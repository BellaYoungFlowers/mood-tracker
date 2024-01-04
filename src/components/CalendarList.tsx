import { useState } from "react";
import { daysInMonth, monthNumberToName, monthNumbers } from "../lib/dates";
import { useConfig } from "../lib/config";
import { MoodSelector } from "./MoodSelector";

export function CalendarList() {
  const {
    config: { currentYear, currentMonth },
  } = useConfig();
  const [selectedItemId, setSelectedItemId] = useState(currentMonth);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {monthNumbers.map((month) => (
        <CalendarItem
          key={`${currentYear}-${month}`}
          year={currentYear}
          month={month}
          isSelected={selectedItemId === month}
          onClick={() => setSelectedItemId(month)}
        />
      ))}
    </div>
  );
}

type CalendarItemProps = {
  year: number;
  month: number;
  isSelected: boolean;
  onClick: () => void;
};

function CalendarItem(props: CalendarItemProps) {
  const { config, upsertConfigDayRating, deleteConfigDayRating } = useConfig();

  const numberOfDaysInMonth = daysInMonth(props.year, props.month);
  const dayNumberIndexes = [...Array(numberOfDaysInMonth).keys()];

  const dailyMoodRatings = (() => {
    if (
      props.year in config.yearlyData &&
      props.month in config.yearlyData[props.year]
    ) {
      return config.yearlyData[props.year][props.month];
    }
    return {};
  })();

  const [moodSelectorOpen, setMoodSelectorOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);

  function onClickCalendarDay(dayIndex: number) {
    setSelectedDayIndex(dayIndex);
    setMoodSelectorOpen(true);
  }

  function clearSelectedCalendarDay() {
    setSelectedDayIndex(-1);
    setMoodSelectorOpen(false);
  }

  function onSelectMoodForDay(rating: number) {
    clearSelectedCalendarDay();
    upsertConfigDayRating(props.year, props.month, selectedDayIndex, rating);
  }

  function onResetMoodForDay() {
    clearSelectedCalendarDay();
    deleteConfigDayRating(props.year, props.month, selectedDayIndex);
  }

  const title = `${monthNumberToName(props.month)} ${props.year}`;

  return (
    <div className="space-y-4" onClick={props.onClick}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayNumberIndexes.map((dayIndex) => {
          const moodRatingNumber = dailyMoodRatings[dayIndex] ?? null;
          let moodColor = "";
          if (moodRatingNumber !== null) {
            moodColor = config.moodData[moodRatingNumber].color;
          }
          const isActive = props.isSelected && dayIndex === selectedDayIndex;
          const isActiveStyles =
            "bg-black text-white dark:bg-white dark:text-black";

          return (
            <li
              key={dayIndex}
              onClick={() => onClickCalendarDay(dayIndex)}
              className={`aspect-square rounded p-1 font-bold lg:hover:scale-105 lg:hover:cursor-pointer lg:hover:bg-black lg:hover:text-white dark:lg:hover:bg-white dark:lg:hover:text-black ${
                isActive && isActiveStyles
              }`}
              style={{ backgroundColor: moodColor }}
            >
              <span>{dayIndex + 1}</span>
            </li>
          );
        })}
      </ol>

      {props.isSelected && (
        <MoodSelector
          open={moodSelectorOpen}
          onSelect={onSelectMoodForDay}
          onReset={onResetMoodForDay}
        />
      )}
    </div>
  );
}
