// utils/subirImagenCloudinary.ts

import axios from 'axios';

/**
 * Sube una imagen local a Cloudinary y devuelve la URL pública.
 * 
 * @param uri URI local de la imagen (desde ImagePicker o similar)
 * @param folder Carpeta en Cloudinary donde guardar la imagen (por ejemplo: 'tfg/usuarios/152/categorias')
 * @param preset Nombre del upload_preset sin firmar
 * @param cloudName Nombre de tu cuenta en Cloudinary
 * @returns URL pública de la imagen subida
 */
export const subirImagenCloudinary = async (
  uri: string,
  folder: string,
  preset = 'tfg_unsigned',
  cloudName = 'djbrascw5'
): Promise<string> => {
  if (!uri) throw new Error('No se ha proporcionado una URI de imagen');

  const formData = new FormData();

  formData.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'imagen.jpg',
  } as any);

  formData.append('upload_preset', preset);
  formData.append('folder', folder); // 🗂 Aquí le decimos la carpeta

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.secure_url;
  } catch (error: any) {
    console.error('❌ Error al subir imagen a Cloudinary:', error.response?.data ?? error.message);
    throw new Error('No se pudo subir la imagen a Cloudinary');
  }
};
