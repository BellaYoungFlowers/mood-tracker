import { ConfigProvider } from "./components/ConfigProvider";
import { MainTitle } from "./components/MainTitle";
import { MoodColorSelector } from "./components/MoodColorSelector";
import { CalendarList } from "./components/CalendarList";
import { Stats } from "./components/Stats";

function App() {
  return (
    <ConfigProvider>
      <main className="space-y-8 bg-white p-8 text-black dark:bg-black dark:text-white lg:p-16">
        <MainTitle />
        <Stats />
        <MoodColorSelector />
        <CalendarList />
      </main>
    </ConfigProvider>
  );
}

export default App;
