import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router){}

    canActivate(next, state): Observable<boolean> {
        return(of(true))
        // return this.auth.user$.pipe(
        //     take(1),
        //     map(user => !!user),
        //     tap(loggedIn => {
        //         // console.log('loggedIn route guard', loggedIn)
        //         if(!loggedIn){
        //             console.log('access denied')
        //             this.router.navigate(['/login']);
        //         }
        //     })
        // )
    }
}