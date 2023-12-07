import React from "react";
import { Box, Card, CardBody, Image, Text, Link } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
const PostCard = ({ postData, height, width }) => {
 
  return (
    <Card
      mx="auto"
      bg="transparent"
      position="relative"
      mt="10px"
      color="#fff"
      fontSize="15px"
      border="none"
      borderRadius="5px"
      boxShadow="none"
    >
      <CardBody position="relative" mx="auto" w="100%" margin={5} p={0}>
        <Link href={`/movies/${postData.title}/${postData.id}`}>
          <Image
            objectFit="cover"
            cursor="pointer"
            border="1px solid #ffffff17"
            src={postData?.poster}
            alt={postData?.title}
            h={height}
            borderRadius="10px"
            w={width}
          />
          <Box pos="absolute" top={2} right={2} color="#000">
            <AiFillStar fontSize="2.6rem" cursor="pointer" color="yellow" />
            <Text
              pos="absolute"
              top={3}
              cursor="pointer"
              right={3}
              fontSize="0.7rem"
              fontWeight="bold"
            >
              {postData.rating}
            </Text>
          </Box>
          <Box mx="auto" textAlign="center" w="100%" mt="5px">
            <Text fontWeight="bold" cursor="pointer">
              {postData?.title}&nbsp;({postData.year})
            </Text>
          </Box>
        </Link>
      </CardBody>
    </Card>
  );
};

export default PostCard;
