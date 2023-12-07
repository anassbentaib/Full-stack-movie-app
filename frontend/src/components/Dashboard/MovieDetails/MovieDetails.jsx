import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../../api";
import {
  Link,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Thead,
} from "@chakra-ui/react";
import { MdSlowMotionVideo } from "react-icons/md";
import Actors from "./Avatar";
import { PuffLoader } from "react-spinners";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaHeart, FaStar, FaYoutube } from "react-icons/fa";
import SuggestMovies from "../SuggestMovies";
import Reviews from "../Reviews/Reviews";
import { TableRow } from "./TableRow";

const MovieDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const getCurrentById = async () => {
    try {
      const response = await getMovieById(id);
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentById();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center  justify-center">
        <PuffLoader size={70} color="red" />
      </div>
    );
  }
  return (
    <Box
      pt={10}
      pb={20}
      w="100%"
      maxW="8xl"
      minH="100vh"
      pos="relative"
      mx="auto"
      color="#c6b4d6"
      borderRadius="5px"
    >
      <Breadcrumb
        mb={2}
        borderRadius="5px"
        spacing="8px"
        bg="#210d31"
        p={3}
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Main</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/movies/${postData.title}/${postData.id}`}>
            {postData.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box
        maxW="8xl"
        minH="100vh"
        mx="auto"
        w="100%"
        bg="#210d31"
        borderRadius="5px"
        p={2}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 3 }}
          spacing={7}
          mt={3}
          mb={3}
        >
          <Box mx="auto" color="#fff">
            <Box w="100%">
              <Link
                to={`/trailer/${postData.trailerLink.substring(
                  postData.trailerLink.length - 11
                )}`}
              >
                <Box
                  boxShadow="0px 3px 3px #160b25"
                  bg="#d72316"
                  padding="01rem 5rem"
                  mx="auto"
                  borderRadius="5px"
                  cursor="pointer"
                  transition="0.3s ease-in-out"
                  _hover={{ bg: "#e80036" }}
                >
                  <Box
                    fontSize="40px"
                    display="flex"
                    alignContent="center"
                    justifyContent="center"
                  >
                    <MdSlowMotionVideo color="yellow" />
                  </Box>

                  <Text textAlign="center" fontWeight="bold">
                    Watch trailer
                  </Text>
                </Box>
              </Link>

              <a href={postData.imdbTrailerLink}>
                <Box
                  bg="#ffffff1f"
                  boxShadow="0px 3px 3px #160b25"
                  padding="1rem 4rem"
                  mx="auto"
                  borderRadius="5px"
                  cursor="pointer"
                  transition="0.4s ease-in-out"
                  _hover={{ bg: "#ffffff1f" }}
                  mt={5}
                >
                  <Box
                    fontSize="40px"
                    display="flex"
                    alignContent="center"
                    justifyContent="center"
                  >
                    <FaYoutube color="white" />
                  </Box>

                  <Text textAlign="center" fontWeight="bold" fontSize="15px">
                    Watch trailer on IMDb
                  </Text>
                </Box>
              </a>
              <Box>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                  <Link href={`/${postData.title}/${postData.id}/reviews`} textDecoration="none">
                    <Flex
                      textDecor="none"
                      background="linear-gradient(to left, #f5dec7, #deb992)"
                      color="#482e14"
                      p="0.8rem 2rem"
                      mx="auto"
                      textAlign="center"
                      align="center"
                      borderRadius="5px"
                      cursor="pointer"
                      fontWeight="bold"
                      transition="0.3s ease-in-out"
                      _hover={{ bg: "#b1a7bw" }}
                      mt={5}
                      pos="relative"
                    >
                      <Text mr="10px">Movie Reviews</Text>
                    </Flex>
                  </Link>
                  <Flex
                    fontWeight="bold"
                    background="linear-gradient(to left, #f5dec7, #deb992)"
                    color="#482e14"
                    p="0.8rem 2rem"
                    mx="auto"
                    align="center"
                    borderRadius="5px"
                    cursor="pointer"
                    transition="0.3s ease-in-out"
                    _hover={{ bg: "#b1a7bw" }}
                    mt={5}
                  >
                    <Text mr="10px">Add to favorites</Text>
                    <FaHeart size="23px" />
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              borderWidth="1px"
              borderRadius="5px"
              p={4}
              borderColor="#c6b4d6"
            >
              <Text
                textAlign="center"
                textTransform="capitalize"
                fontWeight="bold"
                mb="10px"
              >
                {postData.title}
              </Text>
              <Divider borderBottom="2px solid #c6b4d6" />
              <Table variant="simple">
                <Thead>
                  <TableRow label="Type" value={postData.type} />
                  <TableRow label="Language" value={postData.language} />
                  <TableRow label="Release Date" value={postData.releaseDate} />
                  <TableRow label="Year" value={postData.year} />
                  <TableRow label="Genres" value={postData.genres.join(", ")} />
                  <TableRow label="Duration" value={postData.duration} />
                  <TableRow
                    label="Rating"
                    value={`${postData.rating} out of 10`}
                  />
                  <TableRow label="Country" value={postData.country} />
                  <TableRow label="Seasons" value={postData.season} />
                </Thead>
              </Table>
            </Box>
          </Box>
          <Box>
            <Link href={`/movies/${postData.title}/${postData.id}`}>
              <Stack
                position="relative"
                mx="auto"
                pl={{ base: 0, sm: 0, md: 10, lg: 100 }}
                cursor="pointer"
              >
                <Image
                  border="3px solid #ffffff17"
                  borderRadius="5px"
                  mx="auto"
                  pl={0}
                  objectFit="cover"
                  w={{ base: "100%", sm: "450px" }}
                  h={{ base: "100%", sm: "450px" }}
                  src={postData.poster}
                  alt={postData.title}
                />
              </Stack>
            </Link>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2 }} spacing={5}>
          <Box w="100%" maxW="4xl" mx="auto" minH="20vh">
            <Box
              border="1px solid #c6b4d6"
              borderRadius="5px"
              maxW="4xl"
              mx="auto"
              minH="20vh"
              mb="10px"
            >
              {postData.actors?.length || postData.directedby?.length ? (
                <Box>
                  <Box>
                    <Text
                      textAlign="center"
                      mb="10px"
                      mt="10px"
                      fontWeight="bold"
                    >
                      Heroes
                    </Text>
                    <Divider borderBottom="2px solid #c6b4d6" />
                    <SimpleGrid
                      mb="10px"
                      mt="10px"
                      mx="auto"
                      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
                      spacing=""
                    >
                      {postData.actors.map((actor, index) => (
                        <Actors
                          key={index}
                          name={actor}
                          role="Actor"
                          width="50px"
                          height="50px"
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                  <Box borderTop="1px solid #c6b4d6">
                    <Text
                      textAlign="center"
                      fontWeight="bold"
                      mb="10px"
                      mt="10px"
                    >
                      Directors
                    </Text>
                    <Divider borderBottom="2px solid #c6b4d6" />
                    <SimpleGrid
                      mb="10px"
                      mt="10px"
                      mx="auto"
                      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
                      spacing={50}
                    >
                      {postData.directedby.map((director, i) => (
                        <Actors
                          key={i}
                          name={director}
                          role="Director"
                          width="50px"
                          height="50px"
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              ) : (
                "null"
              )}
            </Box>
          </Box>
          <Box w="100%" maxW="4xl" mx="auto" minH="20vh">
            <Box border="1px solid #c6b4d6" mb="20px" borderRadius="5px">
              <Text textAlign="center" fontWeight="bold" mb="10px" mt="10px">
                The Story
              </Text>
              <Divider borderBottom="2px solid #c6b4d6" />
              <Text textAlign="center" p={10}>
                {postData.description}
              </Text>
            </Box>
          </Box>
        </SimpleGrid>

        <Box
          border="1px solid #c6b4d6"
          mb={5}
          mx="auto"
          borderRadius="5px"
          mt="10px"
        >
          <Box mx="auto">
            <SuggestMovies postData={postData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
