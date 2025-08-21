// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kullanıcı kaydı
  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.name || email.split('@')[0]
      });

      const userDoc = {
        uid: user.uid,
        email: user.email,
        displayName: userData.name || email.split('@')[0],
        userType: userData.userType || 'customer',
        phone: userData.phone || '',
        address: userData.address || '',
        avatar: userData.avatar || '',
        createdAt: new Date(),
        ...userData
      };

      if (userData.userType === 'store') {
        userDoc.storeName = userData.storeName || "Yeni Mağaza";
        userDoc.storeId = user.uid;
      }

      await setDoc(doc(db, 'users', user.uid), userDoc);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Giriş işlemi
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Çıkış işlemi
  const logout = () => signOut(auth);

  // Şifre sıfırlama
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Kullanıcı güncelleme
  const updateUserProfile = async (updates) => {
    try {
      const user = auth.currentUser;
      if (updates.displayName) {
        await updateProfile(user, { displayName: updates.displayName });
      }

      await updateDoc(doc(db, 'users', user.uid), updates);
      setCurrentUser(prev => ({ ...prev, ...updates }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ uid: user.uid, ...userDoc.data() });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}