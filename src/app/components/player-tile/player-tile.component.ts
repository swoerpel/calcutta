import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
    selector: 'player-tile',
    templateUrl: './player-tile.component.html',
    styleUrls: ['./player-tile.component.scss']
})
export class PlayerTileComponent implements OnInit {

    @Input() player:Player;

    constructor() {}

    ngOnInit(){
        console.log(this.player)
    }
}