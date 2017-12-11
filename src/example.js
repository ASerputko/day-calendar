var calendarmatrix = []

for ( var s1 = 0, s2 = 720; s1 <= s2; s1++) {
  calendarmatrix[s1] = [];
}

const getMinutesList = (start, stop) => {
  let minutes = []
  for ( var m1 = start, m2 = stop; m1 <= m2; m1++) {
    minutes = minutes.concat(m1);
  }

  return minutes;
}  

const savedEvents = [];

const addEvent = (event, eventId) => {
  const minutes = getMinutesList(event.start, event.end);

  minutes.forEach((minute) => {
    const row = calendarmatrix[minute]
    const rowIndex = row.findIndex((el) => el === undefined);
    if (rowIndex !== -1) {
      calendarmatrix[minute][rowIndex] = eventId;
    } else {
      calendarmatrix[minute] = calendarmatrix[minute].concat(eventId);
    }
  });
  savedEvents.push(event)
  savedEvents.forEach((event, eventId) => updateCalendar(event, eventId));
}

const updateCalendar = (event, eventId) => {
  var rows = calendarmatrix.filter((row) => row.findIndex((el) => el === eventId ) !== -1);
  var columns = rows.map((row) => row.length);

  var maxColumns = Math.max.apply(null, columns);
  var maxColumnIndex = columns.findIndex((c) => c === maxColumns);
  var position = rows[maxColumnIndex].findIndex((el) => el === eventId);


  const minutes = getMinutesList(event.start, event.end);
  var newRow = []
  for (var a = 0; a < maxColumns; a++) {
    newRow[a] = undefined;
  }
  newRow[position] = eventId;

  
  minutes.forEach((minute) => {
    calendarmatrix[minute] = newRow.map((el, i) => {
      return el !== undefined ? el : (calendarmatrix[minute][i] === eventId ? undefined : calendarmatrix[minute][i]);
    })
  });

  console.log('eventId', eventId);
  console.log('maxColumns', maxColumns);
  console.log('position', position);
}

events = [{start: 30, end: 90}, {start: 30, end: 520}, {start: 30, end: 120}, {start: 300, end: 520}];
events.forEach((event, eventId) => addEvent(event, eventId));
