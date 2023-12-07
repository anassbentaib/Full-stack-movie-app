import {
  Box,
  Button,
  Flex,
  Divider,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import DataTableComponent from "./DataTable";
import { getAllMovies } from "../../api";
import { useUser } from "../../action/user";
import EmptyState from "../../ui/EmptyState";
const AdminDashboard = () => {
  const router = useNavigate();
  const { user } = useUser();
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies"))
  );
  const [loading, setLoading] = useState(false);

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      const response = await getAllMovies();
      const message = response.data;
      localStorage.setItem("movies", JSON.stringify(response.data.reverse()));

      setMovies(response.data.reverse());
    } catch (error) {
      console.log("[GET_MOVIES_ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  if (!user?.roles || !user.roles.includes("ADMIN")) {
    return (
      <EmptyState
        color="#fff"
        title="Unauthorized"
        subtitle="You don't have access to this page"
      />
    );
  }
  return (
    <Box color="#c6b4d6">
      <Box w="100%" maxW="7xl" minH="100vh" pos="relative" mx="auto" py="30px">
        <Box w="100%" maxW="7xl" minH="100vh" mx="auto">
          <Flex mb="5px">
            <Box>
              <Heading fontSize="25px" mb="10px" fontWeight="bold" color="#fff">
                {`Movies (${movies?.length || 0})`}
              </Heading>
              <Text color="#ccc">Manage movies for your website</Text>
            </Box>
            <Spacer />
            <Button
              color="#fff"
              bg="#6f4d98"
              _hover={{ bg: "#6f4d98" }}
              onClick={() => router(`/admin-dashboard/new`)}
              leftIcon={<BsPlus height="16" width="16" />}
            >
              Add New
            </Button>
          </Flex>
          <Divider borderBottom="2px solid #c6b4d6" mb="40px" />
          <DataTableComponent movies={movies} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
