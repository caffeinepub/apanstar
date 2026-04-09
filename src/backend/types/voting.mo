import Common "common";

module {
  public type UserId = Common.UserId;
  public type SubmissionId = Common.SubmissionId;
  public type ChallengeId = Common.ChallengeId;
  public type Timestamp = Common.Timestamp;

  // ── Vote Record ──────────────────────────────────────────────────────────────

  public type VoteRecord = {
    voterId : UserId;
    submissionId : SubmissionId;
    challengeId : ChallengeId;
    votedAt : Timestamp;
  };

  // ── Referral Info (public / serializable) ────────────────────────────────────

  public type ReferralInfo = {
    referralCode : Text;
    referralCount : Nat;
    isUnlocked : Bool;
  };
};
