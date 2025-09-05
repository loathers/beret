import { Stack } from "../../styled-system/jsx";
import type { Effect } from "../data";
import { Text } from "./Text";
import { Modifiers } from "./Modifiers";
import { effectTurns } from "../utils";

type Props = {
  effect: Effect;
};

export function EffectListItem({ effect }: Props) {
  const modifiers = effect.effectModifierByEffect?.modifiers;
  const url = `https://wiki.kingdomofloathing.com/${modifiers?.["Wiki Name"]?.slice(1, -1) ?? effect.name}`;
  return (
    <li>
      <Stack
        direction="horizontal"
        title={`Effect id ${effect.id}`}
        alignItems="center"
      >
        <a href={url} target="_blank">
          <img
            src={`https://d2uyhvukfffg5a.cloudfront.net/itemimages/${effect.image}`}
            alt={effect.name}
          />
        </a>
        <Stack gap={1}>
          <Text>
            You acquire an effect:{" "}
            <b>
              <a href={url} target="_blank">
                {effect.name}
              </a>
            </b>{" "}
            ({effectTurns(effect)})
          </Text>
          {modifiers && <Modifiers modifiers={modifiers} />}
        </Stack>
      </Stack>
    </li>
  );
}
