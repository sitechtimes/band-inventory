import { defineStore } from "pinia";
import { ref } from "vue";
import type { Reactive, Ref } from "vue";
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
  assigned_names: Array<string>;
}

export type AssignmentInfo = {
  id?: number;
  assigned_to: string;
  assigned_date: Date;
  return_date: Date | null;
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
      .order("assigned_date", { ascending: false });
    console.log(data);

    if (data!.length > 10) {
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("id", data![10].id)
        .select();
      if (error) {
        alert(error);
      }
    }

    if (error) {
      console.error("Error fetching assignments:", error);
      return;
    }
    assignments.value = data || [];
  };

  const updateAssignedTo = async (
    serial: number,
    assignmentData: Ref<AssignmentInfo[]>,
  ) => {
    const openedAssignments = assignmentData.value.filter(
      (assignment) => assignment.open,
    );
    const names = [] as Array<string>;
    openedAssignments.forEach((assignment) =>
      names.push(assignment.assigned_to),
    );
    await supabase
      .from("instruments")
      .update({
        assigned_names: names,
      })
      .eq("serial_model", serial)
      .select();
  };

  const addAssignment = async (
    name: string,
    time_assigned: Date,
    time_return: Date | undefined,
    serial_model: number,
  ) => {
    const { data, error } = await supabase
      .from("assignments")
      .insert({
        assigned_to: name,
        assigned_date: time_assigned,
        return_date: time_return,
        serial_model: serial_model,
        open: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    } else {
      assignments.value.push(data);
      updateAssignedTo(serial_model, assignments);
    }
  };

  const closeAssignment = async (
    assignmentId: number,
    serial_model: number,
  ) => {
    const { data, error } = await supabase
      .from("assignments")
      .update({ open: false })
      .eq("id", assignmentId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (shownInstrument.value) {
      await getAllAssignments(shownInstrument.value.id);
    }
    const openedAssignments: Ref<AssignmentInfo[]> = ref([]);
    openedAssignments.value = assignments.value.filter(
      (assignment) => assignment.id !== assignmentId,
    );

    updateAssignedTo(serial_model, openedAssignments);
    return data;
  };

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

    if (data!.length > 10) {
      const { error } = await supabase
        .from("repairs")
        .delete()
        .eq("id", data![10].id)
        .select();
      if (error) {
        alert(error);
      }
    }

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
