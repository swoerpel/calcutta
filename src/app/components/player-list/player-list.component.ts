import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
export class PlayerListComponent implements OnChanges {
    @Input() playerList: Player[];
    @Output() playerSelected: EventEmitter<Player> = new EventEmitter();

    public playerInput: string;

    public tournaments: Observable<Tournament[]>;
    public snackbarError: Observable<any>;
    
    constructor() {}
    
    public onSelectPlayer(player: Player){
        this.playerSelected.emit(player)
    }

    ngOnChanges(){
    }


}