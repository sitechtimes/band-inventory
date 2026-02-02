import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import router from "@/routes/index";
import type { Ref } from "vue";

export const useUserStore = defineStore("auth", () => {
  const user: Ref<string | null> = ref(null);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error);
    } else {
      user.value = email;
      router.push({ path: "/home" });
    }
  };

  const changeEmail = async (newEmail: string) => {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });
    console.log("success");
    if (error) {
      alert(error);
    } else {
      user.value = newEmail;
    }
  };

  return { user, login, changeEmail };
});
