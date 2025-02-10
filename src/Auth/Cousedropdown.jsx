import React from "react";
import useFetchDropdown from "./useFetchDropdown";

import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle.min";





const CouseDropdown = ({ type, onSelect }) => {
    const { data, loading, error } = useFetchDropdown(type);

    return (
        <div>
            <label className="form-label">Select {type === "course" ? "Course" : "Role"}:</label>
            <select className="form-select" onChange={(e) => onSelect(e.target.value)} required>
                <option value="">-- Select {type === "course" ? "Course" : "Role"} --</option>

                {loading && <option disabled>Loading...</option>}
                {error && <option disabled>Error loading data</option>}

                {data.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

// ✅ Use `React.memo()` for Performance Optimization
export default React.memo(CouseDropdown);