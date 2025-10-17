<template>
    <div class="m-4">
        <a @click="$router.back()" class="text-emerald-600 font-bold hover:cursor-pointer hover:underline">
            🡨 Back to Instrument details
        </a>
        <h2 class="font-bold text-2xl my-4">Update Location</h2>
        <div v-if="instrument" class="shadow-sm rounded-sm gap-x-4">
            <div class="grid @max-md:grid-rows-2 md:grid-cols-2">
                <div class="flex flex-col m-2 md:ml-4">
                    <label>Current Location</label>
                    <input type="text" class="input w-7/8 font-bold" :value="instrument.location" disabled />
                </div>
                <div class="flex flex-col m-2 md:ml-4">
                    <label>New Location</label>
                    <select v-model="updatedLocation" class="input w-7/8 focus:border-green">
                        <option disabled value="">Select a new location here</option>
                        <option>Orchestra Room</option>
                        <option>Auditorium</option>
                        <option>Storage</option>
                        <option>Other place</option>
                    </select>
                </div>
            </div>
            <div>
                <button class="btn mx-2 md:ml-4 my-4 align-self-center bg-deep-green text-white"
                    @click="updateLocation(instrument.id, updatedLocation)">
                    Update Location
                </button>
                <button class="btn bg-white border-none hover:shadow-none hover:underline" @click="$router.back()">
                    Cancel
                </button>
            </div>
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
