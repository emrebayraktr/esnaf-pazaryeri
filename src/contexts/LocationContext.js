// src/contexts/LocationContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function useLocationContext() {
  return useContext(LocationContext);
}

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('İstanbul, Kadıköy');
  const [isLoading, setIsLoading] = useState(false);

  // Kullanıcının gerçek konumunu al
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          reverseGeocode(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          setIsLoading(false);
        }
      );
    }
  };

  // Koordinatları adrese çevir
  const reverseGeocode = async (lat, lng) => {
    try {
      // Gerçek uygulamada Google Maps API veya benzeri kullanılacak
      const mockAddress = "Kadıköy, İstanbul";
      setSelectedLocation(mockAddress);
    } catch (error) {
      console.error('Adres çözümleme hatası:', error);
    }
  };

  const updateLocation = (newLocation) => {
    setSelectedLocation(newLocation);
    localStorage.setItem('selectedLocation', newLocation);
  };

  useEffect(() => {
    // Kaydedilmiş konumu yükle
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      setSelectedLocation(savedLocation);
    }
  }, []);

  const value = {
    userLocation,
    selectedLocation,
    isLoading,
    getUserLocation,
    updateLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}