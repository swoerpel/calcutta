import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { SettingsPageComponent } from './pages/settings/settings.component';
import { ManagePlayerListComponent } from './pages/manage-player-list/manage-player-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'settings', component: SettingsPageComponent, canActivate: [LoggedInGuard]},
  {path: 'manage-player-list', component: ManagePlayerListComponent, canActivate: [LoggedInGuard]},
  {path: 'tournament-list', component: TournamentListComponent, canActivate: [LoggedInGuard]},
  {path: 'tournament-list/:tournament_id', component: TournamentComponent, canActivate: [LoggedInGuard]},
  {path: 'create-tournament/:tournament_id', component: CreateTournamentComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
