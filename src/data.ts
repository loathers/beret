import { createClient } from "data-of-loathing";
import validEffects from "./effects.json";

const client = createClient();

const FINAL = validEffects[validEffects.length - 1];

export async function load() {
  const results = await client.query({
    allEffects: {
      nodes: {
        id: true,
        name: true,
        image: true,
        effectModifierByEffect: {
          modifiers: true,
        },
      },
      __args: {
        orderBy: ["ID_ASC"],
      },
    },
  });

  const effects =
    results.allEffects?.nodes
      .filter((e) => e !== null)
      .filter((e) => e.id <= FINAL && validEffects.includes(e.id)) ?? [];

  // While effects.json correctly duplicates the final effect, the above approach does not.
  // Rather than implement an effectById map and then mapping the correct list we can just
  // reappend the final entry.
  return [...effects, effects[effects.length - 1]];
}

export type Effect = Awaited<ReturnType<typeof load>>[number];
