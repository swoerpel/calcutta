import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Player } from 'src/app/models/player.model';
import { UpdatePlayerBetValue } from 'src/app/state/player/actions/player-page.actions';
import { PlayerState } from 'src/app/state/player/player.reducer';

@Component({
    selector: 'player-tile',
    templateUrl: './player-tile.component.html',
    styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent implements OnInit {

    @Input() player:Player;
    public topBidder: Player = {
        firstName: 'Stetson',
        lastName: 'W',
    };

    public tiles: any = {
        title: {text: 'Title', cols: 3, rows: 1, color: 'lightblue'},
        value:{text: 'Value', cols: 1, rows: 1, color: 'lightgreen'},
        betting: {text: 'Betting', cols: 4, rows: 1, color: '#DDBDF1'},
    };

    public betInput: FormControl = new FormControl(0,[Validators.required])

    constructor(
        private playerStore: Store<PlayerState>,
    ) {}

    ngOnInit(){

    }

    onUpdateBetValue(){

        this.playerStore.dispatch(UpdatePlayerBetValue({
            playerId: this.player.id,
            betValue: this.betInput.value
        }));
    }
}



//++++++++++++++++++++++++++++++++++++++++++++
// 1: give players collection of bet values per tournament ID they are in
// 2: add integration with User to display top bidders name
// 3: Add "start betting time" button when editing a tournament
// 4: Add elapse timer on tournament view 