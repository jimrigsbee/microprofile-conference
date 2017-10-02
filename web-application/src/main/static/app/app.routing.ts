import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SpeakersComponent} from "./speaker/speakers.component";
import {SessionsComponent} from "./session/sessions.component";
import {SchedulesComponent} from "./schedule/schedules.component";
import {VotesComponent} from "./vote/votes.component";
import {LoginComponent} from "./shared/login.component";
import {AuthGuard} from "./shared/authguard";
import {HealthComponent} from "./health/health.component";
import {MetricsComponent} from "./metrics/metrics.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/speakers',
        pathMatch: 'full'
    },
    {
        path: 'speakers',
        component: SpeakersComponent
    },
    {
        path: 'sessions',
        component: SessionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'schedules',
        component: SchedulesComponent
    },
    {
        path: 'votes',
        component: VotesComponent
    },
    {
        path: 'health',
        component: HealthComponent
    },
    {
        path: 'metrics',
        component: MetricsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);