import { Stack } from "../../styled-system/jsx";

import { NumberInput } from "./NumberInput";
import { FormLabel } from "./FormLabel";
import { EffectList } from "./EffectList";
import { useMemo, useState } from "react";
import type { Effect } from "../data";
import { rollEffects } from "../utils";

type Props = {
  loading: boolean;
  effects: Effect[];
};

export function Explore({ effects: allEffects, loading }: Props) {
  const [power, setPower] = useState<number | undefined>(undefined);
  const [cast, setCast] = useState(1);

  const effects = useMemo(() => {
    // Only start showing effects when a power has been set
    if (power === undefined) return [];
    return rollEffects(allEffects, power, cast);
  }, [allEffects, power, cast]);

  return (
    <Stack gap={8}>
      <Stack>
        <FormLabel>Power</FormLabel>
        <NumberInput
          value={power?.toString()}
          disabled={loading}
          onValueChange={({ valueAsNumber }) =>
            setPower(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber)
          }
        />
      </Stack>
      <Stack>
        <FormLabel>Cast</FormLabel>
        <NumberInput
          step={1}
          min={1}
          max={5}
          disabled={loading}
          value={cast?.toString()}
          onValueChange={({ valueAsNumber }) =>
            setCast(Number.isNaN(valueAsNumber) ? 1 : valueAsNumber)
          }
        />
      </Stack>
      <EffectList effects={effects} />
    </Stack>
  );
}
