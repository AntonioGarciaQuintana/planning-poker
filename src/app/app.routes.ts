import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { authGuard } from './guard/auth.guard';
import { RoomComponent } from './components/room.component';
import { JoinRoomComponent } from './components/join-room.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[authGuard]  },
  { path: 'room/:id', component: RoomComponent},
  { path: 'join/:roomId', component: JoinRoomComponent},
  { path: '**', redirectTo: 'login' },
];
