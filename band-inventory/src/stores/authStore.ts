import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import router from "@/routes/index";
import type { Ref } from "vue";

export const useUserStore = defineStore("auth", () => {
  const user: Ref<string | null> = ref(null);
  const EXPIRY_WARNING_MS = 60_000;
  let logoutTimer: ReturnType<typeof setTimeout> | null = null;
  let warningTimer: ReturnType<typeof setTimeout> | null = null;
  const scheduleLogout = (session: { expires_in?: number } | null) => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      logoutTimer = null;
    }
    if (warningTimer) {
      clearTimeout(warningTimer);
      warningTimer = null;
    }
    const expiresInSeconds = session?.expires_in;
    if (expiresInSeconds == null) {
      return;
    }
    const msUntilExpires = expiresInSeconds * 1000;
    if (msUntilExpires <= 0) {
      supabase.auth.signOut();
      return;
    }
    const warningDelay = msUntilExpires - EXPIRY_WARNING_MS;
    if (warningDelay > 0) {
      warningTimer = setTimeout(() => {
        alert("Session will expire soon.");
      }, warningDelay);
    }
    logoutTimer = setTimeout(() => {
      supabase.auth.signOut();
    }, msUntilExpires);
  };
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
  const initAuth = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user?.email ?? null;
      scheduleLogout(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      user.value = session?.user?.email ?? null;
      scheduleLogout(session);
    });
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

  return { user, login, changeEmail, initAuth };
});
