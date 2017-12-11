import './event.component.scss';

export const Event = (props) => {
  const { height, width, top, left } = props;

  return (
    `<div class="event" style="height: ${height}px; width: ${width}px; top: ${top}px; left: ${left}px;">
      <div class='event-title'>Sample Item</div>
      <div class='event-location'>Sample Location</div>
    </div>`
  );
};
