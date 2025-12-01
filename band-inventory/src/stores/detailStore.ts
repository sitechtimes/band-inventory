import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { assign } from "unplugin-vue-router/runtime";


interface Instrument extends RepairInfo, AssignmentInfo, PurchaseInfo {
  id: number;
  category: string;
  section: string;
  serial_model: number;
  case_number: number;
  manufacturer: string;
  location: string;
  barcode: number;
  notes: string;
  description: string;
  assigned_to: string;
}

export type AssignmentInfo = {
  id?: number;
  assigned_to: string;
  assigned_date: Date;
  return_date: Date | undefined;
  open: true | false;
  serial_model: number;
};

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

export const useDetailStore = defineStore("details", () => {
  const shownInstrument: Ref<Instrument | undefined> = ref();
  const repairs: Ref<RepairInfo[]> = ref([]);
  const assignments: Ref<AssignmentInfo[]> = ref([]);

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

  // const changeAssignment = async (
  //   name: string,
  //   time_assigned: Date,
  //   time_return: Date | undefined,
  //   id_number: number,
  // ) => {
  //   const { data } = await supabase
  //     .from("instruments")
  //     .select("assignments")
  //     .eq("id", id_number)
  //     .single();

  //   const newAssignment = {
  //     assigned_to: `${name}`,
  //     assigned_date: `${time_assigned}`,
  //     return_date: `${time_return}`,
  //     open: true,
  //   };

  //   const { error } = await supabase
  //     .from("instruments")
  //     .update({
  //       assignments: [newAssignment, ...(data?.assignments || [])],
  //     })
  //     .eq("id", id_number)
  //     .select();
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   await getDetails(id_number);
  // };
  const updateAssignedTo = async(
    assignee: string,
    serial: number
  ) => {
    await supabase
      .from("instruments")
      .update({
        assigned_to: assignee
      })
      .eq("serial_model", serial)
      .select()
  }

  const addAssignment = async(
    name: string,
    time_assigned: Date,
    time_return: Date | undefined,
    serial_model: number,
  ) => {
    const { data, error } = await supabase
      .from("assignments")
      .insert({ 
        'assigned_to': name,
        'assigned_date': time_assigned,
        'return_date': time_return,
        'serial_model': serial_model,
        'open': true
       })
       
       updateAssignedTo(name, serial_model)

    if (error){
      throw new Error(error.message)
    }

    return data
  }


  const getAllAssignments = async (instrumentId: number) => {
    const { data: instrumentData, error: instrumentError } = await supabase
      .from("instruments")
      .select("serial_model")
      .eq("id", instrumentId)
      .single();

    if (instrumentError) {
      console.error("Error fetching instrument:", instrumentError);
      return;
    }

    const { data, error } = await supabase
      .from("assignments")
      .select("*")
      .eq("serial_model", instrumentData.serial_model)
      .order("assigned_date", { ascending: true });

    if (error) {
      console.error("Error fetching assignments:", error);
      return;
    }
    assignments.value = data || [];
  };

  // const closeAssignment = async (
  //   name: string,
  //   time_assigned: Date | string,
  //   time_return: Date | undefined,
  //   id_number: number,
  // ) => {
  //   const { data } = await supabase
  //     .from("instruments")
  //     .select("assignments")
  //     .eq("id", id_number)
  //     .single();

  //   const oldAssignments = data?.assignments.filter(
  //     (assignment: any) => !assignment.assigned_to.includes(name),
  //   );
  //   const closeAssignment = {
  //     assigned_to: `${name}`,
  //     assigned_date: `${time_assigned}`,
  //     return_date: `${time_return}`,
  //     open: false,
  //   };

  //   const { error } = await supabase
  //     .from("instruments")
  //     .update({
  //       assignments: [closeAssignment, ...(oldAssignments || [])],
  //     })
  //     .eq("id", id_number)
  //     .select();
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   await getDetails(id_number);
  // };

  const closeAssignment = async(
    assignmentId: number, 
  ) => {
    const { data, error } = await supabase
      .from("assignments")
      .update({ 'open': false })
      .eq("id", assignmentId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (shownInstrument.value){
      await getAllAssignments(shownInstrument.value.id)
    }
  
    return data
  }

  const getRepairs = async (instrumentId: number) => {
    const { data: instrumentData, error: instrumentError } = await supabase
      .from("instruments")
      .select("serial_model")
      .eq("id", instrumentId)
      .single();

    if (instrumentError) {
      console.error("Error fetching instrument:", instrumentError);
      return;
    }
    const { data, error } = await supabase
      .from("repairs")
      .select("*")
      .eq("serial_model", instrumentData.serial_model)
      .order("repair_date", { ascending: false });

    if (error) {
      console.error("Error fetching repairs:", error);
      return;
    }

    repairs.value = data || [];
  };

  const addRepair = async (repairData: RepairData) => {
    const { data: instrumentData, error: instrumentError } = await supabase
      .from("instruments")
      .select("serial_model")
      .eq("id", repairData.instrument_id)
      .single();
    if (instrumentError) {
      throw new Error(instrumentError.message);
    }

    const repairDataToInsert = {
      repair_date: repairData.repair_date,
      repair_needed: repairData.repair_needed,
      requested_by: repairData.requested_by,
      repair_notes: repairData.repair_notes,
      serial_model: instrumentData.serial_model,
      completed: repairData.completed,
    };

    const { data, error } = await supabase
      .from("repairs")
      .insert([repairDataToInsert])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (shownInstrument.value) {
      await getRepairs(shownInstrument.value.id);
    }
    return data;
  };

  const updateRepair = async (
    repairId: number,
    updateData: Partial<RepairInfo>,
  ) => {
    const { data, error } = await supabase
      .from("repairs")
      .update(updateData)
      .eq("id", repairId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (shownInstrument.value) {
      await getRepairs(shownInstrument.value.id);
    }

    return data;
  };

  const updateLocation = async (id: number, newLocation: string) => {
    const { error } = await supabase
      .from("instruments")
      .update({ location: newLocation })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    await getDetails(id);
  };
  return {
    getDetails,
    getRepairs,
    addRepair,
    updateRepair,
    updateLocation,
    shownInstrument,
    repairs,
    assignments,
    addAssignment,
    closeAssignment,
    getAllAssignments,
  };
});
