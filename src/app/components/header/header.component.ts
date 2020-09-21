import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserState } from 'src/app/state/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { UserPageActions } from 'src/app/state/user/actions';
import { getAdminStatus } from 'src/app/state/user/user.selectors';
import { Observable } from 'rxjs';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { selectUrl, RouterState } from 'src/app/state/router';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { GetPlayerSet } from 'src/app/state/player/player.selectors';
import { GetCurrentTournament } from 'src/app/state/tournament/tournament.selectors';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isAdmin: Observable<boolean>;
    public beforeLogin: Observable<boolean>;
    public tournament$: Observable<Tournament>;
    public players$: Observable<Player[]>;
    constructor(
        private router: Router,
        private userStore: Store<UserState>,
        private store: Store<RouterState>,
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>,
    ) {}

    ngOnInit(){
        this.isAdmin = this.userStore.select(getAdminStatus)
        this.beforeLogin = this.store.select(selectUrl).pipe(
            filter(url => !!url),
            map(url => url === '/login')
        )
        this.tournament$ = this.tournamentStore.select(GetCurrentTournament)

        this.players$ = this.tournament$.pipe(
            switchMap((t) => {
                return this.playerStore.select(GetPlayerSet,{playerIds: t.players})
            })
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