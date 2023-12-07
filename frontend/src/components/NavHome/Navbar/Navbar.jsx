import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Flex,
  Link,
  Spacer,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import DrawerMenu from "./Drawer";
import MoviesMenu from "./MoviesMenu";
import AuthButtons from "./AuthButtons";
import Search from "../Search";
import { handleScroll } from "../../../ui/Globale";
import { logo } from "../../../assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const onToggel = () => {
    setOpen(!open);
  };

  return (
    <>
      <Flex
        w="100%"
        bg="#3f255f"
        color="#fff"
        h="80px"
        zIndex={100}
        pos="fixed"
        alignItems="center"
        px={{ base: "0", sm: "0", md: "0", lg: "45" }}
      >
        <Flex justifyContent="space-between" w="100%" align="center">
          <Button
            colorScheme="transparent"
            onClick={onOpen}
            display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
          >
            <Flex
              onClick={onToggel}
              align="center"
              cursor="pointer"
              bg="#1c1c1c"
              fontSize="1.6rem"
              padding="0.3rem 0.7rem"
              borderRadius="20"
            >
              {open ? <HiOutlineMenuAlt1 /> : <HiOutlineMenuAlt1 />}
            </Flex>
          </Button>
          <DrawerMenu isOpen={isOpen} onClose={onClose} />
          <MoviesMenu />
          <Spacer />
          <Box
            flex={{ base: "none", sm: "1", md: "", lg: 3 }}
            style={{ display: isSearchVisible ? "none" : "block" }}
          >
            <Search />
          </Box>

          <Box
            display={{ base: isSearchVisible ? "none" : "block", lg: "none" }}
            // display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
          >
            <Link href="/">
              <Image src={logo} h="50px" mx="auto" />
            </Link>
          </Box>
          {/* <Spacer /> */}
          <AuthButtons />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
