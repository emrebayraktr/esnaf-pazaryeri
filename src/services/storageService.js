// src/services/storageService.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export const storageService = {
  uploadFile: async (file, path = 'uploads/') => {
    try {
      const storageRef = ref(storage, `${path}${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      throw new Error('Dosya yüklenirken hata oluştu: ' + error.message);
    }
  },

  uploadMultipleFiles: async (files, path = 'uploads/') => {
    const uploadPromises = files.map(file => 
      storageService.uploadFile(file, path)
    );
    return Promise.all(uploadPromises);
  },

  deleteFile: async (fileUrl) => {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Dosya silinirken hata:', error);
    }
  }
};