import { Roles } from "./user.roles";

export class User {
    userName: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
    isActive: boolean;
    token: string;
}
