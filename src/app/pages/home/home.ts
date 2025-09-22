import { Component } from '@angular/core';
import { CreateRoomComponent } from '../../components/create-room.component';

@Component({
  selector: 'app-home',
  imports: [CreateRoomComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
