import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";

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
    let showedInstruments: Ref<Instrument[] | null> = ref(null)

    const getInstruments = async () => {
        const { data, error } = await supabase
            .from('instruments')
            .select()
        if (error) {
            throw new Error(error.message);
        }
        allInstruments.value = data
        showedInstruments.value = data
    }



    return { allInstruments, getInstruments, showedInstruments }
  
}); 