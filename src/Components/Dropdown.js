import React from 'react'
import { useState , useRef, useEffect} from 'react';

function Dropdown({ props }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { value, setValue, list } = props;
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                id="dropdownDefaultButton"
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm m-1 py-2 px-4 text-center inline-flex items-center"
                type="button"
                
            >
                {value}
            </button>
            {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 shadow w-44 max-h-[400px] overflow-auto">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        {Object.keys(list).map((r) => (
                            <li key={r}>
                                <button
                                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                    onClick={() => {
                                        setValue(list[r]);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {list[r]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default Dropdown