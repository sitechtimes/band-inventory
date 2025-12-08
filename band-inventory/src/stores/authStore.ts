import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { Ref } from "vue";

export const useUserStore = defineStore("auth", () => {
  const user: Ref<string | null> = ref(null);

  const login = async (email: string, password: string) => {
    user.value = email;
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const changeEmail = async(newEmail:string) => {
    const {error} = await supabase.auth.updateUser({
      email: newEmail,
    })

    if(error){
      alert(error)
    } else {
      user.value = newEmail
    }
    
  }

  return { user, login, changeEmail };
});
