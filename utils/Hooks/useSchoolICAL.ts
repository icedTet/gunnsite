import ical, { ICalJSON } from "ical-js-parser";
import { useEffect, useState } from "react";
import { CalendarClass } from "../Classes/Schedule/ScheduleClass";
export const useSchoolCalendar = () => {
  const [calendar, setCalendar] = useState(null as null | ICalJSON);
  useEffect(() => {
    const listener = (cal: ICalJSON) => {
      cal ? setCalendar(cal) : setCalendar(null);
    };
    CalendarClass.getInstance().on("scheduleUpdate", listener);
    listener(CalendarClass.getInstance().schedule)
    return () => {
      CalendarClass.getInstance().off("scheduleUpdate", listener);
    };
  }, []);
  return calendar;
};
