import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningPokerService } from '../services/planning-poker.service';
import { Room } from '../models/room.model';
import { environment } from '../../environments/environment';
import { Participant } from '../models/participant.model';
import { EstimationDeck } from '../models/estimation-deck';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  imports: [NgClass],
})
export class RoomComponent implements OnInit {
  roomId: string | null = null;
  participantList: Array<Participant> = [];
  actualParticipant: Participant | null = null;
  actualRoom: Room | null = null;
  cards: Array<string | number> = [];

  private readonly route = inject(ActivatedRoute);
  private readonly planningPokerService = inject(PlanningPokerService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.cards = EstimationDeck.getDeck('fibonacci');
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.findRoom();
  }

  findRoom() {
    this.planningPokerService.getRoomById(this.getRoomActualValue()).subscribe((result) => {
      this.actualRoom = result;
      console.log('actualRoom', this.actualRoom);
      this.participantList = Object.values(result?.participants ?? {});
      this.existPartipant();
    });
  }

  startEstimation() {
    this.planningPokerService.updateRoom(this.getRoomActualValue(), {
      startEstimation: true,
      reveal: false,
    });

    this.resetEstimationParticipant();
  }

  revealEstimation() {
    this.planningPokerService.updateRoom(this.getRoomActualValue(), {
      startEstimation: false,
      reveal: true,
    });
  }

  invite() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copy', url);
      })
      .catch((error) => {
        console.error('Error to copu URL', error);
      });
  }

  selectCard(card: string | number) {
    this.actualParticipant!.estimation = card;
    console.log('Card seleccionada:', card);

    this.planningPokerService.updateParticipantEstimation(this.getRoomActualValue(), {
      ...this.actualParticipant!,
      estimation: card,
    });
  }

  existPartipant() {
    const participantSession = localStorage.getItem(environment.participantSession);

    if (!participantSession) {
      this.goToJoinPage();
    }

    const isJoined = this.participantList.find((element) => element.session === participantSession);

    if (!isJoined) {
      this.goToJoinPage();
    } else {
      this.actualParticipant = isJoined;
      console.log('ActualParcicipant:', this.actualParticipant);
    }
  }

  resetEstimationParticipant(){
    this.planningPokerService.resetParticipants(this.getRoomActualValue(), this.participantList);
  }

    private goToJoinPage() {
    this.router.navigate(['/join', this.getRoomActualValue()]);
  }

  private getRoomActualValue(){
    return this.roomId ?? '';
  }
}
