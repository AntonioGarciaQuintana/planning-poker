import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private baseUrl = 'https://avataaars.io/';

  private options = {
    topType: ['ShortHairDreads01', 'LongHairStraight', 'Hat', 'Hijab'],
    accessoriesType: ['Blank', 'Prescription01', 'Sunglasses'],
    hairColor: ['Brown', 'Black', 'Blonde'],
    clotheType: ['Hoodie', 'BlazerShirt', 'ShirtCrewNeck'],
    clotheColor: ['Blue03', 'Gray02', 'PastelRed'],
    eyeType: ['Happy', 'Squint', 'Surprised'],
    eyebrowType: ['Default', 'Angry', 'SadConcerned'],
    mouthType: ['Smile', 'Serious', 'Twinkle'],
    skinColor: ['Light', 'DarkBrown', 'Brown']
  };

  getRandomAvatar(): string {
    const params = Object.entries(this.options)
      .map(([key, values]) => {
        const value = values[Math.floor(Math.random() * values.length)];
        return `${key}=${value}`;
      })
      .join('&');

    return `${this.baseUrl}?avatarStyle=Circle&${params}`;
  }
}