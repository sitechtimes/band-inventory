<template>
  <div class="bg-white flex flex-col h-1/3">
    <div class="grid grid-rows-4 items-center justify-items-center">
    <h1>Log In Page</h1>
    <div class="inputContainer">
      <!-- <label for="email"> Email: </label> -->
      <input class="input" placeholder="email" type="email" id="email" v-model="email" />
    </div>

    <div class="inputContainer">
      <!-- <label for="email"> Password: </label> -->
      <input class="input" placeholder="password" type="password" id="password" v-model="password" />
    </div>
    <button class="btn w-50" @click="signIn">Sign In</button>
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
      router.push({ path: "/temptest" });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
