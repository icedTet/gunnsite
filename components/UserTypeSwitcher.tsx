import {
  AcademicCapIcon,
  BookOpenIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { PersonalInfoClass } from "../utils/Classes/Personalization/PersonalInfoClass";
import { usePersonalizationHook } from "../utils/Hooks/usePersonalizationHook";
const types = {
  student: {
    icon: BookOpenIcon,
    label: "Student",
  },
  staff: {
    icon: AcademicCapIcon,
    label: "Staff",
  },
  community: {
    icon: UserGroupIcon,
    label: "Community/Alumni",
  },
};
export const UserTypeSwitcher = () => {
  const pii = usePersonalizationHook();
  const Icon = types[pii?.viewer]?.icon;
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex flex-row items-center gap-4`}>
      <span className={`dark:text-gray-50/60`}>I am a</span>
      <div className={`relative w-min flex flex-col`}>
        <div
          className={`dark:bg-gray-800 flex flex-row gap-2 p-2 items-center justify-end dark:text-gray-100 rounded-full px-4 dark:hover:bg-gray-850 cursor-pointer min-w-56 border dark:border-gray-750 ${
            open && `rounded-t-lg rounded-b-none border-b-0`
          }`}
          onClick={() => setOpen(!open)}
        >
          {pii?.viewer && (
            <div className={`flex-grow h-full flex flex-row gap-2`}>
              <Icon className={`w-6 h-6 text-white`} />
              {types[pii.viewer].label}
            </div>
          )}
          <ChevronDownIcon className={`w-4 h-4 text-white`} />
        </div>
        {open && (
          <div className={`absolute bottom-0 left-0 translate-y-full shadow-md`}>
            {Object.keys(types).map((type) => {
              const Icon = types[type].icon;
              return (
                <div
                  key={type}
                  className={`flex flex-row items-center gap-2 p-2 justify-start dark:text-gray-100 rounded-none last:rounded-b-lg px-4 dark:bg-gray-850 dark:hover:bg-gray-750 cursor-pointer min-w-56 border dark:border-gray-750 first:border-t-2`}
                  onClick={() => {
                    PersonalInfoClass.getInstance().saveInfoToStorage({
                      viewer: type as any,
                    });
                    setOpen(false);
                  }}
                >
                  <Icon className={`w-6 h-6 text-white`} />
                  {types[type].label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
