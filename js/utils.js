import pako from "https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.esm.mjs";

export function compressData(data) {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(new TextEncoder().encode(jsonString));
  const base64Encoded = btoa(String.fromCharCode.apply(null, compressed));
  return encodeURIComponent(base64Encoded);
}

export function decompressData(compressed) {
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

export function getContrastColor(bgColor = "") {
  const darkColors = [
    "navy",
    "blue",
    "purple",
    "red",
    "green",
    "brown",
    "black",
  ];
  return darkColors.includes(bgColor.toLowerCase()) ? "white" : "black";
}

export const defaultItems = [
  { label: "Item 1", backgroundColor: "orange", weight: 2 },
  { label: "Item 2", backgroundColor: "navy", weight: 3 },
  { label: "Item 3", backgroundColor: "red", weight: 4 },
];
