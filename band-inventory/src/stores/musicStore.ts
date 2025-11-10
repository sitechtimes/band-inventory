import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

interface Music {
  id: number;
  title: string;
  category: string;
  number: number;
  scanned: boolean;
  composer: string;
  arranger: string;
  level: string;
  NYSSMA_level: string;
  notes: string;
}

export const useMusicStore = defineStore("music", () => {
  const allMusic: Ref<Music[]> = ref([]);
  const shownMusic: Ref<Music[]> = ref([]);

  const getMusic = async () => {
    const { data, error } = await supabase.from("music").select()
    if (error) {
      throw new Error(error.message);
    }
    allMusic.value= data;
    shownMusic.value = data;
  };
  return { getMusic, allMusic, shownMusic }
});
