import { ConfigContext, loadConfig } from "./lib/config";
import { monthNumbers } from "./lib/dates";
import { moodRatingNumbers } from "./lib/mood";
import "./lib/logger";
import { Header } from "./components/Header";
import { MoodRatingLegendItem } from "./components/MoodRatingLegendItem";
import { MonthlyCalendar } from "./components/MonthlyCalendar";
import { useState } from "react";

function App() {
  const [config, setConfig] = useState(() => loadConfig());

  const year = new Date().getFullYear();

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <main className="bg-white dark:bg-black text-black dark:text-white space-y-8 p-8 lg:p-16">
        <Header />
        <div className="font-semibold space-y-4">
          <h2 className="text-2xl">Legend</h2>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-center">
            {moodRatingNumbers.map((rating) => (
              <MoodRatingLegendItem key={rating} rating={rating} />
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {monthNumbers.map((month) => (
            <MonthlyCalendar
              key={`${year}-${month}`}
              year={year}
              month={month}
            />
          ))}
        </div>
      </main>
    </ConfigContext.Provider>
  );
}

export default App;
