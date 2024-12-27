import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
import { useGame } from "./stores/useGame.js";

export default function Experience() {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color attach="background" args={["#bdebfc"]} />
      <Lights />
      <Physics>
        <Level count={blockCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
