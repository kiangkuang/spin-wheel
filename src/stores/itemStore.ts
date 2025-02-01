import { parseItemsFromUrl } from "@/utils/utils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface Item {
  label: string;
  weight: number;
  backgroundColor: string;
}

export const defaultItems = [
  { label: "Item 1", backgroundColor: "orange", weight: 2 },
  { label: "Item 2", backgroundColor: "navy", weight: 3 },
  { label: "Item 3", backgroundColor: "red", weight: 4 },
];

export const useItemStore = defineStore("item", () => {
  const items = ref<Item[]>(parseItemsFromUrl()?.length > 0 ? parseItemsFromUrl() : defaultItems);

  const sumWeights = computed(() => items.value.reduce((sum, curr) => sum + curr.weight, 0));

  const addItem = (item?: Item) => {
    items.value.push(
      item ?? {
        label: `Item ${items.value.length + 1}`,
        backgroundColor:
          items.value.length >= 2 ? items.value[items.value.length - 2].backgroundColor : "orange",
        weight: 1,
      },
    );
  };

  const removeItem = (index: number) => {
    items.value.splice(index, 1);
  };

  return {
    items,
    sumWeights,
    addItem,
    removeItem,
  };
});
