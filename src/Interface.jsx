import { useKeyboardControls } from "@react-three/drei";
import { useGame } from "./stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const timeRef = useRef();

  const forward = useKeyboardControls((state) => state.forward);
  const left = useKeyboardControls((state) => state.left);
  const backward = useKeyboardControls((state) => state.backward);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;
      if (state.phase === "playing") {
        elapsedTime = (Date.now() - state.startTime) / 1000;
      } else if (state.phase === "end") {
        elapsedTime = (state.endTime - state.startTime) / 1000;
      }

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime.toFixed(2);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div ref={timeRef} className="time" />
      {phase === "end" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${left ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${right ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
