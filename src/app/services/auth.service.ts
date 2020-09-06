import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

export class Item {
    body: string;
}


@Injectable()
export class AuthService {
    public user$: Observable<any>;

    constructor(
        private firebaseAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private fireDatabase: AngularFireDatabase,
    ) {
        this.user$ = this.firebaseAuth.authState.pipe(
            switchMap(user => {
                console.log('USER ->',user)
                if(user){
                    return this.firestore.doc<any>(`user/${user.uid}`).valueChanges();
                }
                return of(null);
            })
        );
        console.log('fireDatabase',this.fireDatabase);
        this.user$.subscribe();
        this.firebaseAuth.onAuthStateChanged((user) => {
            // console.log('user',user)
        })
        const tourneys = firestore.collection('tournaments')
        console.log('tourneys',tourneys)

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


