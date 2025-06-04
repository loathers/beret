import { css } from "../../styled-system/css";
import { Stack } from "../../styled-system/jsx";
import { Heading } from "./Heading";

const leftHorn = css({
  transform: "scaleX(-1) rotate(70deg)",
  display: "inline-block",
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "scaleX(-1) rotate(65deg) scale(1.2)",
  },
});

const rightHorn = css({
  transform: "rotate(70deg)",
  display: "inline-block",
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "rotate(75deg) scale(1.2)",
  },
});

export function Header() {
  return (
    <Stack gap={0}>
      <Heading size="7xl">Beret</Heading>
      <Heading size="md">
        <span className={leftHorn}>🎺</span> Buskin' makes me feel good{" "}
        <span className={rightHorn}>🎺</span>
      </Heading>
    </Stack>
  );
}
