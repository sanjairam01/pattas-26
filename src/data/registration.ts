export type RegistrationStatus = "open" | "pending" | "closed" | "full";
export type RegistrationType = "single" | "gender_based";

export interface GenderRegistrationLinks {
  boys: string;
  girls: string;
}

export interface EventRegistrationConfig {
  eventId: string;
  slug: string;
  eventName: string;
  posterNumber: number;
  pdfNumber: number;
  registrationStatus: RegistrationStatus;
  registrationType: RegistrationType;
  registrationUrl?: string;
  registrationLinks?: GenderRegistrationLinks;
  registrationInstructions: string[];
  maxCapacity: string;
  venue: string;
}

export const REGISTRATION_CONFIG: Record<string, EventRegistrationConfig> = {
  facePainting: {
    eventId: "face-painting",
    slug: "face-painting",
    eventName: "Face Painting",
    posterNumber: 1,
    pdfNumber: 1,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScuPeYBNCCC5d7Rl419jzSx7ohLOAlAFBjWUT86TLp7XhUg8A/viewform?usp=dialog",
    registrationInstructions: [
      "Team Event – Maximum 30 Teams (2 members per team).",
      "One participant must paint the face of the other based on the Good vs Evil reference.",
      "Bring skin-safe, non-toxic paints and brushes. 60 Minutes duration."
    ],
    maxCapacity: "Maximum 30 Teams",
    venue: "Vivekananda Hall"
  },

  rangoli: {
    eventId: "rangoli",
    slug: "rangoli",
    eventName: "Rangoli",
    posterNumber: 2,
    pdfNumber: 2,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfxtB_AoR7OGJmwa5qDaicO4--yxDW8VHDQNRZnBwkJBKqVUQ/viewform?usp=dialog",
    registrationInstructions: [
      "Team Event – Maximum 30 Teams (Up to 3 members per team).",
      "Bring own dry colours, flower petals, pulses, sand, and chalk powder.",
      "Dress Code: Female participants MUST wear a lab coat during the competition.",
      "Venue: Infront of APJ Block. Duration: 60 minutes."
    ],
    maxCapacity: "Maximum 30 Teams",
    venue: "Infront of APJ Block"
  },

  balloonPassing: {
    eventId: "balloon-passing",
    slug: "balloon-passing",
    eventName: "Balloon Passing Through Head",
    posterNumber: 7,
    pdfNumber: 3,
    registrationType: "gender_based",
    registrationStatus: "open",
    registrationLinks: {
      boys: "https://docs.google.com/forms/d/e/1FAIpQLSeIeR15K6rm8ZNiRfUNIEG_vErG4r_IlA5HmSp6RpkXDzzwKw/viewform?usp=publish-editor",
      girls: "https://docs.google.com/forms/d/e/1FAIpQLSeBpZivDwSNBlcfId9GvwrWRebbFRX-P_DbyiWo7XBIxBMN0A/viewform?usp=publish-editor"
    },
    registrationInstructions: [
      "Team Event – Maximum 100 Teams (2 members per team).",
      "Select either Boys or Girls registration category to proceed to the dedicated Google Form.",
      "Balance balloon between heads without hands across course. No ground touches allowed."
    ],
    maxCapacity: "Maximum 100 Teams",
    venue: "Main Ground"
  },

  towerGame: {
    eventId: "tower-game",
    slug: "tower-game",
    eventName: "Tower Game",
    posterNumber: 4,
    pdfNumber: 4,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl: "https://forms.gle/GYupkq8M3eY6vBiKA",
    registrationInstructions: [
      "Individual Event – Maximum 100 Participants.",
      "Build tallest possible tower using only provided cups.",
      "Tower must stand unassisted for at least 10 seconds to qualify."
    ],
    maxCapacity: "Maximum 100 Participants",
    venue: "RK 016, 017"
  },

  maskCostume: {
    eventId: "mask-costume",
    slug: "mask-costume",
    eventName: "Mask / Diwali Based Costume",
    posterNumber: 10,
    pdfNumber: 5,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf8csD2OkR7JmF8SpVpYHtFQ5gJdlio4IwM2OQCS_VpLwndnw/viewform?usp=dialog",
    registrationInstructions: [
      "Individual Event – Maximum 100 Participants.",
      "Wear costumes/masks representing Diwali traditions and cultural elegance.",
      "Present costume connection to judges. Real fire and crackers strictly prohibited."
    ],
    maxCapacity: "Maximum 100 Participants",
    venue: "G.D.Naidu Hall"
  },

  diwaliQuiz: {
    eventId: "diwali-quiz",
    slug: "diwali-quiz",
    eventName: "Diwali Quiz / Connection",
    posterNumber: 8,
    pdfNumber: 6,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdfz-4l2VBptZ2FfaM8J-rYvg3pUKLZU56nV1NzgHYFaBkeEQ/viewform?usp=publish-editor",
    registrationInstructions: [
      "Team Event – Maximum 40 Teams (2 members per team).",
      "Questions on Diwali cultural heritage and visual picture connection rounds.",
      "No mobile phones or electronic gadgets allowed in Ramanujan Hall."
    ],
    maxCapacity: "Maximum 40 Teams",
    venue: "Ramanujan Hall"
  },

  waterCup: {
    eventId: "water-cup",
    slug: "water-cup",
    eventName: "Water Cup Challenge",
    posterNumber: 3,
    pdfNumber: 7,
    registrationType: "gender_based",
    registrationStatus: "open",
    registrationLinks: {
      boys: "https://forms.gle/aWkKdjuDyeigeBD57",
      girls: "https://forms.gle/vUKTAyu9TA5qq6zY9"
    },
    registrationInstructions: [
      "Team Event – Maximum 50 Teams (2 participants per team).",
      "Select either Boys or Girls registration category to proceed to the dedicated Google Form.",
      "Relay water pouring between midpoint and destination with minimal spillage."
    ],
    maxCapacity: "Maximum 50 Teams",
    venue: "Main Ground"
  },

  reels: {
    eventId: "reels",
    slug: "reels",
    eventName: "Reels Challenge",
    posterNumber: 5,
    pdfNumber: 8,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl: "https://forms.gle/Uzk4KAeP7sz2SnHR8",
    registrationInstructions: [
      "Individual Event – Maximum 25 Participants.",
      "Capture Diwali celebration highlights on MKCE campus and edit engaging reel.",
      "Submit via Google Drive. Strictly forbidden to post on public social media before judging."
    ],
    maxCapacity: "Maximum 25 Participants",
    venue: "Bharathiyar Hall"
  },

  photoChallenge: {
    eventId: "photo-challenge",
    slug: "photo-challenge",
    eventName: "Photo Challenge",
    posterNumber: 9,
    pdfNumber: 9,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl: "https://forms.gle/kChdwnPHvEEV1JFt5",
    registrationInstructions: [
      "Team Event – Maximum 30 Teams (Exactly 3 members per team).",
      "Capture candid original photographs based on coordinator themes on campus.",
      "No post-processing or pre-shot photos allowed."
    ],
    maxCapacity: "Maximum 30 Teams",
    venue: "Valluvar Hall"
  },

  luckyCorner: {
    eventId: "lucky-corner",
    slug: "lucky-corner",
    eventName: "Lucky Corner",
    posterNumber: 6,
    pdfNumber: 10,
    registrationType: "single",
    registrationStatus: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdtdo-n4hj8MG9SbtfhuQzBA9gpXsuuhNYcb_iZ5gLLh4v8cw/viewform?usp=dialog",
    registrationInstructions: [
      "Individual Event – Maximum 50 Participants.",
      "Fast-paced elimination game on the Main Ground.",
      "Select your lucky corner spot each round before the call."
    ],
    maxCapacity: "Maximum 50 Participants",
    venue: "Main Ground"
  }
};

