import axios from 'axios';

const IMGBB_API_KEY = 'TU_API_KEY_AQUI'; 

const MOCK_MODE = true; 

export const uploadToImgBB = async (file) => {
    
    if (MOCK_MODE) {
        return new Promise((resolve) => {
            console.log("⚠️ MODO SIMULACIÓN: Subiendo imagen (simulado)...");
            
            const objectUrl = URL.createObjectURL(file);
            
            setTimeout(() => {
                console.log("✅ Imagen local lista:", objectUrl);
                resolve(objectUrl);
            }, 1000); 
        });
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
        return response.data.data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        if (error.response) {
            console.error("ImgBB API Error Details:", error.response.data);
            return URL.createObjectURL(file); 
        }
        throw new Error("Error al subir la imagen. Verifica tu conexión.");
    }
};