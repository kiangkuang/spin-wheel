import sound from "@/assets/sound.mp4";
import { type Item, useItemStore } from "@/stores/itemStore";
import { Toast } from "bootstrap";
import { storeToRefs } from "pinia";
// @ts-expect-error missing type definitions
import { Wheel } from "spin-wheel";

export function initWheel() {
  const { items } = storeToRefs(useItemStore());

  const toast = Toast.getOrCreateInstance(document.querySelector(".toast")!, { autohide: false });

  function onRest({ currentIndex }: { currentIndex: number }) {
    const toastElement = document.querySelector(".toast");
    if (toastElement) {
      toastElement.innerHTML = `You won ${items.value[currentIndex].label}!`;
      toast.show();
    }
  }

  const wheel = new Wheel(document.querySelector(".wheel-container"), {
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
    items: items.value,
    onRest,
  });

  const audio = new Audio(sound);

  function spin() {
    toast.hide();
    audio.currentTime = 0;
    audio.play();

    const winningItemIndex = weightedRandom(items.value);
    const duration = 5000;
    const spinToCenter = false;
    const numberOfRevolutions = 5;
    wheel.spinToItem(winningItemIndex, duration, spinToCenter, numberOfRevolutions, 1);
  }

  return {
    spin,
    toast,
  };
}

function weightedRandom(options: Item[]) {
  const totalWeight = options.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  return options.findIndex((item) => {
    currentWeight += item.weight;
    return currentWeight > random;
  });
}
