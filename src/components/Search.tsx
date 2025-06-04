import { useMemo, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import { Stack } from "../../styled-system/jsx";

import type { Effect } from "../data";
import { rollEffects } from "../utils";

import { createListCollection, Select } from "./Select";
import { Text } from "./Text";

type Props = {
  loading: boolean;
  effects: Effect[];
};

type Result = { power: number; cast: number; times: number; effect: string };

export function Search({ loading, effects }: Props) {
  const [selectedEffects, setSelectedEffects] = useState<
    { label: string; value: number }[] | undefined
  >(undefined);

  const sortedEffects = useMemo(() => {
    return effects
      .slice(0, -1)
      .toSorted((a, b) => a.name.localeCompare(b.name));
  }, [effects]);

  const effectToSeed = useMemo(() => {
    const map: Record<string, Result[]> = {};
    for (let i = 0; i < 2_200; i++) {
      for (let j = 1; j <= 5; j++) {
        const effectsForRoll = rollEffects(effects, i, j).reduce<
          Record<string, Result>
        >(
          (acc, eff) => ({
            ...acc,
            [eff.id]: {
              effect: eff.name,
              power: i,
              cast: j,
              times: (acc[eff.id]?.times ?? 0) + 1,
            },
          }),
          {},
        );

        for (const [id, result] of Object.entries(effectsForRoll)) {
          if (!map[id]) {
            map[id] = [];
          }
          map[id].push(result);
        }
      }
    }
    return map;
  }, [effects]);

  const collection = createListCollection({
    items: sortedEffects.slice(0, -1).map((e) => ({
      label: e.name,
      value: e.id,
    })),
  });
  return (
    <Stack gap={8}>
      <Select.Root
        disabled={loading}
        collection={collection}
        multiple
        onValueChange={({ items }) => setSelectedEffects(items)}
      >
        <Select.Label>Search for an effect</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder="Select an effect"
              flex="1"
              textAlign="start"
            />
            <Select.ClearTrigger>
              <XIcon />
            </Select.ClearTrigger>
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      {selectedEffects && (
        <Stack gap={1}>
          {selectedEffects
            .flatMap((e) => effectToSeed[e.value] ?? [])
            .toSorted((a, b) => {
              if (a.power !== b.power) return a.power - b.power;
              if (a.cast !== b.cast) return a.cast - b.cast;
              return a.effect.localeCompare(b.effect);
            })
            .map(({ power, cast, times, effect }) => (
              <Text key={`${power}.${cast}`}>
                Power: {power}, Cast: {cast}
                {selectedEffects.length > 0 && ` for ${effect}`}
                {times > 1 ? ` (x${times})` : ""}
              </Text>
            ))}
        </Stack>
      )}
    </Stack>
  );
}
