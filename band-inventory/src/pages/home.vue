<template>
  <navBar></navBar>
  <h1 class="p-2 font-bold text-2xl">Instruments</h1>
  <instrumentFilter></instrumentFilter>
  <InstrumentTable></InstrumentTable>
  
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import InstrumentTable from '../components/InstrumentTable.vue'
import instrumentFilter from "../components/instrumentFilter.vue";

</script>

<style></style>
