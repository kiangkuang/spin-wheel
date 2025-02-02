import { Toast } from "bootstrap";
import { type Ref, onMounted, ref } from "vue";

export function useToast(toastElement: Ref<Element | null>) {
  const toast = ref<Toast>();
  const message = ref<string>("");

  onMounted(() => {
    if (toastElement.value) {
      toast.value = Toast.getOrCreateInstance(toastElement.value, { autohide: false });
    }
  });

  const show = (newMessage: string) => {
    message.value = newMessage;
    toast.value?.show();
  };

  const hide = () => {
    toast.value?.hide();
  };

  return {
    show,
    hide,
    message,
    toast,
  };
}
