<template>
    <div class="mx-8">
        <div class="p-6 flex justify-between mt-6 mr-4">
            <h2 class="text-xl font-bold">Assignments</h2>
            <button class="btn btn-md" @click="addAssignment">
                + Assign Instruments
            </button>
        </div>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { id } = route.params as { id: number }

function addAssignment(){
    router.push({ path: `/instruments/${id}/management/assignment` })
}
</script>

<style>
</style>