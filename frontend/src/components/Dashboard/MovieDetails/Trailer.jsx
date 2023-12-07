import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Divider } from "@chakra-ui/react";

const Trailer = () => {
  let params = useParams();
  let key = params.ytTrailerId;

  return (
    <Box mb={100}>
      <Box w="100%" h="80vh" p={{ base: 1, sm: 1, md: 5, lg: 10 }}>
        <Box w="100%" h="80vh" minH="80vh">
          {key != null ? (
            <ReactPlayer
              controls="true"
              playing={true}
              url={`https://www.youtube.com/watch?v=${key}`}
              width="100%"
              height="100%"
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Trailer;
