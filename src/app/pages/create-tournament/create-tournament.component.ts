import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TournamentListService } from 'src/app/services/tournament-list.service';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
    selector: 'create-tournament',
    templateUrl: './create-tournament.component.html',
    styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit {
    
    public currentTournament: Tournament;

    constructor(
        private route: ActivatedRoute,
        public tournamentListService:TournamentListService,
    ) {}

    ngOnInit(){
        const tournamentId = '111111';
        this.currentTournament = this.tournamentListService.tournaments.find(t => t.id === tournamentId)
    }
}