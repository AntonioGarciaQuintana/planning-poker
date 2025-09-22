import { Participant } from "./participant.model";

export class Room {
    id?: string;
    name?: string;
    roomType?: string;
    reveal?: boolean;
    startEstimation?: boolean;
    participants?: Array<Participant>
}