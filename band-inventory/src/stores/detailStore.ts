import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";

interface Instrument extends RepairInfo, AssignmentInfo, PurchaseInfo {
    id: number;
    category: string;
    section: string;
    serial_model: number;
    case_number: string;
    manufacturer: string;
    location: string;
    barcode: number;
    notes: string;
    description: string;
}

export type RepairInfo = {
    id?: number;
    repair_needed: string;
    repair_date: string;
    repair_end?: string;
    repair_notes: string;
    requested_by: string;
    serial_model?: number;
    completed?: boolean;
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

interface RepairData {
    repair_date: string;
    repair_needed: string;
    requested_by: string;
    repair_notes: string;
    instrument_id: number;
    completed: boolean;
}

export const useDetailStore = defineStore("detail", () => {
    const shownInstrument: Ref<Instrument | undefined> = ref()
    const repairs = ref<RepairInfo[]>([])
    const getDetails = async (id: number) => {
        const { data, error } = await supabase
            .from('instruments')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        shownInstrument.value = data
        await getRepairs(id)
    };

    const getRepairs = async (instrumentId: number) => {
        const { data: instrumentData, error: instrumentError } = await supabase
            .from('instruments')
            .select('serial_model')
            .eq('id', instrumentId)
            .single();

        if (instrumentError) {
            console.error('Error fetching instrument:', instrumentError)
            return
        }
        const { data, error } = await supabase
            .from('repairs')
            .select('*')
            .eq('serial_model', instrumentData.serial_model)
            .order('repair_date', { ascending: false })

        if (error) {
            console.error('Error fetching repairs:', error)
            return
        }

        repairs.value = data || []
    };

    const addRepair = async (repairData: RepairData) => {

        const { data: instrumentData, error: instrumentError } = await supabase
            .from('instruments')
            .select('serial_model')
            .eq('id', repairData.instrument_id)
            .single()
        if (instrumentError) {
            throw new Error(instrumentError.message)
        }


        const repairDataToInsert = {
            repair_date: repairData.repair_date,
            repair_needed: repairData.repair_needed,
            requested_by: repairData.requested_by,
            repair_notes: repairData.repair_notes,
            serial_model: instrumentData.serial_model,
            completed: repairData.completed
        }

        const { data, error } = await supabase
            .from('repairs')
            .insert([repairDataToInsert])
            .select()

        if (error) {
            throw new Error(error.message)
        }

        if (shownInstrument.value) {
            await getRepairs(shownInstrument.value.id)
        }
        return data
    };

    const updateRepair = async (repairId: number, updateData: Partial<RepairInfo>) => {
        const { data, error } = await supabase
            .from('repairs')
            .update(updateData)
            .eq('id', repairId)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        if (shownInstrument.value) {
            await getRepairs(shownInstrument.value.id)
        }

        return data
    };

    const updateLocation = async (id: number, newLocation: string) => {
        const { error } = await supabase
            .from('instruments')
            .update({ location: newLocation })
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }

        await getDetails(id)
    };

    return { getDetails, getRepairs, addRepair, updateRepair, updateLocation, shownInstrument, repairs }
});
