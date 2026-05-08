import { createClient, Effect } from "data-of-loathing";
import validEffects from "./effects.json";

const client = createClient();

export async function load() {
  await client.load();

  const effects = await client.query.find(
    Effect,
    { id: { $in: validEffects } },
    { orderBy: { id: "ASC" }, populate: ["modifiers"] },
  );

  // While effects.json correctly duplicates the final effect, the above approach does not.
  // Rather than implement an effectById map and then mapping the correct list we can just
  // reappend the final entry.
  return [...effects, effects[effects.length - 1]];
}
