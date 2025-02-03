import { Color, SpinDirection } from "./enums";
import type { WheelOptions } from "spin-wheel";

export const DEFAULT_WHEEL_OPTIONS: WheelOptions = {
  isInteractive: false,
  radius: 1,
  borderColor: Color.White,
  borderWidth: 10,
  lineColor: Color.White,
  lineWidth: 2,
  itemLabelColors: [Color.White],
  itemLabelRadius: 0.9,
  itemLabelRadiusMax: 0.2,
  itemLabelStrokeColor: Color.Black,
  itemLabelStrokeWidth: 1,
};

export const SPIN_SETTINGS = {
  DURATION_MS: 5000,
  SPIN_TO_CENTER: false,
  REVOLUTIONS: 5,
  DIRECTION: SpinDirection.Clockwise,
};
