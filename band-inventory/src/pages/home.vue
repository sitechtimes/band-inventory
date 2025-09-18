<template>
  <div v-if="!userStore.user">
    <span
      >You don't have access to this page. Please sign in
      <RouterLink to="/" class="underline text-blue-600">here</RouterLink>
      .
    </span>
  </div>
  <div v-else>
    <navBar />
    <h1 class="p-2 font-bold text-2xl">Instruments</h1>
    <instrumentFilter />
    <InstrumentTable />
  </div>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import InstrumentTable from "../components/InstrumentTable.vue";
import instrumentFilter from "../components/instrumentFilter.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
</script>

<style></style>
