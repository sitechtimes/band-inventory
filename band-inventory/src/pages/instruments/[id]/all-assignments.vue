<template>
  <div>
    <assignmentView/>
  </div>
</template>

<script setup>
import assignmentView from '@/components/assignmentView.vue';
import { onMounted } from 'vue';
import { useInstrumentStore } from '@/stores/instrumentStore';

const instrumentStore = useInstrumentStore()
onMounted(() => {
  instrumentStore.assignmentAll = false
})
</script>

<style scoped>

</style>