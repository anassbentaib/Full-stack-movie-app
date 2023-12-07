import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { useUser } from "../../../action/user";

const AuthButtons = () => {
  const { user, handleRedirect, Logout } = useUser();
  return (
    <>
      <Flex
        alignItems="center"
        fontWeight="600"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        {user ? (
          <>
            {user?.roles && user?.roles?.includes("ADMIN") && (
              <Link href="/admin-dahboard" textDecorationStyle="none">
                <Text
                  mr={1}
                  textDecoration="none"
                  cursor="pointer"
                  padding="0.3rem 2.2rem"
                  borderRadius="20"
                  fontSize="clamp(0.7rem, 0.9vw , 0.9rem)"
                >
                  Manage
                </Text>
              </Link>
            )}
            <Text
              // onClick={() => router(`/${user?.username}/${user.id}`)}
              mr={1}
              cursor="pointer"
              border="1px solid #ccc"
              padding="0.3rem 2.2rem"
              borderRadius="20"
              fontSize="clamp(0.7rem, 0.9vw , 0.9rem)"
            >
              {user?.username}
            </Text>
            <Box borderLeft="2px solid #000" />
            <Text
              onClick={Logout}
              cursor="pointer"
              bg="#6f4d98"
              fontSize="clamp(0.7rem, 0.9vw , 0.9rem)"
              padding="0.3rem 2.2rem"
              borderRadius="20"
            >
              Logout
            </Text>
          </>
        ) : (
          <>
            <Text
              onClick={handleRedirect}
              mr={1}
              cursor="pointer"
              border="1px solid #ccc"
              padding="0.3rem 2.2rem"
              borderRadius="20"
              fontSize="clamp(0.7rem, 0.9vw , 0.9rem)"
            >
              Sign up
            </Text>
            <Box borderLeft="2px solid #000" />
            <Text
              onClick={handleRedirect}
              cursor="pointer"
              bg="#6f4d98"
              fontSize="clamp(0.7rem, 0.9vw , 0.9rem)"
              padding="0.3rem 2.2rem"
              borderRadius="20"
            >
              Sign In
            </Text>
          </>
        )}
      </Flex>
    </>
  );
};

export default AuthButtons;
