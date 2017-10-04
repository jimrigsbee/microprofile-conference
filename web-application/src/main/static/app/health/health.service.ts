import {Injectable} from "@angular/core";
import {EndpointsService} from "../shared/endpoints.service";
import {Http, Response} from "@angular/http";
import {Health} from "./health";
import {Endpoint} from "../shared/endpoint";

@Injectable()
export class HealthService {
    private sessionCheck: any;
    private sessionCheckEP : Endpoint;
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
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

}
