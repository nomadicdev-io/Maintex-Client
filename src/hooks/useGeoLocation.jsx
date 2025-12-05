import { create } from "zustand";

export const useGeoLocation = create((set, get) => ({
    coords: null,
    error: null,
    loading: false,
    isLocationAvailable: () => typeof navigator !== "undefined" && Boolean(navigator.geolocation),
    isLocationEnabled: () => {
        const { coords, error } = get();
        return Boolean(coords) && !error;
    },
    getLocation: () => {
        if (!navigator.geolocation) {
            set({
                error: "Geolocation is not supported by your browser",
                loading: false
            });
            return Promise.reject(new Error("Geolocation is not supported by your browser"));
        }
        set({ loading: true, error: null });
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                        timestamp: position.timestamp
                    };

                    set({
                        coords: coordinates,
                        error: null,
                        loading: false
                    });

                    resolve(coordinates);
                },
                (error) => {
                    let errorMessage = "Failed to get location";

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location permission denied by user";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information is unavailable";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out";
                            break;
                        default:
                            errorMessage = "An unknown error occurred";
                            break;
                    }

                    set({
                        error: errorMessage,
                        loading: false
                    });

                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
}))