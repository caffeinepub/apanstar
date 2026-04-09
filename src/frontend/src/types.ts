// Shared TypeScript types for ApanStar

export type Rank = "Bronze" | "Silver" | "Gold" | "Platinum";

export type ChallengeCategory =
  | "Gaming"
  | "Singing"
  | "Mimicry"
  | "Coding"
  | "Cooking"
  | "Dance"
  | "Comedy";

export type VideoEffect = "Professional Edit" | "Cartoon Style" | "Cinematic";

export interface User {
  id: string;
  name: string;
  bio: string;
  city: string;
  district: string;
  rank: Rank;
  isLegend: boolean;
  avatarUrl?: string;
  totalVotes: bigint;
  referralCode: string;
  referralCount: number;
  unlockedFeatures: boolean;
  createdAt: bigint;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  city: string;
  startTime: bigint;
  endTime: bigint;
  prizeDescription: string;
  isActive: boolean;
  isFinalized: boolean;
}

export interface Submission {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  userCity: string;
  userRank: Rank;
  userIsLegend: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  voteCount: bigint;
  createdAt: bigint;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userCity: string;
  userRank: Rank;
  userIsLegend: boolean;
  voteCount: bigint;
}

export interface ReferralInfo {
  referralCode: string;
  referralCount: number;
  isUnlocked: boolean;
}

export interface VoteResult {
  success: boolean;
  remainingCoins: number;
  message: string;
}

export const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Surat",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
];
