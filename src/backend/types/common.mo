module {
  // Cross-cutting identity and time types
  public type UserId = Principal;
  public type Timestamp = Int; // nanoseconds since epoch (Time.now())
  public type ChallengeId = Nat;
  public type SubmissionId = Nat;
};
