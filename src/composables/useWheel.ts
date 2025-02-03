import sound from "@/assets/sound.mp4";
import { Wheel, type WheelOptions } from "spin-wheel";
import { type Ref, onMounted, onUnmounted, ref } from "vue";

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

export function useWheel(wheelContainer: Ref<Element | null>, wheelOptions: WheelOptions) {
  const wheel = ref<Wheel>();
  const audio = new Audio(sound);

  onMounted(() => {
    if (wheelContainer.value) {
      wheel.value = new Wheel(wheelContainer.value, {
        ...WHEEL_OPTIONS,
        ...wheelOptions,
      });
    }
  });
  onUnmounted(() => {
    audio.pause();
  });

  const spin = (itemIndex: number) => {
    audio.currentTime = 0;
    audio.play();

    wheel.value?.spinToItem(itemIndex, 5000, false, 5, 1);
  };

  return { spin };
}
