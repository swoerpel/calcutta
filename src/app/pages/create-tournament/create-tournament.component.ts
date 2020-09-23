import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, map, first, filter, switchMap, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Player } from 'src/app/models/player.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, Subject } from 'rxjs';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { Store } from '@ngrx/store';
import { TournamentPageActions } from 'src/app/state/tournament/actions';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { GetAllPlayers, GetPlayerSet } from 'src/app/state/player/player.selectors';
import { PlayerPageActions } from 'src/app/state/player/actions';
import { GetCurrentTournament } from 'src/app/state/tournament/tournament.selectors';


@Component({
    selector: 'create-tournament',
    templateUrl: './create-tournament.component.html',
    styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
    
    public fargoRating = {
        min:300,
        max:800,
    }

    public tournamentFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required,]),
        roomName: new FormControl('', [Validators.required,]),
        endTime: new FormControl('', [Validators.required,]),
        duration: new FormControl('', [Validators.required,]),
        // id: new FormControl('new-tournament', [Validators.required,]),
    }) 

    public playerFormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required,]),
        lastName: new FormControl('', [Validators.required]),
        fargoRating: new FormControl('', [
            Validators.required, 
            Validators.pattern('[0-9]+'),
            Validators.min(this.fargoRating.min),
            Validators.max(this.fargoRating.max),
        ]),
    });

    public tournament_id: string;
    public currentPlayers: Player[] = [];
    public existingPlayers: Player[];
    public createPlayerDropdownOpen: boolean = false;
    public existingPlayerListDropdownOpen: boolean = false;
    private refreshExistingPlayers$: Subject<void> = new Subject();
    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private router: Router,
        // public tournamentListService:TournamentListService,
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>
    ) {}
    
    ngOnInit(){
        this.tournament_id = this.router.routerState.snapshot.url.split('/')[2];
        if(this.tournament_id === 'new-tournament'){
            console.log('create new tournament',this.tournament_id);
        }else{
            this.tournamentStore.select(GetCurrentTournament).pipe(
                filter(t => !!t),
                switchMap((t) => {
                    this.tournamentFormGroup.patchValue({...t});
                    console.log("t",t.players)
                    return this.playerStore.select(GetPlayerSet,{playerIds: t.players})
                }),
                filter(p => !!p),
                takeUntil(this.unsubscribe),
                tap((players: Player[]) => this.currentPlayers = players)
            ).subscribe();
        }

        this.tournamentFormGroup.controls.endTime.valueChanges.pipe(
            tap((endTimeValue) => {
                let endTime = moment(endTimeValue, ["hh:mm A"]).format("HH:mm");
                let currentTime = moment().format("HH:mm");
                let differenceTime = moment.utc(moment(endTime,"HH:mm").diff(moment(currentTime,"HH:mm"))).format('h [hours] m [minutes]');
                this.tournamentFormGroup.controls.duration.setValue(differenceTime);
            }),
            takeUntil(this.unsubscribe),
        ).subscribe();

        combineLatest([
            this.playerStore.select(GetAllPlayers).pipe(filter(p => !!p),filter(p => p.length !== 0)),
            this.refreshExistingPlayers$,
        ]).pipe(
            tap(([p]) => this.existingPlayers = p.filter(pl => !this.currentPlayers.find(pla => pla.id === pl.id))),
            takeUntil(this.unsubscribe),
        ).subscribe();
        this.refreshExistingPlayers$.next();
    }
    
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public toggleAddPlayer(){
        this.createPlayerDropdownOpen = !this.createPlayerDropdownOpen;
    }

    public toggleExistingPlayerList(){
        this.existingPlayerListDropdownOpen = !this.existingPlayerListDropdownOpen;
    }

    public onSelectExistingPlayer(player: Player){
        this.currentPlayers.push(player)
        this.refreshExistingPlayers$.next();
    }

    public onSelectCurrentPlayer(player: Player){
        console.log('player',player)
    }

    public createPlayer(){
        const player = {
            ...this.playerFormGroup.value,
            currentBetPrice: 0,
        }
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player: player
        }))
        this.currentPlayers.push(player)
        this.playerFormGroup.reset();
    }

    public createTournament(){
        if(this.tournament_id === 'new-tournament'){
            const tournament: Tournament = {
                ...this.tournamentFormGroup.value,
                players: [...this.currentPlayers].map(p => p.id)
            }
            this.tournamentStore.dispatch(TournamentPageActions.CreateTournament({
                tournament: tournament
            }))
        }else {
            const tournament: Tournament = {
                ...this.tournamentFormGroup.value,
                players: [...this.currentPlayers].map(p => p.id),
                id: this.tournament_id
            }
            this.tournamentStore.dispatch(TournamentPageActions.UpdateTournament({
                tournament: tournament
            }))
        }
    }

    public updateTournament(){
        
        // const tournament: Tournament = {
        //     ...this.tournamentFormGroup.value,
        //     players: [...this.currentPlayers]
        // }
        // // this.tournamentListService.updateTournament(tournament);
        // this.router.navigate(['/tournament-list/' + tournament.id]);
    }

}