import {
  Button,
  Flex,
  Menu,
  MenuButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MoviesMenu = () => {
  const history = useNavigate();
  return (
    <>
      <Flex
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        align="center"
      >
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="transparent"
            fontSize="clamp(0.8rem, 1vw , 1rem)"
            onClick={() => history("/")}
          >
            OVERVIEW
          </MenuButton>
        </Menu>
      </Flex>
      <Flex
        alignItems="center"
        fontWeight="600"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="transparent"
              leftIcon={<BsChevronDown />}
              fontSize="clamp(0.7rem, 1vw , 1rem)"
            >
              MOVIES
            </Button>
          </PopoverTrigger>
          <PopoverContent
            color="#fff"
            bg="#5b3a84"
            border="none"
            outline="none"
          >
            <PopoverArrow bg="#5b3a84" border="none" outline="none" />
            {/* <PopoverCloseButton /> */}
            <PopoverBody p={4}>
              <Text mb="10px" cursor="pointer">
                Animation Movies
              </Text>
              <Text cursor="pointer">Asian Movies</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="transparent"
              leftIcon={<BsChevronDown />}
              fontSize="clamp(0.7rem, 1vw , 1rem)"
            >
              SERIES
            </Button>
          </PopoverTrigger>
          <PopoverContent
            color="#fff"
            bg="#5b3a84"
            border="none"
            outline="none"
          >
            <PopoverArrow bg="#5b3a84" border="none" outline="none" />
            {/* <PopoverCloseButton /> */}
            <PopoverBody p={4}>
              <Text mb="10px" cursor="pointer">
                Foreign Series
              </Text>
              <Text cursor="pointer">Anime Series</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
};

export default MoviesMenu;
