// src/services/productService.js
import { firestoreService, storageService } from '.';

export const productService = {
  getAllProducts: async () => {
    try {
      const snapshot = await firestoreService.getDocuments('products');
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error('Ürünler getirilirken hata oluştu');
    }
  },

  getProductById: async (id) => {
    try {
      const doc = await firestoreService.getDocument('products', id);
      return doc.exists() ? { id: doc.id, ...doc.data() } : null;
    } catch (error) {
      throw new Error('Ürün getirilirken hata oluştu');
    }
  },

  createProduct: async (productData, images) => {
    try {
      let imageUrls = [];
      if (images && images.length > 0) {
        imageUrls = await storageService.uploadMultipleFiles(images, 'products/');
      }

      const productWithImages = {
        ...productData,
        images: imageUrls,
        isApproved: productData.userType === 'admin',
        isActive: true
      };

      const docRef = await firestoreService.addDocument('products', productWithImages);
      return docRef.id;
    } catch (error) {
      throw new Error('Ürün oluşturulurken hata oluştu: ' + error.message);
    }
  },

  updateProduct: async (id, updates) => {
    try {
      await firestoreService.updateDocument('products', id, updates);
    } catch (error) {
      throw new Error('Ürün güncellenirken hata oluştu');
    }
  },

  deleteProduct: async (id) => {
    try {
      await firestoreService.deleteDocument('products', id);
    } catch (error) {
      throw new Error('Ürün silinirken hata oluştu');
    }
  }
};