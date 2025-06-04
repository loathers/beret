import RNG from "kol-rng";
import type { Effect } from "./data";

export function rollEffects(effects: Effect[], power: number, cast: number) {
  const list: Effect[] = [];

  if (effects.length === 0) return list;

  // Total number of effects is based on power alone
  const total = Math.ceil(power / 100);

  // RNG seeded with power + casts (0-indexed)
  const seed = power + (cast - 1);

  const rng = new RNG(seed);
  for (let i = 0; i < total; i++) {
    list.push(rng.pickOne(effects));
  }
  return list;
}
