import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";
import type { RefSymbol } from "@vue/reactivity";

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
    }

export const useInstrumentStore = defineStore("instrument", () => {
    const allInstruments: Ref<Instrument[]> = ref([])
    const showedInstruments: Ref<Instrument[]> = ref([])

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
    }

    return { allInstruments, getInstruments, showedInstruments}
  
}); 
