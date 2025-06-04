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
    },
  });

  return (
    results.allEffects?.nodes
      .filter((e) => e !== null)
      .filter((e) => e.id <= FINAL && validEffects.includes(e.id)) ?? []
  );
}

export type Effect = Awaited<ReturnType<typeof load>>[number];
