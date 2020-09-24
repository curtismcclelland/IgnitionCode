import { Routes, RouterModule } from '@angular/router';
import { Roles } from './_models';

import { AuthGuard } from './_guards';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { UsersComponent } from './users';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';

const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },
    { path: 'discounts', component: DiscountsComponent, canActivate: [AuthGuard], data: { roles: [Roles.Manager] } },
    { path: 'discount/:action/:state', component: DiscountEditComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
