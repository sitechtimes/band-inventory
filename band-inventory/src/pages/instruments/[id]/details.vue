<template>
  <div v-if="!userStore.user">
    <span
      >You don't have access to this page. Please sign in
      <RouterLink to="/" class="underline text-blue-600">here</RouterLink>
      .
    </span>
  </div>
  <div>
    <navBar></navBar>
    <InstrumentDetails></InstrumentDetails>
    <InstrumentManagement :instrument-id="route.params.id"></InstrumentManagement>
    <RepairSection :instrument-id="route.params.id"></RepairSection>
    <InstrumentLocations></InstrumentLocations>
  </div>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import InstrumentDetails from "@/components/InstrumentDetails.vue";
import InstrumentManagement from "@/components/InstrumentAssignment.vue";
import RepairSection from "@/components/RepairSection.vue";
import InstrumentLocations from "@/components/InstrumentLocations.vue";
import { useUserStore } from "@/stores/authStore";
import { RouterLink, useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

// async function limit(){
//   if(){

//   }
// }
</script>
