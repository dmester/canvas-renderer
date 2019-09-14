import CanvasContext from "./canvasContext";

declare interface Canvas {
    width: number;
    height: number;
    backColor: number | string;
    getContext(contextId?: string, contextAttributes?: {}): CanvasContext;
    toPng(keywords?: { [key: string]: string }): Buffer;
    toDataURL(type?: string, encoderOptions?: any): string;
}

export = Canvas;
