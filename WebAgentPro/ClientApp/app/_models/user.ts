import { Role } from "./role";

export class User {
    userName: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    isActive: boolean;
    token: string;
}
