<template>
  <navBar></navBar>
  <instrumentDetails></instrumentDetails>
  <InstrumentManagement></InstrumentManagement>
  <RepairSection :instrument-id="(route.params as any).id"></RepairSection>
  <InstrumentLocations></InstrumentLocations>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import navBar from '@/components/navBar.vue'
import InstrumentDetails from '@/components/InstrumentDetails.vue'
import InstrumentManagement from '@/components/InstrumentAssignment.vue'
import RepairSection from '@/components/RepairSection.vue'
import InstrumentLocations from '@/components/InstrumentLocations.vue'

const route = useRoute()
</script>