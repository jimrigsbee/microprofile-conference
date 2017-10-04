import {Component, OnInit} from "@angular/core";
import {MetricsService} from "./metrics.service";

@Component({
    selector: 'metrics',
    templateUrl: 'app/metrics/metrics.component.html'
})
export class MetricsComponent implements OnInit {
    title = 'Session Microservice Metrics';
    showDialog: boolean = false;
    appMetrics: any[];
    baseMetrics: any;
    vendorMetrics: any;

    constructor(private metricsService: MetricsService) {
        console.log("MetricsComponent.ctor");
    }

    ngOnInit() {
        console.log("enter ngOnInit");
        let _self = this;
        this.metricsService.init(function () {
           console.log("Initialized metricsService");
            _self.metricsService.getSessionMetrics()
                .then(data => _self.setMetrics(data))
                .catch(msg => console.error(msg));
        });
        console.log("exit ngOnInit");
    }

    hasSessionMetrics(): boolean {
        return this.metricsService.hasSessionMetrics();
    }
    refreshSessionMetrics(): any {
        if(this.hasSessionMetrics()) {
            this.metricsService.setSessionMetrics(undefined);
            return this.metricsService.getSessionMetrics()
                .then(data => this.setMetrics(data))
                .catch(msg => console.error(msg));
        }
    }
    setMetrics(data: any): void {
        console.log("setMetrics:");
        console.log(data);
        // Break up the application section
        var app:any = data.application;
        this.appMetrics = [];
        for(var key in app) {
            var appWithKey: any = app[key];
            if(typeof appWithKey === "number") {
                appWithKey = {'key': key, 'value': appWithKey};
            } else {
                appWithKey = {'key': key, ...appWithKey};
            }
            this.appMetrics.push(appWithKey);
        }
        // Base
        this.baseMetrics = data.base;
        // Vendor
        this.vendorMetrics = data.vendor;
        console.log("setMetrics");
    }
}