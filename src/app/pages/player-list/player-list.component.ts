import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { Store } from '@ngrx/store';
import { GetCreatePlayerError, GetPlayers } from 'src/app/state/player/player.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/operators';
import { PlayerPageActions } from 'src/app/state/player/actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/error-snackbar/error-snackbar.component';


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
    public snackbarError: Observable<any>;
    
    constructor(
        private playerStore: Store<PlayerState>,
        private snackBar: MatSnackBar,
    ) {}
    
    ngOnInit(){
        this.players = this.playerStore.select(GetPlayers).pipe(
            filter(p => !!p),
            tap(p => console.log('p',p))
        );

        this.snackbarError = this.playerStore.select(GetCreatePlayerError).pipe(
            filter(e => !!e),
            tap(err => this.displaySnackbar(err))
        )

        this.snackbarError.subscribe();
        this.playerFormGroup.statusChanges.pipe(tap(s => console.log('s',s))).subscribe();
    }

    public onSelectPlayer(player: Player){
        console.log('player',player)
        this.selectedPlayer = player;
        this.playerFormGroup.patchValue({...player});
    }

    public createPlayer(){
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player: {
                ...this.playerFormGroup.value,
                currentBetPrice: 0,
            }
        }))

        // COMMENTED OUT FOR TESTING EASE
        // this.playerFormGroup.reset();
    }


    public updatePlayer(){
        console.log("Player to Overwrite ->",this.selectedPlayer); 
        
        let updatedPlayer = {
            ...this.selectedPlayer,
            ...this.playerFormGroup.value
        }
        console.log('Overwritten Player ->',updatedPlayer)
        this.playerStore.dispatch(PlayerPageActions.UpdatePlayer({player: updatedPlayer}));
        //     player: {
        //         ...this.selectedPlayer,

                
        //     }
        // }))
        // this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
        //     player: {
        //         ...this.playerFormGroup.value,
        //         currentBetPrice: 0,
        //     }
        // }))
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

    public deletePlayer() {
        console.log('delete player',this.selectedPlayer);
        this.playerStore.dispatch(PlayerPageActions.DeletePlayer({player: this.selectedPlayer}))
        this.playerFormGroup.reset();
    }



    private displaySnackbar(error_code, isSuccess = false) {
        let message ='Error Occured';
        if(error_code === 'duplicate player'){
            message = 'Player already in list'
        }
        const snackBarRef = this.snackBar.openFromComponent(SnackbarErrorComponent,{
            data:{
                message: message,
                isSuccess: isSuccess,
            }
        });
        setTimeout(() => snackBarRef.dismiss(), 2000);
        
    }

}