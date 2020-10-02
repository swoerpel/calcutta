import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { Store } from '@ngrx/store';
import { GetCreatePlayerError, GetAllPlayers, GetCreatePlayerSuccess } from 'src/app/state/player/player.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/operators';
import { PlayerPageActions } from 'src/app/state/player/actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/error-snackbar/error-snackbar.component';


@Component({
    selector: 'manage-player-list',
    templateUrl: './manage-player-list.component.html',
    styleUrls: ['./manage-player-list.component.scss']
})
export class ManagePlayerListComponent implements OnInit {
    
    public fargoRating = {
        min:300,
        max:800,
    }

    public testPlayer = {
        firstName:'stetson',
        lastName: 'carlson',
        fargoRating: 555,
    }

    public players$: Observable<Player[]>;

    public selectedPlayer: Player = {
        firstName: null,
        lastName: null,
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
    
    public playerList: Player[] = [];

    constructor(
        private playerStore: Store<PlayerState>,
        private snackBar: MatSnackBar,
    ) {}
    
    ngOnInit(){
        this.playerStore.select(GetAllPlayers).pipe(
            filter(p => !!p),
            filter(p => p.length !== 0),
            tap(p => this.playerList = p),
        ).subscribe();

        this.snackbarError = this.playerStore.select(GetCreatePlayerError).pipe(
            filter(e => !!e),
            tap(err => this.displaySnackbar(err))
        )
    }

    public onSelectPlayer(player: Player){
        this.selectedPlayer = player;
        this.playerFormGroup.patchValue({...player});
    }

    public createPlayer(){
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player: {
                ...this.playerFormGroup.value,
            }
        }))
        // COMMENTED OUT FOR TESTING EASE
        this.playerFormGroup.reset();
    }

    public updatePlayer(){
        this.playerStore.dispatch(PlayerPageActions.UpdatePlayer({player: {
            ...this.selectedPlayer,
            ...this.playerFormGroup.value
        }}));
        this.playerFormGroup.reset();
        
    }

    public deletePlayer() {
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