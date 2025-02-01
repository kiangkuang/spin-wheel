import WheelView from "@/views/WheelView.vue";
import { createRouter, createWebHistory } from "vue-router";

export enum RouteName {
  Wheel = "Wheel",
  Config = "Config",
}

const router = createRouter({
  history: createWebHistory("/spin-wheel/"),
  routes: [
    {
      path: "/",
      alias: "/index.html",
      name: RouteName.Wheel,
      component: WheelView,
    },
    {
      path: "/config",
      alias: "/config.html",
      name: RouteName.Config,
      component: () => import("@/views/ConfigView.vue"),
    },
  ],
});

export default router;
