import { parseItemsFromUrl, defaultItems } from "./utils.js";

export function initWheel() {
  const items =
    parseItemsFromUrl()?.length > 0 ? parseItemsFromUrl() : defaultItems;

  const toast = bootstrap.Toast.getOrCreateInstance(
    document.querySelector(".toast"),
    { autohide: false },
  );

  function onRest({ currentIndex }) {
    toast._element.innerHTML = `You won ${items[currentIndex].label}!`;
    toast.show();
  }

  const wheel = new spinWheel.Wheel(
    document.querySelector(".wheel-container"),
    {
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
      items,
      onRest,
    },
  );

  const audio = new Audio("sound.mp4");

  function spin() {
    toast.hide();
    audio.currentTime = 0;
    audio.play();

    const winningItemIndex = weightedRandom(items);
    const duration = 5000;
    const spinToCenter = false;
    const numberOfRevolutions = 5;
    wheel.spinToItem(
      winningItemIndex,
      duration,
      spinToCenter,
      numberOfRevolutions,
      1,
    );
  }

  return { spin };
}

function weightedRandom(options) {
  const totalWeight = options.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  return options.findIndex((item) => {
    currentWeight += item.weight;
    return currentWeight > random;
  });
}
