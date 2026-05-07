import { describe, it, expect } from "vitest";
import { gammaJitter } from "./jitter";

describe("gammaJitter", () => {
  it("returns 0 for non-positive p50", () => {
    expect(gammaJitter(0)).toBe(0);
    expect(gammaJitter(-100)).toBe(0);
  });

  it("returns positive ms values for positive p50", () => {
    for (let i = 0; i < 50; i++) {
      expect(gammaJitter(500)).toBeGreaterThan(0);
    }
  });

  it("has a sample median within ±20% of the requested p50", () => {
    const samples = Array.from({ length: 2000 }, () => gammaJitter(500));
    samples.sort((a, b) => a - b);
    const median = samples[1000];
    expect(median).toBeGreaterThan(400);
    expect(median).toBeLessThan(600);
  });

  it("has p90 in the 1.7×–2.6× p50 band (right-skewed)", () => {
    const samples = Array.from({ length: 5000 }, () => gammaJitter(500));
    samples.sort((a, b) => a - b);
    const p90 = samples[Math.floor(samples.length * 0.9)];
    expect(p90).toBeGreaterThan(500 * 1.7);
    expect(p90).toBeLessThan(500 * 2.6);
  });

  it("is deterministic given a deterministic random source", () => {
    const seed = [0.3, 0.7];
    let i = 0;
    const fakeRandom = () => seed[i++ % seed.length];

    const a = gammaJitter(500, fakeRandom);
    i = 0;
    const b = gammaJitter(500, fakeRandom);

    expect(a).toBeCloseTo(b, 5);
  });
});
