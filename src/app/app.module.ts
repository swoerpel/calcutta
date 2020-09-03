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
import { LoginPageComponent } from './pages/login/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module';
import { RoomComponent } from './pages/room/room.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { FilterObjectsModule } from './pipes/filter-objects/filter-objects.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomListService } from './services/room-list.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SnackbarErrorComponent} from './shared/error-snackbar/error-snackbar.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';

// create room - admin
import { TimeControlComponent } from './components/time-control/time-control.component';
import { PlayerControlComponent } from './components/player-control/player-control.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    RoomListComponent,
    RoomComponent,
    PlayerTileComponent,
    SnackbarErrorComponent,
    CreateRoomComponent,
    TimeControlComponent,
    PlayerControlComponent,
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
    FilterObjectsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoomListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
