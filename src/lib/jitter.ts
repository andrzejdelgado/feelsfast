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
