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
    const { data, error } = await supabase.from("music").select();
    if (error) {
      throw new Error(error.message);
    }
    allMusic.value = data;
    shownMusic.value = data;
  };
  const deleteMusic = async (ids: number[]) => {
    if (!ids || ids.length === 0) return;
    const { error } = await supabase.from("music").delete().in("id", ids);
    if (error) {
      throw new Error(error.message);
    }
    allMusic.value = allMusic.value.filter((i) => !ids.includes(i.id));
    shownMusic.value = shownMusic.value.filter((i) => !ids.includes(i.id));
  };

  return { getMusic, allMusic, shownMusic, deleteMusic };
});
