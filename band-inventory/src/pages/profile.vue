<template>
  <navBar />
  <a
    @click="$router.back()"
    class="text-emerald-600 font-bold hover:cursor-pointer hover:underline p-4 pt-4"
  >
    🡨 Back to Instrument details</a
  >
  <div class="flex flex-col place-items-center space-y-3">
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend class="fieldset-name">user</legend>
      <input type="text" :value="user" class="input" disabled />
      <p
        class="underline text-blue-600"
        @click="showChangeUser = !showChangeUser"
      >
        Change email?
      </p>
      <div v-if="showChangeUser" class="space-y-2">
        <input
          type="text"
          class="input"
          placeholder="Enter your new email"
          v-model="newUser"
        />
        <button class="btn btn-sm md:btn-md" @click="updateUser">
          Confirm
        </button>
        <p v-if="emailConfirm" class="text-green-500">
          Success! In order to confirm new email, please check your new email
          inbox.
        </p>
      </div>
    </fieldset>
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend class="fieldset-name">password</legend>
      <input type="text" value="**********" class="input" disabled />
      <p
        class="underline text-blue-600"
        @click="showChangePassword = !showChangePassword"
      >
        Change password?
      </p>
      <div v-if="showChangePassword" class="space-y-2">
        <input
          type="text"
          class="input"
          placeholder="Enter your new password"
          v-model="newPass"
        />
        <input
          type="text"
          class="input"
          placeholder="Confirm your new password"
          v-model="confirmPass"
        />
        <button class="btn btn-sm md:btn-md" @click="updatePassword">
          Confirm
        </button>
        <p v-if="passConfirm" class="text-green-500">Success!</p>
      </div>
    </fieldset>
    <button class="btn" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import { useUserStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import router from "@/routes/index";
import { supabase } from "@/lib/supabaseClient";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const showChangeUser = ref(false);
const showChangePassword = ref(false);
const newUser: Ref<string> = ref("");
const newPass: Ref<string> = ref("");
const confirmPass: Ref<string> = ref("");
const emailConfirm = ref(false);
const passConfirm = ref(false);

async function updateUser() {
  try {
    await userStore.changeEmail(newUser.value);
    emailConfirm.value = !emailConfirm.value;
    setTimeout(function change() {
      emailConfirm.value = !emailConfirm.value;
    }, 5000);
  } catch (error) {
    alert(error);
  }
}

async function updatePassword() {
  if (newPass.value === confirmPass.value) {
    const { error } = await supabase.auth.updateUser({
      password: newPass.value,
    });
    if (error) {
      alert(error);
    } else {
      passConfirm.value = !passConfirm.value;
      setTimeout(function change() {
        passConfirm.value = !passConfirm.value;
      }, 5000);
      return;
    }
  } else if (newPass.value != confirmPass.value) {
    alert("Passwords do not match");
  }
}

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

<style scoped></style>
