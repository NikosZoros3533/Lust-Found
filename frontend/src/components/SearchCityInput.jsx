import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { fetchCities } from "../fetchFunctions";

const SearchCityInput = ({ userCity, onSelect,className=""}) => {
  const [searchTerm, setSearchTerm] = useState(userCity || "");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  useEffect(() => {
    if (data) {
      const sortedCities = data.sort((a, b) => a.Rank - b.Rank);
      setCities(sortedCities);
      setFilteredCities(sortedCities.slice(0, 7));
    }
  }, [data]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowDropdown(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (term.trim() === "") {
        setFilteredCities(cities.slice(0, 7));
      } else {
        const results = cities.filter(
          (city) =>
            city.City.toLowerCase().includes(term.toLowerCase()) ||
            city.Region.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCities(results);
      }
    }, 500); // 500ms debounce
  };

  const handleSelect = (city) => {
    onSelect(city);
    setSearchTerm(city.City);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (searchTerm.trim() === "") {
      setFilteredCities(cities.slice(0, 7));
    }
    setShowDropdown(true);
  };

  const handleBlur=()=>{
    setTimeout(() => {

      setShowDropdown(false); // Close the dropdown
    }, 100); // Small delay to allow click event to register
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="relative w-64 ">
      <input
        type="text"
        className={`${className}`}
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        
      />
      {showDropdown && (
        <ul className="absolute w-full mt-1 bg-dark text-light2 border rounded shadow max-h-60 overflow-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city._id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(city)}
              >
                {city.City} ({city.Region})
              </li>
            ))
          ) : (
            <li className="p-2 text-light3">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchCityInput;
