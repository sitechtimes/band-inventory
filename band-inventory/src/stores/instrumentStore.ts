import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";
import type { RefSymbol } from "@vue/reactivity";

interface Instrument {
    id: number;
    category: string;
    section: string;
    serial_model: string;
    case_number: string;
    manufacturer: string;
    siths_id: string;
    assigned_to: string;
    condition: string;
    year_purchased: number;
    barcode: string;
    }

export const useInstrumentStore = defineStore("instrument", () => {
    const allInstruments: Ref<Instrument[]> = ref([])
    let showedInstruments: Ref<Instrument[]> = ref([])

    const getInstruments = async () => {
        const { data, error } = await supabase
            .from('instruments')
            .select()
        if (error) {
            throw new Error(error.message);
        }
        allInstruments.value = data
        allInstruments.value.forEach((instrument) => showedInstruments.value?.push(instrument))
    }

    return { allInstruments, getInstruments, showedInstruments}
  
}); 