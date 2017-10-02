import {Component, enableProdMode} from "@angular/core";
import {AuthService} from "./shared/auth.service";

enableProdMode();

@Component({
    selector: 'conference',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    title = 'Microprofile 1.2 Conference';
    constructor(private auth: AuthService) {}
}