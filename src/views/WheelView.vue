<script setup lang="ts">
import { useWheel } from "@/composables/useWheel";
import { RouteName } from "@/router";
import { useFullscreen } from "@vueuse/core";
import { useTemplateRef } from "vue";
import { useRoute } from "vue-router";

const isProd = import.meta.env.PROD;

const wheelContainer = useTemplateRef("wheelContainer");
const toastElement = useTemplateRef("toastElement");

const { spin, toast, toastMessage } = useWheel(wheelContainer, toastElement);
const { isFullscreen, enter: enterFullscreen } = useFullscreen(document.documentElement);
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
        <div ref="wheelContainer" class="wheel-container rounded-circle" @click="spin"></div>

        <div class="wheel-arrow position-absolute"></div>

        <div ref="toastElement" class="toast position-absolute text-center" @click="toast?.hide">
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-background {
  background-image: url("@/assets/bg.jpg");
  background-size: cover;
  background-position: 50% 20%;
}

.content-container {
  height: 100vh;
  width: 100vw;
  gap: 15vh;
  background: linear-gradient(to bottom, white 0%, transparent 30%);
}

.logo-container {
  margin: 0 5vw;
}

.config-button {
  z-index: 1000;
}

.wheel-container {
  width: min(95vw, 95vh);
  height: min(95vw, 95vh);
  max-height: min(70vh, 90vw);
  max-width: min(70vh, 90vw);
  box-shadow: black 0 0 min(5vw, 3vh);
}

.wheel-arrow {
  border-left: min(3vw, 2vh) solid transparent;
  border-right: min(3vw, 2vh) solid transparent;
  border-top: min(6vw, 4vh) solid white;
  top: min(1vw, 0.5vh);
}

.toast {
  --bs-toast-max-width: 50vw;
  --bs-toast-border-radius: min(2vw, 2vh);
  --bs-toast-font-size: min(5vw, 5vh);
}
</style>
