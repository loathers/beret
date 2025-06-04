import { Fragment } from "react";
import { Text } from "./Text";

export type Props = {
  modifiers: Record<string, string>;
};

export function Modifiers({ modifiers }: Props) {
  return (
    <Text size="xs" fontStyle="italic">
      {Object.entries(modifiers).map(([key, value], i) => (
        <Fragment key={i}>
          {i ? ", " : null}
          {key}: {value}
        </Fragment>
      ))}
    </Text>
  );
}
