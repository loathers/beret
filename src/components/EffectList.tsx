import { css } from "../../styled-system/css";
import { Stack } from "../../styled-system/jsx";
import type { Effect } from "../data";
import { Modifiers } from "./Modifiers";
import { Text } from "./Text";

type Props = {
  effects: Effect[];
};

const listStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 3,
});

export function EffectList({ effects }: Props) {
  return (
    <ul className={listStyle}>
      {effects.map((effect, index) => (
        <li key={index}>
          <Stack
            direction="horizontal"
            title={`Effect id ${effect.id}`}
            alignItems="center"
          >
            <img
              src={`https://d2uyhvukfffg5a.cloudfront.net/itemimages/${effect.image}`}
              alt={effect.name}
            />
            <Stack gap={1}>
              <Text>
                You acquire an effect: <b>{effect.name}</b> (10 Adventures)
              </Text>
              {effect.effectModifierByEffect && (
                <Modifiers
                  modifiers={effect.effectModifierByEffect.modifiers}
                />
              )}
            </Stack>
          </Stack>
        </li>
      ))}
    </ul>
  );
}
