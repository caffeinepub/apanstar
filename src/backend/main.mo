import Types "types/types";
import VTypes "types/voting";
import UsersMixin "mixins/users-api";
import ChallengesMixin "mixins/challenges-api";
import VotingMixin "mixins/voting-api";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  // ── Owner ────────────────────────────────────────────────────────────────────
  // Captured at first deploy — used for admin-only operations.
  let ownerRef = { var value : Principal = Principal.anonymous(); var isSet : Bool = false };

  // ── User state ───────────────────────────────────────────────────────────────
  let users = Map.empty<Types.UserId, Types.UserInternal>();
  let referralIndex = Map.empty<Text, Types.UserId>();
  let referrals = List.empty<Types.ReferralRecord>();

  // ── Challenge & Submission state ─────────────────────────────────────────────
  let challenges = List.empty<Types.ChallengeInternal>();
  let submissions = List.empty<Types.SubmissionInternal>();
  let challengeCounter = { var value : Nat = 0 };
  let submissionCounter = { var value : Nat = 0 };

  // ── Voting state ─────────────────────────────────────────────────────────────
  let voteRecords = List.empty<VTypes.VoteRecord>();
  let votedPairs = Set.empty<(Principal, Nat)>();

  // ── Mixins ───────────────────────────────────────────────────────────────────
  include UsersMixin(users, referralIndex, referrals);
  include ChallengesMixin(challenges, submissions, users, ownerRef, challengeCounter, submissionCounter);
  include VotingMixin(users, referralIndex, submissions, voteRecords, votedPairs);

  // ── Owner init ───────────────────────────────────────────────────────────────
  // First caller to claim ownership becomes the owner.
  public shared ({ caller }) func claimOwnership() : async Bool {
    if (ownerRef.isSet) return false;
    ownerRef.value := caller;
    ownerRef.isSet := true;
    true;
  };

  public query func getOwner() : async Principal {
    ownerRef.value;
  };

  // ── Sample data seed (demo) ───────────────────────────────────────────────────
  // Creates 2 sample challenges and 3 sample users if maps are empty.
  // Callable by any principal for demo purposes.
  public shared ({ caller }) func adminSeedData() : async Text {
    if (not challenges.isEmpty() or not users.isEmpty()) {
      return "Seed data already exists — skipping";
    };

    let now = Time.now();
    let oneWeekNanos : Int = 7 * 24 * 60 * 60 * 1_000_000_000;

    // ── Seed 2 challenges ─────────────────────────────────────────────────────
    let c1 : Types.ChallengeInternal = {
      id        = challengeCounter.value;
      title     = "Mumbai Singing Star";
      category  = #Singing;
      startDate = now;
      endDate   = now + oneWeekNanos;
      rules     = "Upload a 60-second original performance. Best voice wins the Legend tag!";
      var winnerId = null;
    };
    challenges.add(c1);
    challengeCounter.value += 1;

    let c2 : Types.ChallengeInternal = {
      id        = challengeCounter.value;
      title     = "Delhi Comedy Mimicry Battle";
      category  = #Mimicry;
      startDate = now;
      endDate   = now + oneWeekNanos;
      rules     = "Best celebrity impression under 45 seconds. Crowd votes decide the winner.";
      var winnerId = null;
    };
    challenges.add(c2);
    challengeCounter.value += 1;

    // ── Seed 3 sample users ───────────────────────────────────────────────────
    let nanosPerDay : Int = 86_400_000_000_000;
    let today : Nat = Int.abs(now / nanosPerDay);

    let u1Id = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");  // well-known IC principal
    let u1 : Types.UserInternal = {
      id                    = u1Id;
      var creatorName       = "Priya Sharma";
      var bio               = "Singer & dancer from Mumbai. Spreading joy through music!";
      var city              = "Mumbai";
      var district          = "Andheri";
      var rank              = #Silver;
      var hasLegendTag      = false;
      var videoCount        = 5;
      var totalVotesReceived = 75;
      var coinBalance       = 50;
      var lastCoinRefreshDay = today;
      var referralCount     = 3;
      var referralCode      = "PRIYA001";
      var isUnlocked        = true;
      createdAt             = now;
    };
    users.add(u1Id, u1);
    referralIndex.add("PRIYA001", u1Id);

    let u2Id = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");   // well-known IC principal
    let u2 : Types.UserInternal = {
      id                    = u2Id;
      var creatorName       = "Rahul Verma";
      var bio               = "Mimicry artist from Delhi. I can sound like anyone!";
      var city              = "Delhi";
      var district          = "Karol Bagh";
      var rank              = #Bronze;
      var hasLegendTag      = false;
      var videoCount        = 2;
      var totalVotesReceived = 20;
      var coinBalance       = 50;
      var lastCoinRefreshDay = today;
      var referralCount     = 1;
      var referralCode      = "RAHUL002";
      var isUnlocked        = false;
      createdAt             = now;
    };
    users.add(u2Id, u2);
    referralIndex.add("RAHUL002", u2Id);

    // Use caller as third sample user (whoever calls seed)
    if (not users.containsKey(caller) and not caller.isAnonymous()) {
      let u3 : Types.UserInternal = {
        id                    = caller;
        var creatorName       = "Demo Creator";
        var bio               = "I am a demo creator on ApanStar!";
        var city              = "Bangalore";
        var district          = "Koramangala";
        var rank              = #Bronze;
        var hasLegendTag      = false;
        var videoCount        = 0;
        var totalVotesReceived = 0;
        var coinBalance       = 50;
        var lastCoinRefreshDay = today;
        var referralCount     = 2;
        var referralCode      = "DEMO0003";
        var isUnlocked        = true;
        createdAt             = now;
      };
      users.add(caller, u3);
      referralIndex.add("DEMO0003", caller);
    };

    "Seed complete: 2 challenges + " # (if (not caller.isAnonymous()) "3" else "2") # " users created";
  };
};
