import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, map, first, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { Player } from 'src/app/models/player.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { Store } from '@ngrx/store';
import { TournamentPageActions } from 'src/app/state/tournament/actions';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { GetPlayers } from 'src/app/state/player/player.selectors';
import { PlayerPageActions } from 'src/app/state/player/actions';


@Component({
    selector: 'create-tournament',
    templateUrl: './create-tournament.component.html',
    styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit {
    
    public fargoRating = {
        min:300,
        max:800,
    }

    public tournamentFormGroup = new FormGroup({
        name: new FormControl('big huge tournament', [Validators.required,]),
        roomName: new FormControl('ball room', [Validators.required,]),
        endTime: new FormControl('12:00 AM', [Validators.required,]),
        duration: new FormControl('', [Validators.required,]),
        // id: new FormControl('new-tournament', [Validators.required,]),
    }) 

    public playerFormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required,]),
        lastName: new FormControl('', [Validators.required]),
        fargoRating: new FormControl('', [
            Validators.required, 
            Validators.pattern('[0-9]+'),
            Validators.min(this.fargoRating.min),
            Validators.max(this.fargoRating.max),
        ]),
    });

    public currentPlayers: Player[] = [];
    public existingPlayers: Player[];
    public createPlayerDropdownOpen: boolean = false;
    public existingPlayerListDropdownOpen: boolean = false;
    
    constructor(
        private router: Router,
        // public tournamentListService:TournamentListService,
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>
    ) {}
    
    ngOnInit(){
        this.tournamentFormGroup.controls.endTime.valueChanges.pipe(
            tap((endTimeValue) => {
                let endTime = moment(endTimeValue, ["hh:mm A"]).format("HH:mm");
                let currentTime = moment().format("HH:mm");
                let differenceTime = moment.utc(moment(endTime,"HH:mm").diff(moment(currentTime,"HH:mm"))).format('h [hours] m [minutes]');
                this.tournamentFormGroup.controls.duration.setValue(differenceTime);
            })
        ).subscribe();

        this.playerStore.select(GetPlayers).pipe(
            filter(p => !!p),
            filter(p => p.length !== 0),
            tap(p => this.existingPlayers = p)
        ).subscribe();
    }

    public toggleAddPlayer(){
        this.createPlayerDropdownOpen = !this.createPlayerDropdownOpen;
    }

    public toggleExistingPlayerList(){
        this.existingPlayerListDropdownOpen = !this.existingPlayerListDropdownOpen;
    }

    public onSelectExistingPlayer(player: Player){
        this.currentPlayers.push(player)
    }

    public onSelectCurrentPlayer(player: Player){
        console.log('player',player)
    }

    public createPlayer(){
        const player = {
            ...this.playerFormGroup.value,
            currentBetPrice: 0,
        }
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player: player
        }))
        this.currentPlayers.push(player)
        this.playerFormGroup.reset();
    }

    public createTournament(){
        const tournament: Tournament = {
            ...this.tournamentFormGroup.value,
            players: [...this.currentPlayers].map(p => p.id)
        }
        this.tournamentStore.dispatch(TournamentPageActions.CreateTournament({
            tournament: tournament
        }))
    }

    public updateTournament(){
        const tournament: Tournament = {
            ...this.tournamentFormGroup.value,
            players: [...this.currentPlayers]
        }
        // this.tournamentListService.updateTournament(tournament);
        this.router.navigate(['/tournament-list/' + tournament.id]);
    }

}