import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { Tournament } from 'src/app/models/tournament.model';
import { Store } from '@ngrx/store';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { GetCurrentTournament } from 'src/app/state/tournament/tournament.selectors';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { Player } from 'src/app/models/player.model';
import { GetPlayerSet } from 'src/app/state/player/player.selectors';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    public filterPlayer:string;
    public tournament: Observable<Tournament>;
    public players$: Observable<Player[]>;

    constructor(
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>,
    ) {}

    ngOnInit(){
        this.tournament = this.tournamentStore.select(GetCurrentTournament)

        this.players$ = this.tournament.pipe(
            switchMap((t) => {
                return this.playerStore.select(GetPlayerSet,{playerIds: t.players})
            })
        )

    }
}