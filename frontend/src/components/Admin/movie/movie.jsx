import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  Divider,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { createMovie } from "../../../api";
import Select from "react-select";
import {
  contriesOptions,
  customStyles,
  genreOptions,
  typeOptions,
  watching,
  years,
} from "../../../ui/Globale";
import { useUser } from "../../../action/user";
import EmptyState from "../../../ui/EmptyState";

const MoviePage = () => {
  const intialData = {
    posterFile: "",
    description: "",
    title: "",
    type: "",
    trailerLink: "",
    releaseDate: "",
    poster: "",
    year: "",
    rating: "",
    language: "",
    country: "",
    episode: "",
    season: "",
    awards: "",
    duration: "",
    genres: [],
    directedby: [],
    actors: [],
    imdbTrailerLink: "",
    watchingType: "",
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormDate] = useState(intialData);
  const { user } = useUser();

  const handleRedirect = () => {
    window.location.assign("/admin-dahboard");
  };

  const handleSeasonChange = (selectedOption) => {
    setFormDate({ ...formData, season: selectedOption });
  };

  const handleEpisodeChange = (selectedOption) => {
    setFormDate({ ...formData, episode: selectedOption });
  };

  const handleGenresChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormDate((prevData) => ({ ...prevData, genres: selectedValues }));
  };

  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };

  const handleYearChange = (selectedOption) => {
    setFormDate({
      ...formData,
      year: selectedOption.value,
    });
  };

  const handleCountryChange = (selectedOption) => {
    setFormDate({
      ...formData,
      country: selectedOption.value,
    });
  };
  const handleWatchingChange = (selectedOption) => {
    setFormDate({
      ...formData,
      watchingType: selectedOption.value,
    });
  };

  const handleFileChange = (e) => {
    setFormDate({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleTypeChange = (selectedOption) => {
    setFormDate({
      ...formData,
      type: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createMovie(formData);

      setFormDate(response.data);

      toast.success("Created.");
      handleRedirect();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!user?.roles || !user.roles.includes("ADMIN")) {
    return (
      <EmptyState
      color='#fff'
        title="Unauthorized"
        subtitle="You don't have access to this page"
      />
    );
  }
  return (
    <Box>
      <Box maxW="7xl" w="100%" minH="100vh" mx="auto" pos="relative" py="30px">
        <Box mx="auto" maxW="7xl" minH="100vh">
          <Flex>
            <Box>
              <Heading fontSize="25px" fontWeight="bold" mb="5px" color="#ffff">
                Create movie
              </Heading>
              <Text color="#ccc">Add a new movie</Text>
            </Box>
            <Spacer />
            <Button bg="#6f4d98" _hover={{ bg: "#6f4d98" }}>
              <BsTrash color="#fff" />
            </Button>
          </Flex>
          <Box>
            <Divider borderBottom="2px solid #fff" mt="3px" />
            {/* <hr /> */}
            <Box mx="auto" w="100%" maxW="7xl" mt="20px">
              <form
                onSubmit={handleSubmit}
                className="space-y-8 w-full"
                encType="multipart/form-data"
                action="/"
              >
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl>
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="Date"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      name="releaseDate"
                      placeholder="Realise Date"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl>
                    <Select
                      styles={customStyles}
                      required
                      options={years}
                      name="year"
                      value={years.find(
                        (option) => option.value === formData.year
                      )}
                      onChange={handleYearChange}
                      placeholder="Select year..."
                    />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl>
                    <Select
                      styles={customStyles}
                      options={contriesOptions}
                      name="country"
                      value={contriesOptions.find(
                        (option) => option.value === formData.country
                      )}
                      onChange={handleCountryChange}
                      placeholder="Select country..."
                    />
                  </FormControl>

                  <FormControl>
                    <Select
                      styles={customStyles}
                      name="genres"
                      value={genreOptions.filter((option) =>
                        formData.genres.includes(option.value)
                      )}
                      onChange={handleGenresChange}
                      options={genreOptions}
                      isMulti
                      placeholder="Select genres..."
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="IMDb Trailer link"
                      name="imdbTrailerLink"
                      value={formData.imdbTrailerLink}
                      disabled={loading}
                      onChange={handleChange}
                    />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl>
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      name="trailerLink"
                      placeholder="Trailler Link"
                      value={formData.trailerLink}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>

                  <FormControl>
                    <Select
                      styles={customStyles}
                      defaultValue="movie"
                      options={typeOptions}
                      name="type"
                      value={typeOptions.find(
                        (option) => option.value === formData.type
                      )}
                      onChange={handleTypeChange}
                      placeholder="Select type..."
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl>
                    <NumberInput
                      type="text"
                      // border="1px solid #EEEEEE"
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      min={1}
                      name="season"
                      value={formData.season}
                      onChange={(valueString) =>
                        handleSeasonChange(Number(valueString))
                      }
                    >
                      <NumberInputField
                        placeholder="Seasons Number"
                        required
                        _placeholder={{ color: "#EEEEEE" }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper color="#fff" />
                        <NumberDecrementStepper color="#fff" />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  {formData.type === "serie" && (
                    <FormControl>
                      <NumberInput
                        required
                        focusBorderColor="#EEEEEE"
                        color="#EEEEEE"
                        min={1}
                        name="episode"
                        value={formData.episode}
                        onChange={(valueString) =>
                          handleEpisodeChange(Number(valueString))
                        }
                      >
                        <NumberInputField
                          placeholder="Episode Number"
                          _placeholder={{ color: "#EEEEEE" }}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color="#fff" />
                          <NumberDecrementStepper color="#ffff" />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}
                  <Input
                    type="text"
                    border="1px solid #EEEEEE"
                    _placeholder={{ color: "#EEEEEE" }}
                    required
                    focusBorderColor="#EEEEEE"
                    color="#EEEEEE"
                    placeholder="Actors (coma separated)"
                    value={formData.actors}
                    onChange={(e) =>
                      setFormDate({
                        ...formData,
                        actors: e.target.value.split(","),
                      })
                    }
                    name="acotrs"
                    disabled={loading}
                  />
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl mx="auto">
                    <Select
                      styles={customStyles}
                      required
                      options={watching}
                      name="watchingType"
                      value={watching.find(
                        (option) => option.value === formData.watchingType
                      )}
                      onChange={handleWatchingChange}
                      placeholder="Select watching type..."
                    />
                  </FormControl>
                  <FormControl mx="auto">
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Poster Link"
                      name="poster"
                      value={formData.poster}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl mx="auto">
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Directed by (coma separated)"
                      name="directedby"
                      value={formData.directedby}
                      onChange={(e) =>
                        setFormDate({
                          ...formData,
                          directedby: e.target.value.split(","),
                        })
                      }
                      disabled={loading}
                    />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                  <FormControl mx="auto">
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Awards"
                      value={formData.awards}
                      onChange={handleChange}
                      name="awards"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl mx="auto">
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormControl mx="auto">
                    <Input
                      type="text"
                      border="1px solid #EEEEEE"
                      _placeholder={{ color: "#EEEEEE" }}
                      required
                      focusBorderColor="#EEEEEE"
                      color="#EEEEEE"
                      placeholder="Language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl mx="auto">
                  <Input
                    type="file"
                    name="posterFile"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <Textarea
                  borderRadius="5px"
                  minW="100%"
                  maxW="100%"
                  type="text"
                  border="1px solid #EEEEEE"
                  _placeholder={{ color: "#EEEEEE" }}
                  required
                  focusBorderColor="#EEEEEE"
                  color="#EEEEEE"
                  placeholder="The story"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  disabled={loading}
                />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Button
                    cursor={loading ? "not-allowed" : "pointer"}
                    disabled={loading}
                    p="1rem 7rem"
                    type="submit"
                    bg={loading ? "#e0e0ff" : "#6f4d98"}
                    _hover={{ bg: "#6f4d98" }}
                    color="#fff"
                  >
                    Create
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MoviePage;
