// Esta funcion la hacemos para solucionar el problema de mockAPI que no permite
// subir imagenes: subimos imagenes a imgbb y devuelve una URL publica.
// Luego esa URL la usamos para mockAPI 😉
//
// ⚠️ Importante: esta clave queda expuesta en el cliente.
//     Para prácticas esta ok, pero no es ideal para ambientes reales.

const IMGBB_API_KEY = "baa090381c3411c73b0180ffed997fd8"; // Clave de ejemplo solicitada
const ENDPOINT = "https://api.imgbb.com/1/upload";

// Funcion con la que vamos a convertir la imagen (File) a cadena base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);
      const parts = result.split(",");

      if (parts.length < 2) {
        reject(new Error("Formato de Data URL inválido"));
        return;
      }

      const base64 = parts[1]; 
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("No se pudo leer el archivo"));
    };

    reader.readAsDataURL(file);
  });
};

export const uploadToImgbb = async (file) => {
  if (!file) {
    throw new Error("No se recibió ningún archivo de imagen");
  }

  const form = new FormData();
  form.append("key", IMGBB_API_KEY);

  // Convertimos el archivo a base64 antes de enviarlo
  try {
    const base64 = await fileToBase64(file);
    form.append("image", base64);
  } catch (err) {
    throw new Error("Error al procesar la imagen: " + err.message);
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    body: form,
  });

  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error("La respuesta del servidor no es JSON válido");
  }

  if (!response.ok || (json && json.success === false)) {
    // Si falla la key, mostramos el error exacto
    const message =
      (json && json.error && json.error.message) || "Error al subir la imagen";
    throw new Error(message);
  }

  if (json && json.data) {
    if (json.data.display_url) {
      return json.data.display_url;
    }
    if (json.data.url) {
      return json.data.url;
    }
  }

  throw new Error("No se recibió una URL válida desde imgbb");
};
