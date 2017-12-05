import {Component, OnInit} from '@angular/core';
import {AuthService, Credentials} from './auth.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: 'app/shared/login.component.html'
})

export class LoginComponent implements OnInit {
    returnUrl: string;
    model: Credentials = {"username": 'vipuser@exmple.com', "password": 'vipuser-secret'};

    constructor(private auth: AuthService, private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit(): void {
        let _self = this;
        this.auth.init(function () {
            //no-op
            console.log("Initialized LoginComponent");
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLogin() {
        this.auth.login(this.model)
            .subscribe(
                response => {
                    this.router.navigateByUrl(this.returnUrl);
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
            );
    }
}
