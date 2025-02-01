import { RouteName } from "@/router";
import { useItemStore } from "@/stores/itemStore";
import { compressData } from "@/utils/utils";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";

export function useUrlManagement() {
  const { items } = storeToRefs(useItemStore());

  const router = useRouter();
  watchEffect(() => {
    router.replace({
      query: items.value.length ? { data: compressData(items.value) } : undefined,
    });
  });

  const { copy, copied } = useClipboard();
  const copyBtnText = computed(() => (copied.value ? "Copied!" : "Copy URL"));
  function copyUrl() {
    const route = router.resolve({
      name: RouteName.Wheel,
      query: items.value.length ? { data: compressData(items.value) } : undefined,
    });
    copy(`${window.location.origin}${route.href}`);
  }

  return { copyUrl, copyBtnText };
}
