import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";
import type { time } from "console";

interface Instrument extends RepairInfo, AssignmentInfo, PurchaseInfo {
    id: number;
    category: string;
    section: string;
    serial_model: string;
    case_number: string;
    manufacturer: string;
    location: string;
    barcode: number;
    notes: string;
    description: string;
}

type RepairInfo = {
    repair_needed: string;
    repair_date: Date;
    repair_notes: string;
    requested_by: string;
};

type AssignmentInfo = {
    siths_id: number;
    assigned_to: string;
    assign_date: Date;
    return_date: Date;
};

type PurchaseInfo = {
    year_purchased: number;
    price: number;
    condition: string;
    retired: boolean;
};

export const useInstrumentStore = defineStore("instrument", () => {
    const allInstruments: Ref<Instrument[]> = ref([])
    const showedInstruments: Ref<Instrument[]> = ref([])
    const idInstrument = ref<Instrument>()

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

    const changeAssignment = async (value: string, time_assigned: string, time_return: Date | undefined) => {
        const { error } = await supabase
            .from('instruments') 
            .update({ assigned_to: `${value}`, assign_date: `${time_assigned}`, return_date: `${time_return}`})
            .eq('id', 1)
        if (error) {
            throw new Error(error.message);
        }
    }

    return { allInstruments, getInstruments, showedInstruments, changeAssignment, idInstrument}
  
}); 
