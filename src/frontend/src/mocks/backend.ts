import type { backendInterface } from "../backend";
import { ChallengeCategory, Rank, VideoEffect } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
const samplePrincipal2 = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");

const now = BigInt(Date.now()) * BigInt(1_000_000);
const oneWeek = BigInt(7 * 24 * 60 * 60 * 1_000_000_000);

export const mockBackend: backendInterface = {
  adminSeedData: async () => "Seed complete: 2 challenges + 3 users created",

  castVote: async () => ({ __kind__: "ok" as const, ok: null }),

  claimOwnership: async () => true,

  createChallenge: async (input) => ({
    id: BigInt(3),
    title: input.title,
    category: input.category,
    startDate: input.startDate,
    endDate: input.endDate,
    rules: input.rules,
  }),

  finalizeChallenge: async () => BigInt(1),

  getChallenge: async () => ({
    id: BigInt(0),
    title: "Mumbai Singing Star",
    category: ChallengeCategory.Singing,
    startDate: now,
    endDate: now + oneWeek,
    rules: "Upload a 60-second original performance. Best voice wins the Legend tag!",
  }),

  getChallengeLeaderboard: async () => [
    {
      id: BigInt(0),
      creatorId: samplePrincipal,
      challengeId: BigInt(0),
      videoUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
      effect: VideoEffect.Cinematic,
      voteCount: BigInt(254),
      submittedAt: now,
    },
    {
      id: BigInt(1),
      creatorId: samplePrincipal2,
      challengeId: BigInt(0),
      videoUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      effect: VideoEffect.Professional,
      voteCount: BigInt(198),
      submittedAt: now,
    },
    {
      id: BigInt(2),
      creatorId: samplePrincipal,
      challengeId: BigInt(1),
      videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      voteCount: BigInt(93),
      submittedAt: now,
    },
  ],

  getMyProfile: async () => ({
    id: samplePrincipal,
    creatorName: "Rohan K",
    bio: "Dancer & content creator from Mumbai. Gold rank creator 🔥",
    city: "Mumbai",
    district: "Bandra",
    rank: Rank.Gold,
    hasLegendTag: true,
    videoCount: BigInt(24),
    totalVotesReceived: BigInt(2540),
    coinBalance: BigInt(35),
    referralCode: "ROHAN007",
    referralCount: BigInt(5),
    isUnlocked: true,
    createdAt: now,
  }),

  getOwner: async () => samplePrincipal,

  getReferralInfo: async () => ({
    referralCode: "ROHAN007",
    referralCount: BigInt(5),
    isUnlocked: true,
  }),

  getRemainingCoins: async () => BigInt(35),

  getUserById: async () => ({
    id: samplePrincipal2,
    creatorName: "Nisha_DanceStar",
    bio: "Classical dancer meets street style. Mumbai ka pride!",
    city: "Mumbai",
    district: "Andheri",
    rank: Rank.Platinum,
    hasLegendTag: true,
    videoCount: BigInt(47),
    totalVotesReceived: BigInt(15200),
    coinBalance: BigInt(50),
    referralCode: "NISHA001",
    referralCount: BigInt(12),
    isUnlocked: true,
    createdAt: now,
  }),

  getVoteCount: async () => BigInt(254),

  listChallenges: async () => [
    {
      id: BigInt(0),
      title: "Mumbai Singing Star",
      category: ChallengeCategory.Singing,
      startDate: now,
      endDate: now + oneWeek,
      rules: "Upload a 60-second original performance. Best voice wins the Legend tag!",
    },
    {
      id: BigInt(1),
      title: "Delhi Comedy Mimicry Battle",
      category: ChallengeCategory.Mimicry,
      startDate: now,
      endDate: now + oneWeek,
      rules: "Best celebrity impression under 45 seconds. Crowd votes decide the winner.",
    },
    {
      id: BigInt(2),
      title: "Bangalore Gaming Championship",
      category: ChallengeCategory.Gaming,
      startDate: now,
      endDate: now + oneWeek,
      rules: "Stream your best gaming moment in 60 seconds. Highest votes wins.",
    },
    {
      id: BigInt(3),
      title: "Hyderabad Street Cooking Battle",
      category: ChallengeCategory.Cooking,
      startDate: now,
      endDate: now + oneWeek,
      rules: "Cook your signature dish in 90 seconds. Authenticity and style judged by votes.",
    },
  ],

  listUsersByLocation: async () => [
    {
      id: samplePrincipal,
      creatorName: "Nisha_DanceStar",
      bio: "Classical dancer meets street style. Mumbai ka pride!",
      city: "Mumbai",
      district: "Andheri",
      rank: Rank.Platinum,
      hasLegendTag: true,
      videoCount: BigInt(47),
      totalVotesReceived: BigInt(15200),
      coinBalance: BigInt(50),
      referralCode: "NISHA001",
      referralCount: BigInt(12),
      isUnlocked: true,
      createdAt: now,
    },
    {
      id: samplePrincipal2,
      creatorName: "StreetRapper_AJ",
      bio: "Hip-hop artist from Mumbai streets. Bars and beats all day.",
      city: "Mumbai",
      district: "Dharavi",
      rank: Rank.Gold,
      hasLegendTag: false,
      videoCount: BigInt(33),
      totalVotesReceived: BigInt(9800),
      coinBalance: BigInt(50),
      referralCode: "AJ0042",
      referralCount: BigInt(8),
      isUnlocked: true,
      createdAt: now,
    },
    {
      id: samplePrincipal,
      creatorName: "PriyaBeats",
      bio: "Music producer & singer. Creating bangers from Mumbai!",
      city: "Mumbai",
      district: "Bandra",
      rank: Rank.Silver,
      hasLegendTag: false,
      videoCount: BigInt(18),
      totalVotesReceived: BigInt(4200),
      coinBalance: BigInt(50),
      referralCode: "PRIYA001",
      referralCount: BigInt(3),
      isUnlocked: true,
      createdAt: now,
    },
  ],

  registerUser: async (input) => ({
    id: samplePrincipal,
    creatorName: input.creatorName,
    bio: input.bio,
    city: input.city,
    district: input.district,
    rank: Rank.Bronze,
    hasLegendTag: false,
    videoCount: BigInt(0),
    totalVotesReceived: BigInt(0),
    coinBalance: BigInt(50),
    referralCode: "NEW0001",
    referralCount: BigInt(0),
    isUnlocked: false,
    createdAt: now,
  }),

  submitVideo: async (input) => ({
    id: BigInt(10),
    creatorId: samplePrincipal,
    challengeId: input.challengeId,
    videoUrl: input.videoUrl,
    effect: input.effect,
    voteCount: BigInt(0),
    submittedAt: now,
  }),

  trackReferral: async () => ({ __kind__: "ok" as const, ok: null }),

  updateMyProfile: async () => ({
    id: samplePrincipal,
    creatorName: "Rohan K",
    bio: "Updated bio",
    city: "Mumbai",
    district: "Bandra",
    rank: Rank.Gold,
    hasLegendTag: true,
    videoCount: BigInt(24),
    totalVotesReceived: BigInt(2540),
    coinBalance: BigInt(35),
    referralCode: "ROHAN007",
    referralCount: BigInt(5),
    isUnlocked: true,
    createdAt: now,
  }),

  validateReferralCode: async () => samplePrincipal,
};
