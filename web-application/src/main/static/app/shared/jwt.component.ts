import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'jwt-user',
    templateUrl: 'app/shared/jwt.component.html'
})

export class JwtComponent implements OnInit {
    username: string;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        console.log("JwtComponent.init");
    }

    loggedIn(): boolean {
        return this.auth.loggedIn();
    }

    principalName(): string {
        return this.auth.getJwtClaimByName("upn");
    }
    isVIP(): boolean {
        var groups = this.auth.getJwtClaimByName("groups");
        var index = groups.indexOf("VIP");
        var isVIP: boolean = index >= 0;
        return isVIP;
    }
    isAlumni(): boolean {
        var groups = this.auth.getJwtClaimByName("groups");
        var index = groups.indexOf("Alumni");
        var isAlumni: boolean = index >= 0;
        return isAlumni;
    }
    isRegistered(): boolean {
        var groups = this.auth.getJwtClaimByName("groups");
        var index = groups.indexOf("Registered");
        var isRegistered: boolean = index >= 0;
        return isRegistered;
    }
    secondsToExpiration(): number {
        return this.auth.secondsToExpiration();
    }
    getExpiredCallback():() => void {
        return this.expired;
    }
    expired(): void {
        console.log("Token is expired for: %s", this.username);
        if(undefined != this.router) {
            // not logged in so redirect to login page with the return url and return false
            this.router.navigateByUrl('/login', {queryParams: {returnUrl: "/session"}})
                .then(ok => console.log("routed to /login"))
                .catch(err => console.error(err));
            console.log("Asked router to navigate to /login");
        } else {
            console.log("No router configured");
        }
    }
}
