import RNG from "kol-rng";
import type { Effect } from "./data";

export function rollEffects(effects: Effect[], power: number, cast: number) {
  const list: Effect[] = [];

  if (effects.length === 0) return list;

  const softcappedPower = power > 1100 ? 1100 + Math.floor((power - 1100) ** 0.8) : power;

  // Total number of effects is based on power alone
  const total = Math.ceil(softcappedPower / 100);

  // RNG seeded with power + casts (0-indexed)
  const seed = softcappedPower + (cast - 1);

  const rng = new RNG(seed);
  for (let i = 0; i < total; i++) {
    list.push(rng.pickOne(effects));
  }
  return list;
}
