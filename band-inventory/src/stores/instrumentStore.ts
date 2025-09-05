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

    const deleteInstruments = async (ids: number[]) => {
        if (!ids || ids.length === 0) return
        const { error } = await supabase
            .from('instruments')
            .delete()
            .in('id', ids)
        if (error) {
            throw new Error(error.message)
        }
        allInstruments.value = allInstruments.value.filter(i => !ids.includes(i.id))
        showedInstruments.value = showedInstruments.value.filter(i => !ids.includes(i.id))
    }

    return { allInstruments, getInstruments, showedInstruments, deleteInstruments }
  
}); 