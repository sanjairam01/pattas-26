export interface EventDiscrepancy {
  field: string;
  posterValue: string;
  pdfValue: string;
  note: string;
}

export interface EventData {
  id: string; // Permanent ID: "1" to "10"
  numericId: number; // Permanent numerical ID: 1 to 10
  slug: string;
  aliases?: string[];
  posterNumber: number;
  pdfNumber: number;
  title: string;
  posterTitle: string;
  pdfTitle: string;
  tagline: string;
  description: string;
  venue: string;
  participationType: "Team" | "Individual";
  teamSize: string;
  maxCapacity: string;
  duration: string;
  timing: string;
  rules: string[];
  materialsPermitted: string[];
  restrictions: string[];
  evaluationCriteria: string[];
  disqualificationConditions: string[];
  registrationUrl: string;
  registrationUrls?: { label: string; url: string }[];
  registrationStatus: "verified" | "open" | "pending";
  posterImage: string;
  iconImage?: string;
  visualType: 
    | "face-painting"
    | "rangoli"
    | "water-cup"
    | "cups-tower"
    | "reels"
    | "lucky-corner"
    | "balloon-passing"
    | "quiz"
    | "photo"
    | "costume";
  accentColor: string;
  themeGradient: string;
  discrepancies?: EventDiscrepancy[];
}

