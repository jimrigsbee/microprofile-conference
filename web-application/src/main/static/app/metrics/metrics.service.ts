import {Injectable} from "@angular/core";
import {EndpointsService} from "../shared/endpoints.service";
import {Http} from "@angular/http";
import {Endpoint} from "../shared/endpoint";

@Injectable()
export class MetricsService {
    private sessionMetrics: any;
    private sessionMetricsEP : Endpoint;
    private loading: boolean = false;

    constructor(private http: Http, private endpointsService: EndpointsService) {
        console.log("MetricsService.ctor");
    }

    init(callback: () => void): void {
        if (undefined == this.sessionMetrics) {
            this.endpointsService.getEndpoint("session-metrics")
                .then(ep => this.setSessionEP(ep))
                .then(callback)
                .catch(this.handleError);
        } else {
            callback();
        }
    }

    setSessionEP(ep: Endpoint) {
        this.sessionMetricsEP = ep;
        console.log("Loaded session-metrics EP:");
        console.log(this.sessionMetricsEP);
    }

    hasSessionMetrics(): boolean {
        return this.sessionMetrics != undefined;
    }
    getSessionMetrics():Promise<any> {
        if (undefined != this.sessionMetrics) {
            return Promise.resolve(this.sessionMetrics);
        }

        return this.http.get(this.sessionMetricsEP.url)
            .toPromise()
            .then(response => this.setSessionMetrics(response.json()))
            .catch(this.handleError);
    }

    setSessionMetrics(data: any): any {
        this.sessionMetrics = data;
        console.log("this.setSessionMetrics:");
        console.log(this.sessionMetrics);
        this.loading = false;
        return this.sessionMetrics;
    }
    handleError(error: any): any {
        console.error('An error occurred', error);
    }

}
