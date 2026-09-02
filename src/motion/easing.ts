export const appleEase = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  attract: 22,
} as const;

export const transitions = {
  fast: { duration: durations.fast, ease: appleEase },
  normal: { duration: durations.normal, ease: appleEase },
  slow: { duration: durations.slow, ease: appleEase },
} as const;

export const IDLE_TIMEOUT_MS = 45_000;
