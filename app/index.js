import { supabase } from "./config/supabase.js";

async function deleteUser() {
  // ...
  //   try {
  //     const { data, error } = await supabase.rpc("delete_unverified_users");
  //     if (error) {
  //       throw error;
  //     }
  //     console.log("Se eliminaron los usuarios no verificados correctamente.");
  //   } catch (error) {
  //     console.error("Error al eliminar los usuarios no verificados:", error);
  //   }
  const users = await supabase.from("User").select();
  setInterval(() => console.log(users), 5000);
  // Llama a la función para eliminar los usuarios no verificados
}

deleteUser();
