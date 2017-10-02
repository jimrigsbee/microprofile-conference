import
{NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule } from "@angular/http";
import {AppComponent} from "./app.component";
import {AppRouting} from "./app.routing";
import {JwtService} from "./shared/jwt.service";
import {ScheduleModule, TreeModule, DataScrollerModule, DataTableModule, TabViewModule} from 'primeng/primeng';
import {SpeakersComponent} from "./speaker/speakers.component";
import {SpeakerComponent} from "./speaker/speaker.component";
import {SpeakerService} from "./speaker/speaker.service";
import {SessionsComponent} from "./session/sessions.component";
import {SessionComponent} from "./session/session.component";
import {SessionService} from "./session/session.service";
import {SchedulesComponent} from "./schedule/schedules.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ScheduleService} from "./schedule/schedule.service";
import {VotesComponent} from "./vote/votes.component";
import {VoteComponent} from "./vote/vote.component";
import {VoteService} from "./vote/vote.service";
import {EndpointsService} from "./shared/endpoints.service";
import {SpeakerFilter} from "./speaker/speaker.filter";
import {SessionFilter} from "./session/session.filter";
import {SessionFilterSpeaker} from "./session/session.filter.speaker";
import {SessionSpeakersComponent} from "./session/session.speakers.component";
import {MomentModule} from 'angular2-moment';
import {ChartModule} from 'primeng/primeng';
import {AuthGuard} from "./shared/authguard";
import {AuthService} from "./shared/auth.service";
import {LoginComponent} from "./shared/login.component";
import { DialogComponent } from './shared/dialog.component';
import { JwtComponent } from './shared/jwt.component';
import {HealthComponent} from "./health/health.component";
import {HealthService} from "./health/health.service";
import {MetricsService} from "./metrics/metrics.service";
import {TimerComponent} from "./shared/timer.component";
import {MetricsComponent} from "./metrics/metrics.component";

@NgModule({
    imports: [
        BrowserModule,
        DataScrollerModule,
        DataTableModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ScheduleModule,
        TreeModule,
        AppRouting,
        MomentModule,
        ChartModule,
        TabViewModule
    ],
    declarations: [
        AppComponent,
        DialogComponent,
        HealthComponent,
        JwtComponent,
        LoginComponent,
        MetricsComponent,
        SpeakersComponent,
        SpeakerComponent,
        SessionsComponent,
        SessionComponent,
        SessionSpeakersComponent,
        SchedulesComponent,
        ScheduleComponent,
        TimerComponent,
        VotesComponent,
        VoteComponent,
        SpeakerFilter,
        SessionFilter,
        SessionFilterSpeaker
    ],
    providers: [
        AuthGuard,
        AuthService,
        EndpointsService,
        HealthService,
        JwtService,
        MetricsService,
        SpeakerService,
        SessionService,
        ScheduleService,
        VoteService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
