<template>
    <div class="mx-8 mt-8">
        <div class="p-6 mt-6 mr-4">
            <h2 class="text-2xl font-bold">Repairs</h2>
            <div class="mt-16 grid grid-cols-2 gap-22 w-1/2">
                <label class="input">
                    <span class="label">Repair date</span>
                    <input type="date" />
                </label>
                <label class="input">
                    <span class="label">Repair needed</span>
                    <input type="text" placeholder="What type of repair?" />
                </label>
                <label class="input">
                    <span class="label">Requested by</span>
                    <input type="text" placeholder="Who requested the repair?" />
                </label>
                <label class="input">
                    <span class="label">Repair notes</span>
                    <input type="text" placeholder="Description" />
                </label>
            </div>
            <div class="w-1/2">
                <button class="btn btn-outline bg-emerald-400 w-1/5 mt-20">Add Repair</button>
                <a @click="$router.back()" class="self-end inline-block align-bottom ml-20 hover:underline hover:cursor-pointer"> Go back? </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style></style>