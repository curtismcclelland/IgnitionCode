import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_security/account.service';
import { Roles } from '@app/_security/user.roles';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles) {

                //check if user roles include any route restriction roles
                var matchingRoles: Array<Roles> = route.data.roles.filter((item: Roles) => currentUser.roles.includes(item));

                if (matchingRoles.length === 0) {
                    // role not authorised so redirect to home page
                    this.router.navigate(['/']);
                    return false;
                }
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
