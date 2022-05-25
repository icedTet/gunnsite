import { useEffect, useState } from "react";
import { PersonalInfoClass } from "../Classes/Personalization/PersonalInfoClass";
import { PersonalizationObject } from "../Types/Personalization/personalizationTypes";

export const usePersonalizationHook = () => {
  const [personalizationData, setPersonalizationData] = useState(
    null as null| Partial<PersonalizationObject>
  );
  useEffect(() => {
    const listener = (info: Partial<PersonalizationObject>) => {
      info ? setPersonalizationData(info) : setPersonalizationData(null);
    };
    const personalInfo = PersonalInfoClass.getInstance();
    personalInfo.on("infoUpdate", listener);
    return () => {
      personalInfo.removeListener("infoUpdate", listener);
    };
  }, []);
  return personalizationData;
};
