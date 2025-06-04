import { css } from "../../styled-system/css";
import type { Effect } from "../data";
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
