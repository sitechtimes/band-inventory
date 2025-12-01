import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { time } from "console";
import { assign } from "unplugin-vue-router/runtime";


interface Instrument extends RepairInfo, AssignmentInfo, PurchaseInfo {
  id: number;
  category: string;
  section: string;
  serial_model: number;
  case_number: number;
  manufacturer: string;
  siths_id: number;
  location: string;
  barcode: number;
  notes: string;
  description: string;
}

type RepairInfo = {
  repair_needed: string;
  repair_date: Date | null;
  repair_notes: string;
  requested_by: string;
};
type AssignmentInfo = {
  assigned_to: string;
  assigned_date: Date | null;
  return_date: Date | null;
  open: true | false;
}

type PurchaseInfo = {
  year_purchased: number;
  price: number;
  condition: string;
  retired: boolean;
};

export const useInstrumentStore = defineStore("instrument", () => {
  const allInstruments: Ref<Instrument[]> = ref([]);
  const showedInstruments: Ref<Instrument[]> = ref([]);

  const getInstruments = async () => {
    const { data, error } = await supabase.from("instruments").select();
    if (error) {
      throw new Error(error.message);
    }
    allInstruments.value = data;
    showedInstruments.value = data;
  };

  const deleteInstruments = async (ids: number[]) => {
    if (!ids || ids.length === 0) return;
    const { error } = await supabase.from("instruments").delete().in("id", ids);
    if (error) {
      throw new Error(error.message);
    }
    allInstruments.value = allInstruments.value.filter(
      (i) => !ids.includes(i.id),
    );
    showedInstruments.value = showedInstruments.value.filter(
      (i) => !ids.includes(i.id),
    );
  };

  const bulkUploadInstruments = async (
    instruments: Omit<Instrument, "id">[],
  ) => {
    const { data, error } = await supabase
      .from('instruments')
      .upsert(instruments, { onConflict: 'barcode' })
      .select()

    if (error) {
      throw new Error(error.message);
    }
    await getInstruments();
    return data;
  };
  const addSingleInstrument = async (instrument: Omit<Instrument, "id">) => {
    const { data, error } = await supabase
      .from("instruments")
      .insert([instrument])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    await getInstruments();
    return data;
  };

  return {
    allInstruments,
    getInstruments,
    showedInstruments,
    bulkUploadInstruments,
    addSingleInstrument,
    deleteInstruments,
  };
});
