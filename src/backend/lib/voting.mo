import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Types "../types/voting";
import AppTypes "../types/types";

module {

  // ── Tuple compare for (Principal, Nat) voted-pair set ────────────────────────

  public func votePairCompare(a : (Principal, Nat), b : (Principal, Nat)) : Order.Order {
    let pc = Principal.compare(a.0, b.0);
    if (not pc.isEqual()) { pc } else { Nat.compare(a.1, b.1) };
  };

  // ── Day index helper ─────────────────────────────────────────────────────────

  func dayIndex(nowNanos : Int) : Nat {
    let nanosPerDay : Int = 86_400_000_000_000;
    Int.abs(nowNanos / nanosPerDay);
  };

  // ── Coin helpers ─────────────────────────────────────────────────────────────

  /// Refresh coins to 50 if a new day has started.
  func maybeRefreshCoins(user : AppTypes.UserInternal) {
    let today = dayIndex(Time.now());
    if (today > user.lastCoinRefreshDay) {
      user.coinBalance := 50;
      user.lastCoinRefreshDay := today;
    };
  };

  // ── Get remaining coins for caller ─────────────────────────────────────────

  public func getRemainingCoins(
    users : Map.Map<AppTypes.UserId, AppTypes.UserInternal>,
    caller : Principal,
  ) : Nat {
    switch (users.get(caller)) {
      case null { Runtime.trap("User not registered") };
      case (?user) {
        maybeRefreshCoins(user);
        user.coinBalance;
      };
    };
  };

  // ── Cast vote ───────────────────────────────────────────────────────────────

  public func castVote(
    users : Map.Map<AppTypes.UserId, AppTypes.UserInternal>,
    submissions : List.List<AppTypes.SubmissionInternal>,
    voteRecords : List.List<Types.VoteRecord>,
    votedPairs : Set.Set<(Principal, Nat)>,
    caller : Principal,
    submissionId : Nat,
    challengeId : Nat,
  ) : { #ok; #err : Text } {
    // 1. Caller must be registered
    let voter = switch (users.get(caller)) {
      case null { return #err("User not registered") };
      case (?u) u;
    };

    // 2. Refresh daily coins if needed
    maybeRefreshCoins(voter);

    // 3. Check coin balance
    if (voter.coinBalance == 0) {
      return #err("No coins remaining today. Come back tomorrow!");
    };

    // 4. Prevent double-vote on same submission
    if (votedPairs.contains(votePairCompare, (caller, submissionId))) {
      return #err("Already voted for this submission");
    };

    // 5. Find submission
    let submission = switch (submissions.find(func(s : AppTypes.SubmissionInternal) : Bool {
      s.id == submissionId
    })) {
      case null { return #err("Submission not found") };
      case (?s) s;
    };

    // 6. Find creator
    let creator = switch (users.get(submission.creatorId)) {
      case null { return #err("Creator not found") };
      case (?u) u;
    };

    // 7. Apply mutations
    voter.coinBalance -= 1;
    submission.voteCount += 1;
    creator.totalVotesReceived += 1;

    // 8. Update creator rank
    creator.rank := computeRank(creator.totalVotesReceived);

    // 9. Record vote pair (double-vote guard)
    votedPairs.add(votePairCompare, (caller, submissionId));

    // 10. Append full vote record
    voteRecords.add({
      voterId = caller;
      submissionId;
      challengeId;
      votedAt = Time.now();
    });

    #ok;
  };

  /// Get vote count for a submission.
  public func getVoteCount(
    submissions : List.List<AppTypes.SubmissionInternal>,
    submissionId : Nat,
  ) : Nat {
    switch (submissions.find(func(s : AppTypes.SubmissionInternal) : Bool { s.id == submissionId })) {
      case (?s) s.voteCount;
      case null 0;
    };
  };

  // ── Referral ─────────────────────────────────────────────────────────────────

  /// Track a referral: find referrer by code, increment referralCount, unlock at 2.
  public func trackReferral(
    users : Map.Map<AppTypes.UserId, AppTypes.UserInternal>,
    referralIndex : Map.Map<Text, AppTypes.UserId>,
    refereeId : Principal,
    referralCode : Text,
  ) : { #ok; #err : Text } {
    // Lookup referrer's UserId from code index
    let referrerId = switch (referralIndex.get(referralCode)) {
      case null { return #err("Invalid referral code") };
      case (?rid) rid;
    };

    // Self-referral guard
    if (Principal.equal(referrerId, refereeId)) {
      return #err("Cannot use your own referral code");
    };

    // Find referrer user record
    let referrer = switch (users.get(referrerId)) {
      case null { return #err("Referrer not found") };
      case (?u) u;
    };

    referrer.referralCount += 1;
    if (referrer.referralCount >= 2) {
      referrer.isUnlocked := true;
    };

    #ok;
  };

  /// Get referral info for a user.
  public func getReferralInfo(
    users : Map.Map<AppTypes.UserId, AppTypes.UserInternal>,
    caller : Principal,
  ) : ?Types.ReferralInfo {
    switch (users.get(caller)) {
      case null null;
      case (?u) {
        ?{
          referralCode = u.referralCode;
          referralCount = u.referralCount;
          isUnlocked = u.isUnlocked;
        };
      };
    };
  };

  /// Validate a referral code — returns the referrer's UserId if valid.
  public func validateReferralCode(
    referralIndex : Map.Map<Text, AppTypes.UserId>,
    code : Text,
  ) : ?Principal {
    referralIndex.get(code);
  };

  // ── Internal helper ──────────────────────────────────────────────────────────

  func computeRank(totalVotes : Nat) : AppTypes.Rank {
    if (totalVotes >= 500) { #Platinum }
    else if (totalVotes >= 200) { #Gold }
    else if (totalVotes >= 50) { #Silver }
    else { #Bronze };
  };
};
