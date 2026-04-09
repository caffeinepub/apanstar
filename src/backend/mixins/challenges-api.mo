import Types "../types/types";
import ChallengesLib "../lib/challenges";
import UserLib "../lib/Users";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

/// Mixin receives:
///   challenges        — mutable list of ChallengeInternal
///   submissions       — mutable list of SubmissionInternal
///   users             — map of UserId -> UserInternal (to grant Legend tag)
///   ownerRef          — wrapper object holding var Principal (mutable, set via claimOwnership)
///   challengeCounter  — wrapper object holding var Nat for challenge IDs
///   submissionCounter — wrapper object holding var Nat for submission IDs
mixin (
  challenges        : List.List<Types.ChallengeInternal>,
  submissions       : List.List<Types.SubmissionInternal>,
  users             : Map.Map<Types.UserId, Types.UserInternal>,
  ownerRef          : { var value : Principal; var isSet : Bool },
  challengeCounter  : { var value : Nat },
  submissionCounter : { var value : Nat },
) {

  // ── Admin: create challenge ───────────────────────────────────────────────────

  public shared ({ caller }) func createChallenge(input : Types.CreateChallengeInput) : async Types.Challenge {
    if (not ownerRef.isSet or not Principal.equal(caller, ownerRef.value)) Runtime.trap("Unauthorized: admin only");
    let id = challengeCounter.value;
    challengeCounter.value += 1;
    let c = ChallengesLib.createChallenge(challenges, id, input);
    ChallengesLib.toPublicChallenge(c);
  };

  // ── Query: list all challenges ────────────────────────────────────────────────

  public query func listChallenges() : async [Types.Challenge] {
    ChallengesLib.listChallenges(challenges);
  };

  // ── Query: get challenge by ID ────────────────────────────────────────────────

  public query func getChallenge(id : Types.ChallengeId) : async ?Types.Challenge {
    ChallengesLib.getChallenge(challenges, id);
  };

  // ── Submit video to active challenge ─────────────────────────────────────────

  public shared ({ caller }) func submitVideo(input : Types.SubmitVideoInput) : async Types.Submission {
    // Resolve caller's unlock status from user profile
    let isUnlocked = switch (users.get(caller)) {
      case (?u) u.isUnlocked;
      case null Runtime.trap("User profile not found — register first");
    };
    let id = submissionCounter.value;
    submissionCounter.value += 1;
    let s = ChallengesLib.submitVideo(challenges, submissions, id, caller, isUnlocked, input);
    // Increment video count on the creator's profile
    UserLib.incrementVideoCount(users, caller);
    ChallengesLib.toPublicSubmission(s);
  };

  // ── Query: leaderboard (sorted by voteCount desc) ────────────────────────────

  public query func getChallengeLeaderboard(challengeId : Types.ChallengeId) : async [Types.Submission] {
    ChallengesLib.getLeaderboard(submissions, challengeId);
  };

  // ── Admin: finalize challenge ─────────────────────────────────────────────────

  public shared ({ caller }) func finalizeChallenge(challengeId : Types.ChallengeId) : async ?Types.SubmissionId {
    if (not ownerRef.isSet or not Principal.equal(caller, ownerRef.value)) Runtime.trap("Unauthorized: admin only");
    let winningSubmissionId = ChallengesLib.finalizeChallenge(challenges, submissions, challengeId);
    // Grant Legend tag to the winning creator's profile (cross-domain)
    switch (winningSubmissionId) {
      case null {};
      case (?sid) {
        switch (ChallengesLib.getCreatorIdFromSubmission(submissions, sid)) {
          case null {};
          case (?creatorId) { UserLib.grantLegendTag(users, creatorId) };
        };
      };
    };
    winningSubmissionId;
  };

};
