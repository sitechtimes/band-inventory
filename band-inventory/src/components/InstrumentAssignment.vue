<template>
    <div class="mx-8">
        <div class="p-6 flex justify-between mt-6 mr-4">
            <h2 class="text-xl font-bold">Assignments</h2>
            <button class="btn btn-md" @click="addAssignment">
                + Assign Instrument
            </button>
        </div>
        <div v-if="instrument" class="bg-blue-600">
            <p>{{ instrument.assigned_to }}</p>
            <p>{{ instrument.return_date }}</p>
        </div>
        <div v-else class="bg-sky-50 border-1 rounded-sm border-gray p-8 text-center space-y-2">
            <p>No current assignments on this instrument</p>
            <p class="font-semibold">Adding assignments to your instruments will help you keep track of who has the instrument</p>
            <button class="btn btn-md bg-deep-green text-white" @click="addAssignment">+ Add an assignment</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useInstrumentStore } from '@/stores/instrumentStore'
import { storeToRefs } from 'pinia'

const instrumentStore = useInstrumentStore()
const instrument = storeToRefs(instrumentStore).idInstrument
const route = useRoute()
const router = useRouter()
const { id } = route.params as { id: number }

function addAssignment(){
    router.push({ path: `/instruments/${id}/management/assignment` })
}
</script>

<style>
</style>