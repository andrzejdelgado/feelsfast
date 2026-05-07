/**
 * Generate a gamma-distributed random latency in milliseconds.
 *
 * Uses Erlang-2 (sum of two exponentials), which gives the right-skewed
 * shape of real network latency: most requests cluster near the median,
 * a fat tail extends well beyond. p90 is ≈ 2.13 × p50.
 *
 * Median(Erlang-2 with scale θ) ≈ 1.678 × θ, so we set scale = p50 / 1.678
 * to centre the distribution on the requested median.
 *
 * Citation: per PRD §8, demos use non-linear (gamma-distributed) latency
 * because flat setTimeout values feel artificial and undermine the
 * naive/tuned comparison.
 *
 * @param p50 Target median latency in ms.
 * @param random Optional random source (for testing). Defaults to Math.random.
 * @returns A latency in ms drawn from the distribution.
 */
export function gammaJitter(
  p50: number,
  random: () => number = Math.random,
): number {
  if (p50 <= 0) return 0;
  const scale = p50 / 1.678;
  // Sum of two exponentials → Erlang-2.
  // Inverse CDF of exponential: -ln(1 - U) where U ~ Uniform(0, 1).
  const e1 = -Math.log(1 - random());
  const e2 = -Math.log(1 - random());
  return (e1 + e2) * scale;
}

/**
 * Mulberry32 — small, fast, deterministic 32-bit PRNG. Same seed
 * always produces the same sequence. Used by `seededGamma` so the
 * Off and On sides of every DemoRunner share identical timings on
 * every Replay (without the Off side rolling differently from the
 * On side and finishing seconds apart).
 *
 * Exported so demos that need *more than just timings* (event
 * streams, randomly-selected actor/verb pairs, etc.) can pull
 * deterministically from the same seed.
 *
 * Not cryptographically secure. Sequence quality is plenty for demo
 * timing, not enough for anything sensitive.
 */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic gamma-jittered duration. Same `(seed, p50)` always
 * returns the same number. Pass per-call offsets (`seed + i * 1000`)
 * when a single demo needs multiple independent durations from one
 * shared seed (image-gallery's six tiles, ai-tool-execution's four
 * steps, etc.).
 */
export function seededGamma(seed: number, p50: number): number {
  return gammaJitter(p50, mulberry32(seed));
}
