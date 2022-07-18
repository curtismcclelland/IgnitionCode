import { Driver } from "./driver";
import { Quote } from "./quote";

export class Vehicle{
    vehicleId: number;
    vin: string;
    make: string;
    model: string;
    year: number;
    currentValue: number;
    primaryDriverId: number;
    driver: Driver;
    quoteId: number;
    quote: Quote;
    annualMileage: number;
    daytimeRunningLights: boolean;
    antiLockBrakes: boolean;
    passiveRestraints: boolean;
    antiTheft: boolean;
    daysDrivenPerWeek: number;
    milesDrivenToWork: number;
    reducedUsedDiscount: boolean;
    garageAddressDifferentFromResidence: boolean;
    quoteMultiplier: number;
}