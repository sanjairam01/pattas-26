export interface ScheduleItem {
  id: string;
  timeSlot: string;
  startTime: string; // ISO or 24-hr format for timeline plotting
  endTime: string;
  title: string;
  category: "competition" | "cultural" | "celebration";
  venue: string;
  venueType: "indoor" | "outdoor";
  description: string;
  highlight?: boolean;
  subEvents?: { name: string; venue: string; href?: string }[];
}

export const FESTIVAL_DATE = "2026-11-04";
export const FESTIVAL_TIMEZONE = "Asia/Kolkata";

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: "events-session",
    timeSlot: "01:30 PM – 03:00 PM",
    startTime: "13:30",
    endTime: "15:00",
    title: "PATTAS’26 Main Events & Competitions",
    category: "competition",
    venue: "10 Campus Venues across MKCE",
    venueType: "indoor",
    description:
      "All 10 flagship festival events ignite simultaneously across MKCE halls, grounds, and outdoor arenas.",
    highlight: true,
    subEvents: [
      { name: "Face Painting", venue: "Vivekananda Hall", href: "/events/face-painting" },
      { name: "Rangoli", venue: "Infront of APJ Block", href: "/events/rangoli" },
      { name: "Water Cup Balancing Game", venue: "Main Ground", href: "/events/water-cup-balancing" },
      { name: "Cups Tower Game", venue: "RK 016, 017", href: "/events/cups-tower" },
      { name: "Diwali Reel Challenge", venue: "Bharathiyar Hall", href: "/events/diwali-reel" },
      { name: "Lucky Corner Game", venue: "Main Ground", href: "/events/lucky-corner" },
      { name: "Balloon Passing Through Head", venue: "Main Ground", href: "/events/balloon-passing" },
      { name: "Diwali Quiz and Connections", venue: "Ramanujan Hall", href: "/events/diwali-quiz" },
      { name: "Photo Challenge", venue: "Valluvar Hall", href: "/events/photo-challenge" },
      { name: "Mask / Costume Challenge", venue: "G.D.Naidu Hall", href: "/events/costume-challenge" }
    ]
  },
  {
    id: "dance-performance",
    timeSlot: "03:00 PM – 04:00 PM",
    startTime: "15:00",
    endTime: "16:00",
    title: "Dance Performance in Ground",
    category: "cultural",
    venue: "Main Ground",
    venueType: "outdoor",
    description:
      "High-voltage cultural dance showcases, fusion beats, and synchronized choreography celebrating the victory of light over darkness.",
    highlight: true
  },
  {
    id: "dj-ground",
    timeSlot: "04:00 PM – 06:00 PM",
    startTime: "16:00",
    endTime: "18:00",
    title: "DJ in Ground & Flash Mob",
    category: "celebration",
    venue: "Main Ground",
    venueType: "outdoor",
    description:
      "The ultimate festival crescendo! Pulsating beats by live DJ, college flash mob extravaganza, laser lights, and euphoric celebration.",
    highlight: true
  }
];

