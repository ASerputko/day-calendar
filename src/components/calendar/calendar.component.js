import './calendar.component.scss';
import { Timings, Event } from '../index';

export const Calendar = (props) => {
  const { events } = props;
  const eventList = events.map((data) => `${Event(data)}`).join('');

  return (
    `<div class="calendar-container">
      ${Timings()}
      <div class="events">
        ${eventList}
      </div>
    </div>`
  );
};
