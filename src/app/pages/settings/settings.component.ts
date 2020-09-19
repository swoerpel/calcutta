import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsPageComponent implements OnInit {

    constructor(
        private router: Router,
    ) {}

    ngOnInit(){
    }


    resetPassword(){

    }
}