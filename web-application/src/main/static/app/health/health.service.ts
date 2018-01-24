import {Injectable} from "@angular/core";
import {EndpointsService} from "../shared/endpoints.service";
import {Http, Response} from "@angular/http";
import {Health} from "./health";
import {Endpoint} from "../shared/endpoint";

@Injectable()
export class HealthService {
    private sessionCheck: any;
    private sessionCheckEP : Endpoint;
    private authzCheck: any;
    private authzCheckEP : Endpoint;
    private scheduleCheck: any;
    private scheduleCheckEP : Endpoint;
    private speakerCheck: any;
    private speakerCheckEP : Endpoint;
    private voteCheck: any;
    private voteCheckEP : Endpoint;
    private loading: boolean = false;

    constructor(private http: Http, private endpointsService: EndpointsService) {
        console.log("HealthService.ctor");
    }

    init(callback: () => void): void {
        if (undefined == this.sessionCheck) {
            this.endpointsService.getEndpoint("session-health")
                .then(ep => this.setSessionEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
        if (undefined == this.authzCheck) {
            this.endpointsService.getEndpoint("authz-health")
                .then(ep => this.setAuthzEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
        if (undefined == this.scheduleCheck) {
            this.endpointsService.getEndpoint("schedule-health")
                .then(ep => this.setScheduleEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
        if (undefined == this.speakerCheck) {
            this.endpointsService.getEndpoint("speaker-health")
                .then(ep => this.setSpeakerEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
        if (undefined == this.voteCheck) {
            this.endpointsService.getEndpoint("vote-health")
                .then(ep => this.setVoteEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
    }

    setSessionEP(ep: Endpoint) {
        this.sessionCheckEP = ep;
        console.log("Loaded session-health EP:");
        console.log(this.sessionCheckEP);
    }
    hasSessionHealth(): boolean {
        return this.sessionCheck != undefined;
    }

    getSessionHealth():Promise<any> {
        if (undefined != this.sessionCheck) {
            return Promise.resolve(this.sessionCheck);
        }

        console.log("getSessionHealth, loading="+this.loading);
        this.loading = true;
        return this.http.get(this.sessionCheckEP.url)
            .toPromise()
            .then(response => this.setSessionHealth(response.json()))
            .catch(this.handleError);
    }
    setSessionHealth(data: any): void {
        console.log("setSessionHealth:");
        console.log(data);
        this.sessionCheck = data;
        this.loading = false;
        return this.sessionCheck;
    }

    setAuthzEP(ep: Endpoint) {
        this.authzCheckEP = ep;
        console.log("Loaded authz-health EP:");
        console.log(this.authzCheckEP);
    }
    hasAuthzHealth(): boolean {
        return this.authzCheck != undefined;
    }

    getAuthzHealth():Promise<any> {
        if (undefined != this.authzCheck) {
            return Promise.resolve(this.authzCheck);
        }

        console.log("getAuthzHealth, loading="+this.loading);
        this.loading = true;
        return this.http.get(this.authzCheckEP.url)
            .toPromise()
            .then(response => this.setAuthzHealth(response.json()))
            .catch(this.handleError);
    }
    setAuthzHealth(data: any): void {
        console.log("setAuthzHealth:");
        console.log(data);
        this.authzCheck = data;
        this.loading = false;
        return this.authzCheck;
    }

    setScheduleEP(ep: Endpoint) {
        this.scheduleCheckEP = ep;
        console.log("Loaded schedule-health EP:");
        console.log(this.scheduleCheckEP);
    }
    hasScheduleHealth(): boolean {
        return this.scheduleCheck != undefined;
    }

    getScheduleHealth():Promise<any> {
        if (undefined != this.scheduleCheck) {
            return Promise.resolve(this.scheduleCheck);
        }

        console.log("getScheduleHealth, loading="+this.loading);
        this.loading = true;
        return this.http.get(this.scheduleCheckEP.url)
            .toPromise()
            .then(response => this.setScheduleHealth(response.json()))
            .catch(this.handleError);
    }
    setScheduleHealth(data: any): void {
        console.log("setScheduleHealth:");
        console.log(data);
        this.scheduleCheck = data;
        this.loading = false;
        return this.scheduleCheck;
    }
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

    setSpeakerEP(ep: Endpoint) {
        this.speakerCheckEP = ep;
        console.log("Loaded speaker-health EP:");
        console.log(this.speakerCheckEP);
    }
    hasSpeakerHealth(): boolean {
        return this.speakerCheck != undefined;
    }

    getSpeakerHealth():Promise<any> {
        if (undefined != this.speakerCheck) {
            return Promise.resolve(this.speakerCheck);
        }

        console.log("getSpeakerHealth, loading="+this.loading);
        this.loading = true;
        return this.http.get(this.speakerCheckEP.url)
            .toPromise()
            .then(response => this.setSpeakerHealth(response.json()))
            .catch(this.handleError);
    }
    setSpeakerHealth(data: any): void {
        console.log("setSpeakerHealth:");
        console.log(data);
        this.speakerCheck = data;
        this.loading = false;
        return this.speakerCheck;
    }
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

    setVoteEP(ep: Endpoint) {
        this.voteCheckEP = ep;
        console.log("Loaded vote-health EP:");
        console.log(this.voteCheckEP);
    }
    hasVoteHealth(): boolean {
        return this.voteCheck != undefined;
    }

    getVoteHealth():Promise<any> {
        if (undefined != this.voteCheck) {
            return Promise.resolve(this.voteCheck);
        }

        console.log("getVoteHealth, loading="+this.loading);
        this.loading = true;
        return this.http.get(this.voteCheckEP.url)
            .toPromise()
            .then(response => this.setVoteHealth(response.json()))
            .catch(this.handleError);
    }
    setVoteHealth(data: any): void {
        console.log("setVoteHealth:");
        console.log(data);
        this.voteCheck = data;
        this.loading = false;
        return this.voteCheck;
    }
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

}
