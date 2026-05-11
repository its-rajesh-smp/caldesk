export enum AppointmentOccurrenceType {
  ONE_TIME = "one-time",
  RECURRING = "recurring",
}

export interface AppointmentRepeatPattern {
  repeatEvery: number;
  repeatType: "days" | "weeks" | "months";
}
