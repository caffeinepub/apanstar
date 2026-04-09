import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import VotingLib "../lib/voting";
import VTypes "../types/voting";
import AppTypes "../types/types";

mixin (
  users : Map.Map<AppTypes.UserId, AppTypes.UserInternal>,
  referralIndex : Map.Map<Text, AppTypes.UserId>,
  submissions : List.List<AppTypes.SubmissionInternal>,
  voteRecords : List.List<VTypes.VoteRecord>,
  votedPairs : Set.Set<(Principal, Nat)>,
) {

  /// Cast a vote on a submission.
  /// Deducts 1 coin from the voter (with daily refresh logic), increments
  /// submission voteCount and creator totalVotesReceived, prevents double-voting.
  public shared ({ caller }) func castVote(submissionId : Nat, challengeId : Nat) : async { #ok; #err : Text } {
    VotingLib.castVote(users, submissions, voteRecords, votedPairs, caller, submissionId, challengeId);
  };

  /// Returns the caller's remaining coin balance for today.
  /// Automatically resets to 50 if the current day has changed.
  public shared ({ caller }) func getRemainingCoins() : async Nat {
    VotingLib.getRemainingCoins(users, caller);
  };

  /// Returns the current vote count for a given submission.
  public query func getVoteCount(submissionId : Nat) : async Nat {
    VotingLib.getVoteCount(submissions, submissionId);
  };

  /// Register a referral: caller provides the referral code they used at signup.
  /// Increments the referrer's referralCount and unlocks them when they hit 2.
  public shared ({ caller }) func trackReferral(referralCode : Text) : async { #ok; #err : Text } {
    VotingLib.trackReferral(users, referralIndex, caller, referralCode);
  };

  /// Get referral info (code, referralCount, isUnlocked) for the caller.
  public shared ({ caller }) func getReferralInfo() : async ?VTypes.ReferralInfo {
    VotingLib.getReferralInfo(users, caller);
  };

  /// Validate a referral code. Returns the referrer's Principal if the code exists.
  public query func validateReferralCode(code : Text) : async ?Principal {
    VotingLib.validateReferralCode(referralIndex, code);
  };
};
