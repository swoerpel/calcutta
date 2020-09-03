import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { RoomComponent } from './pages/room/room.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { CreateRoomComponent } from './pages/create-room/create-room.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'room-list', component: RoomListComponent, canActivate: [LoggedInGuard]},
  {path: 'create-room', component: CreateRoomComponent, canActivate: [LoggedInGuard]},
  {path: 'room-list/:room_id', component: RoomComponent, canActivate: [LoggedInGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
