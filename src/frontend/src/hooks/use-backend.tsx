import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ExternalBlob, createActor } from "../backend";

function useBackendActor() {
  return useActor(
    (
      canisterId,
      _uploadFile: (f: ExternalBlob) => Promise<Uint8Array>,
      _downloadFile: (b: Uint8Array) => Promise<ExternalBlob>,
      options,
    ) => createActor(canisterId, _uploadFile, _downloadFile, options),
  );
}

/* ─── Profile ────────────────────────────────────────────── */

export function useGetMyProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myProfile"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () => (actor as any)?.getMyProfile?.() ?? null,
    enabled: !!actor && !isFetching,
  });
}

export function useListUsersByLocation(city: string, district?: string | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["usersByLocation", city, district ?? null],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () =>
      (actor as any)?.listUsersByLocation?.(city, district ?? null) ?? [],
    enabled: !!actor && !isFetching && !!city,
  });
}

/* ─── Challenges ─────────────────────────────────────────── */

export function useListChallenges(city?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["challenges", city ?? "all"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () =>
      (actor as any)?.listChallenges?.(city ? [city] : []) ?? [],
    enabled: !!actor && !isFetching,
  });
}

export function useGetChallengeLeaderboard(challengeId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["leaderboard", challengeId],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () =>
      (actor as any)?.getChallengeLeaderboard?.(challengeId) ?? [],
    enabled: !!actor && !isFetching && !!challengeId,
  });
}

/* ─── Coins & Voting ─────────────────────────────────────── */

export function useGetRemainingCoins() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["remainingCoins"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () => (actor as any)?.getRemainingCoins?.() ?? 50,
    enabled: !!actor && !isFetching,
  });
}

export function useCastVote() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId,
      challengeId,
    }: { submissionId: string; challengeId: string }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (actor as any)?.castVote?.(BigInt(submissionId), BigInt(challengeId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["remainingCoins"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

/* ─── Referral ───────────────────────────────────────────── */

export function useGetReferralInfo() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["referralInfo"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async () => (actor as any)?.getReferralInfo?.() ?? null,
    enabled: !!actor && !isFetching,
  });
}

/* ─── Register ───────────────────────────────────────────── */

export function useRegisterUser() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      bio: string;
      city: string;
      district: string;
      referralCode?: string;
    }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (actor as any)?.registerUser?.({
        creatorName: params.name,
        bio: params.bio,
        city: params.city,
        district: params.district,
        referralCode: params.referralCode ? [params.referralCode] : [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}
