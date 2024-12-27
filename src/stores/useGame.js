import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGame = create(
  subscribeWithSelector((set) => ({
    blockCount: 10,
    blockSeed: 0,
    startTime: 0,
    endTime: 0,
    phase: "ready",
    start: () =>
      set((state) =>
        state.phase === "ready"
          ? { phase: "playing", startTime: Date.now() }
          : {}
      ),
    restart: () =>
      set((state) =>
        state.phase === "playing" || state.phase === "end"
          ? {
              phase: "ready",
              startTime: 0,
              endTime: 0,
              blockSeed: Math.random(),
            }
          : {}
      ),
    end: () =>
      set((state) =>
        state.phase === "playing" ? { phase: "end", endTime: Date.now() } : {}
      ),
  }))
);
