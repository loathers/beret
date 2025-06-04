import type { Effect } from "./App";
import { Text } from "./Text";

type Props = {
  effects: Effect[];
};

export function EffectList({ effects }: Props) {
  return (
    <ul>
      {effects.map(([id, name], index) => (
        <li key={index}>
          <Text title={`Effect id ${id}`}>
            You acquire an effect: {name} (10 Adventures)
          </Text>
        </li>
      ))}
    </ul>
  );
}
