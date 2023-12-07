import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Actors = ({ name, role, width, height }) => {
  return (
    <Flex>
      <Box p={4}>
        <Box
          mt="10px"
          mx="auto"
          w="100%"
          display="flex"
          justify="space-between"
          alignItems="center"
        >
          <Avatar
            mr="12px"
            name={name?.charAt(0)}
            src="https://bit.ly/broken-link"
            w={width}
            h={height}
          />

          <Box>
            <Text fontWeight="bold" fontSize="14px" color="#fff">
              {name}
            </Text>
            <Text fontSize="14px" color="#ccc">
              {role}
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Actors;
