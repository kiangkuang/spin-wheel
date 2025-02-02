import { useToast } from "./useToast";
import sound from "@/assets/sound.mp4";
import { useItemStore } from "@/stores/itemStore";
import { weightedRandom } from "@/utils/utils";
import { storeToRefs } from "pinia";
import { Wheel, type WheelOptions } from "spin-wheel";
import { type Ref, onMounted, ref } from "vue";

const WHEEL_OPTIONS: WheelOptions = {
  isInteractive: false,
  radius: 1,
  borderColor: "white",
  borderWidth: 10,
  lineColor: "white",
  lineWidth: 2,
  itemLabelColors: ["white"],
  itemLabelRadius: 0.9,
  itemLabelRadiusMax: 0.2,
  itemLabelStrokeColor: "black",
  itemLabelStrokeWidth: 1,
};

export function useWheel(wheelContainer: Ref<Element | null>, toastElement: Ref<Element | null>) {
  const wheel = ref<Wheel>();
  const audio = new Audio(sound);
  const { items } = storeToRefs(useItemStore());
  const { show: showToast, toast, message: toastMessage } = useToast(toastElement);

  onMounted(() => {
    if (wheelContainer.value) {
      wheel.value = new Wheel(wheelContainer.value, {
        ...WHEEL_OPTIONS,
        items: items.value,
        onRest: ({ currentIndex }) => showToast(`You won ${items.value[currentIndex].label}!`),
      });
    }
  });

  const spin = () => {
    toast.value?.hide();

    audio.currentTime = 0;
    audio.play();

    const winningItemIndex = weightedRandom(items.value.map((item) => item.weight));
    wheel.value?.spinToItem(winningItemIndex, 5000, false, 5, 1);
  };

  return {
    spin,
    toast,
    toastMessage,
  };
}
