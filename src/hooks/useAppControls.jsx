import { create } from "zustand";

export const useAppControls = create((set) => ({
    coordinates: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    getCurrentLocation: async() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    set({ coordinates: { latitude, longitude } })
                },
                function(error) {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
}))