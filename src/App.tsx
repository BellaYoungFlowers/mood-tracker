import { daysInMonth, monthNumberToName, monthNumbers } from "./lib/dates";

const now = new Date();
const year = now.getFullYear();

const dayRatingToBgColor: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-sky-500",
  5: "bg-green-500",
};

function App() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white space-y-8 p-8 lg:p-16">
      <h1 className="text-4xl font-bold mb-2">Mood Tracker</h1>
      <small>
        Made by{" "}
        <a
          href="https://kevinjero.me"
          rel="noreferrer noopener"
          target="_blank"
          className="underline"
        >
          Kevin Jerome
        </a>
      </small>
      <div className="font-semibold space-y-4">
        <h2 className="text-2xl">Legend</h2>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-center">
          <div className={`${dayRatingToBgColor[1]} flex-1 py-2 px-4`}>
            Awful
          </div>
          <div className={`${dayRatingToBgColor[2]} flex-1 py-2 px-4`}>Bad</div>
          <div className={`${dayRatingToBgColor[3]} flex-1 py-2 px-4`}>Ok</div>
          <div className={`${dayRatingToBgColor[4]} flex-1 py-2 px-4`}>
            Good
          </div>
          <div className={`${dayRatingToBgColor[5]} flex-1 py-2 px-4`}>
            Great
          </div>
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {monthNumbers.map((month) => (
          <MonthlyCalendar year={year} month={month} />
        ))}
        d
      </div>
    </div>
  );
}

export default App;

type UserData = Record<number, Record<number, number[]>>;

const userData: UserData = {
  // Year
  2024: {
    // Month: [Day 0, Day 1, Day, 2, ...]
    0: [1, 2, 3, 4, 5],
  },
};

type MonthlyCalendarProps = {
  year: number;
  month: number;
};

function MonthlyCalendar(props: MonthlyCalendarProps) {
  const numDays = daysInMonth(props.year, props.month);
  const dayIndexes = [...Array(numDays).keys()];

  const dailyData = userData[props.year][props.month];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        {monthNumberToName(props.month)} {props.year}
      </h3>
      <ol className="grid grid-cols-7 gap-2">
        {dayIndexes.map((day) => {
          const dayRating = (Boolean(dailyData) && dailyData.at(day)) ?? null;
          const dayRatingBgColor =
            (dayRating && dayRatingToBgColor[dayRating]) ?? "";

          return (
            <li
              key={day}
              className={`${dayRatingBgColor} aspect-square font-bold  p-1 lg:hover:cursor-pointer lg:hover:scale-105 dark:lg:hover:bg-white dark:lg:hover:text-black lg:hover:bg-black lg:hover:text-white`}
            >
              <span>{day + 1}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
