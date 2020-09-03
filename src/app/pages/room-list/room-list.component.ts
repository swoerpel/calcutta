import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomListService } from 'src/app/services/room-list.service';


@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    
    filterRoom:string;

    constructor(
        public roomListService: RoomListService,
        private router: Router,
        
    ) {}
    ngOnInit(){
    }

    public onSelectRoom(roomId){
        this.router.navigate(['/room-list', roomId]);
    }
}