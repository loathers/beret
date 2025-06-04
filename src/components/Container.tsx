import { css } from "../../styled-system/css";

type Props = React.PropsWithChildren;

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  padding: "2em",
});

export function Container({ children }: Props) {
  return <div className={containerStyles}>{children}</div>;
}
