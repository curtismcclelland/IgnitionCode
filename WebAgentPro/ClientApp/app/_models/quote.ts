import { Driver } from "./driver";
import { Vehicle } from "./vehicle";


export class Quote {
    quoteId: number;
    //might have to check for date correctly formatting and saving
    quoteDateTime: Date;
    creatorEmail: string;
    roleID: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    ssn: string;
    dateOfBirth: string;
    lessThan3YearsDriving: boolean;
    previousCarrier: string;
    movingViolationInLast5Years: boolean;
    claimInLast5Years: boolean;
    forceMultiCarDiscount: boolean;
    drivers: Array<Driver>;
    vehicles: Array<Vehicle>;

    //discount fields that are copied into the quote model
    daytimeRunningLights: number;
    antilockBrakes: number;
    lowAnnualMileage: number;
    passiveRestraints: number;
    antitheftInstalled: number;
    highDaysDrivenPerWeek: number;
    lowMilesDrivenToWork: number;
    reduceUse: number;
    garageAddressDifferent: number;
    lowDrivingExperience: number;
    previousCarrierLizard: number;
    previousCarrierPervasive: number;
    recentMovingViolations: number;
    recentClaims: number;
    multiCar: number;
    youngDriver: number;
    safeDrivingSchool: number;

    //more unique quote fields
    totalQuoteMultiplier: number;
    quotePrice: number;
    status: string;
}