/**
 * Types for Sheetal and Prathamesh Wedding Invitation Website
 */

export enum Language {
  KANNADA = 'KANNADA',
  ENGLISH = 'ENGLISH'
}

export interface GuestRsvp {
  id?: string;
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  foodPreference: 'veg' | 'non-veg' | 'not-applicable';
  blessing: string;
  createdAt?: string;
}

export interface WeddingEvent {
  titleEn: string;
  titleKn: string;
  dateEn: string;
  dateKn: string;
  timeEn: string;
  timeKn: string;
  locationEn: string;
  locationKn: string;
  gmapsLink: string;
  descriptionEn: string;
  descriptionKn: string;
}
