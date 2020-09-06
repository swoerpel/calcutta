import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { TournamentListService } from 'src/app/services/tournament-list.service';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    public filterPlayer:string;
    public currentTournament: Observable<Tournament>;

    constructor(
        private route: ActivatedRoute,
        public tournamentListService: TournamentListService,
    ) {}

    ngOnInit(){
        this.currentTournament = this.route.params.pipe(
            map(d => this.tournamentListService.tournaments.find(r => r.id === d.tournament_id))
        )
        console.log(this.currentTournament)
    }
}