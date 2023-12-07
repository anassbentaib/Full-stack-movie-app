import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Box,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";
import DropDownMenu from "./DropDownMenu";

const DataTableComponent = ({ loading, movies }) => {
  return (
    <Box border="1px solid #c6b4d6" borderColor="#c6b4d6" borderRadius="5px">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            {loading ? (
              <div className="h-[70vh] flex flex-col items-center  justify-center">
                <PuffLoader size={70} color="red" />
              </div>
            ) : (
              <></>
            )}
          </TableCaption>
          <Thead>
            <Tr texttransform="lowercase">
              <Th color="#c6b4d6">Title</Th>
              <Th color="#c6b4d6">Release Date</Th>
              <Th color="#c6b4d6">Type</Th>
              <Th color="#c6b4d6">Seasons</Th>
              <Th color="#c6b4d6">Genres</Th>
              <Th color="#c6b4d6">duration</Th>
              <Th color="#c6b4d6">language</Th>
              <Th color="#c6b4d6">awards</Th>
              <Th color="#c6b4d6">year</Th>
              <Th color="#c6b4d6">rating</Th>
              <Th color="#c6b4d6">country</Th>
              <Th color="#c6b4d6">directed by</Th>

              <Th></Th>
            </Tr>
          </Thead>
          {movies?.length ? (
            <Tbody>
              {movies.map((movie, i) => (
                <Tr fontSize="14px" key={i}>
                  <Td>{movie.title}</Td>
                  <Td>{movie.releaseDate}</Td>
                  <Td>{movie.type}</Td>
                  <Td>{movie.season}</Td>
                  <Td>{movie.genres.join(", ")}</Td>

                  <Td>{movie.duration}</Td>
                  <Td>{movie.language}</Td>
                  <Td>{movie.awards}</Td>
                  <Td>{movie.year}</Td>
                  <Td>{movie.rating}</Td>
                  <Td>{movie.country}</Td>

                  <Td>{movie.directedby.join(", ")}</Td>

                  <Td>
                    <DropDownMenu movie={movie} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Text textAlign='center'mt={3} ml={6}>No data found.</Text>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTableComponent;
