import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UserIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { UserTypeSwitcher } from "../components/UserTypeSwitcher";
import { Calendar } from "../components/Calendar/Calendar";
const IndexPage = () => {
  const [animateIn, setAnimateIn] = useState(0);
  useEffect(() => {
    setTimeout(() => setAnimateIn(1), 200);
    setTimeout(() => setAnimateIn(2), 400);
  }, []);

  return (
    <div
      className={`w-full h-full dark:bg-gray-850  transition-colors flex flex-col gap-8 overflow-auto pb-8`}
    >
      <div
        className={`w-full ${animateIn <= 1 ? `max-h-screen` : `max-h-screen/2`}
        ${animateIn === 0 ? `brightness-50` : `brightness-100`}
        h-full transition-all relative duration-500 flex-shrink-0`}
      >
        <div
          className={`absolute inset-0 w-full h-full object-cover object-center dark:bg-gray-700 ${
            animateIn >= 2 && `blur-sm`
          } transition-all duration-700`}
        >
          <div className="absolute inset-0 z-10 object-cover object-center w-full h-full bg-red-400/20" />
          <img
            src="/assets/images/bg.png"
            className={`w-full h-full object-cover object-center`}
          />
        </div>
        <div
          className={`absolute w-full h-full flex flex-col items-center justify-center gap-8`}
        >
          <div className={`flex flex-col items-center gap-8`}>
            <h1 className={`text-6xl font-bold text-white`}>
              Henry M. Gunn High School
            </h1>
            <div
              className={`relative w-full ${
                animateIn < 2 ? `opacity-0` : `opacity-100`
              }
            duration-500
            delay-500
            `}
            >
              <input
                type="text"
                className="w-full h-12 p-2 px-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200"
                placeholder="What are you looking for?"
              />
            </div>
          </div>
          <div
            className={`flex flex-row items-center gap-4 ${
              animateIn < 2 ? `opacity-0` : `opacity-100`
            }
            duration-500 delay-700`}
          >
            <UserTypeSwitcher />
          </div>
        </div>
      </div>
      <div className={`w-full flex flex-row justify-center flex-shrink-0 p-8`}>
        <div className={`max-w-[100ch] w-full`}>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
