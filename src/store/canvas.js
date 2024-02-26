import { useRef } from "react";
import { getOnlyKey } from "../utils";

const defaultCanvas = {
  // 页面背景
  style: {
    width: 320,
    height: 568,
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxSizing: "content-box",
  },
  // 组件
  // cmps: [],
  // 测试组件
  cmps: [
    {
      key: getOnlyKey(),
      desc: "文本",
      value: "文本",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        fontSize: 12,
        color: "red",
      },
    },
  ],
};

class Canvas {
  constructor(canvas = defaultCanvas) {
    this.canvas = canvas; // 页面数据
    this.listeners = [];
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  setCanvas = (canvas) => {
    Object.assign(this.canvas, canvas);
  };

  addCmp = (cmp) => {
    const _cmp = { key: getOnlyKey(), ...cmp };
    this.canvas.cmps.push(_cmp);

    // 更新组件
    this.updateApp();
  };

  updateApp = () => {
    // 希望组件更新
    this.listeners.forEach((lis) => lis());
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    // 取消订阅
    return () => {
      this.listeners.filter((lis) => lis !== listener);
    };
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      subscribe: this.subscribe,
    };

    return obj;
  };
}

export function useCanvas(canvas) {
  const canvasRef = useRef();

  if (!canvasRef.current) {
    if (canvas) {
      canvasRef.current = canvas;
    } else {
      canvasRef.current = new Canvas().getPublicCanvas();
    }
  }
  return canvasRef.current;
}
