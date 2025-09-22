import { Component, inject, OnInit } from '@angular/core';
import { PlanningPokerService } from '../services/planning-poker.service';
import { Tutorial } from '../models/tutorial.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Room } from '../models/room.model';
import { Router } from '@angular/router';
import { Participant } from '../models/participant.model';

@Component({
  standalone: true,
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class CreateRoomComponent implements OnInit {
  tutorialList: Array<Tutorial> = [];
  form: FormGroup = new FormGroup({});

  private readonly planningPokerService = inject(PlanningPokerService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      roomType: new FormControl('fibonacci', Validators.required),
    });
  }

  getTutorials() {
    this.planningPokerService.getAll().subscribe((data) => {
      this.tutorialList = data;
    });
  }

  createRoom() {
    const model = this.getModel();
    console.log('rooom', model);
    this.planningPokerService
      .createRoom(model)
      .then(() => {
        this.router.navigate(['/room', model.id]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private getModel(): Room {
    const model: Room = this.form.value;
    model.reveal = false,
    model.participants = [];
    model.id = uuidv4();
    return model;
  }
}