// Aliases mapping for flexible URL resolution and permanent numeric IDs 1 to 10
const SLUG_ALIASES: Record<string, string> = {
  "1": "facePainting",
  "face-painting": "facePainting",
  "2": "rangoli",
  "rangoli": "rangoli",
  "3": "waterCup",
  "water-cup": "waterCup",
  "water-cup-balancing": "waterCup",
  "4": "towerGame",
  "cups-tower": "towerGame",
  "tower-game": "towerGame",
  "5": "reels",
  "diwali-reel": "reels",
  "reels": "reels",
  "6": "luckyCorner",
  "lucky-corner": "luckyCorner",
  "7": "balloonPassing",
  "balloon-passing": "balloonPassing",
  "8": "quiz",
  "diwali-quiz": "quiz",
  "quiz": "quiz",
  "9": "photo",
  "photo-challenge": "photo",
  "photo": "photo",
  "10": "maskCostume",
  "mask-costume": "maskCostume",
  "costume-challenge": "maskCostume",
};

/**
 * Retrieve registration config by permanent numeric ID, key, slug, or alias
 */
export function getEventRegistrationConfig(identifier: string): EventRegistrationConfig | undefined {
  if (REGISTRATION_CONFIG[identifier]) {
    return REGISTRATION_CONFIG[identifier];
  }
  const aliasKey = SLUG_ALIASES[identifier];
  if (aliasKey && REGISTRATION_CONFIG[aliasKey]) {
    return REGISTRATION_CONFIG[aliasKey];
  }
  return Object.values(REGISTRATION_CONFIG).find(
    (item) =>
      item.eventId === identifier ||
      String(item.posterNumber) === identifier ||
      item.slug === identifier ||
      item.eventName.toLowerCase() === identifier.toLowerCase()
  );
}
