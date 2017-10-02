import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const loggedIn = this.auth.loggedIn();
        console.log("AuthGuard(%s) hasToken: %s", route, loggedIn);
        if (loggedIn) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
