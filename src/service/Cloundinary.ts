import { CLOUNDINARY_NAME, CLOUNDINARY_UPLOAD_PRESET } from "../constant";

export async function uploadToCloudinary(file: File, resourceType: 'image' | 'video'): Promise<{ secure_url: string; public_id: string }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUNDINARY_UPLOAD_PRESET);

  const cloudName = CLOUNDINARY_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Cloudinary upload error:', errorData);
      throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return { secure_url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}