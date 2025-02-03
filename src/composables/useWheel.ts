import sound from "@/assets/sound.mp4";
import { DEFAULT_WHEEL_OPTIONS, SPIN_SETTINGS } from "@/constants/wheelConfig";
import { Wheel, type WheelOptions } from "spin-wheel";
import { type Ref, onMounted, onUnmounted, ref } from "vue";

export function useWheel(wheelContainer: Ref<Element | null>, wheelOptions: WheelOptions) {
  const wheel = ref<Wheel>();
  const audio = new Audio(sound);

  onMounted(() => {
    if (wheelContainer.value) {
      wheel.value = new Wheel(wheelContainer.value, {
        ...DEFAULT_WHEEL_OPTIONS,
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

    wheel.value?.spinToItem(
      itemIndex,
      SPIN_SETTINGS.DURATION_MS,
      SPIN_SETTINGS.SPIN_TO_CENTER,
      SPIN_SETTINGS.REVOLUTIONS,
      SPIN_SETTINGS.DIRECTION,
    );
  };

  return { spin };
}
