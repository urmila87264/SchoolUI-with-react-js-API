import { useQueries } from "@tanstack/react-query";
import { fetchData } from "../services/apiService";

export const useDropdownData = () => {
    const results = useQueries({
        queries: [
            { queryKey: ["countries"], queryFn: () => fetchData("/Countries/GetAll"), staleTime: 1000 * 60 * 10 },
            { queryKey: ["states"], queryFn: () => fetchData("/States/GetAll"), staleTime: 1000 * 60 * 5 },
            { queryKey: ["cities"], queryFn: () => fetchData("/Cities/GetAll"), staleTime: 1000 * 60 * 5 },
        ],
    });

    const [countries, states, cities] = results.map(result => result.data || []);
    const loading = results.some(result => result.isLoading);
    const error = results.find(result => result.error)?.error;

    return { countries, states, cities, loading, error };
};
