/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
export default function ComboboxFilter({ options, setSelected }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  options = Array.from(new Set(options));

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearInput = () => {
    setQuery("");
    setSelected("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 mb-2">
      
      <input
        ref={inputRef}
        type="text"
        className="w-full px-4 py-2 border-2 bg-light3 rounded-lg "
        placeholder="Location..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={clearInput}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#222021"
            className="size-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className="absolute z-10 w-full bg-light2 border rounded-lg shadow-lg mt-1 max-h-40 overflow-auto"
          ref={listRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-light1 cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setQuery(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-dark">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
