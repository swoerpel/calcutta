
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { Tournament } from '../models/tournament.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(
        private firebaseAuth: AngularFireAuth,
        private db: AngularFirestore,
    ){

    }

    login(email, password): Observable<any>{
        return from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(
            switchMap((authResponse: any)=> {
                return from(this.db.collection<any>('users').doc(authResponse.user.uid).get()).pipe(
                    map((userDB) => {
                        return {
                            ...userDB.data(),
                            id: authResponse.user.uid
                        }
                    })
                )
            }),
        )
    }

    logout(): Observable<any> {
        return from(this.firebaseAuth.signOut());
    }

    register(firstName, lastName, email, password): Observable<User>{
        return from(this.firebaseAuth.createUserWithEmailAndPassword(email, password)).pipe(
            switchMap(()=> {
                return from(this.db.collection<any>('users').add({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    maxBetValue: 0,
                })).pipe(map((user) => {
                    return {
                        id: user.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        maxBetValue: 0,
                    }
                }))
            }),
        )
    }

    assignUserPrivileges(userId: string): Observable<boolean>{
       return from(this.db.collection<any>('private').doc('roles').get()).pipe(
            map((res) =>   Object.keys(res.data()).includes(userId)))
    }


    loadUsers(): Observable<any[]>{
        return from(this.db.collection<any>('users').get()).pipe(
            map((usersDB)=> usersDB.docs.map((user) => {
                return {
                    ...user.data(),
                    id: user.id
                }
            }))
        );
    }


}