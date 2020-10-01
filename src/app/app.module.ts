import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayerTileComponent } from './components/player-tile/player-tile.component';
import { ManagePlayerListComponent } from './pages/manage-player-list/manage-player-list.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { SettingsPageComponent } from './pages/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { FilterPlayersModule, FilterTournamentsModule } from './pipes/filter-objects/filter-objects.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SnackbarErrorComponent} from './shared/error-snackbar/error-snackbar.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { userReducer } from './state/user/user.reducer';
import { tournamentReducer } from './state/tournament/tournament.reducer';
import { playerReducer } from './state/player/player.reducer';
import { UserEffects } from './state/user/user.effects';
import { TournamentEffects } from './state/tournament/tournament.effects';
import { PlayerEffects } from './state/player/player.effects';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerApiService } from './services/playerApi.service';



export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    ManagePlayerListComponent,
    PlayerListComponent,
    SettingsPageComponent,  
    TournamentListComponent,
    TournamentComponent,
    PlayerTileComponent,
    SnackbarErrorComponent,
    CreateTournamentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase,() => 'calcutta_factory',environment.firebase_auth),
    AngularFireAuthModule,
    AngularFirestoreModule,    
    FilterPlayersModule, 
    FilterTournamentsModule, 

    // ngrx modules
    StoreModule.forRoot({
      user: userReducer,
      tournament: tournamentReducer,
      player: playerReducer,
      router: routerReducer,
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      TournamentEffects,
      PlayerEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Calcutta',
      maxAge: 25,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    PlayerApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
