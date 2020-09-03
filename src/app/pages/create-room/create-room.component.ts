import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { ActivatedRoute } from '@angular/router';
import { RoomListService } from 'src/app/services/room-list.service';
import { map, filter, tap } from 'rxjs/operators';
import { Player } from 'src/app/models/player.model';

@Component({
    selector: 'create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
    
    // public currentRoom: Observable<Room>;
    public currentRoom: Room;

    constructor(
        private route: ActivatedRoute,
        public roomListService: RoomListService,
    ) {}

    ngOnInit(){
        const roomId = '111111';
        this.currentRoom = this.roomListService.rooms.find(room => room.id === roomId)
        console.log('currentRoom',this.currentRoom)
    }
}