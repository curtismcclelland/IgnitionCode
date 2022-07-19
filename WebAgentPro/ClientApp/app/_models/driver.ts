import { Quote } from "./quote";

export class Driver {
    driverId: number;
    quoteId: number;
    quote: Quote;
    firstName: string;
    lastName: string;
    ssn: string;
    driverLicenseNumber: string;
    driverLicenseState: string;
    dateOfBirth: string;
    safeDrivingSchool: boolean;
    quoteMultiplier: number;
}