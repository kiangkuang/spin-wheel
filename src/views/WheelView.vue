<script setup lang="ts">
import { RouteName } from "@/router";
import { initWheel } from "@/utils/wheel";
import { useFullscreen } from "@vueuse/core";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

let spin = () => {};
let toast = { hide: () => {} };
onMounted(() => {
  ({ spin, toast } = initWheel());
});

const { isFullscreen, enter: enterFullscreen } = useFullscreen(document.documentElement);
// @ts-expect-error process.env.NODE_ENV is defined by Vite
const isProd = process.env.NODE_ENV === "production";

const { query } = useRoute();
</script>

<template>
  <div class="m-0 p-0 page-background" @click="isProd && enterFullscreen()">
    <RouterLink
      :to="{ name: RouteName.Config, query }"
      v-show="!isFullscreen"
      class="position-fixed bottom-0 start-0 m-3 btn btn-light config-button"
      @click.stop
      id="configBtn"
    >
      ⚙️
    </RouterLink>

    <div class="d-flex justify-content-center align-items-center flex-column content-container">
      <div class="d-flex justify-content-center align-items-center logo-container">
        <img src="@/assets/spin-and-win.png" alt="Spin & Win" class="img-fluid" />
      </div>
      <div class="position-relative d-flex justify-content-center align-items-center">
        <div class="wheel-container rounded-circle" @click="spin()"></div>

        <div class="wheel-arrow position-absolute top-0"></div>

        <div class="wheel-toast toast position-absolute text-center" @click="toast.hide()"></div>
      </div>
    </div>
  </div>
</template>
