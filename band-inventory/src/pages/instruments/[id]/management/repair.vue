<template>
    <navBar></navBar>
    <addRepair :instrument-id="(route.params as { id: string }).id"></addRepair>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import navBar from '@/components/navBar.vue'
import addRepair from '@/components/addRepair.vue';

const route = useRoute()
</script>