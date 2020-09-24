import { Routes, RouterModule } from '@angular/router';

import { Roles, AuthGuard } from './_security';

import { RegisterComponent } from './registerlogin/register/register.component';
import { LoginComponent } from './registerlogin/login/login.component';
import { UsersComponent } from './usermanagement/users/users.component';
import { DiscountsComponent } from './discountmanagement/discounts/discounts.component';
import { DiscountEditComponent } from './discountmanagement/discount-edit/discount-edit.component';
import { RoutenotfoundComponent } from './_security/routenotfound/routenotfound.component';

const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },
    { path: 'discounts', component: DiscountsComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },

    // parameterized route so you can tell the component what action you want to take on which state's discounts
    { path: 'discount/:action/:state', component: DiscountEditComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },

    // default route when nothing specified
    { path: '', component: DiscountsComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },

    // any other route will redirect here
    { path: '**', component: RoutenotfoundComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);
