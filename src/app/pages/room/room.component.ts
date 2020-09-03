import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { RoomListService } from 'src/app/services/room-list.service';
import { Room } from 'src/app/models/room.model';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

    public filterPlayer:string;
    public currentRoom: Observable<Room>;

    constructor(
        private route: ActivatedRoute,
        public roomListService: RoomListService,
    ) {}

    ngOnInit(){
        console.log(this.route.params)
        this.currentRoom = this.route.params.pipe(
            map(d => this.roomListService.rooms.find(r => r.id === d.room_id))
        )
        console.log(this.roomListService.rooms)
    }
}