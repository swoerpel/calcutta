import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
    public user$: Observable<any>;

    constructor(
        private firebaseAuth: AngularFireAuth,
    ) {
        this.user$ = this.firebaseAuth.authState;
        this.firebaseAuth.onAuthStateChanged((user) => {
            console.log('user',user)
        })
    }

    public register(email: string, password: string) {
        return from(this.firebaseAuth.createUserWithEmailAndPassword(email, password));
    }

    public login(email: string, password: string) {
        return from(this.firebaseAuth.signInWithEmailAndPassword(email, password));
    }

    public logout() {
        this.firebaseAuth.signOut();
    }

}


