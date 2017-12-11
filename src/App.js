import { Calendar } from './components';
import { calendarService } from './services';

export const App = () => {

  const events = calendarService.getEvents();
  return (
    `${Calendar({ events })}`
  );
};
