<template>
  <div class="absolute top-30 right-0 md:right-50 bg-white flex flex-col h-1/2 w-full md:w-3/5 lg:w-5/8 place-content-center md:place-self-center md:rounded-lg">
    <div class="grid grid-rows-4 justify-items-center gap-y-4 place-content-center">
      <div>
      <h1 class="text-xl font-bold">SITHS Band Inventory</h1>
      <h2 class="text-md font-semibold place-self-center">Log In</h2>
      </div>
    <div class="inputContainer w-12/8 items-center">
      <input class="input" placeholder="email" type="email" id="email" v-model="email" />
    </div>

    <div class="inputContainer w-12/8 self-center">
      <input class="input" placeholder="password" type="password" id="password" v-model="password" />
    </div>
    <button class="btn w-50 bg-green" @click="signIn">Sign In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/authStore";
import router from "@/routes/index";
import type { Ref } from "vue";

const userStore = useUserStore();
const email: Ref<string> = ref("")
const password: Ref<string> = ref("")

async function signIn() {
  try {
    const { error } = await userStore.login(email.value, password.value);
    if (error) {
      alert(error);
      throw error;
    } else {
      console.log("sucessfully logged in!");
      router.push({ path: "/home" });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
