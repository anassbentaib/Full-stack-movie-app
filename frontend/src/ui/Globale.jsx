import CountryList from "react-select-country-list";

export const genreOptions = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "sci-fi", label: "Science Fiction (Sci-Fi)" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "thriller", label: "Thriller" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "animation", label: "Animation" },
  { value: "musical", label: "Musical" },
  { value: "historical", label: "Historical" },
  { value: "biography", label: "Biography" },
  { value: "documentary", label: "Documentary" },
  { value: "war", label: "War" },
  { value: "western", label: "Western" },
  { value: "sports", label: "Sports" },
  { value: "superhero", label: "Superhero" },
  { value: "political", label: "Political" },
  { value: "family", label: "Family" },
  { value: "reality", label: "Reality" },
  { value: "educational", label: "Educational" },
];
export const watching = [
  { value: "foreign", label: "Foreign" },
  { value: "asian", label: "Asian" },
  { value: "cartoon", label: "Cartoon" },
  { value: "turkish", label: "Turkish" },
  { value: "indian", label: "Indian" },
  { value: "arabic", label: "Arabic" },
  { value: "latin", label: "Latin" },
];

export const typeOptions = [
  { value: "movie", label: "Movie" },
  { value: "serie", label: "Serie" },
];

export const years = Array.from(
  { length: 331 },
  (_, index) => 2030 - index
).map((year) => ({
  label: year.toString(),
  value: year.toString(),
}));
const countries = CountryList().getData();

export const contriesOptions = countries.map((country) => ({
  label: country.label,
  value: country.value,
}));

export const customStyles = {
  control: (styles) => ({
    ...styles,
    background: "transparent",
    border: "1px solid #ccc",
    color: "#fff",
    focusBorderColor: "#ccc",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#fff",
  }),
};

export const handleScroll = (setIsSearchVisible) => {
  const scrollTop = window.scrollY;
  const threshold = 50;

  setIsSearchVisible(scrollTop < threshold);
};
