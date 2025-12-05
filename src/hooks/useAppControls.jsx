import { create } from "zustand";

export const useAppControls = create((set, get) => ({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}))