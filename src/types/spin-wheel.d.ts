/**
 * Type definitions for spin-wheel
 * Project: https://github.com/CrazyTim/spin-wheel
 * Definitions generated from documentation
 */

declare module "spin-wheel" {
  export interface WheelItemData {
    /** Main identifier text shown on the wheel */
    label: string;
    /** Proportional size relative to other items. Example: weight of 2 takes up twice the space */
    weight: number;
    /** @defaultValue null - Falls back to Wheel.itemBackgroundColors */
    backgroundColor?: string | null;
    /** @defaultValue null - Falls back to Wheel.itemLabelColors */
    labelColor?: string | null;
    /** @defaultValue null - Image drawn on the item, clipped to item bounds */
    image?: HTMLImageElement | null;
    /** @defaultValue 1 - Opacity of the item image */
    imageOpacity?: number;
    /** @defaultValue 0.5 - Point along radius to draw image center (as percent) */
    imageRadius?: number;
    /** @defaultValue 0 - Rotation angle of the image in degrees */
    imageRotation?: number;
    /** @defaultValue 1 - Scale of the image as percent */
    imageScale?: number;
    /** Custom data associated with the item (e.g. database ID) */
    value?: unknown;
  }

  export interface WheelItem extends WheelItemData {
    /** Get angle that this item ends at (exclusive), ignoring wheel rotation */
    getCenterAngle(): number;
    /** Get angle that this item ends at (inclusive), ignoring wheel rotation */
    getEndAngle(): number;
    /** Get the 0-based index of this item */
    getIndex(): number;
    /** Get random angle between item's start and end angles (inclusive) */
    getRandomAngle(): number;
    /** Get angle that this item starts at (inclusive), ignoring wheel rotation */
    getStartAngle(): number;
    /** Initialize or update item properties */
    init(props?: Partial<WheelItemData>): void;
  }

  export interface WheelOptions {
    /** @defaultValue '#000' - Color of wheel circumference line */
    borderColor?: string;
    /** @defaultValue 0 - Width of wheel circumference line in pixels */
    borderWidth?: number;
    /** @defaultValue false - Show debugging info */
    debug?: boolean;
    /** @defaultValue null - Image drawn on and rotating with wheel */
    image?: HTMLImageElement | null;
    /** @defaultValue true - Allow user interaction (click-drag/touch-flick) */
    isInteractive?: boolean;
    /** @defaultValue ['#fff'] - Repeating pattern for item backgrounds */
    itemBackgroundColors?: string[];
    /** @defaultValue 'right' - Label alignment: 'left', 'center', 'right' */
    itemLabelAlign?: "left" | "center" | "right";
    /** @defaultValue 0 - Label baseline offset as percent of label height */
    itemLabelBaselineOffset?: number;
    /** @defaultValue ['#000'] - Repeating pattern for label colors */
    itemLabelColors?: string[];
    /** @defaultValue 'sans-serif' - Font family for labels */
    itemLabelFont?: string;
    /** @defaultValue 100 - Maximum font size in pixels */
    itemLabelFontSizeMax?: number;
    /** @defaultValue 0.85 - Start point for drawing labels (as percent from center) */
    itemLabelRadius?: number;
    /** @defaultValue 0.2 - Maximum width limit for labels (as percent from center) */
    itemLabelRadiusMax?: number;
    /** @defaultValue 0 - Rotation of all labels in degrees */
    itemLabelRotation?: number;
    /** @defaultValue '#fff' - Color of label text outline */
    itemLabelStrokeColor?: string;
    /** @defaultValue 0 - Width of label text outline */
    itemLabelStrokeWidth?: number;
    /** Array of items to show on wheel */
    items?: WheelItemData[];
    /** @defaultValue '#000' - Color of lines between items */
    lineColor?: string;
    /** @defaultValue 1 - Width of lines between items in pixels */
    lineWidth?: number;
    /** @defaultValue {x: 0, y: 0} - Wheel offset from center as percent of diameter */
    offset?: { x: number; y: number };
    /** Callback when pointer moves to new item */
    onCurrentIndexChange?: (event: { type: "currentIndexChange"; currentIndex: number }) => void;
    /** Callback when wheel stops spinning */
    onRest?: (event: { type: "rest"; currentIndex: number; rotation: number }) => void;
    /** Callback when wheel starts spinning */
    onSpin?: (event: {
      type: "spin";
      duration?: number;
      method: "interact" | "spin" | "spinto" | "spintoitem";
      rotationResistance?: number;
      rotationSpeed?: number;
      targetItemIndex?: number;
      targetRotation?: number;
    }) => void;
    /** @defaultValue null - Image drawn over the wheel (e.g. pointer) */
    overlayImage?: HTMLImageElement | null;
    /** @defaultValue 0 - Drawing pixel ratio (0 = use device ratio) */
    pixelRatio?: number;
    /** @defaultValue 0 - Angle of pointer in degrees */
    pointerAngle?: number;
    /** @defaultValue 0.95 - Wheel radius as percent of container's smallest dimension */
    radius?: number;
    /** @defaultValue 0 - Wheel rotation in degrees */
    rotation?: number;
    /** @defaultValue -35 - Speed reduction per second (0 = infinite spin) */
    rotationResistance?: number;
    /** @defaultValue 250 - Maximum rotation speed in either direction */
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
