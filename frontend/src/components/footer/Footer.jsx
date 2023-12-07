import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <Box
      bg="#3f255f"
      display="flex"
      alignItems="center"
      w="100%"
      fontSize="clamp(1rem, 1.1vw , 1.1rem)"
      textAlign="center"
      minH="15vh"
      color="#fff"
      mx="auto"
    >
      <Box bg="#3f255f" mx="auto" display="flex" alignItems="center">
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          spacing={3}
          align="center"
          mx="auto"
        >
          {/* <Image src={logo} h="90px" /> */}
          <Text>
            Copyright &copy; 2023 <em color="#1c1c1c">Movies</em>. All Rights
            Reserved.
          </Text>
          <Text>Designed by Anass Bentaib</Text>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Footer;
