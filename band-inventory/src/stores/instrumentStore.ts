import { defineStore } from "pinia";
import { ref } from "vue";
import type {Ref} from 'vue';
import { supabase } from "@/lib/supabaseClient";

export interface Instrument {
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

// export const useInstrumentStore = defineStore("instrument", () => {
//     const instruments: Ref<Instrument[] | null> = ref(null)

//     const get = async() => {
//         return await supabase
//             .from('instruments')
//             .select()
//     }
// //      const login = async (email: string, password: string)  => {
// //     user.value = email
// //     return await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });
// //   };

//     // const { data, error } = await supabase
//     //         .from('instruments')
//     //         .select()
//     //     if (error) {
//     //         throw new Error(error.message);
//     //     }
//     //     instruments.value = data

//     return { instruments, get }
  
// }); //revisit this later where you store the instrument value here