import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router){}

    canActivate(next, state): Observable<boolean> {
        // return(of(true))
        return this.auth.user$.pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                // console.log('loggedIn route guard', loggedIn)
                if(!loggedIn){
                    console.log('access denied')
                    this.router.navigate(['/login']);
                }
            })
        )
    }
}