import { Color } from "@/constants/enums";
import { parseFromQuery, sum } from "@/utils/utils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export interface Item {
  label: string;
  weight: number;
  backgroundColor: Color;
}

export function getDefaultItems(): Item[] {
  return [
    { label: "Item 1", backgroundColor: Color.Orange, weight: 2 },
    { label: "Item 2", backgroundColor: Color.Navy, weight: 3 },
    { label: "Item 3", backgroundColor: Color.Red, weight: 4 },
  ];
}

export const useItemStore = defineStore("item", () => {
  const { query } = useRoute();
  const parsed = parseFromQuery<Item[]>(query);
  const items = ref(parsed && parsed.length > 0 ? parsed : getDefaultItems());

  const sumWeights = computed(() => sum(items.value.map((item) => item.weight)));

  const addItem = (item?: Item) => {
    items.value.push(
      item ?? {
        label: `Item ${items.value.length + 1}`,
        backgroundColor:
          items.value.length >= 2
            ? (items.value[items.value.length - 2].backgroundColor as Color)
            : Color.Orange,
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
