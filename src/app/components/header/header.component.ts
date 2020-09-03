import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public userIsAdmin: boolean = true;
    
    constructor(
        private router: Router,
        private auth: AuthService,
    ) {}

    ngOnInit(){
        this.auth.user$.pipe(
            tap((user) => {
                // console.log('user logged in',user)
            })
        ).subscribe();
    }

    public logout(){
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    public navigateHome(){
        this.router.navigate(['/room-list']);
    }

    public createRoom(){
        this.router.navigate(['/create-room']);
    }

}