export const EVENTS: EventData[] = [
  {
    "id": "1",
    "numericId": 1,
    "slug": "face-painting",
    "aliases": [
      "face-painting",
      "facepainting",
      "1"
    ],
    "posterNumber": 1,
    "pdfNumber": 1,
    "title": "Face Painting",
    "posterTitle": "Face Painting",
    "pdfTitle": "FACE PAINTING",
    "tagline": "Unleash creativity through the duality of Good & Evil",
    "description": "A thrilling artistic duel where one teammate paints the face of another based on a given reference image, dividing the canvas into two halves: one representing GOOD and the other representing EVIL.",
    "venue": "Vivekananda Hall",
    "participationType": "Team",
    "teamSize": "2 participants per team",
    "maxCapacity": "Maximum 30 Teams",
    "duration": "60 Minutes",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each team must consist of two participants.",
      "One participant must paint the face of the other participant.",
      "A reference image will be provided to the participants, and the face painting must be created based on the given image.",
      "The face must be divided into two halves: one half representing GOOD and the other half representing EVIL, as shown in the reference image.",
      "Participants must bring their own painting materials, brushes, and other necessary accessories.",
      "Only skin-safe, non-toxic paints and materials are permitted.",
      "Participants must complete their artwork within the allotted time.",
      "Participants are not allowed to use any pre-painted designs or seek assistance from others during the event.",
      "The use of creativity, originality, neatness, colour combinations, and resemblance to the given reference image will be considered during evaluation.",
      "The judges' decision will be final and binding."
    ],
    "materialsPermitted": [
      "Skin-safe face paints",
      "Non-toxic body pigments",
      "Brushes, sponges, and blending tools",
      "Cleaning wipes & skin moisturizers"
    ],
    "restrictions": [
      "No toxic, chemical, or permanent paints allowed.",
      "No pre-painted outlines, prosthetics, or stencils prior to timer start.",
      "External assistance from audience or other teams is strictly prohibited."
    ],
    "evaluationCriteria": [
      "Creativity & originality (25%)",
      "Resemblance to given Good vs Evil reference (30%)",
      "Neatness and line precision (20%)",
      "Vibrant colour combinations & blending (25%)"
    ],
    "disqualificationConditions": [
      "Use of toxic or unsafe paint substances.",
      "Seeking assistance from external audience or phone references.",
      "Failing to finish within the 60-minute window."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLScuPeYBNCCC5d7Rl419jzSx7ohLOAlAFBjWUT86TLp7XhUg8A/viewform?usp=dialog",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/face-painting.png",
    "iconImage": "/assets/event-icons/face-painting.png",
    "visualType": "face-painting",
    "accentColor": "#E82C91",
    "themeGradient": "from-pink-500/20 via-purple-600/20 to-blue-600/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 1",
        "pdfValue": "Event 1",
        "note": "Numbering is identical across poster and PDF."
      }
    ]
  },
  {
    "id": "2",
    "numericId": 2,
    "slug": "rangoli",
    "aliases": [
      "rangoli",
      "2"
    ],
    "posterNumber": 2,
    "pdfNumber": 2,
    "title": "Rangoli",
    "posterTitle": "Rangoli",
    "pdfTitle": "RANGOLI",
    "tagline": "Sacred geometry, vibrant powders & festive tradition",
    "description": "Craft intricate, magnificent traditional rangoli floor art using eco-friendly powders, flower petals, and pulses in front of the iconic APJ Block.",
    "venue": "Infront of APJ Block",
    "participationType": "Team",
    "teamSize": "Maximum of 3 members per team",
    "maxCapacity": "Maximum 30 Teams",
    "duration": "60 Minutes",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Team Participation: Each team can have a maximum of 3 members.",
      "Materials: Participants must bring their own materials required for the competition.",
      "Permitted Materials: Participants may use dry colours, rice flour, flower petals, pulses, sand, chalk powder, and other materials suitable for Rangoli designs.",
      "Dress Code: Female participants must wear a lab coat during the competition.",
      "Restrictions: The use of mobile phones and external references is strictly prohibited during the competition.",
      "Time Duration: 60 minutes."
    ],
    "materialsPermitted": [
      "Dry color powders",
      "White rice flour (traditional kolam powder)",
      "Natural flower petals (marigold, rose, jasmine)",
      "Pulses, grains, and coloured sand",
      "Chalk powder for baseline geometric outlines"
    ],
    "restrictions": [
      "Female participants MUST wear a lab coat during competition.",
      "Use of mobile phones and printed external references is strictly forbidden.",
      "Chemical or oil-based paints are not permitted."
    ],
    "evaluationCriteria": [
      "Symmetry & geometric precision",
      "Harmony of festive Diwali colors",
      "Artistic complexity and traditional motifs",
      "Cleanliness and time adherence"
    ],
    "disqualificationConditions": [
      "Use of mobile phones or smartwatches during creation.",
      "Violation of required lab coat dress code for female participants.",
      "Exceeding maximum team size of 3 members."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLSfxtB_AoR7OGJmwa5qDaicO4--yxDW8VHDQNRZnBwkJBKqVUQ/viewform?usp=dialog",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/rangoli.png",
    "iconImage": "/assets/event-icons/rangoli.png",
    "visualType": "rangoli",
    "accentColor": "#FFBD35",
    "themeGradient": "from-amber-500/20 via-orange-600/20 to-red-600/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 2",
        "pdfValue": "Event 2",
        "note": "Numbering is identical across poster and PDF."
      }
    ]
  },
  {
    "id": "3",
    "numericId": 3,
    "slug": "water-cup-balancing",
    "aliases": [
      "water-cup",
      "water-cup-balancing",
      "watercup",
      "3"
    ],
    "posterNumber": 3,
    "pdfNumber": 7,
    "title": "Water Cup Balancing Game",
    "posterTitle": "Water Cup Balancing Game",
    "pdfTitle": "WATER CUP CHALLENGE",
    "tagline": "Steady nerves, lightning speed & pinpoint transfer",
    "description": "A thrilling two-stage relay challenge where teammates transfer water mid-course without spilling and race toward the finish line on the Main Ground.",
    "venue": "Main Ground",
    "participationType": "Team",
    "teamSize": "2 participants per team",
    "maxCapacity": "Maximum 50 Teams",
    "duration": "Shortest time completion",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each team will have two participants.",
      "Each participant will be provided with two cups of water: a) One cup completely filled with water, b) One cup half-filled with water.",
      "The first participant will stand at the starting point.",
      "The second participant will stand at the halfway point between the starting point and the destination.",
      "The participant at the starting point must pour the water from their half-filled cup into the half-filled cup held by their teammate at the halfway point.",
      "After pouring the water, the second participant must travel from the half point towards the destination.",
      "The team must complete the challenge while avoiding unnecessary water spillage.",
      "The team that completes the challenge in the shortest time will be declared the winner."
    ],
    "materialsPermitted": [
      "Standard cups and water provided on-site by MKCE organizers.",
      "Athletic footwear recommended for turf running."
    ],
    "restrictions": [
      "No hands or foreign objects inside the cups.",
      "Excessive spillage or dropping cups results in immediate penalties or disqualification."
    ],
    "evaluationCriteria": [
      "Speed: Fastest timed run to destination",
      "Retention: Minimal water spillage during pouring and running"
    ],
    "disqualificationConditions": [
      "Dropping or knocking over cups.",
      "Starting before the referee whistle.",
      "Touching teammate before reaching halfway line."
    ],
    "registrationUrl": "https://forms.gle/aWkKdjuDyeigeBD57",
    "registrationUrls": [
      {
        "label": "Register (Boys)",
        "url": "https://forms.gle/aWkKdjuDyeigeBD57"
      },
      {
        "label": "Register (Girls)",
        "url": "https://forms.gle/vUKTAyu9TA5qq6zY9"
      }
    ],
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/water-cup-balancing.png",
    "iconImage": "/assets/event-icons/water-cup-balancing.png",
    "visualType": "water-cup",
    "accentColor": "#00B4D8",
    "themeGradient": "from-cyan-500/20 via-blue-600/20 to-teal-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 3",
        "pdfValue": "Event 7",
        "note": "Poster lists this as Event 3; Official Rules PDF lists it under Event 7."
      },
      {
        "field": "Title",
        "posterValue": "Water Cup Balancing Game",
        "pdfValue": "WATER CUP CHALLENGE",
        "note": "Minor naming variant between poster and rules PDF."
      }
    ]
  },
  {
    "id": "4",
    "numericId": 4,
    "slug": "cups-tower",
    "aliases": [
      "cups-tower",
      "tower-game",
      "cupstower",
      "4"
    ],
    "posterNumber": 4,
    "pdfNumber": 4,
    "title": "Cups Tower Game",
    "posterTitle": "Cups Tower Game",
    "pdfTitle": "TOWER GAME",
    "tagline": "Architectural mastery & gravity-defying height",
    "description": "Stack, balance, and conquer! Build the tallest free-standing tower using only the provided cups in rooms RK 016 & 017.",
    "venue": "RK 016, 017",
    "participationType": "Individual",
    "teamSize": "Individual participation",
    "maxCapacity": "Maximum 100 Participants",
    "duration": "Allotted time limit (Tie-break by shortest time)",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each participant will be provided with an equal number of cups by the organizers.",
      "Participants must build the tallest possible tower using only the cups provided.",
      "The tower must be constructed within the allotted time limit.",
      "The tower must stand independently without any external support for at least 10 seconds to be considered valid.",
      "Participants are not allowed to use any additional materials or external support while constructing the tower.",
      "The participant who builds the tallest stable tower within the given time limit will be declared the winner.",
      "In case of a tie, the participant who completes the tower in the shortest time will be declared the winner."
    ],
    "materialsPermitted": [
      "Official cups provided exclusively by MKCE event coordinators"
    ],
    "restrictions": [
      "No tapes, adhesives, weights, or external structures permitted.",
      "Tower must stand unassisted for at least 10 continuous seconds upon completion."
    ],
    "evaluationCriteria": [
      "Height: Total cup layers standing independently",
      "Stability: Unassisted hold for 10+ seconds",
      "Time: Fastest completion in case of height ties"
    ],
    "disqualificationConditions": [
      "Tower collapse before the 10-second stability check.",
      "Using unauthorized external support or tape."
    ],
    "registrationUrl": "https://forms.gle/GYupkq8M3eY6vBiKA",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/cups-tower.png",
    "iconImage": "/assets/event-icons/cups-tower.png",
    "visualType": "cups-tower",
    "accentColor": "#FF7518",
    "themeGradient": "from-orange-500/20 via-amber-600/20 to-red-500/20",
    "discrepancies": [
      {
        "field": "Title",
        "posterValue": "Cups Tower Game",
        "pdfValue": "TOWER GAME",
        "note": "Poster includes 'Cups' prefix."
      }
    ]
  },
  {
    "id": "5",
    "numericId": 5,
    "slug": "diwali-reel",
    "aliases": [
      "diwali-reel",
      "reels",
      "reel-challenge",
      "5"
    ],
    "posterNumber": 5,
    "pdfNumber": 8,
    "title": "Diwali Reel Challenge",
    "posterTitle": "Diwali Reel Challenge",
    "pdfTitle": "REELS CHALLENGE",
    "tagline": "Cinematic cuts, festive beats & campus energy",
    "description": "Capture the electric spirit of Diwali across the MKCE campus and edit a trending, high-energy Instagram-style reel showcasing celebration moments.",
    "venue": "Bharathiyar Hall",
    "participationType": "Individual",
    "teamSize": "Individual event",
    "maxCapacity": "Maximum 25 Participants",
    "duration": "Captured during festival; submit by deadline",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "This is an individual participation event.",
      "Participants must capture the key moments and highlights of the Diwali celebration on campus.",
      "Reels must be creative, engaging, and relevant to the Diwali celebration.",
      "Participants may use suitable video editing techniques, transitions, effects, background music, and text to enhance their reels.",
      "All completed reels must be uploaded to the Google Drive link shared exclusively with the registered participants.",
      "Participants must submit their reels within the specified deadline.",
      "Participants are strictly prohibited from posting or sharing their reels on any social media platform.",
      "All submitted reels will remain the exclusive copyright property of M. Kumarasamy College of Engineering (MKCE).",
      "Participants must ensure that the content is appropriate and adheres to the college's code of conduct."
    ],
    "materialsPermitted": [
      "Smartphones or digital cameras",
      "Video editing mobile apps / software (CapCut, Premiere, VN, etc.)",
      "Royalty-free or trending festive audio soundtracks"
    ],
    "restrictions": [
      "DO NOT publish or post the reel on public social media before judging.",
      "Must strictly adhere to MKCE campus code of conduct and dignity.",
      "All footage must be captured live on the MKCE campus during PATTAS'26."
    ],
    "evaluationCriteria": [
      "Cinematography & visual composition (30%)",
      "Editing pace, transitions & audio sync (30%)",
      "Celebration emotion & festive storytelling (25%)",
      "Adherence to guidelines & deadlines (15%)"
    ],
    "disqualificationConditions": [
      "Pre-posting on Instagram or any social media prior to official announcement.",
      "Use of unverified archival footage not filmed at PATTAS'26.",
      "Violation of college code of conduct."
    ],
    "registrationUrl": "https://forms.gle/Uzk4KAeP7sz2SnHR8",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/diwali-reel.png",
    "iconImage": "/assets/event-icons/diwali-reel.png",
    "visualType": "reels",
    "accentColor": "#8338EC",
    "themeGradient": "from-purple-500/20 via-fuchsia-600/20 to-pink-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 5",
        "pdfValue": "Event 8",
        "note": "Poster features this as Event 5; PDF rules has it under Event 8."
      }
    ]
  },
  {
    "id": "6",
    "numericId": 6,
    "slug": "lucky-corner",
    "aliases": [
      "lucky-corner",
      "luckycorner",
      "6"
    ],
    "posterNumber": 6,
    "pdfNumber": 10,
    "title": "Lucky Corner Game",
    "posterTitle": "Lucky Corner Game",
    "pdfTitle": "LUCKY CORNER",
    "tagline": "Test your luck in the ultimate 4-corner arena",
    "description": "A suspense-filled battle of destiny on the Main Ground where participants pick their lucky spot each round before the secret winning corner is revealed.",
    "venue": "Main Ground",
    "participationType": "Individual",
    "teamSize": "Individual event",
    "maxCapacity": "Maximum 50 Participants",
    "duration": "Fast-paced elimination rounds",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "This is an individual participation event.",
      "Each participant must try their luck by selecting a corner or designated spot as instructed by the event coordinators.",
      "Participants must follow the instructions given by the event coordinators.",
      "Each participant will be given only one chance per round.",
      "Participants must not change their selected corner or position once the round begins.",
      "The winner will be decided based on the predefined winning criteria.",
      "Participants must maintain discipline and sportsmanship throughout the event.",
      "The decision of the event coordinators will be final."
    ],
    "materialsPermitted": [
      "No external equipment required; live arena set up on the Main Ground"
    ],
    "restrictions": [
      "No switching spots after the round countdown finishes.",
      "Unsportsmanlike conduct or obstruction results in immediate ejection."
    ],
    "evaluationCriteria": [
      "Survival through consecutive elimination rounds until ultimate champion stands."
    ],
    "disqualificationConditions": [
      "Changing corner position mid-round.",
      "Disobeying referee instructions."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLSdtdo-n4hj8MG9SbtfhuQzBA9gpXsuuhNYcb_iZ5gLLh4v8cw/viewform?usp=dialog",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/lucky-corner.png",
    "iconImage": "/assets/event-icons/lucky-corner.png",
    "visualType": "lucky-corner",
    "accentColor": "#3A86FF",
    "themeGradient": "from-blue-500/20 via-indigo-600/20 to-sky-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 6",
        "pdfValue": "Event 10",
        "note": "Poster positions this as Event 6; PDF rules lists it as Event 10."
      }
    ]
  },
  {
    "id": "7",
    "numericId": 7,
    "slug": "balloon-passing",
    "aliases": [
      "balloon-passing",
      "balloonpassing",
      "7"
    ],
    "posterNumber": 7,
    "pdfNumber": 3,
    "title": "Balloon Passing Through Head",
    "posterTitle": "Balloon Passing Through Head",
    "pdfTitle": "BALLOON PASSING",
    "tagline": "Head-to-head synchrony without a single touch",
    "description": "Partner coordination at its peak! Two teammates navigate an obstacle track balancing a festive balloon between their heads without hands.",
    "venue": "Main Ground",
    "participationType": "Team",
    "teamSize": "2 participants per team",
    "maxCapacity": "Maximum 100 Teams",
    "duration": "Shortest time completion",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each team must consist of two participants.",
      "Participants must move from the starting point to the destination while balancing a balloon between their heads, without using their hands.",
      "Participants must ensure that the balloon does not touch the ground at any point during the game.",
      "If the balloon falls to the ground, the team will be disqualified.",
      "The team that successfully completes the task in the shortest time will be declared the winner."
    ],
    "materialsPermitted": [
      "Official inflated balloons provided at start line."
    ],
    "restrictions": [
      "STRICTLY NO HANDS or arm support once the start signal sounds.",
      "Balloon cannot touch the ground or burst."
    ],
    "evaluationCriteria": [
      "Shortest time across the finish line with balloon intact and balanced."
    ],
    "disqualificationConditions": [
      "Touching balloon with hands or shoulders.",
      "Balloon touching the ground or popping.",
      "Improper course cutting."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLSeIeR15K6rm8ZNiRfUNIEG_vErG4r_IlA5HmSp6RpkXDzzwKw/viewform?usp=publish-editor",
    "registrationUrls": [
      {
        "label": "Register (Boys)",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeIeR15K6rm8ZNiRfUNIEG_vErG4r_IlA5HmSp6RpkXDzzwKw/viewform?usp=publish-editor"
      },
      {
        "label": "Register (Girls)",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeBpZivDwSNBlcfId9GvwrWRebbFRX-P_DbyiWo7XBIxBMN0A/viewform?usp=publish-editor"
      }
    ],
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/balloon-passing.png",
    "iconImage": "/assets/event-icons/balloon-passing.png",
    "visualType": "balloon-passing",
    "accentColor": "#FB5607",
    "themeGradient": "from-rose-500/20 via-orange-500/20 to-amber-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 7",
        "pdfValue": "Event 3",
        "note": "Poster lists this as Event 7; Rules PDF lists it as Event 3."
      },
      {
        "field": "Title",
        "posterValue": "Balloon Passing Through Head",
        "pdfValue": "BALLOON PASSING",
        "note": "Poster title is more descriptive ('Through Head')."
      }
    ]
  },
  {
    "id": "8",
    "numericId": 8,
    "slug": "diwali-quiz",
    "aliases": [
      "diwali-quiz",
      "quiz-connections",
      "diwaliquiz",
      "quiz",
      "diwali-quiz-and-connections",
      "8"
    ],
    "posterNumber": 8,
    "pdfNumber": 6,
    "title": "Diwali Quiz and Connections",
    "posterTitle": "Diwali Quiz and Connections",
    "pdfTitle": "DIWALI QUIZ / CONNECTION",
    "tagline": "Mythology, lore, sharp logic & picture connects",
    "description": "Test your cultural intellect in Ramanujan Hall with challenging Diwali trivia questions and mind-bending picture connections rounds.",
    "venue": "Ramanujan Hall",
    "participationType": "Team",
    "teamSize": "2 participants per team",
    "maxCapacity": "Maximum 40 Teams",
    "duration": "Timed rounds with buzzer / tie-breaker",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each team must consist of two participants.",
      "Both team members must work together to identify and provide the correct answers.",
      "The quiz will consist of questions related to Diwali, its traditions, celebrations, and cultural significance, along with picture-based connection rounds.",
      "Each question will have a specified time limit, and teams must submit their answers within the given time.",
      "In the connection round, teams must identify the correct word, person, object, or concept that connects the given pictures or clues.",
      "The use of mobile phones, electronic gadgets, the internet, or any form of external assistance is strictly prohibited.",
      "Points will be awarded for each correct answer. No points will be awarded for incorrect or unanswered questions.",
      "In case of a tie, a tie-breaker question will be conducted to determine the winner.",
      "The decision of the event coordinators and judges will be final and binding.",
      "The team securing the highest total score will be declared the winner."
    ],
    "materialsPermitted": [
      "Writing pens and official answer sheets provided by organizers."
    ],
    "restrictions": [
      "Mobile phones, smartwatches, and all electronic devices are strictly prohibited.",
      "Prompting from audience will lead to immediate cancellation of points."
    ],
    "evaluationCriteria": [
      "Direct question points (10 pts per correct answer)",
      "Connection round accuracy & speed",
      "Tie-breaker question accuracy"
    ],
    "disqualificationConditions": [
      "Use of phones or electronic devices.",
      "Misconduct or whispering answers across teams."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLSdfz-4l2VBptZ2FfaM8J-rYvg3pUKLZU56nV1NzgHYFaBkeEQ/viewform?usp=publish-editor",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/diwali-quiz.png",
    "iconImage": "/assets/event-icons/diwali-quiz.png",
    "visualType": "quiz",
    "accentColor": "#FFD166",
    "themeGradient": "from-yellow-500/20 via-amber-600/20 to-orange-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 8",
        "pdfValue": "Event 6",
        "note": "Poster lists as Event 8; Rules PDF lists as Event 6."
      }
    ]
  },
  {
    "id": "9",
    "numericId": 9,
    "slug": "photo-challenge",
    "aliases": [
      "photo-challenge",
      "photochallenge",
      "photo",
      "9"
    ],
    "posterNumber": 9,
    "pdfNumber": 9,
    "title": "Photo Challenge",
    "posterTitle": "Photo Challenge",
    "pdfTitle": "PHOTO CHALLENGE",
    "tagline": "Frames of joy, candid smiles & festive light",
    "description": "3-member photography teams receive secret creative prompts and must capture spontaneous, authentic festival moments across the MKCE campus.",
    "venue": "Valluvar Hall",
    "participationType": "Team",
    "teamSize": "Exactly 3 members per team",
    "maxCapacity": "Maximum 30 Teams",
    "duration": "Allotted festival time",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Each team must consist of exactly three members.",
      "Participants must capture photographs based on the concepts or challenges announced by the event coordinators.",
      "All photographs must be original and captured by the team during the event.",
      "Editing or using previously captured photographs is not permitted.",
      "Participants must ensure that their photographs are creative, clear, and relevant to the given concept.",
      "Teams must complete all the assigned photo challenges within the allotted time.",
      "Participants must obtain permission before taking photographs with faculty members or other individuals.",
      "The decision of the judges will be final."
    ],
    "materialsPermitted": [
      "DSLR, mirrorless, or high-resolution smartphone cameras",
      "Camera memory cards and transfer cables"
    ],
    "restrictions": [
      "NO post-processing, Photoshop, or digital filters allowed.",
      "Must take prior explicit permission before photographing faculty and staff.",
      "Stock or pre-clicked photos are prohibited."
    ],
    "evaluationCriteria": [
      "Interpretation of given photography prompt (35%)",
      "Composition, framing, and lighting (35%)",
      "Storytelling and natural Diwali emotion (30%)"
    ],
    "disqualificationConditions": [
      "Submitting edited, filtered, or pre-existing photographs.",
      "Taking unauthorized photos of individuals without consent.",
      "Late submissions."
    ],
    "registrationUrl": "https://forms.gle/kChdwnPHvEEV1JFt5",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/photo-challenge.png",
    "iconImage": "/assets/event-icons/photo-challenge.png",
    "visualType": "photo",
    "accentColor": "#06D6A0",
    "themeGradient": "from-emerald-500/20 via-teal-600/20 to-cyan-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 9",
        "pdfValue": "Event 9",
        "note": "Event 9 numbering matches across poster and PDF."
      }
    ]
  },
  {
    "id": "10",
    "numericId": 10,
    "slug": "mask-costume",
    "aliases": [
      "mask-costume",
      "costume-challenge",
      "maskcostume",
      "costume",
      "mask",
      "mask-costume-challenge",
      "10"
    ],
    "posterNumber": 10,
    "pdfNumber": 5,
    "title": "Mask / Costume Challenge",
    "posterTitle": "Mask / Costume Challenge",
    "pdfTitle": "MASK / DIWALI BASED COSTUME",
    "tagline": "Regal attire, folklore masks & cultural pride",
    "description": "Drape yourself in royal Indian elegance or design an artistic Diwali-themed mask, bringing legendary tales and festive splendor to life in G.D. Naidu Hall.",
    "venue": "G.D.Naidu Hall",
    "participationType": "Individual",
    "teamSize": "Individual event",
    "maxCapacity": "Maximum 100 Participants",
    "duration": "Presentation and brief explanation before judges",
    "timing": "01:30 PM to 03:00 PM",
    "rules": [
      "Participants must wear costumes based on the theme of Diwali.",
      "Costumes should creatively represent Diwali traditions, culture, and celebrations.",
      "Participants must ensure that their costumes are decent, appropriate, and culturally respectful.",
      "The use of fire, firecrackers, explosives, or any other hazardous materials as costume props is strictly prohibited.",
      "Participants may use creative accessories and props to enhance their costumes, provided they are safe.",
      "Each participant must present their costume and briefly explain its connection to the Diwali theme.",
      "Participants will be judged based on creativity, theme relevance, costume design, presentation, and overall appearance."
    ],
    "materialsPermitted": [
      "Traditional Indian festive attire (Sherwanis, Sarees, Lehengas, Dhotis, Kurthas)",
      "Handcrafted Diwali masks, crowns, dupattas, and cultural ornaments",
      "Safe decorative props (lights with batteries, imitation jewellery)"
    ],
    "restrictions": [
      "STRICT BAN: Fire, matches, real firecrackers, explosives, sparklers, or flammable prop materials.",
      "Costumes must adhere strictly to college modesty and cultural decency standards."
    ],
    "evaluationCriteria": [
      "Theme relevance to Diwali & cultural folklore (30%)",
      "Costume design, craftsmanship & aesthetic appeal (25%)",
      "Presentation and oral explanation to judges (25%)",
      "Creativity of safe props & accessories (20%)"
    ],
    "disqualificationConditions": [
      "Bringing real crackers, sparklers, or live fire into the hall.",
      "Indecent or disrespectful attire.",
      "Failure to present in front of the jury."
    ],
    "registrationUrl": "https://docs.google.com/forms/d/e/1FAIpQLSf8csD2OkR7JmF8SpVpYHtFQ5gJdlio4IwM2OQCS_VpLwndnw/viewform?usp=dialog",
    "registrationStatus": "verified",
    "posterImage": "/assets/event-icons/mask-costume.png",
    "iconImage": "/assets/event-icons/mask-costume.png",
    "visualType": "costume",
    "accentColor": "#E0AAFF",
    "themeGradient": "from-violet-500/20 via-purple-600/20 to-pink-500/20",
    "discrepancies": [
      {
        "field": "Event Numbering",
        "posterValue": "Event 10",
        "pdfValue": "Event 5",
        "note": "Poster lists this as Event 10; Rules PDF lists it under Event 5."
      },
      {
        "field": "Title",
        "posterValue": "Mask / Costume Challenge",
        "pdfValue": "MASK / DIWALI BASED COSTUME",
        "note": "Poster abbreviates 'DIWALI BASED COSTUME' to 'Costume Challenge'."
      }
    ]
  }
];

export function findEventByIdOrSlug(query: string): EventData | undefined {
  return EVENTS.find(
    (e) =>
      e.id === query ||
      String(e.numericId) === query ||
      e.slug === query ||
      (e.aliases && e.aliases.includes(query))
  );
}
