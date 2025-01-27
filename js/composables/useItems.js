import {
  ref,
  computed,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
import { parseItemsFromUrl, defaultItems } from "../utils.js";

export function useItems() {
  const items = ref(
    parseItemsFromUrl()?.length > 0 ? parseItemsFromUrl() : defaultItems,
  );

  const sumWeights = computed(() =>
    items.value.reduce((sum, curr) => sum + curr.weight, 0),
  );

  function addItem() {
    items.value.push({
      label: `Item ${items.value.length + 1}`,
      backgroundColor:
        items.value.length >= 2
          ? items.value[items.value.length - 2].backgroundColor
          : "orange",
      weight: 1,
    });
  }

  function removeItem(index) {
    items.value.splice(index, 1);
  }

  return { items, addItem, removeItem, sumWeights };
}
