import { WeddingEvent } from "./types";

export interface TranslationSet {
  welcome: string;
  names: string;
  weddingDateLong: string;
  locationTitle: string;
  countdownDays: string;
  countdownHours: string;
  countdownMins: string;
  countdownSecs: string;
  countdownBefore: string;
  greetings: string;
  invitationNote: string;
  joinUsText: string;
  rsvpTitle: string;
  rsvpDesc: string;
  fullName: string;
  phone: string;
  accompanying: string;
  attendingStatus: string;
  attendingYes: string;
  attendingNo: string;
  foodPref: string;
  foodVeg: string;
  foodNonVeg: string;
  foodNA: string;
  blessingMsg: string;
  submitRsvp: string;
  rsvpCompleteTitle: string;
  rsvpCompleteDesc: string;
  blessingsTitle: string;
  blessingsDesc: string;
  timelineTitle: string;
  timelineSubtitle: string;
  adminTitle: string;
}

export const translations = {
  ENGLISH: {
    welcome: "You are cordially invited to the grand celebration of love",
    names: "Sheethal & Prathamesh",
    weddingDateLong: "Thursday, July 2, 2026",
    locationTitle: "Rani Channamma Samudaya Bhavan - Mangala Karyalaya, Vijayapur",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMins: "Mins",
    countdownSecs: "Secs",
    countdownBefore: "Counting down to the marriage of Sheethal & Prathamesh",
    greetings: "Hearty Welcome from the Rajaput Family",
    invitationNote: "Because you have shared in our lives by your friendship and love, we invite you to share our start of a new life together in holy wedlock.",
    joinUsText: "Join us for our special day on July 2, 2026",
    rsvpTitle: "Send Auspicious Blessings",
    rsvpDesc: "Send your love and blessings to illuminate Sheethal & Prathamesh's path.",
    fullName: "Full Name",
    phone: "Mobile Number",
    accompanying: "Guests accompanying",
    attendingStatus: "Attending status",
    attendingYes: "Yes 🌸",
    attendingNo: "Regretfully cannot make it ✉️",
    foodPref: "Meals Preference",
    foodVeg: "Vegetarian 🍏",
    foodNonVeg: "Non-Vegetarian 🍗",
    foodNA: "Not Applicable",
    blessingMsg: "Your Warm Wishes & Blessings for the Couple",
    submitRsvp: "Send Auspicious Blessings",
    rsvpCompleteTitle: "Thank You So Much!",
    rsvpCompleteDesc: "Your loving blessings have been captured on our live Blessings Wall with love! 💖",
    blessingsTitle: "Blessings Wall",
    blessingsDesc: "Heartfelt wishes and divine grace poured in from near and dearest ones.",
    timelineTitle: "The Sacred Timeline",
    timelineSubtitle: "Guiding you through each joyful ritual of our holy union",
    adminTitle: "Auspicious Registry Console"
  } as TranslationSet,

  KANNADA: {
    welcome: "ಸ್ನೇಹಪೂರ್ವಕ ಪ್ರೀತಿಯ ಆಮಂತ್ರಣ",
    names: "ಶೀತಲ್ ಮತ್ತು ಪ್ರಥಮೇಶ",
    weddingDateLong: "ಗುರುವಾರ, ಜುಲೈ ೨, ೨೦೨೬",
    locationTitle: "ರಾಣಿ ಚೆನ್ನಮ್ಮ ಸಮುದಾಯ ಭವನ - ಮಂಗಳ ಕಾರ್ಯಾಲಯ, ವಿಜಯಪುರ",
    countdownDays: "ದಿನಗಳು",
    countdownHours: "ಗಂಟೆಗಳು",
    countdownMins: "ನಿಮಿಷಗಳು",
    countdownSecs: "ಸೆಕೆಂಡುಗಳು",
    countdownBefore: "ಶೀತಲ್ ಮತ್ತು ಪ್ರಥಮೇಶ ಅವರ ಶುಭ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ಇನ್ನು",
    greetings: "ರಾಜಪೂತ್ ಪರಿವಾರದವರಿಂದ ಹಾರ್ದಿಕ ಆದರದ ಸ್ವಾಗತ",
    invitationNote: "ನಮ್ಮ ಜೀವನದ ಸುಂದರ ಪಯಣದ ಹೊಸ ಆರಂಭಕ್ಕೆ ಸಾಕ್ಷಿಯಾಗಲು, ಬಾಂಧವ್ಯದ ಈ ಹೊಸ ಅಧ್ಯಾಯವನ್ನು ಪ್ರೀತಿ ಮತ್ತು ಹರುಷದಿಂದ ಆಚರಿಸಲು ನಿಮ್ಮನ್ನು ಆದರದಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
    joinUsText: "ಜುಲೈ ೨, ೨೦೨೬ ರ ಶುಭ ದಿನದಂದು ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ",
    rsvpTitle: "ಶುಭ ಹರಕೆ ಹಾಗೂ ಆಶೀರ್ವಾದ",
    rsvpDesc: "ದಂಪತಿಗಳ ಸುಂದರ ನವ ಜೀವನದ ಪಯಣಕ್ಕೆ ನಿಮ್ಮ ನವಿರಾದ ಪ್ರೀತಿಯ ಹಾರೈಕೆಗಳನ್ನು ತಿಳಿಸಿ.",
    fullName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
    phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    accompanying: "ಕೂಡ ಬರುವ ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ",
    attendingStatus: "ಆಗಮಿಸುವಿರಾ?",
    attendingYes: "ಹೌದು 🌸",
    attendingNo: "ಇಲ್ಲ ✉️",
    foodPref: "ಊಟದ ಆದ್ಯತೆ",
    foodVeg: "ಸಸ್ಯಾಹಾರಿ 🍏",
    foodNonVeg: "ಮಾಂಸಾಹಾರಿ 🍗",
    foodNA: "ಅನ್ವಯಿಸುವುದಿಲ್ಲ",
    blessingMsg: "ದಂಪತಿಗಳಿಗೆ ನಿಮ್ಮ ಶುಭ ಹಾರೈಕೆಗಳು ಮತ್ತು ಆಶೀರ್ವಾದಗಳು",
    submitRsvp: "ಆಶೀರ್ವದಿಸಿ ಹಾರೈಸಿ",
    rsvpCompleteTitle: "ನಿಮಗೆ ನಮ್ಮ ಅನಂತ ಧನ್ಯವಾದಗಳು!",
    rsvpCompleteDesc: "ನಿಮ್ಮ ಶುಭ ಹಾರೈಕೆಗಳನ್ನು ಲೈವ್ ಬೋರ್ಡ್‌ನಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ. 💖",
    blessingsTitle: "ಗೆಳೆಯರ ಮತ್ತು ಹಿತೈಷಿಗಳ ಹಾರೈಕೆಗಳು",
    blessingsDesc: "ನಮ್ಮ ಆತ್ಮೀಯ ಜನರಿಂದ ಹರಿದು ಬಂದ ನವಿರಾದ ಪ್ರೀತಿಯ ಮಾತುಗಳು ಮತ್ತು ಆಶೀರ್ವಾದಗಳು.",
    timelineTitle: "ಶುಭ ಸಮಾರಂಭಗಳ ವಿವರಣೆ",
    timelineSubtitle: "ನಮ್ಮ ವಿವಾಹದ ವಿವಿಧ ಶಾಸ್ತ್ರೋಕ್ತ ಮತ್ತು ಸುಂದರ ಕಾರ್ಯಕ್ರಮಗಳ ವಿವರ ಪಟ್ಟಿ",
    adminTitle: "ಆಡಳಿತ ಮಂಡಳಿ ಕನ್ಸೋಲ್"
  } as TranslationSet
};

