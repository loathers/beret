import { useMemo, useState } from "react";
import RNG from "kol-rng";
import allEffects from "../effects.json";
import { NumberInput } from "./NumberInput";
import { Container } from "../../styled-system/jsx";
import { Header } from "./Header";
import { FormLabel } from "./FormLabel";
import { Stack } from "../../styled-system/jsx";
import { EffectList } from "./EffectList";

export type Effect = [id: number, name: string];

function App() {
  const [power, setPower] = useState<number | undefined>(undefined);
  const [cast, setCast] = useState(1);

  const effects = useMemo(() => {
    const list: Effect[] = [];

    // Only start showing effects when a power has been set
    if (power === undefined) return list;

    // Total number of effects is based on power alone
    const total = Math.ceil(power / 100);

    // RNG seeded with power + casts (0-indexed)
    const seed = power + (cast - 1);
    const rng = new RNG(seed);

    for (let i = 0; i < total; i++) {
      list.push(rng.pickOne(allEffects as Effect[]));
    }
    return list;
  }, [power, cast]);

  return (
    <Container padding={8}>
      <Stack gap={8}>
        <Header />
        <Stack>
          <FormLabel>Power</FormLabel>
          <NumberInput
            value={power?.toString()}
            onValueChange={({ valueAsNumber }) => setPower(valueAsNumber)}
          />
        </Stack>
        <Stack>
          <FormLabel>Cast</FormLabel>
          <NumberInput
            step={1}
            min={1}
            max={5}
            value={cast?.toString()}
            onValueChange={({ valueAsNumber }) => setCast(valueAsNumber)}
          />
        </Stack>
        <EffectList effects={effects} />
      </Stack>
    </Container>
  );
}

export default App;
