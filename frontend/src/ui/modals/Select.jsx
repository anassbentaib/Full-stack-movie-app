import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../data";

const animatedComponents = makeAnimated();

const GenreSelect = ({ selectedType }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions);
  };

  const genreOptions = colourOptions; // Use your genre options data here

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={genreOptions}
      value={selectedGenres}
      onChange={handleGenreChange}
      isDisabled={!selectedType}
    />
  );
};

export default GenreSelect;
