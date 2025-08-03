import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";

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

export const useDetailStore = defineStore("details", () => {
    const shownInstrument: Ref<Instrument | undefined> = ref();

    const getDetails = async (id: number) => {
        const { data, error } = await supabase
            .from('instruments')
            .select()
            .eq('id', id)
            .single();
            
        if (error) {
            throw new Error(error.message);
        }

        shownInstrument.value = data;
    };


    return { getDetails, shownInstrument };
});