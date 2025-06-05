import RNG from "kol-rng";
import type { Effect } from "./data";

export function rollEffects(effects: Effect[], power: number, cast: number) {
  const list: Effect[] = [];

  if (effects.length === 0) return list;

  // Total number of effects is based on power alone
  const total = Math.ceil(power / 100);

  // Power is soft capped at 1,100
  const cappedPower = Math.min(1100, power) + Math.floor(Math.pow(power - 1100, 0.8));

  // RNG seeded with power + casts (0-indexed)
  const seed = cappedPower + (cast - 1);

  const rng = new RNG(seed);
  for (let i = 0; i < total; i++) {
    list.push(rng.pickOne(effects));
  }
  return list;
}
