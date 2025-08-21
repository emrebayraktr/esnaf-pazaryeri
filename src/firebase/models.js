// src/firebase/models.js
// Firestore koleksiyon isimleri
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  STORES: 'stores',
  CATEGORIES: 'categories',
  FAVORITES: 'favorites',
  REVIEWS: 'reviews',
  ORDERS: 'orders'
};

// Ürün modeli
export const productModel = {
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  category: '',
  brand: '',
  barcode: '',
  images: [],
  stock: 0,
  storeId: '',
  storeName: '',
  rating: 0,
  reviewCount: 0,
  isActive: true,
  isApproved: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mağaza modeli
export const storeModel = {
  name: '',
  description: '',
  ownerId: '',
  address: '',
  location: { lat: 0, lng: 0 },
  phone: '',
  email: '',
  website: '',
  socialMedia: {},
  openingHours: {},
  categories: [],
  rating: 0,
  reviewCount: 0,
  isVerified: false,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};