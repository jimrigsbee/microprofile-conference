import {Component, enableProdMode, OnInit} from "@angular/core";
import {HealthService} from "./health.service";

@Component({
    selector: 'health',
    templateUrl: 'app/health/health.component.html'
})
export class HealthComponent implements OnInit {
    title = 'Health Checks';
    showDialog: boolean = false;
    sessionHealthCheck: any;
    voteHealthCheck: any;
    speakerHealthCheck: any;
    authzHealthCheck: any;
    scheduleHealthCheck: any;

    constructor(private healthService: HealthService) {
        console.log("HealthComponent.ctor");
    }

    ngOnInit(): void {
        console.log("enter ngOnInit");
        let _self = this;
        this.healthService.init(function () {
           console.log("Initialized healthService");
            _self.healthService.getSessionHealth()
                .then(data => _self.setSessionHealthCheck(data))
                .catch(msg => console.error(msg));
            _self.healthService.getAuthzHealth()
                .then(data => _self.setAuthzHealthCheck(data))
                .catch(msg => console.error(msg));
            _self.healthService.getSpeakerHealth()
                .then(data => _self.setSpeakerHealthCheck(data))
                .catch(msg => console.error(msg));
            _self.healthService.getScheduleHealth()
                .then(data => _self.setScheduleHealthCheck(data))
                .catch(msg => console.error(msg));
            _self.healthService.getVoteHealth()
                .then(data => _self.setVoteHealthCheck(data))
                .catch(msg => console.error(msg));
        });
        console.log("exit ngOnInit");
    }

    refreshHealth(): any {
      console.log("refreshHealth");
      this.refreshSessionHealth();
      this.refreshAuthzHealth();
      this.refreshSpeakerHealth();
      this.refreshScheduleHealth();
      this.refreshVoteHealth();
    }

    hasHealth(): boolean {
        return this.healthService.hasSessionHealth() && this.healthService.hasAuthzHealth() && this.healthService.hasSpeakerHealth() && this.healthService.hasVoteHealth() && this.healthService.has;
    }
    refreshSessionHealth(): any {
        console.log("refreshSessionHealth");
        if(this.healthService.hasSessionHealth()) {
            this.healthService.setSessionHealth(undefined);
            console.log("refreshSessionHealth.cleared session health");
            this.healthService.getSessionHealth()
                .then(data => this.setSessionHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshSessionHealth.requested session health");
        }
    }
    setSessionHealthCheck(data: any): any {
        console.log("setSessionHealthCheck");
        this.sessionHealthCheck = data;
        console.log(this.sessionHealthCheck)
        //console.log(data);
        return data;
    }
    refreshAuthzHealth(): any {
        console.log("refreshAuthzHealth");
        if(this.healthService.hasAuthzHealth()) {
            this.healthService.setAuthzHealth(undefined);
            console.log("refreshAuthzHealth.cleared authz health");
            this.healthService.getAuthzHealth()
                .then(data => this.setAuthzHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshAuthzHealth.requested authz health");
        }
    }
    setAuthzHealthCheck(data: any): any {
        console.log("setAuthzHealthCheck");
        this.authzHealthCheck = data;
        console.log(this.authzHealthCheck)
        //console.log(data);
        return data;
    }
    refreshSpeakerHealth(): any {
        console.log("refreshSpeakerHealth");
        if(this.healthService.hasSpeakerHealth()) {
            this.healthService.setSpeakerHealth(undefined);
            console.log("refreshSpeakerHealth.cleared speaker health");
            this.healthService.getSpeakerHealth()
                .then(data => this.setSpeakerHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshSpeakerHealth.requested speaker health");
        }
    }
    setSpeakerHealthCheck(data: any): any {
        console.log("setSpeakerHealthCheck");
        this.speakerHealthCheck = data;
        console.log(this.speakerHealthCheck)
        //console.log(data);
        return data;
    }
    refreshScheduleHealth(): any {
        console.log("refreshScheduleHealth");
        if(this.healthService.hasScheduleHealth()) {
            this.healthService.setScheduleHealthCheck(undefined);
            console.log("refreshScheduleHealth.cleared schedule health");
            this.healthService.getScheduleHealth()
                .then(data => this.setScheduleHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshScheduleHealth.requested schedule health");
        }
    }
    setScheduleHealthCheck(data: any): any {
        console.log("setScheduleHealthCheck");
        this.scheduleHealthCheck = data;
        console.log(this.scheduleHealthCheck)
        //console.log(data);
        return data;
    }
    refreshSpeakerHealth(): any {
        console.log("refreshSpeakerHealth");
        if(this.healthService.hasSpeakerHealth()) {
            this.healthService.setSpeakerHealth(undefined);
            console.log("refreshSpeakerHealth.cleared speaker health");
            this.healthService.getSpeakerHealth()
                .then(data => this.setSpeakerHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshSpeakerHealth.requested speaker health");
        }
    }
    setSpeakerHealthCheck(data: any): any {
        console.log("setSpeakerHealthCheck");
        this.speakerHealthCheck = data;
        console.log(this.speakerHealthCheck)
        //console.log(data);
        return data;
    }
    refreshVoteHealth(): any {
        console.log("refreshVoteHealth");
        if(this.healthService.hasVoteHealth()) {
            this.healthService.setVoteHealth(undefined);
            console.log("refreshVoteHealth.cleared vote health");
            this.healthService.getVoteHealth()
                .then(data => this.setVoteHealthCheck(data))
                .catch(msg => console.error(msg));
            console.log("refreshVoteHealth.requested vote health");
        }
    }
    setVoteHealthCheck(data: any): any {
        console.log("setVoteHealthCheck");
        this.voteHealthCheck = data;
        console.log(this.voteHealthCheck)
        //console.log(data);
        return data;
    }

}
