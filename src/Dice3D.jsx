import { useEffect, useState } from "react";

export function Dice3D({ value = 1, rollKey = 0, compact = false }) {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!rollKey) return undefined;
    setRolling(true);
    const timer = window.setTimeout(() => setRolling(false), 520);
    return () => window.clearTimeout(timer);
  }, [rollKey]);

  return (
    <div className={`dice-canvas${compact ? " dice-canvas--compact" : ""}${rolling ? " is-rolling" : ""}`} aria-hidden="true">
      <img src={`${import.meta.env.BASE_URL}assets/dice/die-${value}.png`} alt="" />
    </div>
  );
}
