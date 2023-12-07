import React from "react";
import Navbar from "./Navbar/Navbar";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import bg from "../assets/bg.jpg";
import { SlArrowRight } from "react-icons/sl";

const Hero = () => {
  return (
    <Box w="100%" pos="relative" objectFit="cover" opacity="10" minH="100vh">
      <Box maxW="100%" mx="auto" minH="100vh" pos="relative" color="#fff">
        <Box
          bg={`linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`}
          maxW="100%"
          mx="auto"
          minHeight="100vh"
        >
          <Navbar />
          <Box
            p={30}
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            w="100%"
          >
            <Heading fontSize="40px" mt={20} fontWeight="bold">
              Unlimited movies, TV shows, and more
            </Heading>
            <Text fontSize="20px" mt={15}>
              Watch anywhere. Cancel anytime.
            </Text>
            <Text fontSize="20px" mt={15}>
              Ready to watch? Enter your email to create or restart your
              membership.
            </Text>
            <Flex align="center" justify="center" mt="30px">
              <Input
                color="#fff"
                bg="#000"
                opacity="0.6"
                border="2px solid #009e66"
                type="text"
                placeholder="Enter your email"
                borderRadius="5px"
                py={7}
                px={9}
                mr={5}
                w="400px"
                h="60px"
              />

              <Button
                fontWeight="bold"
                fontSize="20px"
                rightIcon={<SlArrowRight fontSize="11px" fontWeight="bold" />}
                p="0.8rem 4rem"
                borderRadius="5px"
                bg="red"
              >
                Get Started
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
