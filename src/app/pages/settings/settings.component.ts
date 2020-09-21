import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UserState } from 'src/app/state/user/user.reducer';
import { GetCurrentUser } from 'src/app/state/user/user.selectors';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsPageComponent implements OnInit {

    public currentUser$: Observable<any>;

    constructor(
        private userStore: Store<UserState>
    ) {}

    ngOnInit(){
        this.currentUser$ = this.userStore.select(GetCurrentUser).pipe(
            filter(p => !!p),
        )
    }

    resetPassword(){

    }
}