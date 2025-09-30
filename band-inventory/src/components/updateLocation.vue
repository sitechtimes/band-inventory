<template>
    <div v-if="instrument" class="mx-6 mt-6 flex flex-col items-center">
        <h1 class="font-bold text-2xl">Update Inventory Item Location</h1>
        <h2 class="mt-6 text-lg">Current location is: {{ instrument.location }}</h2>
        <div class="flex mt-12 items-center">
            <h3>Location:</h3>
            <select v-model="updatedLocation" class="select ml-8 w-60">
                <option disabled value="">Select a new location here</option>
                <option>Orchestra Room</option>
                <option>Auditorium</option>
                <option>Storage</option>
                <option>Other place</option>
            </select>
        </div>
        <div class="mt-12">
            <button @click="updateLocation(instrument.id, updatedLocation)" class="btn btn-accent bg-emerald-500">Update location</button>
            <a @click="$router.back()" class="hover:underline ml-6 hover:cursor-pointer"> Go back? </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailStore } from '@/stores/detailStore';

const route = useRoute();
const detailStore = useDetailStore();

const updatedLocation = ref('');
const instrument = computed(() => detailStore.shownInstrument);

onMounted(() => {
  const { id } = route.params as { id: number };
  detailStore.getDetails(id);
});

async function updateLocation(id: number, newLocation: string) {
  await detailStore.updateLocation(id, newLocation);
}
</script>
