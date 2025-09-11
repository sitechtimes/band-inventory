import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";

interface Instrument {
    id: number;
    category: string;
    section: string;
    serial_model: number;
    case_number: number;
    manufacturer: string;
    siths_id: number;
    assigned_to: string;
    condition: string;
    year_purchased: number;
    barcode: number;
    location: string;
    }

export const useInstrumentStore = defineStore("instrument", () => {
    const allInstruments: Ref<Instrument[]> = ref([])
    const showedInstruments: Ref<Instrument[]> = ref([])
    const selectedInstrument: Ref<Instrument | null> = ref(null);
    const errorMessage: Ref<string | null> = ref(null);

    const getInstruments = async () => {
        const { data, error } = await supabase
            .from('instruments')
            .select()
        if (error) {
            throw new Error(error.message);
        }
        allInstruments.value = data
        //allInstruments.value.forEach((instrument) => showedInstruments.value?.push(instrument))
        showedInstruments.value = data
  };

  const fetchInstrument = async (id: number) => {
    const { data, error } = await supabase
      .from("instruments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      errorMessage.value = error.message;
      selectedInstrument.value = null;
      return;
    }
    selectedInstrument.value = data;
  };

  const updateLocation = async (id: number, newLocation: string) => {
    const { error } = await supabase
      .from("instruments")
      .update({ location: newLocation })
      .eq("id", id);

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    await fetchInstrument(id);
  };

  return {
    allInstruments,
    showedInstruments,
    selectedInstrument,
    errorMessage,
    getInstruments,
    fetchInstrument,
    updateLocation,
  };
});
