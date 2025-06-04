import { useMemo, useState } from "react";
import RNG from "kol-rng";
import allEffects from "./effects.json";

type Effect = [id: number, name: string];

function App() {
  const [power, setPower] = useState<number | undefined>(undefined);
  const [cast, setCast] = useState(1);

  const effects = useMemo(() => {
    const list: Effect[] = [];
    if (power === undefined) return list;
    const total = Math.ceil(power / 100);
    const seed = power + cast;
    const rng = new RNG(seed);
    for (let i = 0; i < total; i++) {
      list.push(rng.pickOne(allEffects as Effect[]));
    }
    return list;
  }, [power, cast]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <div>
        <h1 style={{ margin: 0 }}>Beret</h1>
        <h3 style={{ margin: 0 }}>🎺 Buskin' makes me feel good 🎺</h3>
      </div>
      <label>
        Power
        <input
          type="number"
          placeholder="Over 9000!!!"
          value={power}
          onChange={(e) => setPower(Number(e.currentTarget.value))}
        />
      </label>
      <label>
        Casts
        <input
          type="number"
          step="1"
          min="1"
          max="5"
          value={cast}
          onChange={(e) => setCast(Number(e.currentTarget.value))}
        />
      </label>
      {power !== undefined && (
        <ul>
          {effects.map(([id, name], index) => (
            <li key={index}>
              [{id}]{name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
