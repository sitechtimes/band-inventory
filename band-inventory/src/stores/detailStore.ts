import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

interface AssignmentInfo {
  assigned_to: string;
  assigned_date: Date;
  return_date: Date | undefined;
  open: true | false;
}

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
  assignments: AssignmentInfo[];
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

export const useDetailStore = defineStore("details", () => {
  const shownInstrument: Ref<Instrument | undefined> = ref();

  const getDetails = async (id: number) => {
    const { data, error } = await supabase
      .from("instruments")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    shownInstrument.value = data;
  };

  const changeAssignment = async (
    name: string,
    time_assigned: Date,
    time_return: Date | undefined,
    id_number: number,
  ) => {
    const { data } = await supabase
      .from("instruments")
      .select("assignments")
      .eq("id", id_number)
      .single();

    const newAssignment = {
      assigned_to: `${name}`,
      assigned_date: `${time_assigned}`,
      return_date: `${time_return}`,
      open: true,
    };

    const { error } = await supabase
      .from("instruments")
      .update({
        assignments: [newAssignment, ...(data?.assignments || [])],
      })
      .eq("id", id_number)
      .select();
    if (error) {
      throw new Error(error.message);
    }
  };

  const closeAssignment = async (
    name: string,
    time_assigned: Date | string,
    time_return: Date | undefined,
    id_number: number,
  ) => {
    const { data } = await supabase
      .from("instruments")
      .select("assignments")
      .eq("id", id_number)
      .single();

    const oldAssignments = data?.assignments.filter(
      (assignment: any) => !assignment.assigned_to.includes(name),
    );
    const closeAssignment = {
      assigned_to: `${name}`,
      assigned_date: `${time_assigned}`,
      return_date: `${time_return}`,
      open: false,
    };

    const { error } = await supabase
      .from("instruments")
      .update({
        assignments: [closeAssignment, ...(oldAssignments || [])],
      })
      .eq("id", id_number)
      .select();
    if (error) {
      throw new Error(error.message);
    }
  };

  return { getDetails, shownInstrument, closeAssignment, changeAssignment };
});
