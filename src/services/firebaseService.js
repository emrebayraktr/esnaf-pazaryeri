// src/services/firebaseService.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { COLLECTIONS } from '../firebase/models';

// Genel CRUD operasyonları
export const firebaseService = {
  // Ekleme
  add: async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  },

  // Güncelleme
  update: async (collectionName, id, data) => {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: new Date()
    });
  },

  // Silme
  delete: async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  },

  // Tekil getirme
  get: async (collectionName, id) => {
    const docSnap = await getDoc(doc(db, collectionName, id));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  // Çoğul getirme
  getAll: async (collectionName, conditions = [], orderByField = 'createdAt', orderDirection = 'desc') => {
    let q = collection(db, collectionName);
    
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value));
    });
    
    q = query(q, orderBy(orderByField, orderDirection));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Sayfalı getirme
  getPaginated: async (collectionName, pageSize = 10, lastDoc = null, conditions = []) => {
    let q = collection(db, collectionName);
    
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value));
    });
    
    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return {
      data,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
    };
  }
};

// Resim yükleme servisi
export const storageService = {
  uploadImage: async (file, path = 'products/') => {
    const storageRef = ref(storage, path + Date.now() + '_' + file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  uploadMultipleImages: async (files, path = 'products/') => {
    const uploadPromises = files.map(file => 
      storageService.uploadImage(file, path)
    );
    return Promise.all(uploadPromises);
  }
};

// Özel servisler
export const productService = {
  // Ürünleri getir
  getProducts: async (filters = {}) => {
    const conditions = [];
    
    if (filters.category) {
      conditions.push({ field: 'category', operator: '==', value: filters.category });
    }
    
    if (filters.storeId) {
      conditions.push({ field: 'storeId', operator: '==', value: filters.storeId });
    }
    
    if (filters.minPrice !== undefined) {
      conditions.push({ field: 'price', operator: '>=', value: filters.minPrice });
    }
    
    if (filters.maxPrice !== undefined) {
      conditions.push({ field: 'price', operator: '<=', value: filters.maxPrice });
    }
    
    if (filters.isActive !== undefined) {
      conditions.push({ field: 'isActive', operator: '==', value: filters.isActive });
    }
    
    return await firebaseService.getAll(COLLECTIONS.PRODUCTS, conditions);
  },

  // Barkoda göre ürün ara
  getProductByBarcode: async (barcode) => {
    const products = await firebaseService.getAll(COLLECTIONS.PRODUCTS, [
      { field: 'barcode', operator: '==', value: barcode }
    ]);
    
    return products.length > 0 ? products[0] : null;
  },

  // Mağaza ürünlerini getir
  getStoreProducts: async (storeId) => {
    return await productService.getProducts({ storeId, isActive: true });
  }
};

export const storeService = {
  // Tüm mağazaları getir
  getStores: async () => {
    return await firebaseService.getAll(COLLECTIONS.STORES, [
      { field: 'isActive', operator: '==', value: true }
    ]);
  },

  // Mağaza detaylarını getir
  getStore: async (storeId) => {
    return await firebaseService.get(COLLECTIONS.STORES, storeId);
  },

  // Kategoriye göre mağazaları getir
  getStoresByCategory: async (category) => {
    return await firebaseService.getAll(COLLECTIONS.STORES, [
      { field: 'isActive', operator: '==', value: true },
      { field: 'categories', operator: 'array-contains', value: category }
    ]);
  }
};