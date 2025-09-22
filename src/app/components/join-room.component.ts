import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarService } from '../services/avatar.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Participant } from '../models/participant.model';
import { PlanningPokerService } from '../services/planning-poker.service';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class JoinRoomComponent implements OnInit {
  roomId: string | null = null;
  avatarUrl: string | null = null;
  form: FormGroup = new FormGroup({});

  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly avatarService = inject(AvatarService);
  private readonly plannigPokerService = inject(PlanningPokerService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.createForm();
    this.generateAvatar();
  }

  generateAvatar() {
    this.avatarUrl = this.avatarService.getRandomAvatar();
  }

  createForm() {
    let participantSession = localStorage.getItem(environment.participantSession);

    if (!participantSession) {
      participantSession = uuidv4();
    }

    this.form = this.formBuilder.group({
      session: new FormControl(participantSession, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }


  joinRoom(){
    const model = this.getModel();
    this.plannigPokerService.joinRoom(this.getRoomId(), model).then(() =>{
        localStorage.setItem(environment.participantSession, model.session ?? '');
        this.router.navigate(['/room', this.getRoomId()]);
    });
  }

  private getModel(){
    const model: Participant = this.form.value;
    model.avatar = this.avatarUrl ?? '';
    model.estimation = '0',
    model.estimationApplied = false;
    return model;
  }


  private getRoomId(){
    return this.roomId ?? '';
  }
}
