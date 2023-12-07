import { Tr, Th, Td } from "@chakra-ui/react";

export const TableRow = ({ label, value }) => (
  <Tr>
    <Th fontSize="13px" p={3} borderColor="#c6b4d6" color="#c6b4d6">
      {label}
    </Th>
    <Td fontSize="sm" p={2} borderColor="#c6b4d6" color="#c6b4d6">
      {value}
    </Td>
  </Tr>
);
