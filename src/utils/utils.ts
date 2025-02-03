import { DARK_COLORS } from "@/constants/colors";
import { Color } from "@/constants/enums";
import pako from "pako";
import type { LocationQuery } from "vue-router";

export function compressData<T>(data: T) {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(new TextEncoder().encode(jsonString));
  const base64Encoded = btoa(String.fromCharCode.apply(null, [...compressed]));
  return encodeURIComponent(base64Encoded);
}

export function decompressData<T>(compressed: string) {
  try {
    const base64 = decodeURIComponent(compressed);
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decompressed = pako.inflate(bytes, { to: "string" });
    return JSON.parse(decompressed) as T;
  } catch (e) {
    console.error("Failed to decompress data:", e);
    return null;
  }
}

export function parseFromQuery<T>(query: LocationQuery) {
  try {
    const data = query.data?.toString();
    if (data) {
      return decompressData<T>(data);
    }

    const items = query.items?.toString();
    if (items) {
      return JSON.parse(items) as T;
    }

    return null;
  } catch (e) {
    console.error("Failed to parse: ", e);
    return null;
  }
}

export function getContrastColor(bgColor: string): Color.White | Color.Black {
  return DARK_COLORS.includes(bgColor.toLowerCase() as Color) ? Color.White : Color.Black;
}

export function sum(array: number[]) {
  return array.reduce((sum, value) => sum + value, 0);
}

export function weightedRandom(weights: number[]) {
  const totalWeight = sum(weights);
  const random = Math.random() * totalWeight;
  let currentWeight = 0;
  return weights.findIndex((weight) => {
    currentWeight += weight;
    return currentWeight > random;
  });
}
