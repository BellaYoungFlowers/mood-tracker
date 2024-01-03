import { daysInMonth, monthNumberToName } from "../lib/dates";
import { moodRatingToBgColor } from "../lib/mood";
import { useConfig } from "../lib/config";

type MonthlyCalendarProps = {
  year: number;
  month: number;
};

export function MonthlyCalendar(props: MonthlyCalendarProps) {
  const { config } = useConfig();

  const numDays = daysInMonth(props.year, props.month);
  const dayIndexes = [...Array(numDays).keys()];

  const hasMonthlyData =
    props.year in config.yearlyData &&
    props.month in config.yearlyData[props.year];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        {monthNumberToName(props.month)} {props.year}
      </h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayIndexes.map((day) => {
          const moodRating =
            (hasMonthlyData &&
              config.yearlyData[props.year][props.month].at(day)) ??
            null;
          const bgColor = (moodRating && moodRatingToBgColor(moodRating)) ?? "";

          return (
            <li
              key={day}
              className={`${bgColor} aspect-square font-bold  p-1 lg:hover:cursor-pointer lg:hover:scale-105 dark:lg:hover:bg-white dark:lg:hover:text-black lg:hover:bg-black lg:hover:text-white`}
            >
              <span>{day + 1}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
