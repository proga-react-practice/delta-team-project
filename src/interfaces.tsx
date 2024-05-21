import dayjs, { Dayjs } from "dayjs";

export interface RentCar {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  placeOfIssue: string;
  startRentDate: Dayjs | null;
  finishRentDate: Dayjs | null;
  comments: string;
  selectedCar: string;
}

export const initialFormState: RentCar = {
  id: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  placeOfIssue: "",
  startRentDate: dayjs(),
  finishRentDate: dayjs(),
  comments: "",
  selectedCar: "",
};

export type OrderGroup = {
  orders: RentCar[];
};

export type CarGroup = {
  cars: FormData[];
};

export interface FormData {
  id: string;
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

export const radioOptionsFuel = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
];

export const radioOptionsGearbox = [
  { value: "Manual", label: "Manual" },
  { value: "Automatic", label: "Automatic" },
];

export const initialFormData = {
  id: "",
  brand: "",
  model: "",
  year: 2000,
  body_type: "",
  mileage_km: 0,
  gearbox: "",
  fuel: "",
  price_per_day: 0,
  horse_power: 0,
  engine_capacity: 0,
  purpose: "",
};
