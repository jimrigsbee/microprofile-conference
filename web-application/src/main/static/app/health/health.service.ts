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
                .catch(this.handleError);
        }
        callback();
    }

    setSessionEP(ep: Endpoint) {
        this.sessionCheckEP = ep;
        console.log("Loaded session-health EP:");
        console.log(this.sessionCheckEP);
    }
    getSessionHealth(): any {
        if(undefined == this.sessionCheckEP) {
            return undefined;
        }
        console.log("getSessionHealth, loading="+this.loading);
        if(undefined == this.sessionCheck && this.loading == false) {
            this.loading = true;
            console.log("Requesting health from: "+this.sessionCheckEP.url);
            this.http.get(this.sessionCheckEP.url)
                .toPromise()
                .then((response: Response) => this.setSessionHealth(response.json()))
                .catch(this.handleError);
        }
        return this.sessionCheck;
    }
    setSessionHealth(data: any): void {
        console.log("setSessionHealth:");
        console.log(data);
        this.sessionCheck = data;
        this.loading = false;
    }
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

}
