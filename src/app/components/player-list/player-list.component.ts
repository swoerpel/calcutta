import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';


@Component({
    selector: 'player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnChanges {
    @Input() playerList: Player[];
    @Input() secondaryAction: boolean = false;
    @Output() playerSelected: EventEmitter<Player> = new EventEmitter();
    @Output() secondaryActionEvent: EventEmitter<Player> = new EventEmitter();

    public playerInput: string;

    public tournaments: Observable<Tournament[]>;
    public snackbarError: Observable<any>;
    
    constructor() {}
    
    public onSelectPlayer(player: Player){
        this.playerSelected.emit(player)
    }
    
    public onSecondaryAction(player: Player){
        this.secondaryActionEvent.emit(player)
    }

    ngOnChanges(){
    }


}