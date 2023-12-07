import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PuffLoader } from "react-spinners";

const DashboardPage = () => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const movieData = JSON.parse(localStorage.getItem("movies"));
    setPostData(movieData?.message || []);
  }, []);
  return (
    <Box
      pt={0}
      w="100%"
      maxW="8xl"
      mx="auto"
      pos="relative"
      bg="transparent"
      minH="100vh"
    >
      <Box
        w="100%"
        mx="auto"
        pos="absolute"
        bg="transparent"
        minH="100vh"
        maxW="8xl"
      >
        {postData?.length ? (
          <SimpleGrid
            mx="auto"
            templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
            spacing={1}
          >
            {postData?.map((post, i) => (
              <PostCard key={i} postData={post} height="350px" width="100%" />
            ))}
          </SimpleGrid>
        ) : (
          <div className="h-[70vh] flex flex-col items-center justify-center">
            <Text color="#fff" fontSize="clamp(0.9rem, 1.3rem, 1.5rem)">
              No Movies Found.
            </Text>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
