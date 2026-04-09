import Types "../types/types";
import UserLib "../lib/Users";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

mixin (
  users : Map.Map<Types.UserId, Types.UserInternal>,
  referralIndex : Map.Map<Text, Types.UserId>,
  referrals : List.List<Types.ReferralRecord>,
) {

  // ── Register ──────────────────────────────────────────────────────────────────

  public shared ({ caller }) func registerUser(input : Types.RegisterInput) : async Types.User {
    UserLib.register(users, referralIndex, referrals, caller, input, Time.now());
  };

  // ── Get Own Profile ───────────────────────────────────────────────────────────

  public shared ({ caller }) func getMyProfile() : async ?Types.User {
    UserLib.getProfile(users, caller, Time.now());
  };

  // ── Update Profile ────────────────────────────────────────────────────────────

  public shared ({ caller }) func updateMyProfile(
    creatorName : ?Text,
    bio : ?Text,
    city : ?Text,
    district : ?Text,
  ) : async Types.User {
    UserLib.updateProfile(users, caller, creatorName, bio, city, district);
  };

  // ── Get User by Principal ─────────────────────────────────────────────────────

  public query func getUserById(userId : Principal) : async ?Types.User {
    UserLib.getUserById(users, userId);
  };

  // ── List Users by City/District ───────────────────────────────────────────────

  public query func listUsersByLocation(city : Text, district : ?Text) : async [Types.User] {
    UserLib.listUsersByLocation(users, city, district);
  };

};
