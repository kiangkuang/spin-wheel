import sound from "@/assets/sound.mp4";
import { type Item, useItemStore } from "@/stores/itemStore";
import { Toast } from "bootstrap";
import { storeToRefs } from "pinia";
import { Wheel, type WheelOptions } from "spin-wheel";
import { type Ref, onMounted, ref } from "vue";

const WHEEL_OPTIONS: WheelOptions = {
  isInteractive: false,
  radius: 1,
  borderWidth: 0,
  lineColor: "white",
  lineWidth: 2,
  itemLabelColors: ["white"],
  itemLabelRadius: 0.9,
  itemLabelRadiusMax: 0.2,
  itemLabelStrokeColor: "black",
  itemLabelStrokeWidth: 1,
};

function weightedRandom(options: Item[]) {
  const totalWeight = options.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;
  let currentWeight = 0;
  return options.findIndex((item) => {
    currentWeight += item.weight;
    return currentWeight > random;
  });
}

export function useWheel(wheelContainer: Ref<Element | null>, toastElement: Ref<Element | null>) {
  const wheel = ref<Wheel>();
  const toast = ref<Toast>();
  const toastMessage = ref<string>("");
  const audio = new Audio(sound);
  const { items } = storeToRefs(useItemStore());

  onMounted(() => {
    if (wheelContainer.value) {
      wheel.value = new Wheel(wheelContainer.value, {
        ...WHEEL_OPTIONS,
        items: items.value,
        onRest: ({ currentIndex }: { currentIndex: number }) => {
          toastMessage.value = `You won ${items.value[currentIndex].label}!`;
          toast.value?.show();
        },
      });
    }

    if (toastElement.value) {
      toast.value = Toast.getOrCreateInstance(toastElement.value, { autohide: false });
    }
  });

  const spin = () => {
    toast.value?.hide();
    audio.currentTime = 0;
    audio.play();

    const winningItemIndex = weightedRandom(items.value);
    wheel.value?.spinToItem(winningItemIndex, 5000, false, 5, 1);
  };

  return {
    spin,
    toast,
    toastMessage,
  };
}
