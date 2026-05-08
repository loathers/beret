import type { Effect } from "data-of-loathing";

import { css } from "../../styled-system/css";
import { EffectListItem } from "./EffectListItem";

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
        <EffectListItem effect={effect} key={index} />
      ))}
    </ul>
  );
}
