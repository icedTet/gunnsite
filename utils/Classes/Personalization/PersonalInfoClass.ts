import { EventEmitter } from "events";
import { PersonalizationObject } from "../../Types/Personalization/personalizationTypes";
export class PersonalInfoClass extends EventEmitter {
  static instance: PersonalInfoClass;
  static getInstance(): PersonalInfoClass {
    if (!PersonalInfoClass.instance) {
      PersonalInfoClass.instance = new PersonalInfoClass();
    }
    return PersonalInfoClass.instance;
  }
  pinfo?: Partial<PersonalizationObject>;
  private constructor() {
    super();
    this.loadInfoFromStorage();
  }
  loadInfoFromStorage() {
    const info = JSON.parse(localStorage.getItem("personalInfo"));
    if (info) {
      this.emit("infoUpdate", info) as Partial<PersonalizationObject>;
      this.pinfo = info as Partial<PersonalizationObject>;
    }
    return info;
  }
  saveInfoToStorage(info: Partial<PersonalizationObject>): void {
    this.pinfo = { ...this.pinfo, ...info } as Partial<PersonalizationObject>;
    this.emit("infoUpdate", { ...this.pinfo, ...info }) as Partial<PersonalizationObject>;
    localStorage.setItem(
      "personalInfo",
      JSON.stringify({ ...this.pinfo, ...info })
    );
    
  }
}
