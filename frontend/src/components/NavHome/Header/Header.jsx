import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { FaFacebookF, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { logo } from "../../../assets";
import HeaderMobile from "./HeaderMobile";
import { Link } from "react-router-dom";
import Search from "../Search";
import { handleScroll } from "../../../ui/Globale";

  const Header = () => {
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
      <Box pt={80.1}>
        <Flex
          display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
          w="100%"
          bg="#210d31"
          color="#fff"
          h="70px"
          alignItems="center"
          px={90}
        >
          <Flex justifyContent="space-between" w="100%">
            <Flex alignItems="center" fontSize="15px" fontWeight="600" flex={5}>
              <Flex
                cursor="pointer"
                bg="#6f4d98"
                padding="0.5rem 1.5rem"
                borderRadius="60"
                mr="5px"
                fontSize="18px"
              >
                <FaFacebookF style={{ marginRight: "10px" }} />
                <FaTwitter style={{ marginRight: "10px" }} />
                <FaTelegramPlane style={{ marginRight: "10px" }} />
              </Flex>
              <Box
                flex={2}
                style={{ display: isSearchVisible ? "block" : "none" }}
              >
                <Search />
              </Box>
          </Flex>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Flex alignItems="center" cursor="pointer">
            <Link to="/">
              <Image src={logo} h="100px" />
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <HeaderMobile />
    </Box>
  );
};

export default Header;
