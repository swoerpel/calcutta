import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsPageComponent implements OnInit {

    constructor(
        private router: Router,
        private auth: AuthService,
    ) {}

    ngOnInit(){
    }


    resetPassword(){

    }
}