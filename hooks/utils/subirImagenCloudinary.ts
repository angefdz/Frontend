

import axios from 'axios';


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
  formData.append('folder', folder); 

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
    console.error('Error al subir imagen a Cloudinary:', error.response?.data ?? error.message);
    throw new Error('No se pudo subir la imagen a Cloudinary');
  }
};
