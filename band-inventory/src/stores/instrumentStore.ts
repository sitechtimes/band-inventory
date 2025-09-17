import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";
import type { time } from "console";
import { assign } from "unplugin-vue-router/runtime";

interface AssignmentInfo {
    assigned_to: string | null;
    assigned_date: Date | null;
    return_date: Date | null;
    open: true | false;
};

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
    assignments: AssignmentInfo[]
}

type RepairInfo = {
    repair_needed: string;
    repair_date: Date;
    repair_notes: string;
    requested_by: string;
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

    const changeAssignment = async (name: string, time_assigned: string, time_return: Date | undefined, id_number: number) => {
        const { data } = await supabase
            .from('instruments')
            .select('assignments')
            .eq('id', id_number)
            .single()

        const newAssignment = {
            assigned_to: `${name}`,
            assigned_date: `${time_assigned}`,
            return_date: `${time_return}`,
            open: true
        };


        const { error } = await supabase
            .from('instruments')
              .update({
                assignments: [newAssignment, ...(data?.assignments || [])]
                })
            .eq('id', id_number)
            .select()
        if (error) {
            throw new Error(error.message);
        }
    }


    const closeAssignment = async(name: string, time_assigned: string, time_return: Date | undefined, id_number: number) => {
        const { data } = await supabase
            .from('instruments')
            .select('assignments')
            .eq('assignments.assigned_to', name)
            .single()
        
        const { error } = await supabase
            .from('instruments')
              .update({
                assignments: [] //add the update closed assignment
                })
            .eq('id', id_number)
            .select()
        if (error) {
            throw new Error(error.message);
        }
    }
    return { allInstruments, getInstruments, showedInstruments, changeAssignment, idInstrument, closeAssignment}
  
}); 
