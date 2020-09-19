import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { Store } from '@ngrx/store';
import { GetPlayers } from 'src/app/state/player/player.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/operators';
import { PlayerPageActions } from 'src/app/state/player/actions';


@Component({
    selector: 'player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
    
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

    public players: Observable<Player[]>;

    public selectedPlayer: Player = {
        firstName: 'selected',
        lastName: 'player',
    };

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
        private playerStore: Store<PlayerState>
    ) {}
    
    ngOnInit(){
        this.players = this.playerStore.select(GetPlayers).pipe(
            filter(p => !!p),
            tap(p => console.log('p',p))
        );
    }

    public onSelectPlayer(player: Player){
        console.log('player',player)
        this.playerFormGroup.patchValue({...player});
    }

    public createPlayer(){
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player:{
                ...this.playerFormGroup.value,  
                currentBetPrice: 0,
            }
        }))
        // this.currentPlayers.push(newPlayer)
        // this.playerFormGroup.reset();
    }

    public updatePlayer(){
        // this.currentPlayers = this.currentPlayers.map((player) => {
        //     if(
        //         player.firstName === this.selectedPlayer.firstName &&
        //         player.lastName === this.selectedPlayer.lastName
        //     ){
        //         return {
        //             ...this.playerFormGroup.value,
        //             currentBetPrice: 0,
        //         }
        //     }
        //     return player;
        // })
        // this.playerFormGroup.reset();
    }

    public deletePlayer(){
        // this.currentPlayers = this.currentPlayers.filter(player => 
        //     player.firstName !== this.playerFormGroup.value.firstName &&
        //     player.lastName !== this.playerFormGroup.value.lastName
        // )
        // this.playerFormGroup.reset();
    }


}