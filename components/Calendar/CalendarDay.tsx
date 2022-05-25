import { useSchoolCalendar } from "../../utils/Hooks/useSchoolICAL";
import { CalendarEvent } from "./CalendarEvent";

export const CalendarDay = (props: {
  day: number;
  month: number;
  year: number;
}) => {
  const cal = useSchoolCalendar();
  if (!cal) return null;
  const { day, month, year } = props;
  const today = new Date();
  const isToday =
    today.getMonth() === month &&
    today.getFullYear() === year &&
    today.getDate() === day;
  // assuming cal.events is sorted by start date (ascending), find the first event that starts on this day and last event that starts on this day
  // const firstEvent = cal.events.findIndex((event) => {
  //   const year = Number(event.dtstart.value.substring(0, 4));
  //   const month = Number(event.dtstart.value.substring(4, 6));
  //   const day = Number(event.dtstart.value.substring(6, 8));
  //   return (
  //     year === props.year &&
  //     month === (props.month) % 12 &&
  //     day === props.day
  //   );
  // });
  // const lastEvent = cal.events.reverse().findIndex((event) => {
  //   const year = Number(event.dtstart.value.substring(0, 4));
  //   const month = Number(event.dtstart.value.substring(4, 6));
  //   const day = Number(event.dtstart.value.substring(6, 8));

  //   return (
  //     year === props.year &&
  //     month === (props.month) % 12 &&
  //     day === props.day
  //   );
  // });
  // console.log(firstEvent, cal.events[firstEvent]?.dtstart, year, month, day);
  // const events = cal.events.slice(firstEvent, cal.events.length - lastEvent);
  const firstEvent = cal.events.findIndex((event, i) => {
    const year = Number(event.dtstart.value.substring(0, 4));
    const month = Number(event.dtstart.value.substring(4, 6));
    const day = Number(event.dtstart.value.substring(6, 8));
    return (
      year === props.year &&
      month === (props.month + 1) % 12 &&
      day === props.day
    );
  });
  const rev = [...cal.events].reverse();
  const lastEvent =
    cal.events.length -
    rev.findIndex((event, i) => {
      const year = Number(event.dtstart.value.substring(0, 4));
      const month = Number(event.dtstart.value.substring(4, 6));
      const day = Number(event.dtstart.value.substring(6, 8));
      return (
        year === props.year &&
        month === (props.month + 1) % 12 &&
        day === props.day
      );
    });
  const events = cal.events.slice(firstEvent, lastEvent);
  // console.log(cal, events, day, month, year);
  return (
    <div
      className={`col-span-1 row-span-1 flex flex-col gap-2 overflow-auto items-start border border-collapse dark:border-gray-650/20 h-48 dark:text-gray-200`}
    >
      <div
        className={`w-8 h-8 flex flex-row items-center justify-center rounded-full flex-shrink-0 ${
          isToday && `dark:bg-rose-500`
        } dark:text-gray-200 m-2 mb-0`}
      >
        {props.day}
      </div>
      <div className={`flex flex-col gap-1 items-start w-full`}>
        {events.map((event) => (
          <CalendarEvent event={event} key={event.uid} />
        ))}
      </div>
    </div>
  );
};
