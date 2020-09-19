import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, map, first } from 'rxjs/operators';
import * as moment from 'moment';
import { Player } from 'src/app/models/player.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { Store } from '@ngrx/store';
import { TournamentPageActions } from 'src/app/state/tournament/actions';


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

    public testPlayer = {
        firstName:'stetson',
        lastName: 'carlson',
        fargoRating: 555,
        currentBetPrice: 0,
    }

    public currentPlayers: Player[] = [this.testPlayer];

    public selectedPlayer: Player = {
        firstName: 'selected',
        lastName: 'player',
    };

    public tournamentFormGroup = new FormGroup({
        name: new FormControl('big huge tournament', [Validators.required,]),
        roomName: new FormControl('ball room', [Validators.required,]),
        endTime: new FormControl('12:00 AM', [Validators.required,]),
        duration: new FormControl('', [Validators.required,]),
        id: new FormControl('new-tournament', [Validators.required,]),
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

    public tournaments: Observable<Tournament[]>;
    
    constructor(
        private router: Router,
        // public tournamentListService:TournamentListService,
        private db: AngularFirestore,
        private tournamentStore: Store<TournamentState>
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

        // this.tournaments = this.db.collection<any>('tournaments').valueChanges()
        // console.log('this.tournaments',this.tournaments)

        // let tournamentId = this.router.routerState.snapshot.url.split('/')[2];
        // this.tournamentFormGroup.patchValue({id: tournamentId})
        // if(tournamentId !== "new-tournament"){
        //     const tournament = this.tournamentListService.tournaments.find(t => t.id === tournamentId);
        //     this.tournamentFormGroup.patchValue({
        //         ...tournament,
        //     })
        //     this.currentPlayers = [...tournament.players];
        // }
    }


    public onSelectPlayer(player: Player){
        this.selectedPlayer = player;
        this.playerFormGroup.patchValue({...player});
    }

    public addPlayer(){
        const newPlayer = {
            ...this.playerFormGroup.value,  
            currentBetPrice: 0,
        };
        this.currentPlayers.push(newPlayer)
        this.playerFormGroup.reset();
    }

    public updatePlayer(){
        this.currentPlayers = this.currentPlayers.map((player) => {
            if(
                player.firstName === this.selectedPlayer.firstName &&
                player.lastName === this.selectedPlayer.lastName
            ){
                return {
                    ...this.playerFormGroup.value,
                    currentBetPrice: 0,
                }
            }
            return player;
        })
        this.playerFormGroup.reset();
    }

    public deletePlayer(){
        this.currentPlayers = this.currentPlayers.filter(player => 
            player.firstName !== this.playerFormGroup.value.firstName &&
            player.lastName !== this.playerFormGroup.value.lastName
        )
        this.playerFormGroup.reset();
    }

    public createTournament(){
        const tournament: Tournament = {
            ...this.tournamentFormGroup.value,
            players: []
        }
        console.log('tournament');
        this.tournamentStore.dispatch(TournamentPageActions.CreateTournament({
            tournament: tournament
        }))
        // const newId = this.tournamentListService.createTournament(tournament);
        // this.router.navigate(['/tournament-list/' + newId]);
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