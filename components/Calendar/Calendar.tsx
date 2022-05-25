import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useSchoolCalendar } from "../../utils/Hooks/useSchoolICAL";
import { CalendarDay } from "./CalendarDay";
const calculateOffset = (month: number, year: number) => {
  const dummyTime = new Date();
  dummyTime.setMonth(month);
  dummyTime.setFullYear(year);
  dummyTime.setDate(1);
  return dummyTime.getDay();
};
const calculateDaysInMonth = (month: number, year: number) => {
  const dummyTime = new Date();
  dummyTime.setMonth(month);
  dummyTime.setFullYear(year);
  dummyTime.setDate(1);
  dummyTime.setMonth(dummyTime.getMonth() + 1);
  dummyTime.setDate(0);
  return dummyTime.getDate();
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const Calendar = () => {
  const cal = useSchoolCalendar();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const offset = calculateOffset(currentMonth, currentYear);
  return (
    <div
      className={`w-full h-full flex flex-col p-4 dark:bg-gray-800 rounded-lg shadow-md gap-8`}
    >
      <div className={`flex flex-row justify-center gap-4 items-center`}>
        <div
          className={`p-2 rounded-full dark:hover:bg-gray-700/20 cursor-pointer`}
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          <ChevronLeftIcon className={`w-4 h-4 text-white`} />
        </div>
        <div
          className={`flex flex-row gap-2 dark:bg-gray-750 p-2 px-4 rounded-lg cursor-pointer w-48 justify-center items-center`}
          onClick={() => {
            setCurrentMonth(new Date().getMonth());
            setCurrentYear(new Date().getFullYear());
          }}
        >
          <span className={`font-bold dark:text-gray-250`}>
            {months[currentMonth]}
          </span>
          <span className={`font-bold dark:text-gray-250`}>{currentYear}</span>
        </div>
        <div
          className={`p-2 rounded-full dark:hover:bg-gray-700/20 cursor-pointer`}
          onClick={() => {
            if (currentMonth + 1 > 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          <ChevronRightIcon className={`w-4 h-4 text-white`} />
        </div>
      </div>
      <div
        className={`w-full h-full flex flex-col border dark:border-gray-650/50 shadow-md `}
      >
        <div className={`grid grid-cols-7 font-bold dark:text-gray-150`}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <span
                className="text-center border-r last:border-0 dark:border-gray-650/20"
                key={index}
              >
                {day}
              </span>
            )
          )}
        </div>
        <div className={`grid grid-cols-7 w-full grid-rows-5`}>
          {Array(offset)
            .fill(0)
            .map((x) => (
              <div />
            ))}
          {Array(calculateDaysInMonth(currentMonth, currentYear))
            .fill(0)
            .map((_, index) => (
              <CalendarDay
                key={index}
                day={index + 1}
                month={currentMonth}
                year={currentYear}
              />
            ))}
          {/* get the days of the month */}
        </div>
      </div>
    </div>
  );
};
export default Calendar;
