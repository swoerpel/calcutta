import { Component, OnInit } from '@angular/core';
// import * as _moment  from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'time-control',
    templateUrl: './time-control.component.html',
    styleUrls: ['./time-control.component.scss']
})
export class TimeControlComponent implements OnInit {

    public endTimeSelected: boolean = true;
    // public moment: _moment.Moment = _moment();

    public timeFormGroup = new FormGroup({
        endTime: new FormControl(),
        duration: new FormControl(),
    }) 

    constructor(
    ) {}

    ngOnInit(){
        this.timeFormGroup.controls.endTime.valueChanges.pipe(
            tap((endTimeValue) => {
                let endTime = moment(endTimeValue, ["hh:mm A"]).format("HH:mm");
                let currentTime = moment().format("HH:mm");
                let differenceTime = moment.utc(moment(endTime,"HH:mm").diff(moment(currentTime,"HH:mm"))).format('h [hours] m [minutes]');
                this.timeFormGroup.controls.duration.setValue(differenceTime);
            })
        ).subscribe();
    }
}