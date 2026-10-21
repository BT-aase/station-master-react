import React, { useState } from "react";

const StationSelectDropdown = ({ options, handleSelect }) => {

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredOptions = options
      .filter(
        (option) =>
          option.name.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          option.crs.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.crs.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 10);

    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    setInputValue(`${option.name} (${option.crs})`);
    setFilteredOptions([]);
    handleSelect(option.name, option.crs);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      {filteredOptions.length > 0 && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {`${option.name} (${option.crs})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StationSelectDropdown;
