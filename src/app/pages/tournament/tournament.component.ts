import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,  } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { Store } from '@ngrx/store';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { GetCurrentTournament } from 'src/app/state/tournament/tournament.selectors';
import { Player } from 'src/app/models/player.model';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    public playerInput:string;
    public tournament: Observable<Tournament>;
    public players$: Observable<Player[]>;

    constructor(
        private tournamentStore: Store<TournamentState>,
        private router: Router,
    ) {}

    ngOnInit(){
        let tournament_id = this.router.routerState.snapshot.url.split('/')[2];
        this.tournament = this.tournamentStore.select(GetCurrentTournament,{tournamentId: tournament_id} )
        // this.tournament.subscribe(t => console.log('tournamentLoaded', t))
    }
}