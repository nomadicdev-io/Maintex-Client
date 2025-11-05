import { create } from "zustand";

const isGeolocationSupported = () => 'geolocation' in navigator;

export const useAppControls = create((set) => ({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isLocationEnabled: async () => {
        if (!isGeolocationSupported()) {
          console.warn('Geolocation is not supported by this browser.');
          return false;
        }
    
        return new Promise((resolve) => {
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            resolve(result.state === 'granted');
          }).catch(() => {
            // Fallback: try to get position to determine if enabled
            navigator.geolocation.getCurrentPosition(
              () => resolve(true),
              () => resolve(false),
              { timeout: 1000 }
            );
          });
        });
    },
    requestLocationPermission: async () => {
        if (!isGeolocationSupported()) {
          return 'error';
        }
    
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => {
              navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                resolve(result.state);
              });
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                resolve('denied');
              } else {
                resolve('error');
              }
            }
          );
        });
    },
    getLocation: async (options = {}) => {
        if (!isGeolocationSupported()) {
          throw new Error('Geolocation is not supported by this browser.');
        }
    
        const defaultOptions = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          ...options
        };
    
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed,
                timestamp: position.timestamp
              });
            },
            (error) => {
              const errorMessages = {
                1: 'Location permission denied',
                2: 'Position unavailable',
                3: 'Location request timed out'
              };
              reject(new Error(errorMessages[error.code] || 'Failed to get location'));
            },
            defaultOptions
          );
        });
    },
}))