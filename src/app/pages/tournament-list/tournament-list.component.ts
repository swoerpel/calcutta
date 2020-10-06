import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { TournamentListService } from 'src/app/services/tournament-list.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { tap, map, filter } from 'rxjs/operators';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { Store } from '@ngrx/store';
import { GetTournaments } from 'src/app/state/tournament/tournament.selectors';
import { TournamentPageActions } from 'src/app/state/tournament/actions';


@Component({
    selector: 'tournament-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

    public tournaments: Observable<Tournament[]>;
    tournamentInput:string;

    constructor(
        private tournamentStore: Store<TournamentState>,
        private router: Router,
    ) {}
    ngOnInit(){
        this.tournaments = this.tournamentStore.select(GetTournaments).pipe(
            filter(t => !!t),
        );
        this.tournaments.subscribe();
    }

    public onSelectTournament(tournament){
        console.log('tournament selected',tournament)
        this.tournamentStore.dispatch(TournamentPageActions.OpenTournament({tournamentId: tournament.id}))
        this.router.navigate(['/tournament-list', tournament.id]);
    }
}