import {
  ref,
  computed,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";

export function useDraggableList(items) {
  const dragState = ref({
    index: null,
    touchY: null,
  });

  const reorderItems = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const [item] = items.value.splice(fromIndex, 1);
    items.value.splice(toIndex, 0, item);
    dragState.value.index = toIndex;
  };

  const findDropIndex = (clientY) => {
    const elements = document.querySelectorAll(".row");
    return Array.from(elements).findIndex((el, index) => {
      if (index === dragState.value.index) return false;
      const rect = el.getBoundingClientRect();
      if (clientY < rect.top || clientY > rect.bottom) return false;

      const movingDown = dragState.value.touchY < clientY;
      const targetMiddle = rect.top + rect.height / 2;
      return (
        (movingDown && clientY > targetMiddle) ||
        (!movingDown && clientY < targetMiddle)
      );
    });
  };

  const draggingIndex = computed(() => dragState.value.index);

  function dragStart(e, index) {
    dragState.value.index = index;
    e.dataTransfer.effectAllowed = "move";
  }

  function dragEnter(e, index) {
    reorderItems(dragState.value.index, index);
  }

  function dragEnd() {
    dragState.value = { index: null, touchY: null };
  }

  function touchStart(e, index) {
    dragState.value = {
      index: index,
      touchY: e.touches[0].clientY,
    };
  }

  function touchMove(e) {
    if (dragState.value.index === null) return;
    const currentY = e.touches[0].clientY;
    const newIndex = findDropIndex(currentY);

    if (newIndex !== -1) {
      reorderItems(dragState.value.index, newIndex);
    }
    dragState.value.touchY = currentY;
  }

  function touchEnd() {
    dragState.value = { index: null, touchY: null };
  }

  return {
    draggingIndex,
    dragStart,
    dragEnter,
    dragEnd,
    touchStart,
    touchMove,
    touchEnd,
  };
}
