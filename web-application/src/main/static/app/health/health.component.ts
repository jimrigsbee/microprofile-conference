import {Component, enableProdMode, OnInit} from "@angular/core";
import {HealthService} from "./health.service";

@Component({
    selector: 'health',
    templateUrl: 'app/health/health.component.html'
})
export class HealthComponent implements OnInit {
    title = 'Health Checks';
    showDialog: boolean = false;

    constructor(private healthService: HealthService) {
        console.log("HealthComponent.ctor");
    }

    ngOnInit(): void {
        let _self = this;
        this.healthService.init(function () {
           console.log("Initialized healthService");
        });
    }

    hasSessionHealth(): boolean {
        return this.healthService.getSessionHealth() != undefined;
    }
    refreshSessionHealth(): any {
        this.healthService.setSessionHealth(undefined);
        return this.getSessionHealth();
    }
    getSessionHealth(): any {
        //console.log("getSessionHealth");
        var data: any = this.healthService.getSessionHealth();
        //console.log(data);
        return data;
    }
}