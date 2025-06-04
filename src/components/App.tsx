import { useEffect, useMemo, useState } from "react";
import RNG from "kol-rng";
import { NumberInput } from "./NumberInput";
import { Container } from "../../styled-system/jsx";
import { Header } from "./Header";
import { FormLabel } from "./FormLabel";
import { Stack } from "../../styled-system/jsx";
import { EffectList } from "./EffectList";
import { load, type Effect } from "../data";

function App() {
  const [loading, setLoading] = useState(false);
  const [power, setPower] = useState<number | undefined>(undefined);
  const [cast, setCast] = useState(1);
  const [allEffects, setAllEffects] = useState<Effect[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setAllEffects(await load());
      setLoading(false);
    }
    fetchData();
  }, []);

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
      list.push(rng.pickOne(allEffects));
    }
    return list;
  }, [allEffects, power, cast]);

  return (
    <Container padding={8}>
      <Stack gap={8}>
        <Header />
        {loading && <p>Loading...</p>}
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
    </Container>
  );
}

export default App;
