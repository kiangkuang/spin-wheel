<script setup lang="ts">
import { useUrlManagement } from "@/composables/useUrlManagement";
import { RouteName } from "@/router";
import { useItemStore } from "@/stores/itemStore";
import { compressData, getContrastColor } from "@/utils/utils";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";

const { items, sumWeights } = storeToRefs(useItemStore());
const { addItem, removeItem } = useItemStore();
const { copyUrl, copyBtnText } = useUrlManagement();
</script>

<template>
  <div class="container py-4">
    <h1>Wheel Configuration</h1>

    <div class="mb-4">
      <draggable v-model="items" item-key="label" handle=".drag-handle">
        <template #item="{ element: item, index }">
          <div class="row g-2 pb-2 my-1 align-items-center rounded">
            <div class="col-1">
              <div class="drag-handle">⋮⋮</div>
            </div>
            <div class="col-11 col-md">
              <input v-model.trim="item.label" class="form-control" placeholder="Label" />
            </div>
            <div class="col offset-1 col-md-2 offset-md-0">
              <input
                v-model.trim="item.backgroundColor"
                class="form-control"
                placeholder="Color"
                list="colorOptions"
                :style="{
                  backgroundColor: item.backgroundColor,
                  color: getContrastColor(item.backgroundColor),
                }"
              />
              <datalist id="colorOptions">
                <option value="red"></option>
                <option value="blue"></option>
                <option value="green"></option>
                <option value="yellow"></option>
                <option value="orange"></option>
                <option value="purple"></option>
                <option value="pink"></option>
                <option value="navy"></option>
                <option value="teal"></option>
                <option value="brown"></option>
              </datalist>
            </div>
            <div class="col-5 col-md-3">
              <div class="input-group">
                <input
                  v-model.number="item.weight"
                  type="number"
                  class="form-control"
                  min="1"
                  placeholder="Weight"
                />
                <span class="input-group-text text-secondary">
                  {{ Math.round((item.weight / sumWeights) * 1000) / 10 }}%
                </span>
              </div>
            </div>
            <div class="col-auto">
              <button @click="removeItem(index)" class="btn btn-danger w-100">×</button>
            </div>
          </div>
        </template>
      </draggable>

      <button @click="addItem()" class="btn btn-primary">Add Item</button>
    </div>

    <div>
      <p class="text-muted mb-2">Recommended steps:</p>
      <ol class="text-muted small mb-3">
        <li>Open the wheel to verify your configuration</li>
        <li>
          Copy and use the URL directly
          <ul>
            <li>
              If the URL is too long, create a shorter link using
              <a href="https://tinyurl.com" target="_blank">TinyURL</a>
            </li>
          </ul>
        </li>
      </ol>

      <div class="d-flex gap-2">
        <RouterLink
          :to="{
            name: RouteName.Wheel,
            query: items.length ? { data: compressData(items) } : undefined,
          }"
          class="btn btn-secondary"
        >
          1. Open Wheel
        </RouterLink>
        <button @click="copyUrl" class="btn btn-success">2. {{ copyBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drag-handle {
  cursor: move;
  text-align: end;
}
</style>
