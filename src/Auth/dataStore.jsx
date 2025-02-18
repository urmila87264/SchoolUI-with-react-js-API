import { create } from "zustand";

// ✅ Store for Global State Management
const useDataStore = create((set) => ({
    countries: [],
    states: [],
    cities: [],
    setCountries: (countries) => set({ countries }),
    setStates: (states) => set({ states }),
    setCities: (cities) => set({ cities })
}));

export default useDataStore;
