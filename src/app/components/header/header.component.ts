import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserState } from 'src/app/state/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { UserPageActions } from 'src/app/state/user/actions';
import { getAdminStatus } from 'src/app/state/user/user.selectors';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { selectUrl, RouterState } from 'src/app/state/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isAdmin: Observable<boolean>;
    public beforeLogin: Observable<boolean>;
    constructor(
        private router: Router,
        private userStore: Store<UserState>,
        private store: Store<RouterState>
    ) {}

    ngOnInit(){
       this.isAdmin = this.userStore.select(getAdminStatus)
        this.beforeLogin = this.store.select(selectUrl).pipe(
            filter(url => !!url),
            map(url => url === '/login')
        )
    }

    public logout(){
        this.userStore.dispatch(UserPageActions.LogoutUser())
    }

    public navigateHome(){
        this.router.navigate(['/tournament-list']);
    }

    public navigateSettings(){
        this.router.navigate(['/settings'])
    }

    public createTournament(){
        // neeed work here
        let tournament_id = this.router.routerState.snapshot.url.split('/')[2];
        if(!tournament_id)
            tournament_id = 'new-tournament'
        this.router.navigate(['/create-tournament/' + tournament_id]);
    }

    public openPlayerList(){

        this.router.navigate(['/manage-player-list']);
    }

}