import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { AuthBackground, logo } from "../../assets/";
import { signIn, signUp } from "../../api";
const initialData = { username: "", email: "", password: "" };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRedirect = () => {
    window.location.assign("/");
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
  };
  const resetForm = () => {
    setFormData(initialData);
  };

  const handleLogin = async () => {
    try {
      const response = await signIn(formData);
      const user = response.data;
      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify({ user }));

      handleRedirect();
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    try {
      await signUp(formData);
      toast.success("Registred.");
      switchMode();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignup) {
        handleLogin();
      } else {
        handleSignup();
        resetForm();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mx="auto">
      <Box
        maxW="100%"
        w="100%"
        mx="auto"
        minH="100vh"
        pos="relative"
        bg="linear-gradient(to bottom, #3f255f, #170231)"
      >
        <Box
          w="100%"
          bg="linear-gradient(to bottom, #3f255f, #170231)"
          as="section"
          maxW="100%"
          minHeight="100vh"
          mx="auto"
        >
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
            align="center"
            mx="auto"
            minH="100vh"
          >
            <Image
              src={AuthBackground}
              w="100%"
              minH="100px"
              h="100vh"
              bgPos="center"
              objectFit="cover"
            />
            <Box mx="auto" w="100%" minH="100vh" p={35}>
              <Image
                src={logo}
                h="100px"
                mx="auto"
                onClick={handleRedirect}
                cursor="pointer"
              />
              <Heading
                fontSize="clamp(0.9rem, 1.5rem,1.5rem)"
                color="#fff"
                mb="20px"
              >
                {!isSignup ? "Create an account" : "Login"}
              </Heading>
              <Stack maxW="500px">
                <form onSubmit={handleSubmit}>
                  {!isSignup && (
                    <>
                      <FormControl mb="20px">
                        <Input
                          type="text"
                          border="1px solid #fff"
                          _placeholder={{ color: "#fff" }}
                          required
                          focusBorderColor="#ccc"
                          color="#fff"
                          value={formData.username}
                          onChange={handleChange}
                          name="username"
                          placeholder="username"
                          disabled={isLoading}
                        />
                      </FormControl>
                    </>
                  )}
                  <FormControl mb="20px">
                    <Input
                      focusBorderColor="#ccc"
                      type="email"
                      placeholder="Email"
                      border="1px solid #fff"
                      color="#fff"
                      value={formData.email}
                      _placeholder={{ color: "#fff" }}
                      onChange={handleChange}
                      name="email"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormControl mb="20px">
                    <Input
                      focusBorderColor="#ccc"
                      type="password"
                      placeholder="Password"
                      _placeholder={{ color: "#fff" }}
                      border="1px solid #fff"
                      color="#fff"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // mr="auto"
                  >
                    <Button
                      disabled={isLoading}
                      p="1rem 7rem"
                      type="submit"
                      bg="#6f4d98"
                      _hover={{ bg: "#6f4d98" }}
                      color="#fff"
                    >
                      {!isSignup ? "Sign Up" : "Login"}
                    </Button>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr="auto"
                    mt="20px"
                  >
                    <Text fontWeight="bold" onClick={switchMode} color="#fff">
                      {isSignup ? (
                        <>
                          Don’t you have an account?
                          <span style={{ color: "#6f4d98", cursor: "pointer" }}>
                            &nbsp;Sign up
                          </span>
                        </>
                      ) : (
                        <>
                          Already have an account?
                          <span style={{ color: "#6f4d98", cursor: "pointer" }}>
                            &nbsp;Login
                          </span>
                        </>
                      )}
                    </Text>
                  </Box>
                </form>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
