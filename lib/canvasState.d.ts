import Matrix from "./matrix";
import CanvasContext from "./canvasContext";

declare namespace canvasState {
  const capture: (
    ctx: CanvasContext
  ) => { fillStyle: number; transform: Matrix };
  
  const restore: (
    ctx: CanvasContext,
    state: { fillStyle: number; transform: Matrix }
  ) => {};
}

export = canvasState;
