import dayjs, { Dayjs } from "dayjs";

export interface RentCar {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  placeOfIssue: string;
  startRentDate: Dayjs | null;
  finishRentDate: Dayjs | null;
  comments: string;
}

export const initialFormState: RentCar = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  placeOfIssue: "",
  startRentDate: dayjs(),
  finishRentDate: dayjs(),
  comments: "",
};

export type CarGroup = {
  cars: FormData[];
};

export interface FormData {
  brand: string;
  model: string;
  year: number;
  body_type: string;
  mileage_km: number;
  gearbox: string;
  fuel: string;
  price_per_day: number;
  horse_power: number;
  engine_capacity: number;
  purpose: string;
}

export const purposes = ["Personal", "Commercial"];

export const bodyTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe"];

export const gearboxTypes = ["Manual", "Automatic"];

export const fuelTypes = ["Petrol", "Diesel", "Electric"];
