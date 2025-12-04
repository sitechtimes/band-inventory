<template>
  <div class="inputContainer flex flex-col">
    <div class="inputFields flex flex-wrap gap-y-3 gap-x-3 p-4">
      <filterCategories :title="'title'" :id="'title'" :placeholder="'title of music piece'" v-model="title" />

      <filterCategories :title="'category'" :id="'category'"
        :placeholder="'category (belongs to band, strings, jazz band, etc)'" v-model="category" />

      <filterCategories :title="'number'" :id="'number'" :placeholder="'number of piece (ex: S001)'" v-model="number" />

      <filterCategories :title="'scanned'" :id="'scanned'" :placeholder="'scanned (yes/no)'" v-model="scanned" />

      <filterCategories :title="'composer'" :id="'composer'" :placeholder="'composer name'" v-model="composer" />

      <filterCategories :title="'arranger'" :id="'arranger'" :placeholder="'arranger name'" v-model="arranger" />

      <filterCategories :title="'level'" :id="'level'" :placeholder="'level of piece (ex: ME, E VE)'" v-model="level" />

      <filterCategories :title="'NYSSMA_level'" :id="'NYSSMA_level'" :placeholder="'NYSSMA level (ex: IV, V, etc)'"
        v-model="NYSSMA_level" />
    </div>
    <div class="p-4 flex flex-wrap gap-x-4 border-t border-gray-200 bg-gray-50">
      <button class="btn bg-deep-green hover:bg-emerald-900 text-white px-6 py-2 rounded-md" @click="filter">Apply
        Filter</button>
      <button class="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMusicStore } from "../stores/musicStore";
import filterCategories from "./filterCategories.vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  close: []
}>()

const musicStore = useMusicStore()
const { allMusic, shownMusic } = storeToRefs(musicStore)

const title: Ref<string> = ref("");
const category: Ref<string> = ref("");
const number: Ref<number | undefined> = ref();
const scanned: Ref<Boolean> = ref(false);
const composer: Ref<string> = ref("");
const arranger: Ref<string> = ref("");
const level: Ref<string> = ref("");
const NYSSMA_level: Ref<string> = ref("");

async function filter() {
  const filteredMusic = allMusic.value.filter(
    (music) =>
      music.title ===
        title.value.charAt(0).toUpperCase() + title.value.slice(1) ||
      music.category ===
        category.value.charAt(0).toUpperCase() + category.value.slice(1) ||
      music.number === Number(number.value) ||
      music.scanned ===
        scanned.value.charAt(0).toUpperCase() + scanned.value.slice(1) ||
  );
  shownMusic.value = [];
  filteredMusic.forEach((music) => shownMusic.value.push(music))
  emit('close')
}

async function reset() {
  shownMusic.value = [];
  allMusic.value.forEach((music) =>
    shownMusic.value.push(music),
  );
  title.value =
  category.value =
  composer.value =
  arranger.value =
  level.value =
  NYSSMA_level.value =
    "";
  number.value =
    undefined;
  scanned.value =
    false
}
</script>

<style></style>
