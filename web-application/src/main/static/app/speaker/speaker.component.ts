import {Component, Input, enableProdMode} from "@angular/core";
import {Speaker} from "./speaker";
import {AuthService} from "../shared/auth.service";


enableProdMode();

@Component({
    selector: 'speaker',
    templateUrl: 'app/speaker/speaker.component.html',
})

export class SpeakerComponent {
    title = 'Conference Speaker';
    @Input() speaker: Speaker;
    constructor(private auth: AuthService) {}
}
