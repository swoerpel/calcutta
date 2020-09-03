import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TournamentListService } from 'src/app/services/tournament-list.service';


@Component({
    selector: 'tournament-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
    
    filterTournament:string;

    constructor(
        public tournamentListService: TournamentListService,
        private router: Router,
        
    ) {}
    ngOnInit(){
    }

    public onSelectTournament(tournamentId){
        this.router.navigate(['/tournament-list', tournamentId]);
    }
}