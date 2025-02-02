import type { Item } from "@/stores/itemStore";
import pako from "pako";

export function compressData(data: Item[]) {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(new TextEncoder().encode(jsonString));
  const base64Encoded = btoa(String.fromCharCode.apply(null, [...compressed]));
  return encodeURIComponent(base64Encoded);
}

export function decompressData(compressed: string) {
  try {
    const base64 = decodeURIComponent(compressed);
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decompressed = pako.inflate(bytes, { to: "string" });
    return JSON.parse(decompressed);
  } catch (e) {
    console.error("Failed to decompress data:", e);
    return null;
  }
}

export function parseItemsFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const compressed = params.get("data");
    if (compressed) {
      return decompressData(compressed);
    }

    const items = params.get("items");
    return items ? JSON.parse(items) : null;
  } catch (e) {
    console.error("Failed to parse items:", e);
    return null;
  }
}

export function getContrastColor(bgColor: string) {
  const darkColors = ["navy", "blue", "purple", "red", "green", "brown", "black"];
  return darkColors.includes(bgColor.toLowerCase()) ? "white" : "black";
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
