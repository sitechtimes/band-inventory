import { defineStore } from "pinia";
import { ref } from 'vue';
import { supabase } from "@/lib/supabaseClient";

export const useUserStore = defineStore('auth', () => {
    const user = ref(null)

    const login = async(email: string, password: string) => {
        return await supabase.auth.signInWithPassword({
  		email,
  		password,
		})
    }

    const logOut = async() => {
        return await supabase.auth.signOut()
    }
    return {user, login, logOut}
})