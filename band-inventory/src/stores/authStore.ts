import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { Ref } from "vue";

export const useUserStore = defineStore("auth", () => {
  const user: Ref<string | null> = ref(null);

  const login = async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (result.data.user) {
      user.value = result.data.user.email ?? null;
    }
    return result;
  };
  const logout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };
  const initAuth = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user?.email ?? null;
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      user.value = session?.user?.email ?? null;
    });
  };
  return { user, login, logout, initAuth };
});
