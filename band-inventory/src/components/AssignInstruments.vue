<template>
    <div class="mx-6 mt-6">
        <a class=" text-emerald-600 font-bold hover:cursor-pointer" @click="goBack">
            🡨 Back to Instrument Details
        </a>
        <div>
            <h1 class="text-2xl font-bold mt-8">Assign Instruments</h1>
        </div>
        <div class="mx-8 mt-12 w-96 flex">
            <div>
                <p>Assign to:</p>
                <div class="dropdown dropdown-hover">
                    <div tabindex="0" role="button" class="btn w-lg mt-4 border-emerald-600">Select a student</div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-lg p-2 shadow-sm">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            <div>
                <p>Return due by (optional):</p>
                <input type="date" class="input" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
    router.back()
}
</script>

<style></style>