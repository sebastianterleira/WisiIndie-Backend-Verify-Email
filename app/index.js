import { supabase } from "./config/supabase.js";

function getMinutes(user) {
  const nowDate = new Date();
  const parsedDate = new Date(user.created_at);
  const result = nowDate - parsedDate;
  const minutes = (result / 60000).toFixed(0);
  return minutes;
}

export default async function deleteUser() {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  data.forEach(async (user) => {
    if (user.aud === "authenticated") return;

    const minutes = getMinutes(user);
    if (minutes >= 1440) {
      const { data, error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) {
        console.error("Error al eliminar los usuarios no verificados:", error);
      }
    }
  });
}
// deleteUser();
// Llama a la función para eliminar los usuarios no verificados cada 5 minutos
setInterval(() => deleteUser(), 300000);
