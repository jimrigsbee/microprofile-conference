import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'timer',
    templateUrl: 'app/shared/timer.component.html'
})
export class TimerComponent implements OnInit {

    @Input() ticks = 30;
    @Input() countdown: boolean = true;
    @Input() callback: () => void;
    minutesDisplay: string = "00";
    hoursDisplay: string = "00";
    secondsDisplay: string = "00";
    myStyles = {
        'font-size': '18px',
        'color': '#57acec',
        'text-align': 'center'
    };

    sub: Subscription;

    ngOnInit() {
        console.log("TimerComponent.init, %d, %s", this.ticks, this.countdown);
        this.startTimer();
    }

    private startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                console.debug("ticks: %d, countdown=%s", this.ticks, this.countdown);
                if(this.countdown) {
                    if(this.ticks > 0) {
                        this.ticks --;
                    } else if(this.ticks <= 0) {
                        this.myStyles.color = 'red';
                        this.sub.unsubscribe();
                        this.callback();
                    }
                } else {
                    this.ticks = t;
                }

                this.secondsDisplay = this.getSeconds(this.ticks).toFixed(0);
                if(this.secondsDisplay.length == 1) {
                    this.secondsDisplay = "0" + this.secondsDisplay;
                }
                this.minutesDisplay = this.getMinutes(this.ticks).toFixed(0);
                if(this.minutesDisplay.length == 1) {
                    this.minutesDisplay = "0" + this.minutesDisplay;
                }
                this.hoursDisplay = this.getHours(this.ticks).toFixed(0);
                if(this.hoursDisplay.length == 1) {
                    this.hoursDisplay = "0" + this.hoursDisplay;
                }
            }
        );
    }

    private getSeconds(ticks: number) {
        return ticks % 60;
    }

    private getMinutes(ticks: number) {
        return (Math.floor(ticks / 60)) % 60;
    }

    private getHours(ticks: number) {
        return Math.floor((ticks / 60) / 60);
    }
}
