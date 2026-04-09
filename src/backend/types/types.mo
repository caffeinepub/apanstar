import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type ChallengeId = Common.ChallengeId;
  public type SubmissionId = Common.SubmissionId;

  // ── Gamification ────────────────────────────────────────────────────────────

  public type Rank = {
    #Bronze;
    #Silver;
    #Gold;
    #Platinum;
  };

  // ── AI Video Effect ──────────────────────────────────────────────────────────

  public type VideoEffect = {
    #Professional;
    #Cartoon;
    #Cinematic;
  };

  // ── Challenge Category ───────────────────────────────────────────────────────

  public type ChallengeCategory = {
    #Gaming;
    #Singing;
    #Mimicry;
    #Coding;
    #Cooking;
  };

  // ── User Profile (internal — contains mutable fields) ───────────────────────

  public type UserInternal = {
    id : UserId;
    var creatorName : Text;
    var bio : Text;
    var city : Text;
    var district : Text;
    var rank : Rank;
    var hasLegendTag : Bool;
    var videoCount : Nat;
    var totalVotesReceived : Nat;
    var coinBalance : Nat;
    var lastCoinRefreshDay : Nat; // Day index (epoch days) of last daily coin grant
    var referralCount : Nat;
    var referralCode : Text;
    var isUnlocked : Bool; // true when referralCount >= 2
    createdAt : Timestamp;
  };

  // ── User Profile (public API — no var fields, serializable) ─────────────────

  public type User = {
    id : UserId;
    creatorName : Text;
    bio : Text;
    city : Text;
    district : Text;
    rank : Rank;
    hasLegendTag : Bool;
    videoCount : Nat;
    totalVotesReceived : Nat;
    coinBalance : Nat;
    referralCount : Nat;
    referralCode : Text;
    isUnlocked : Bool;
    createdAt : Timestamp;
  };

  // ── Challenge Submission (internal) ─────────────────────────────────────────

  public type SubmissionInternal = {
    id : SubmissionId;
    challengeId : ChallengeId;
    creatorId : UserId;
    videoUrl : Text;
    var voteCount : Nat;
    var effect : ?VideoEffect;
    submittedAt : Timestamp;
  };

  // ── Challenge Submission (public) ────────────────────────────────────────────

  public type Submission = {
    id : SubmissionId;
    challengeId : ChallengeId;
    creatorId : UserId;
    videoUrl : Text;
    voteCount : Nat;
    effect : ?VideoEffect;
    submittedAt : Timestamp;
  };

  // ── Weekly Challenge (internal) ──────────────────────────────────────────────

  public type ChallengeInternal = {
    id : ChallengeId;
    title : Text;
    category : ChallengeCategory;
    startDate : Timestamp;
    endDate : Timestamp;
    rules : Text;
    var winnerId : ?SubmissionId;
  };

  // ── Weekly Challenge (public) ─────────────────────────────────────────────────

  public type Challenge = {
    id : ChallengeId;
    title : Text;
    category : ChallengeCategory;
    startDate : Timestamp;
    endDate : Timestamp;
    rules : Text;
    winnerId : ?SubmissionId;
  };

  // ── Vote Record ───────────────────────────────────────────────────────────────

  public type VoteRecord = {
    voterId : UserId;
    submissionId : SubmissionId;
    challengeId : ChallengeId;
    votedAt : Timestamp;
  };

  // ── Referral Record ───────────────────────────────────────────────────────────

  public type ReferralRecord = {
    referrerId : UserId;
    refereeId : UserId;
    createdAt : Timestamp;
  };

  // ── Input types (for public API surface) ─────────────────────────────────────

  public type RegisterInput = {
    creatorName : Text;
    bio : Text;
    city : Text;
    district : Text;
    referralCode : ?Text; // optional referral code used at signup
  };

  public type CreateChallengeInput = {
    title : Text;
    category : ChallengeCategory;
    startDate : Timestamp;
    endDate : Timestamp;
    rules : Text;
  };

  public type SubmitVideoInput = {
    challengeId : ChallengeId;
    videoUrl : Text;
    effect : ?VideoEffect;
  };
};
