<template>
  <div>
    <assignmentView />
  </div>
</template>

<script setup lang="ts">
import assignmentView from "@/components/assignmentView.vue";
import { onMounted } from "vue";
import { useInstrumentStore } from "@/stores/instrumentStore";

const instrumentStore = useInstrumentStore();
onMounted(() => {
  instrumentStore.assignmentAll = true;
});
</script>

<style scoped></style>