export const weddingEvents: WeddingEvent[] = [
  {
    titleEn: "Satyanarayana Pooja",
    titleKn: "ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ",
    dateEn: "Sunday, 28th June 2026",
    dateKn: "ದಿ. 28-06-2026ರಂದು, ರವಿವಾರ",
    timeEn: "09:00 AM onwards",
    timeKn: "ಬೆಳಗ್ಗೆ ೯:೦೦ ಗಂಟೆಯಿಂದ",
    locationEn: "Respective Residence, Vijayapur",
    locationKn: "ಪರಿವಾರದವರ ಸಮ್ಮುಖದಲ್ಲಿ ನಿವಾಸ, ವಿಜಯಪುರ",
    gmapsLink: "https://maps.google.com/?q=Vijayapura",
    descriptionEn: "An auspicious worship of Lord Satyanarayana to invoke divine blessings for the couple's lifelong prosperity and bliss.",
    descriptionKn: "ದಂಪತಿಗಳ ಸುಖಕರ ವೈವಾಹಿಕ ಜೀವನಕ್ಕಾಗಿ ಹಾಗೂ ಯಶಸ್ಸಿಗಾಗಿ ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ಸ್ವಾಮಿಯ ಪೂಜಾ ಕೈಂಕರ್ಯ ಮತ್ತು ದೇವತಾ ಆಶೀರ್ವಾದ."
  },
  {
    titleEn: "Rajega",
    titleKn: "ರಜೇಗಾ",
    dateEn: "Monday, 29th June 2026",
    dateKn: "ದಿ. 29-06-2026ರಂದು, ಸೋಮವಾರ",
    timeEn: "05:00 PM onwards",
    timeKn: "ಸಂಜೆ ೫:೦೦ ಗಂಟೆಯಿಂದ",
    locationEn: "Respective Residence, Vijayapur",
    locationKn: "ಪರಿವಾರದವರ ಸಮ್ಮುಖದಲ್ಲಿ ನಿವಾಸ, ವಿಜಯಪುರ",
    gmapsLink: "https://maps.google.com/?q=Vijayapura",
    descriptionEn: "A traditional preparatory celebratory ritual filled with prayers, beautiful customs, and intense joy.",
    descriptionKn: "ಕುಟುಂಬದ ಹಿರಿಯರ ಪ್ರೀತಿಯ ಸಮ್ಮುಖದಲ್ಲಿ ಅತ್ಯಂತ ಸಡಗರ ಸಂಭ್ರಮದಿ ಜರುಗುವ ಸಾಂಪ್ರದಾಯಿಕ ದೇವತಾ ಹಾರೈಕೆಯ ಕಾರ್ಯಕ್ರಮ."
  },
  {
    titleEn: "Taila Maayana",
    titleKn: "ತೆಲ ಮಾಯನ್",
    dateEn: "Tuesday, 30th June 2026",
    dateKn: "ದಿ. 30-06-2026ರಂದು, ಮಂಗಳವಾರ",
    timeEn: "10:00 AM onwards",
    timeKn: "ಬೆಳಗ್ಗೆ ೧೦:೦0 ಗಂಟೆಯಿಂದ",
    locationEn: "Respective Residence, Vijayapur",
    locationKn: "ಪರಿವಾರದವರ ಸಮ್ಮುಖದಲ್ಲಿ ನಿವಾಸ, ವಿಜಯಪುರ",
    gmapsLink: "https://maps.google.com/?q=Vijayapura",
    descriptionEn: "The sacred oil and turmeric anointing ceremony to bless the couple with radiant energy, protection, and purity.",
    descriptionKn: "ವರ ಹಾಗೂ ವಧುವಿಗೆ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಮಂಗಲಕರ ತೈಲ ಮತ್ತು ಹಳದಿ ಹಚ್ಚುವ ಮಧುರವಾದ ಶಾಸ್ತ್ರ ಹಾಗೂ ಕುಟುಂಬದವರ ಮಂಗಲ ಹಾರೈಕೆ."
  },
  {
    titleEn: "Baraat",
    titleKn: "ಬಾರಾತ",
    dateEn: "Wednesday, 1st July 2026",
    dateKn: "ದಿ. 01-07-2026ರಂದು, ಬುಧವಾರ",
    timeEn: "04:00 PM onwards",
    timeKn: "ಸಂಜೆ ೪:೦೦ ಗಂಟೆಯಿಂದ",
    locationEn: "Rani Channamma Samudaya Bhavan - Mangala Karyalaya, Vijayapur",
    locationKn: "ರಾಣಿ ಚೆನ್ನಮ್ಮ ಸಮುದಾಯ ಭವನ - ಮಂಗಳ ಕಾರ್ಯಾಲಯ, ವಿಜಯಪುರ",
    gmapsLink: "https://maps.app.goo.gl/Sd6uFvk6VVUR5USe6?g_st=ac",
    descriptionEn: "A grand, high-spirited groom's procession with joyous music, festive dancing, and celebrations leading into the main wedding premises.",
    descriptionKn: "ನೃತ್ಯ, ಜೋಡು ವಾದ್ಯ ಮೇಳಗಳ ಭಾರಿ ಸದ್ದಿನೊಂದಿಗೆ ಅದ್ಧೂರಿಯಾಗಿ ಮಂಟಪದ ಕಡೆ ಸಾಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಮಸ್ತ್ ವರನ ಮೆರವಣಿಗೆಯ ಸಂಭ್ರಮ."
  }
];
