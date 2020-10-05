import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, filter, switchMap, takeUntil, map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { Player } from 'src/app/models/player.model';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { Store } from '@ngrx/store';
import { TournamentPageActions } from 'src/app/state/tournament/actions';
import { PlayerState } from 'src/app/state/player/player.reducer';
import { GetAllPlayers, GetPlayerSet, GetTempPlayerList } from 'src/app/state/player/player.selectors';
import { PlayerPageActions } from 'src/app/state/player/actions';
import { GetCurrentTournament } from 'src/app/state/tournament/tournament.selectors';
import { AddTempPlayer, RemoveTempPlayer, ResetTempPlayerList, SetTempPlayerList } from 'src/app/state/player/actions/player-page.actions';
import * as _ from 'lodash';

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
    public currentPlayers$: Observable<Player[]>;
    public existingPlayers$: Observable<Player[]>;
    public createPlayerDropdownOpen: boolean = false;
    public existingPlayerListDropdownOpen: boolean = false;
    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private router: Router,
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>
    ) {}
    
    ngOnInit(){
        this.tournament_id = this.router.routerState.snapshot.url.split('/')[2];

        // this.tournamentStore.select(GetCurrentTournament).pipe(
        //     tap((tournament: Tournament) => {
        //         if(tournament?.players !== undefined){
        //             this.tournamentFormGroup.patchValue({...tournament})
        //             console.log('easer', _.pick(tournament.players, 'playerId'))
        //             this.playerStore.dispatch(SetTempPlayerList({playerIds: tournament.players.map(p => p.playerId)}));
        //         }else
        //             this.playerStore.dispatch(SetTempPlayerList({playerIds: []}));
        //     }),
        //     takeUntil(this.unsubscribe),
        // ).subscribe();

        this.currentPlayers$ = this.playerStore.select(GetTempPlayerList);

        this.existingPlayers$ = combineLatest([
            this.playerStore.select(GetAllPlayers).pipe(filter(p => !!p)),
            this.currentPlayers$.pipe(filter(p => !!p)),
        ]).pipe(
            map(([existingPlayers, currentPlayers]) => {
                let currentPlayerIds: string[] = currentPlayers.map(p => p.id);
                return existingPlayers.filter((p: Player)=> currentPlayerIds.indexOf(p.id) === -1);
            }),
        )

        this.tournamentFormGroup.controls.endTime.valueChanges.pipe(
            tap((endTimeValue) => {
                let endTime = moment(endTimeValue, ["hh:mm A"]).format("HH:mm");
                let currentTime = moment().format("HH:mm");
                let differenceTime = moment.utc(moment(endTime,"HH:mm").diff(moment(currentTime,"HH:mm"))).format('h [hours] m [minutes]');
                this.tournamentFormGroup.controls.duration.setValue(differenceTime);
            }),
            takeUntil(this.unsubscribe),
        ).subscribe();

    }
    
    ngOnDestroy() {
        this.playerStore.dispatch(ResetTempPlayerList());
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
        this.playerStore.dispatch(AddTempPlayer({player:player}))
    }

    public onSelectCurrentPlayer(player: Player){

    }

    public onRemovePlayer(player: Player){
        this.playerStore.dispatch(RemoveTempPlayer({player:player}))
    }

    public createPlayer(){
        this.playerStore.dispatch(PlayerPageActions.CreatePlayer({
            player: this.playerFormGroup.value
        }))
        this.playerFormGroup.reset();
    }

    public createTournament(currentPlayers){
        const tournament: Tournament = {
            ...this.tournamentFormGroup.value,
            players: [...currentPlayers].map(p => p.id)
        }
        if(this.tournament_id === 'new-tournament'){
            this.tournamentStore.dispatch(TournamentPageActions.CreateTournament({
                tournament: tournament
            }))
        }else {
            this.tournamentStore.dispatch(TournamentPageActions.UpdateTournament({
                tournament: {
                    ...tournament,
                    id: this.tournament_id
                }
            }))
        }
    }

    public deleteTournament(){
        this.tournamentStore.dispatch(TournamentPageActions.DeleteTournament({tournamentId: this.tournament_id}))
    }

}