import { ConfigProvider } from "./components/ConfigProvider";
import { MainTitle } from "./components/MainTitle";
import { MoodColorSelector } from "./components/MoodColorSelector";
import { CalendarList } from "./components/CalendarList";

function App() {
  return (
    <ConfigProvider>
      <main className="bg-white dark:bg-black text-black dark:text-white space-y-8 p-8 lg:p-16">
        <MainTitle />
        <MoodColorSelector />
        <CalendarList />
      </main>
    </ConfigProvider>
  );
}

export default App;
