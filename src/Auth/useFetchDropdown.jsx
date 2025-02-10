import { useState, useEffect, useMemo } from "react";
import { fetchData } from "./apiService";

const useFetchDropdown = (type) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDropdownData = async () => {
            setLoading(true);
            try {
                const endpoint = type === "course" ? "/Courses/GetAllCourse" : "/Roles/GetAllRole"; // ✅ Fixed API endpoint
                const result = await fetchData(endpoint);
                setData(result.map(item => ({
                    id: type === "course" ? item.courseID : item.roleID,
                    name: type === "course" ? item.courseName : item.roleName,
                })));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDropdownData();
    }, [type]);

    return { data: useMemo(() => data, [data]), loading, error };
};

export default useFetchDropdown;
