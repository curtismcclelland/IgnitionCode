import { Driver } from "./driver";

export class Vehicle{
    vehicleId: number;
    vin: string;
    make: string;
    model: string;
    year: number;
    currentValue: number;
    primaryDriver: Driver;
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