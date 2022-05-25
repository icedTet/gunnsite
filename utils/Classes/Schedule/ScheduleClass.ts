import EventEmitter from "events";
import ical, { ICalJSON } from "ical-js-parser";
export class CalendarClass extends EventEmitter {
  static instance: CalendarClass;
  static getInstance(): CalendarClass {
    if (!CalendarClass.instance) {
      CalendarClass.instance = new CalendarClass();
    }
    return CalendarClass.instance;
  }
  schedule: ICalJSON;
  private constructor() {
    super();
    this.fetchSchedule();
  }
  loadScheduleFromStorage() {
    const schedule = JSON.parse(localStorage.getItem("schedule"));
    if (schedule) {
      this.emit("scheduleUpdate", schedule);
      this.schedule = schedule as ICalJSON;
    }
    return schedule;
  }
  async fetchSchedule() {
    const icalInfo = await fetch(`/api/cal`).then((x) =>
      x.ok ? x.text() : null
    );
    if (!icalInfo) return;
    const data = ical.toJSON(icalInfo);
    this.schedule = data;
    this.emit("scheduleUpdate", data);
    localStorage.setItem("schedule", JSON.stringify(data));
  }
}
