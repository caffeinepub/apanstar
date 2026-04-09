import Types "../types/types";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /// Convert internal challenge to public type.
  public func toPublicChallenge(c : Types.ChallengeInternal) : Types.Challenge {
    {
      id        = c.id;
      title     = c.title;
      category  = c.category;
      startDate = c.startDate;
      endDate   = c.endDate;
      rules     = c.rules;
      winnerId  = c.winnerId;
    };
  };

  /// Convert internal submission to public type.
  public func toPublicSubmission(s : Types.SubmissionInternal) : Types.Submission {
    {
      id          = s.id;
      challengeId = s.challengeId;
      creatorId   = s.creatorId;
      videoUrl    = s.videoUrl;
      voteCount   = s.voteCount;
      effect      = s.effect;
      submittedAt = s.submittedAt;
    };
  };

  // ── Create challenge (admin only — enforced in mixin) ────────────────────────

  public func createChallenge(
    challenges    : List.List<Types.ChallengeInternal>,
    nextId        : Nat,
    input         : Types.CreateChallengeInput,
  ) : Types.ChallengeInternal {
    let challenge : Types.ChallengeInternal = {
      id        = nextId;
      title     = input.title;
      category  = input.category;
      startDate = input.startDate;
      endDate   = input.endDate;
      rules     = input.rules;
      var winnerId = null;
    };
    challenges.add(challenge);
    challenge;
  };

  // ── List all challenges ───────────────────────────────────────────────────────

  public func listChallenges(
    challenges : List.List<Types.ChallengeInternal>,
  ) : [Types.Challenge] {
    challenges.map<Types.ChallengeInternal, Types.Challenge>(toPublicChallenge).toArray();
  };

  // ── Get challenge by ID ───────────────────────────────────────────────────────

  public func getChallenge(
    challenges : List.List<Types.ChallengeInternal>,
    id         : Types.ChallengeId,
  ) : ?Types.Challenge {
    switch (challenges.find(func(c : Types.ChallengeInternal) : Bool { c.id == id })) {
      case (?c) ?toPublicChallenge(c);
      case null null;
    };
  };

  // ── Submit video to an active challenge ──────────────────────────────────────

  /// Returns the new submission on success, or traps on validation failure.
  public func submitVideo(
    challenges  : List.List<Types.ChallengeInternal>,
    submissions : List.List<Types.SubmissionInternal>,
    nextId      : Nat,
    caller      : Types.UserId,
    isUnlocked  : Bool,
    input       : Types.SubmitVideoInput,
  ) : Types.SubmissionInternal {
    if (not isUnlocked) {
      Runtime.trap("Account not unlocked — invite 2 friends first");
    };

    let now = Time.now();

    // Find the challenge
    let challenge = switch (challenges.find(func(c : Types.ChallengeInternal) : Bool { c.id == input.challengeId })) {
      case (?c) c;
      case null Runtime.trap("Challenge not found");
    };

    // Verify challenge is active
    if (now < challenge.startDate or now > challenge.endDate) {
      Runtime.trap("Challenge is not currently active");
    };

    let submission : Types.SubmissionInternal = {
      id          = nextId;
      challengeId = input.challengeId;
      creatorId   = caller;
      videoUrl    = input.videoUrl;
      var voteCount = 0;
      var effect    = input.effect;
      submittedAt = now;
    };
    submissions.add(submission);
    submission;
  };

  // ── Leaderboard: submissions for a challenge sorted by voteCount desc ────────

  public func getLeaderboard(
    submissions : List.List<Types.SubmissionInternal>,
    challengeId : Types.ChallengeId,
  ) : [Types.Submission] {
    let filtered = submissions
      .filter(func(s : Types.SubmissionInternal) : Bool { s.challengeId == challengeId })
      .map<Types.SubmissionInternal, Types.Submission>(toPublicSubmission);

    // Sort descending by voteCount
    filtered.sort(func(a : Types.Submission, b : Types.Submission) : { #less; #equal; #greater } {
      if (a.voteCount > b.voteCount)      #less    // reverse order → highest first
      else if (a.voteCount < b.voteCount) #greater
      else                                #equal;
    }).toArray();
  };

  // ── Finalize challenge ────────────────────────────────────────────────────────

  /// Returns the winning SubmissionId (or null if no submissions).
  /// Caller is responsible for granting the Legend tag.
  public func finalizeChallenge(
    challenges  : List.List<Types.ChallengeInternal>,
    submissions : List.List<Types.SubmissionInternal>,
    challengeId : Types.ChallengeId,
  ) : ?Types.SubmissionId {
    let challenge = switch (challenges.find(func(c : Types.ChallengeInternal) : Bool { c.id == challengeId })) {
      case (?c) c;
      case null Runtime.trap("Challenge not found");
    };

    if (challenge.winnerId != null) {
      Runtime.trap("Challenge already finalized");
    };

    // Find submission with highest voteCount
    let challengeSubmissions = submissions.filter(func(s : Types.SubmissionInternal) : Bool {
      s.challengeId == challengeId;
    });

    var winner : ?Types.SubmissionInternal = null;
    challengeSubmissions.forEach(func(s : Types.SubmissionInternal) {
      switch (winner) {
        case null { winner := ?s };
        case (?w) {
          if (s.voteCount > w.voteCount) { winner := ?s };
        };
      };
    });

    switch (winner) {
      case null null;
      case (?w) {
        challenge.winnerId := ?w.id;
        ?w.id;
      };
    };
  };

  // ── Grant Legend tag ──────────────────────────────────────────────────────────
  // Used by main actor composition (cross-domain) to set hasLegendTag on a user profile.
  // The actual mutation is done in the users domain; this lib only resolves
  // the winning creatorId from a submission.

  public func getCreatorIdFromSubmission(
    submissions  : List.List<Types.SubmissionInternal>,
    submissionId : Types.SubmissionId,
  ) : ?Types.UserId {
    switch (submissions.find(func(s : Types.SubmissionInternal) : Bool { s.id == submissionId })) {
      case (?s) ?s.creatorId;
      case null null;
    };
  };
};
