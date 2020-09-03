import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'player-control',
    templateUrl: './player-control.component.html',
    styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

    public playerFormGroup = new FormGroup({
    }) 

    constructor(
    ) {}

    ngOnInit(){
    }
}