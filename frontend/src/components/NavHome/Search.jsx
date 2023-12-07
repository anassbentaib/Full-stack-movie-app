import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

import { FaSearch } from "react-icons/fa";
import { useSearch } from "./Navbar/SearchContext";
import PostCard from "../Dashboard/PostCard";
import EmptyState from "../../ui/EmptyState";
const Search = () => {
  const { searchTerm, updateSearchTerm, loading } = useSearch();
  const { isOpen, onToggle } = useDisclosure();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const movieData = JSON.parse(localStorage.getItem("movies"));
    setPostData(movieData?.message || []);
  }, []);
  // console.log(postData);
  // console.log(postData.message);

  const filteredMovies = movies?.message?.filter((movie) => {
    const lowerCaseTitle = movie?.message?.title?.toLowerCase();
    const lowerCaseDescription = movie?.message?.description?.toLowerCase();
    const lowerCaseSearchTerm = searchTerm?.toLowerCase();
    return (
      (lowerCaseTitle && lowerCaseTitle.includes(lowerCaseSearchTerm)) ||
      (lowerCaseDescription &&
        lowerCaseDescription.includes(lowerCaseSearchTerm))
    );
  });
  const handleSearch = (event) => {
    const term = event.target.value;
    updateSearchTerm(term);
  };
  return (
    <Box pt={0}>
      <InputGroup mb="-45px" onFocus={onToggle}>
        <Input
          fontWeight="bold"
          value={searchTerm}
          type="text"
          placeholder="Search..."
          borderRadius="20px"
          bg="#fff"
          border="none"
          outline="none"
          color="#000"
          onChange={handleSearch}
        />
        <InputRightElement
          width={{ base: "3rem", sm: "3rem", md: "5rem", lg: "5rem" }}
        >
          <Button
            borderRadius="20px"
            fontSize="13px"
            size="md"
            colorScheme="whiteAlpha"
            color="#000000"
            mr="5px"
          >
            <FaSearch />
          </Button>
        </InputRightElement>
      </InputGroup>

      <Menu isOpen={isOpen} onClose={onToggle}>
        <MenuButton as={Button} visibility="hidden"></MenuButton>
        <MenuList
          maxW={{ base: "380px", sm: "380px", md: "680px", lg: "680px" }}
          minW={{ base: "380px", sm: "380px", md: "680px", lg: "680px" }}
          w="100%"
          color="#000"
          border="none"
          borderRadius="5px"
        >
          {isSearching && (
            <SimpleGrid
              mx="auto"
              templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
              spacing={1}
            >
              {filteredMovies?.length ? (
                filteredMovies.map((movie) => (
                  <PostCard key={movie.id} movie={movie} />
                ))
              ) : (
                <EmptyState
                  color="#000"
                  title={`No movies found for "${searchTerm}"`}
                  subtitle="Try searching for something else."
                />
              )}
            </SimpleGrid>
          )}
          {!isSearching && (
            <EmptyState
              color="#000"
              title="Search on Movie"
              subtitle="Movie App watch movies directly, watch movies directly online, Arabic and foreign"
            />
          )}
        </MenuList>
        ;
      </Menu>
    </Box>
  );
};

export default Search;
