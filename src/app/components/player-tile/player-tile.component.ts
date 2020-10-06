import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ActivePlayer } from 'src/app/models/active-player.model';
import { Player } from 'src/app/models/player.model';
import { UpdatePlayerBetValue } from 'src/app/state/player/actions/player-page.actions';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { GetPlayerBetValue } from 'src/app/state/player/player.selectors';
import { UserState } from 'src/app/state/user/user.reducer';
import { GetUserFullName } from 'src/app/state/user/user.selectors';

@Component({
    selector: 'player-tile',
    templateUrl: './player-tile.component.html',
    styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent implements OnInit {

    @Input() player:ActivePlayer;

    public betValue = 0;

    public topBidder = {
        firstName: 'Stetson',
        lastName: 'W',
    };

    public tiles: any = {
        title: {text: 'Title', cols: 3, rows: 1, color: 'lightblue'},
        value:{text: 'Value', cols: 1, rows: 1, color: 'lightgreen'},
        betting: {text: 'Betting', cols: 4, rows: 1, color: '#DDBDF1'},
    };

    public betInput: FormControl = new FormControl(0,[Validators.required])
    public tournamentId: string = null;
    public maxBetValueUserFullName: Observable<any>;

    constructor(
        private playerStore: Store<PlayerState>,
        private userStore: Store<UserState>,
        private router: Router
    ) {}

    ngOnInit(){
        this.maxBetValueUserFullName = this.userStore.select(GetUserFullName,{userId: this.player.maxBetUserId}).pipe(
            filter(p => !!p),
        )
    }

    onUpdateBetValue(){
        // console.log('this.betInput.value',this.betInput.value)
        // this.playerStore.dispatch(UpdatePlayerBetValue({
        //     playerId: this.player.id,
        //     tournamentId: this.tournamentId,
        //     betValue: this.betInput.value,
        // }));
    }
}



//++++++++++++++++++++++++++++++++++++++++++++
// 1: give players collection of bet values per tournament ID they are in
// 2: add integration with User to display top bidders name
// 3: Add "start betting time" button when editing a tournament
// 4: Add elapse timer on tournament view 