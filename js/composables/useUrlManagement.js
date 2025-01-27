import {
  ref,
  computed,
  watchEffect,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
import { compressData } from "../utils.js";
import { copyToClipboard, updateUrlParams } from "../browserUtils.js";

export function useUrlManagement(items) {
  const copyBtnText = ref("Copy URL");
  const wheelUrlElement = ref(null);

  const wheelUrl = computed(() => {
    if (!items.value.length) return "index.html";
    const params = new URLSearchParams();
    params.set("data", compressData(items.value));
    return `index.html?${params.toString()}`;
  });

  function copyUrl() {
    copyToClipboard(wheelUrlElement.value.href).then(() => {
      copyBtnText.value = "Copied!";
      setTimeout(() => (copyBtnText.value = "Copy URL"), 2000);
    });
  }

  watchEffect(
    () => {
      const params = new URLSearchParams();
      if (items.value.length) {
        params.set("data", compressData(items.value));
      }
      updateUrlParams(params.toString());
    },
    { deep: true },
  );

  return { wheelUrl, wheelUrlElement, copyUrl, copyBtnText };
}
