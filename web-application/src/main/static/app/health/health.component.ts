import {Component, enableProdMode, OnInit} from "@angular/core";
import {HealthService} from "./health.service";

@Component({
    selector: 'health',
    templateUrl: 'app/health/health.component.html'
})
export class HealthComponent implements OnInit {
    title = 'Health Checks';
    showDialog: boolean = false;
    healthCheck: any;

    constructor(private healthService: HealthService) {
        console.log("HealthComponent.ctor");
    }

    ngOnInit(): void {
        console.log("enter ngOnInit");
        let _self = this;
        this.healthService.init(function () {
           console.log("Initialized healthService");
            _self.healthService.getSessionHealth()
                .then(data => _self.setHealthCheck(data))
                .catch(msg => console.error(msg));
        });
        console.log("exit ngOnInit");
    }

    hasSessionHealth(): boolean {
        return this.healthService.hasSessionHealth();
    }
    refreshSessionHealth(): any {
        console.log("refreshSessionHealth");
        if(this.hasSessionHealth()) {
            this.healthService.setSessionHealth(undefined);
            console.log("refreshSessionHealth.cleared session health");
            this.healthService.getSessionHealth()
                .then(data => this.setHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshSessionHealth.requested session health");
        }
    }
    setHealthCheck(data: any): any {
        console.log("setHealthCheck");
        this.healthCheck = data;
        console.log(this.healthCheck)
        //console.log(data);
        return data;
    }
}