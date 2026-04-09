import Types "../types/types";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

module {

  // ── Rank Calculation ──────────────────────────────────────────────────────────

  public func computeRank(totalVotes : Nat) : Types.Rank {
    if (totalVotes >= 500) { #Platinum }
    else if (totalVotes >= 200) { #Gold }
    else if (totalVotes >= 50) { #Silver }
    else { #Bronze };
  };

  // ── Referral Code Generation ──────────────────────────────────────────────────
  // Produces a short alphanumeric code from the principal text + timestamp.

  public func generateReferralCode(userId : Types.UserId, now : Types.Timestamp) : Text {
    // Combine principal text with timestamp, sanitize, take last 8 chars
    let raw = userId.toText() # debug_show(now);
    let sanitized = raw.map(func(c : Char) : Char {
      if ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9')) c
      else 'X';
    });
    let chars = sanitized.toArray();
    let total = chars.size();
    let from : Int = if (total > 8) { total - 8 } else { 0 };
    let slice = chars.sliceToArray(from, total);
    Text.fromArray(slice);
  };

  // ── Day Index ─────────────────────────────────────────────────────────────────
  // Converts nanosecond timestamp to a calendar day index (days since epoch).

  public func dayIndex(nowNanos : Types.Timestamp) : Nat {
    let nanosPerDay : Int = 86_400_000_000_000;
    Int.abs(nowNanos / nanosPerDay);
  };

  // ── Coin Refresh ──────────────────────────────────────────────────────────────
  // Replenishes coins to 50 if the last refresh was on a different day.

  public func maybeRefreshCoins(user : Types.UserInternal, nowNanos : Types.Timestamp) {
    let today = dayIndex(nowNanos);
    if (today > user.lastCoinRefreshDay) {
      user.coinBalance := 50;
      user.lastCoinRefreshDay := today;
    };
  };

  // ── Projection to public User ─────────────────────────────────────────────────

  public func toPublic(user : Types.UserInternal) : Types.User {
    {
      id = user.id;
      creatorName = user.creatorName;
      bio = user.bio;
      city = user.city;
      district = user.district;
      rank = user.rank;
      hasLegendTag = user.hasLegendTag;
      videoCount = user.videoCount;
      totalVotesReceived = user.totalVotesReceived;
      coinBalance = user.coinBalance;
      referralCount = user.referralCount;
      referralCode = user.referralCode;
      isUnlocked = user.isUnlocked;
      createdAt = user.createdAt;
    };
  };

  // ── Registration ──────────────────────────────────────────────────────────────

  public func register(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    referralIndex : Map.Map<Text, Types.UserId>,
    referrals : List.List<Types.ReferralRecord>,
    caller : Types.UserId,
    input : Types.RegisterInput,
    now : Types.Timestamp,
  ) : Types.User {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    if (users.containsKey(caller)) Runtime.trap("User already registered");

    let code = generateReferralCode(caller, now);
    let today = dayIndex(now);

    let user : Types.UserInternal = {
      id = caller;
      var creatorName = input.creatorName;
      var bio = input.bio;
      var city = input.city;
      var district = input.district;
      var rank = #Bronze;
      var hasLegendTag = false;
      var videoCount = 0;
      var totalVotesReceived = 0;
      var coinBalance = 50;
      var lastCoinRefreshDay = today;
      var referralCount = 0;
      var referralCode = code;
      var isUnlocked = false;
      createdAt = now;
    };

    users.add(caller, user);
    referralIndex.add(code, caller);

    // Apply referral if a valid code was provided
    switch (input.referralCode) {
      case (?refCode) {
        switch (referralIndex.get(refCode)) {
          case (?referrerId) {
            if (not Principal.equal(referrerId, caller)) {
              switch (users.get(referrerId)) {
                case (?referrer) {
                  referrer.referralCount += 1;
                  if (referrer.referralCount >= 2) {
                    referrer.isUnlocked := true;
                  };
                  referrals.add({
                    referrerId;
                    refereeId = caller;
                    createdAt = now;
                  });
                };
                case null {};
              };
            };
          };
          case null {};
        };
      };
      case null {};
    };

    toPublic(user);
  };

  // ── Get Own Profile ───────────────────────────────────────────────────────────

  public func getProfile(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    caller : Types.UserId,
    now : Types.Timestamp,
  ) : ?Types.User {
    switch (users.get(caller)) {
      case (?user) {
        maybeRefreshCoins(user, now);
        ?toPublic(user);
      };
      case null { null };
    };
  };

  // ── Update Profile ────────────────────────────────────────────────────────────

  public func updateProfile(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    caller : Types.UserId,
    creatorName : ?Text,
    bio : ?Text,
    city : ?Text,
    district : ?Text,
  ) : Types.User {
    switch (users.get(caller)) {
      case (?user) {
        switch (creatorName) { case (?v) { user.creatorName := v }; case null {} };
        switch (bio) { case (?v) { user.bio := v }; case null {} };
        switch (city) { case (?v) { user.city := v }; case null {} };
        switch (district) { case (?v) { user.district := v }; case null {} };
        toPublic(user);
      };
      case null { Runtime.trap("User not found") };
    };
  };

  // ── Get User by Principal ─────────────────────────────────────────────────────

  public func getUserById(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    userId : Types.UserId,
  ) : ?Types.User {
    switch (users.get(userId)) {
      case (?user) { ?toPublic(user) };
      case null { null };
    };
  };

  // ── List Users by City/District ───────────────────────────────────────────────

  public func listUsersByLocation(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    city : Text,
    district : ?Text,
  ) : [Types.User] {
    let cityLower = city.toLower();
    let matched = List.empty<Types.User>();
    for ((_, u) in users.entries()) {
      let cityMatch = u.city.toLower() == cityLower;
      let districtMatch = switch (district) {
        case (?d) { u.district.toLower() == d.toLower() };
        case null { true };
      };
      if (cityMatch and districtMatch) {
        matched.add(toPublic(u));
      };
    };
    // Sort descending by totalVotesReceived
    matched.sortInPlace(func(a : Types.User, b : Types.User) : { #less; #equal; #greater } {
      if (a.totalVotesReceived > b.totalVotesReceived) { #less }
      else if (a.totalVotesReceived < b.totalVotesReceived) { #greater }
      else { #equal };
    });
    matched.toArray();
  };

  // ── Rank Update ───────────────────────────────────────────────────────────────
  // Called externally (e.g. after a vote is cast) to keep rank in sync.

  public func updateRank(user : Types.UserInternal) {
    user.rank := computeRank(user.totalVotesReceived);
  };

  // ── Grant Legend Tag ──────────────────────────────────────────────────────────

  public func grantLegendTag(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    userId : Types.UserId,
  ) {
    switch (users.get(userId)) {
      case (?user) { user.hasLegendTag := true };
      case null {};
    };
  };

  // ── Increment Video Count ─────────────────────────────────────────────────────

  public func incrementVideoCount(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    userId : Types.UserId,
  ) {
    switch (users.get(userId)) {
      case (?user) { user.videoCount += 1 };
      case null {};
    };
  };

  // ── Add Votes Received ────────────────────────────────────────────────────────

  public func addVotesReceived(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    userId : Types.UserId,
    amount : Nat,
  ) {
    switch (users.get(userId)) {
      case (?user) {
        user.totalVotesReceived += amount;
        updateRank(user);
      };
      case null {};
    };
  };

  // ── Deduct Coins ──────────────────────────────────────────────────────────────
  // Returns true if coins were deducted, false if balance insufficient.

  public func deductCoins(
    users : Map.Map<Types.UserId, Types.UserInternal>,
    userId : Types.UserId,
    amount : Nat,
    now : Types.Timestamp,
  ) : Bool {
    switch (users.get(userId)) {
      case (?user) {
        maybeRefreshCoins(user, now);
        if (user.coinBalance >= amount) {
          user.coinBalance -= amount;
          true;
        } else {
          false;
        };
      };
      case null { false };
    };
  };

};
