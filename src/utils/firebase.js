import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase';
export const uploadImage = async (imageUpload) => {
  const imageRef = ref(storage, `images/${imageUpload.name}`);
  const snapshot = await uploadBytes(imageRef, imageUpload);
  const responseUrl = await getDownloadURL(snapshot.ref);
  return responseUrl;
};
