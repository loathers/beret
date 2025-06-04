import { useEffect, useState } from "react";
import { Container } from "../../styled-system/jsx";
import { Header } from "./Header";
import { Stack } from "../../styled-system/jsx";
import { load, type Effect } from "../data";
import { Tabs } from "./Tabs";
import { Explore } from "./Explore";
import { Search } from "./Search";

function App() {
  const [loading, setLoading] = useState(false);
  const [effects, setEffects] = useState<Effect[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setEffects(await load());
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Container padding={8}>
      <Stack gap={8}>
        <Header />
        {loading && <p>Loading effect data...</p>}
        <Tabs.Root defaultValue="explore" lazyMount>
          <Tabs.List>
            <Tabs.Trigger value="explore">Explore seeds</Tabs.Trigger>
            <Tabs.Trigger value="search">Search for an effect</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="explore">
            <Explore effects={effects} loading={loading} />
          </Tabs.Content>
          <Tabs.Content value="search">
            <Search effects={effects} loading={loading} />
          </Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Container>
  );
}

export default App;
