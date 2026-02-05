<template>
  <div class="inputContainer flex flex-col">
    <div class="inputFields flex flex-wrap gap-y-3 gap-x-3 p-4">
      <filterCategories
        :title="'title'"
        :id="'title'"
        :placeholder="'Title of music piece'"
        v-model="title"
      />
      <filterCategories
        :title="'category'"
        :id="'category'"
        :placeholder="'Category'"
        v-model="category"
      />
      <filterCategories
        :title="'serial_id'"
        :id="'serial_id'"
        :placeholder="'Serial ID'"
        v-model="serial_id"
      />
      <filterDropdown
        :title="'scanned'"
        :id="'scanned'"
        :placeholder="'Scanned (yes or no)'"
        :options="scannedOptions"
        v-model="scanned"
      />
      <filterCategories
        :title="'composer'"
        :id="'composer'"
        :placeholder="'Composer name'"
        v-model="composer"
      />
      <filterCategories
        :title="'arranger'"
        :id="'arranger'"
        :placeholder="'Arranger name'"
        v-model="arranger"
      />
      <filterDropdown
        :title="'level'"
        :id="'level'"
        :placeholder="'Level of piece (ex: ME, E VE)'"
        :options="levelOptions"
        v-model="level"
      />
      <filterDropdown
        :title="'NYSSMA_level'"
        :id="'NYSSMA_level'"
        :placeholder="'NYSSMA level (ex: IV, V, etc)'"
        :options="NYSSMALevelOptions"
        v-model="NYSSMA_level"
      />
    </div>
    <div class="p-4 flex flex-wrap gap-x-4 border-t border-gray-200 bg-gray-50">
      <button
        class="btn bg-deep-green hover:bg-emerald-900 text-white px-6 py-2 rounded-md"
        @click="filter"
      >
        Apply Filter
      </button>
      <button
        class="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMusicStore } from "../stores/musicStore";
import filterCategories from "./filterCategories.vue";
import filterDropdown from "./filterDropdown.vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  close: [];
}>();

const musicStore = useMusicStore();
const { allMusic, shownMusic } = storeToRefs(musicStore);

const title: Ref<string> = ref("");
const category: Ref<string> = ref("");
const serial_id: Ref<string> = ref("");
const scanned: Ref<boolean | string> = ref("");
const composer: Ref<string> = ref("");
const arranger: Ref<string> = ref("");
const level: Ref<string> = ref("");
const NYSSMA_level: Ref<string> = ref("");

const scannedOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const levelOptions = [
  { value: "ME", label: "ME" },
  { value: "E", label: "E" },
  { value: "VE", label: "VE" },
];
const NYSSMALevelOptions = [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "VI", label: "VI" },
];

async function filter() {
  const filteredMusic = allMusic.value.filter(
    (music) =>
      (title.value === "" ||
        (music.title &&
          music.title.toLowerCase().includes(title.value.toLowerCase()))) &&
      (category.value === "" ||
        (music.category &&
          music.category
            .toLowerCase()
            .includes(category.value.toLowerCase()))) &&
      (serial_id.value === "" ||
        (music.serial_id &&
          music.serial_id
            .toLowerCase()
            .includes(serial_id.value.toLowerCase()))) &&
      (scanned.value === "" || music.scanned === scanned.value) &&
      (composer.value === "" ||
        (music.composer &&
          music.composer
            .toLowerCase()
            .includes(composer.value.toLowerCase()))) &&
      (arranger.value === "" ||
        (music.arranger &&
          music.arranger
            .toLowerCase()
            .includes(arranger.value.toLowerCase()))) &&
      (level.value === "" || music.level === level.value) &&
      (NYSSMA_level.value === "" || music.NYSSMA_level === NYSSMA_level.value),
  );
  shownMusic.value = [];
  filteredMusic.forEach((music) => shownMusic.value.push(music));
  emit("close");
}

async function reset() {
  shownMusic.value = [];
  allMusic.value.forEach((music) => shownMusic.value.push(music));
  title.value =
    category.value =
    serial_id.value =
    composer.value =
    arranger.value =
    level.value =
    NYSSMA_level.value =
    scanned.value =
      "";
}
</script>

<style></style>
