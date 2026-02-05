<template>
  <div>
    <div class="navbar bg-deep-blue text-white shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="ml-2 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-deep-blue rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><router-link to="/home">Instruments</router-link></li>
            <li><router-link to="/music">Music</router-link></li>
          </ul>
        </div>
        <h1 class="ml-4 text-2xl">Band Inventory</h1>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li class="text-lg italic">
            <router-link to="/home">Instruments</router-link>
          </li>
          <li>
            <p class="text-lg">|</p>
          </li>
          <li class="text-lg italic">
            <router-link to="/music">Music</router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <router-link to="/profile"
          ><img
            src="/user.png"
            class="w-1/5 md:w-1/7 lg:w-1/9 place-self-end mr-4"
        /></router-link>
        <!-- <a class="btn mr-4" @click="signOut">Sign Out</a> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/routes/index";
import { supabase } from "@/lib/supabaseClient";
import { RouterLink } from "vue-router";

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      console.log("sucessfully logged out!");
      router.replace({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
