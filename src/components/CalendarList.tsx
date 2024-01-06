import { type KeyboardEvent, useState } from "react";
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
          onPressEnter={() => setSelectedItemId(month)}
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
  onPressEnter: () => void;
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

  function onPressEnter(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      props.onPressEnter();
    }
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
    <div
      className="space-y-4"
      onClick={props.onClick}
      tabIndex={0}
      onKeyDown={(e) => onPressEnter(e)}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayNumberIndexes.map((dayIndex) => {
          const moodRatingNumber = dailyMoodRatings[dayIndex] ?? null;
          let moodColor = "";
          if (moodRatingNumber !== null) {
            moodColor = config.moodData[moodRatingNumber].color;
          }
          const isActive = props.isSelected && dayIndex === selectedDayIndex;
          const isActiveStyles = "text-black";

          return (
            <li
              key={dayIndex}
              onClick={() => onClickCalendarDay(dayIndex)}
              className={`aspect-square rounded p-1 font-bold lg:hover:scale-105 lg:hover:cursor-pointer lg:hover:bg-white lg:hover:text-black ${
                isActive && isActiveStyles
              }`}
              style={{ backgroundColor: isActive ? "#ffffff" : moodColor }}
              tabIndex={0}
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
