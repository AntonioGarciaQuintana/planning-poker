import { inject, Injectable } from '@angular/core';
import { Tutorial } from '../models/tutorial.model';
import {
  Database,
  equalTo,
  list,
  listVal,
  objectVal,
  orderByChild,
  push,
  query,
  ref,
  set,
  update,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { orderBy } from '@angular/fire/firestore';
import { Participant } from '../models/participant.model';

@Injectable({
  providedIn: 'root',
})
export class PlanningPokerService {
  private readonly db = inject(Database);
  private readonly dbPah = '/tutorials';
  private readonly dbRoomPath = 'rooms';

  constructor() {}

  getAll(): Observable<Array<Tutorial>> {
    return listVal<Tutorial>(ref(this.db, this.dbPah));
  }

  create(tutorial: Tutorial): any {
    return push(ref(this.db, this.dbPah), tutorial);
  }

  createRoom(roomModel: Room): Promise<any> {
    const roomRef = ref(this.db, `${this.dbRoomPath}/${roomModel.id}`);

    return set(roomRef, {
      name: roomModel.name,
      roomType: roomModel.roomType,
      reveal: roomModel.reveal,
      participants: roomModel.participants,
      startEstimation: false,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  joinRoom(roomId: string, participant: Participant): Promise<any> {
    const participantRef = ref(
      this.db,
      `${this.dbRoomPath}/${roomId}/participants/${participant.session}`
    );
    return set(participantRef, {
      session: participant.session,
      name: participant.name,
      avatar: participant.avatar,
      estimation: participant.estimation,
      estimationApplied: participant.estimationApplied,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  getAllParticipantByRoom(roomId: string): Observable<Array<Participant>> {
    return listVal<Participant>(ref(this.db, `${this.dbRoomPath}/${roomId}/participants`));
  }

  getRoomById(idRoom: string): Observable<Room | null> {
    const roomRef = ref(this.db, `${this.dbRoomPath}/${idRoom}`);
    return objectVal<Room>(roomRef);
  }

  updateRoom(roomId: string, partialRoom: Partial<Room>): Promise<any> {
    const roomRef = ref(this.db, `${this.dbRoomPath}/${roomId}`);

    return update(roomRef, partialRoom)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  updateParticipantEstimation(roomId: string, participant: Participant): Promise<any> {
    const participantRef = ref(
      this.db,
      `${this.dbRoomPath}/${roomId}/participants/${participant.session}`
    );

    return update(participantRef, {
      estimation: participant.estimation,
      estimationApplied: true,
    })
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  }

  resetParticipants(roomId: string, participants: Participant[]): Promise<any[]> {
  const updates = participants.map((p) => {
    const participantRef = ref(this.db, `rooms/${roomId}/participants/${p.session}`);
    return update(participantRef, { estimation: null, estimationApplied: false });
  });

  return Promise.all(updates);
}
}
