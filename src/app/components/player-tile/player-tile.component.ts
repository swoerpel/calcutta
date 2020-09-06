import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

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
        id: '11111111',
        currentBetPrice: 135,
        fargoRating: 455,
    };

    public tiles: any = {
        title: {text: 'Title', cols: 3, rows: 1, color: 'lightblue'},
        value:{text: 'Value', cols: 1, rows: 1, color: 'lightgreen'},
        betting: {text: 'Betting', cols: 4, rows: 1, color: '#DDBDF1'},
    };


    constructor() {}

    ngOnInit(){
        console.log(this.player)
    }
}