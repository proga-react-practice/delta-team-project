import dayjs, { Dayjs } from 'dayjs';

export interface RentCar {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    placeOfIssue: string;
    startRentDate: Dayjs;
    finishRentDate: Dayjs;
    comments: string;
    [key: string]: string | Dayjs;
}

export const initialFormState: RentCar = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    placeOfIssue: '',
    startRentDate: dayjs(),
    finishRentDate: dayjs().add(5, 'h'),
    comments: '',
};

export interface FieldErrors {
    firstName: boolean;
    lastName: boolean;
    phoneNumber: boolean;
    email: boolean;
    placeOfIssue: boolean;
}

export interface FormData {
    brand: string;
    model: string;
    year: number ;
    body_type: string;
    mileage_km: number ;
    gearbox: string;
    fuel: string;
    price_per_day: number 
    horse_power: number   ;
    engine_capacity: number ;
    purpose: string;
  }