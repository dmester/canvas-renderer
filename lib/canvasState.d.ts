import Matrix from "./matrix";
import CanvasContext from "./canvasContext";

declare namespace canvasState {
  const capture: (
    ctx: CanvasContext
  ) => { fillStyle: number | string; transform: Matrix };

  const restore: (
    ctx: CanvasContext,
    state: { fillStyle: number | string; transform: Matrix }
  ) => {};
}

export = canvasState;
