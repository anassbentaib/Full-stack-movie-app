import { Box, Text } from "@chakra-ui/react";
const EmptyState = ({ title, subtitle, color }) => {
  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Box textAlign="center">
        <Text fontSize="20px" fontWeight="bold" color={color} mb="30px">
          {title}
        </Text>
        <Text fontWeight="light" mt="6px" color="gray.500">
          {subtitle}
        </Text>
      </Box>
    </div>
  );
};

export default EmptyState;
