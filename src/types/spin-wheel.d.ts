/**
 * Type definitions for spin-wheel
 * Project: https://github.com/CrazyTim/spin-wheel
 */

declare module "spin-wheel" {
  export interface WheelItemData {
    label: string;
    weight: number;
    /** @defaultValue null - Falls back to Wheel.itemBackgroundColors */
    backgroundColor?: string | null;
    /** @defaultValue null - Falls back to Wheel.itemLabelColors */
    labelColor?: string | null;
    image?: HTMLImageElement | null;
    imageOpacity?: number;
    imageRadius?: number;
    imageRotation?: number;
    imageScale?: number;
    value?: unknown;
  }

  export interface WheelItem extends WheelItemData {
    getCenterAngle(): number;
    getEndAngle(): number;
    getIndex(): number;
    getRandomAngle(): number;
    getStartAngle(): number;
    init(props?: Partial<WheelItemData>): void;
  }

  export interface WheelOptions {
    borderColor?: string;
    borderWidth?: number;
    debug?: boolean;
    image?: HTMLImageElement | null;
    isInteractive?: boolean;
    itemBackgroundColors?: string[];
    itemLabelAlign?: "left" | "center" | "right";
    itemLabelBaselineOffset?: number;
    itemLabelColors?: string[];
    itemLabelFont?: string;
    itemLabelFontSizeMax?: number;
    itemLabelRadius?: number;
    itemLabelRadiusMax?: number;
    itemLabelRotation?: number;
    itemLabelStrokeColor?: string;
    itemLabelStrokeWidth?: number;
    items?: WheelItemData[];
    lineColor?: string;
    lineWidth?: number;
    offset?: { x: number; y: number };
    onCurrentIndexChange?: (event: { type: "currentIndexChange"; currentIndex: number }) => void;
    onRest?: (event: { type: "rest"; currentIndex: number; rotation: number }) => void;
    onSpin?: (event: {
      type: "spin";
      duration?: number;
      method: "interact" | "spin" | "spinto" | "spintoitem";
      rotationResistance?: number;
      rotationSpeed?: number;
      targetItemIndex?: number;
      targetRotation?: number;
    }) => void;
    overlayImage?: HTMLImageElement | null;
    pixelRatio?: number;
    pointerAngle?: number;
    radius?: number;
    rotation?: number;
    rotationResistance?: number;
    rotationSpeedMax?: number;
  }

  export class Wheel {
    constructor(container: Element | null, props?: WheelOptions);
    init(props?: WheelOptions): void;
    resize(): void;
    remove(): void;
    spin(rotationSpeed?: number): void;
    spinTo(
      rotation?: number,
      duration?: number,
      easingFunction?: ((n: number) => number) | null,
    ): void;
    spinToItem(
      itemIndex?: number,
      duration?: number,
      spinToCenter?: boolean,
      numberOfRevolutions?: number,
      direction?: 1 | -1,
      easingFunction?: ((n: number) => number) | null,
    ): void;
    stop(): void;
    getCurrentIndex(): number;

    readonly rotationSpeed: number;
    items: WheelItem[];
  }
}
