<template>
  <div
    class="m-auto h-fit py-20 bg-white flex flex-col w-full md:w-3/5 lg:w-5/8 place-content-center md:place-self-center md:rounded-lg"
  >
    <div
      class="grid grid-rows-4 justify-items-center gap-y-4 place-content-center"
    >
      <div>
        <h1 class="text-xl font-bold">SITHS Band Inventory</h1>
        <h2 class="text-md font-semibold place-self-center">Log In</h2>
      </div>
      <div class="inputContainer w-12/8 items-center">
        <label for="email" class="sr-only">Email</label>
        <input
          class="input"
          placeholder="email"
          type="email"
          id="email"
          v-model="email"
        />
      </div>

      <div class="inputContainer w-12/8 self-center">
        <label for="password" class="sr-only">Password</label>
        <input
          class="input"
          placeholder="password"
          type="password"
          id="password"
          v-model="password"
        />
      </div>
      <button class="btn w-50 bg-deep-green text-white" @click="signIn">
        Sign In
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/authStore";
import type { Ref } from "vue";

const userStore = useUserStore();
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

async function signIn() {
  try {
    await userStore.login(email.value, password.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
