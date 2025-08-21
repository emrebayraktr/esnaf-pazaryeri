// src/services/userService.js
import { firestoreService } from '.';

export const userService = {
  getUserProfile: async (userId) => {
    try {
      const doc = await firestoreService.getDocument('users', userId);
      return doc.exists() ? { id: doc.id, ...doc.data() } : null;
    } catch (error) {
      throw new Error('Kullanıcı profili getirilirken hata oluştu');
    }
  },

  updateUserProfile: async (userId, updates) => {
    try {
      await firestoreService.updateDocument('users', userId, updates);
    } catch (error) {
      throw new Error('Profil güncellenirken hata oluştu');
    }
  },

  getStoreUsers: async () => {
    try {
      const snapshot = await firestoreService.getDocuments('users', [
        { field: 'userType', operator: '==', value: 'store' }
      ]);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error('Mağaza kullanıcıları getirilirken hata oluştu');
    }
  }
};