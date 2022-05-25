import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { EventJSON } from "ical-js-parser";
import { useState } from "react";
import { Modal } from "../Modal";

import Linkify from "react-linkify";

export const CalendarEvent = (props: { event: EventJSON }) => {
  const { event } = props;
  const [modal, setModal] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row gap-1 cursor-pointer dark:hover:bg-gray-500/30 transition-all p-2 py-1 w-full rounded-sm group relative`}
        onClick={() => setModal(true)}
      >
        <div className={`w-0 rounded-full h-full border border-red-500`} />
        <div className={`flex flex-col gap-1`}>
          <div className={`text-xs font-semibold`}>{event.summary}</div>
        </div>
      </div>
      <Modal
        visible={modal}
        onClose={() => setModal(false)}
        title={""}
        className={`w-full max-w-prose`}
      >
        <div className={`flex flex-col gap-4 p-4`}>
          <div className={`flex flex-col gap-2`}>
            <div className={`text-lg font-bold dark:text-rose-500`}>
              {event.summary}
            </div>
            {event.location && (
              <div
                className={`text-xs font-semibold dark:text-gray-500 flex flex-row`}
              >
                <LocationMarkerIcon className={`w-4 h-4 mr-2`} />
                {event.location}
              </div>
            )}
            {event.dtstart && (
              <div
                className={`text-xs font-semibold dark:text-gray-500 flex flex-row`}
              >
                <ClockIcon className={`w-4 h-4 mr-2`} />
                {event.dtstart.isAllDay ? (
                  `All Day`
                ) : (
                  <>
                    {Number(event.dtstart.value.substring(9, 11)) > 12
                      ? Number(event.dtstart.value.substring(9, 11)) % 12
                      : event.dtstart.value.substring(9, 11)}
                    :{event.dtstart.value.substring(11, 13)}
                    {Number(event.dtstart.value.substring(9, 11)) >= 12
                      ? "PM"
                      : "AM"}
                    {event.dtend &&
                      ` - ${
                        Number(event.dtend.value.substring(9, 11)) > 12
                          ? Number(event.dtend.value.substring(9, 11)) % 12
                          : event.dtend.value.substring(9, 11)
                      }
                  :${event.dtend.value.substring(11, 13)}${
                        Number(event.dtend.value.substring(9, 11)) >= 12
                          ? "PM"
                          : "AM"
                      }`}
                  </>
                )}
              </div>
            )}
          </div>

          <div className={`text-sm`}>
            <Linkify>
              {event.description
                ? event.description.split("\\n").map((x) => <p>{x}</p>)
                : `No description`}
            </Linkify>
          </div>
        </div>
      </Modal>
    </>
  );
};
