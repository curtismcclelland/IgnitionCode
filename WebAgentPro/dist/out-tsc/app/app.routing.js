import { RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { UsersComponent } from './users';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { Role } from './_models';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetPartsComponent } from './widget-parts/widget-parts.component';
const appRoutes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'widgets', component: WidgetsComponent, canActivate: [AuthGuard] },
    { path: 'widget-parts/:id', component: WidgetPartsComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager] } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map