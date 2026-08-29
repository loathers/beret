import { Fragment } from "react";
import { Text } from "./Text";

export type Props = {
  modifiers: { name: string, value: string }[];
};

export function Modifiers({ modifiers }: Props) {
  return (
    <Text size="xs" fontStyle="italic">
      {modifiers.map(({ name, value }, i) => (
        <Fragment key={i}>
          {i ? ", " : null}
          {name}: {value}
        </Fragment>
      ))}
    </Text>
  );
}
