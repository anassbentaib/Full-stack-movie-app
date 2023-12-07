import { Box, Link, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { logo } from "../../../assets";
import {
  FaFacebookF,
  FaLinkedin,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import Search from "../Search";
import { handleScroll } from "../../../ui/Globale";

const HeaderMobile = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  useEffect(() => {
    const scrollListener = () => {
      handleScroll(setIsSearchVisible);
    };
    handleScroll(setIsSearchVisible);
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <Box
      display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
      px={5}
      w="100%"
      maxW="100%"
      color="#fff"
      h="auto"
      pos="relative"
      background="linear-gradient(to bottom, #3f255f, #170231)"
    >
      <Box
        maxW="5xl"
        mx="auto"
        w="100%"
        background="linear-gradient(to bottom, #3f255f, #170231)"
      >
        <Box style={{ display: isSearchVisible ? "block" : "none" }}>
          <Link href="/">
            <Image src={logo} h="100px" mx="auto" />
          </Link>
        </Box>
        <Box style={{ display: isSearchVisible ? "block" : "none" }}>
          <Search />
        </Box>
        <Flex
          justifyContent="center"
          w="50%"
          justify="start"
          align="start"
          cursor="pointer"
          bg="#6f4d98"
          padding="0.5rem 1.5rem"
          borderRadius="20"
          mt="10px"
          mb="30px"
          fontSize="18px"
          // flex={1}
        >
          <FaFacebookF style={{ marginRight: "10px" }} />
          <FaLinkedin style={{ marginRight: "10px" }} />
          <FaTwitter style={{ marginRight: "10px" }} />
          <FaTelegramPlane style={{ marginRight: "10px" }} />
        </Flex>
        <Box mt="10px" />
      </Box>
    </Box>
  );
};

export default HeaderMobile;
