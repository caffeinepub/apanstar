import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CreateChallengeInput {
    title: string;
    endDate: Timestamp;
    category: ChallengeCategory;
    rules: string;
    startDate: Timestamp;
}
export interface User {
    id: UserId;
    bio: string;
    referralCode: string;
    videoCount: bigint;
    coinBalance: bigint;
    city: string;
    createdAt: Timestamp;
    rank: Rank;
    referralCount: bigint;
    creatorName: string;
    district: string;
    totalVotesReceived: bigint;
    hasLegendTag: boolean;
    isUnlocked: boolean;
}
export type ChallengeId = bigint;
export interface SubmitVideoInput {
    effect?: VideoEffect;
    challengeId: ChallengeId;
    videoUrl: string;
}
export interface Challenge {
    id: ChallengeId;
    title: string;
    endDate: Timestamp;
    winnerId?: SubmissionId;
    category: ChallengeCategory;
    rules: string;
    startDate: Timestamp;
}
export type SubmissionId = bigint;
export type UserId = Principal;
export interface RegisterInput {
    bio: string;
    referralCode?: string;
    city: string;
    creatorName: string;
    district: string;
}
export interface ReferralInfo {
    referralCode: string;
    referralCount: bigint;
    isUnlocked: boolean;
}
export interface Submission {
    id: SubmissionId;
    voteCount: bigint;
    creatorId: UserId;
    submittedAt: Timestamp;
    effect?: VideoEffect;
    challengeId: ChallengeId;
    videoUrl: string;
}
export enum ChallengeCategory {
    Singing = "Singing",
    Cooking = "Cooking",
    Gaming = "Gaming",
    Mimicry = "Mimicry",
    Coding = "Coding"
}
export enum Rank {
    Gold = "Gold",
    Platinum = "Platinum",
    Bronze = "Bronze",
    Silver = "Silver"
}
export enum VideoEffect {
    Professional = "Professional",
    Cartoon = "Cartoon",
    Cinematic = "Cinematic"
}
export interface backendInterface {
    adminSeedData(): Promise<string>;
    castVote(submissionId: bigint, challengeId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    claimOwnership(): Promise<boolean>;
    createChallenge(input: CreateChallengeInput): Promise<Challenge>;
    finalizeChallenge(challengeId: ChallengeId): Promise<SubmissionId | null>;
    getChallenge(id: ChallengeId): Promise<Challenge | null>;
    getChallengeLeaderboard(challengeId: ChallengeId): Promise<Array<Submission>>;
    getMyProfile(): Promise<User | null>;
    getOwner(): Promise<Principal>;
    getReferralInfo(): Promise<ReferralInfo | null>;
    getRemainingCoins(): Promise<bigint>;
    getUserById(userId: Principal): Promise<User | null>;
    getVoteCount(submissionId: bigint): Promise<bigint>;
    listChallenges(): Promise<Array<Challenge>>;
    listUsersByLocation(city: string, district: string | null): Promise<Array<User>>;
    registerUser(input: RegisterInput): Promise<User>;
    submitVideo(input: SubmitVideoInput): Promise<Submission>;
    trackReferral(referralCode: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateMyProfile(creatorName: string | null, bio: string | null, city: string | null, district: string | null): Promise<User>;
    validateReferralCode(code: string): Promise<Principal | null>;
}
