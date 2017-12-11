import { App } from './App';
import './index.scss';
import { calendarService } from './services';

window.layOutDay = (events) => {
  /** Add events */
  calendarService.addEvents(events);

  /** Rerender calendar */
  document.getElementById('root').innerHTML = App();
};


const events = [
  {start: 30, end: 150},
  {start: 540, end: 600},
  {start: 560, end: 620},
  {start: 610, end: 670}
];

window.layOutDay(events);
