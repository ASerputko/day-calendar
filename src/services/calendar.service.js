class CalendarService {

  constructor() {
    this.events = [];
    this.calendarMatrix = [];
  }

  getEvents() {
    return this.events;
  }

  /**
   * Add events to calendar.
   * @params {array} events
   */
  addEvents(events) {
    this.resetEvents();
    this.resetCalendarMatrix();

    const sortedEvents = this.sortEventsByStart(events);
    sortedEvents.forEach((event, id) => this.addEvent(Object.assign({}, event, {id: id})));
  }

  /**
   * Add event to calendar.
   * @params {object} event
   */
  addEvent(event) {
    const scheduledMinuteRange = getMinuteRange(event.start, event.end);
    scheduledMinuteRange.forEach((minute) => {
      const row = this.calendarMatrix[minute];
      const rowIndex = row.findIndex((value) => value === undefined);
      if (rowIndex !== -1) {
        this.calendarMatrix[minute][rowIndex] = event.id;
      } else {
        this.calendarMatrix[minute] = this.calendarMatrix[minute].concat(event.id);
      }
    });
    this.events = this.events.concat(event);
    this.events.forEach((event) => this.recalculateCalendarMatrix(event));
  }

  recalculateCalendarMatrix(event) {
    const rows = this.calendarMatrix.filter((row) => row.findIndex((eventId) => eventId === event.id) !== -1);
    const columns = rows.map((row) => row.length);
    const maxColumns = Math.max.apply(null, columns);
    const maxColumnIndex = columns.findIndex((c) => c === maxColumns);
    const position = rows[maxColumnIndex].findIndex((eventId) => eventId === event.id);
    const minutes = getMinuteRange(event.start, event.end);

    let newRow = [];
    for (let i = 0, j = maxColumns; i < j; i++) {
      newRow[i] = undefined;
    }
    newRow[position] = event.id;
    
    minutes.forEach((minute) => {
      this.calendarMatrix[minute] = newRow.map((value, index) => {
        return value !== undefined ?
          value : (this.calendarMatrix[minute][index] === event.id ? undefined : this.calendarMatrix[minute][index]);
      });
    });

    this.events[event.id] = Object.assign({}, event, {
      height: event.end - event.start,
      width: 600 / maxColumns,
      top: event.start,
      left: (position * 600 / maxColumns) + 10
    });
  }

  /**
   * Reset list of events
   */
  resetEvents() {
    this.events = [];
  }

  /**
   * Reset calendar matrix
   */
  resetCalendarMatrix() {
    this.calendarMatrix = [];
    for (let i = 0, j = 720; i <= j; i++) {
      this.calendarMatrix[i] = [];
    }
  }

  /**
   * Sort events by start value
   */
  sortEventsByStart(events) {
    return events.sort(function (a,b) {
      if (a.start < b.start)
        return -1;
      if (a.start > b.start)
        return 1;
      return 0;
    });
  }
}

const getMinuteRange = (start, end) => {
  let minutes = [];
  for (let i = start, j = end; i <= j; i++) {
    minutes = minutes.concat(i);
  }
  return minutes;
};

const calendarService = new CalendarService();

export { calendarService };
