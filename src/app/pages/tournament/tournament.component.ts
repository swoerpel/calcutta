import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { Tournament } from 'src/app/models/tournament.model';
import { Store } from '@ngrx/store';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { GetTournament } from 'src/app/state/tournament/tournament.selectors';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    public filterPlayer:string;
    public tournament: Observable<Tournament>;

    constructor(
        private route: ActivatedRoute,
        private tournamentStore: Store<TournamentState>,
    ) {}

    ngOnInit(){
        this.tournament = this.tournamentStore.select(GetTournament)
    }
}