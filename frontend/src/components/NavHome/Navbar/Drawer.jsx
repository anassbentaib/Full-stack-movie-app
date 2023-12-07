import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Divider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
  DrawerCloseButton,
  DrawerHeader,
  Input,
  DrawerFooter,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { watching } from "../../../ui/Globale";
const DrawerMenu = ({ onClose, isOpen }) => {
  const history = useNavigate();
  const { onOpen } = useDisclosure();
  // const btnRef = React.useRef();
  const handleRedirect = () => {
    window.location.assign("/register");
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        {/* E0E0FF */}
        <DrawerOverlay />
        <DrawerContent bg="#1b0f29" color="#fff">
          <DrawerCloseButton mt="20px" />
          <DrawerHeader fontSize="16px" py={8} bg="#4d2f6f">
            Cinema browsing for everyone
          </DrawerHeader>

          <DrawerBody color="#E0E0FF">
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem borderTop="none" borderBottom="none">
                <h2>
                  <AccordionButton>
                    <Link to="/" onClick={() => onClose()}>
                      <Box
                        as="h3"
                        fontSize="16px"
                        fontWeight="bold"
                        flex="1"
                        textAlign="start"
                      >
                        Overview
                      </Box>
                    </Link>
                    {/* <AccordionIcon /> */}
                  </AccordionButton>
                </h2>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="start"
                      fontSize="16px"
                      fontWeight="bold"
                    >
                      Movies
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {watching.map((watch) => (
                    <Link href={`/${watch.label}`} key={watch.value}>
                      <Text
                        cursor="pointer"
                        mb="10px"
                        fontSize="15px"
                        onClick={() => onClose()}
                        borderBottom="1px solid #ccc"
                      >
                        {watch.label} movies
                      </Text>
                    </Link>
                  ))}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem borderTop="none" borderBottom="none">
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="start"
                      fontSize="16px"
                      fontWeight="bold"
                    >
                      SERIES
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {watching.map((watch) => (
                    <Link href={`/${watch.label}`} key={watch.value}>
                      <Text
                        cursor="pointer"
                        mb="10px"
                        fontSize="15px"
                        onClick={() => onClose()}
                        borderBottom="1px solid #ccc"
                      >
                        {watch.label} series
                      </Text>
                    </Link>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

          <DrawerFooter>
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
// <Drawer
//   placement="left"
//   onClose={onClose}
//   isOpen={isOpen}

//   >
//   <DrawerOverlay />
//   <DrawerContent bg="#1c1c1c" color="#fff">
//     <DrawerBody border="none" outline="none">
//       <Text fontSize="17px" mb="3px" mt="25px" onClick={() => history("/")}>
//         OVERVIEW
//       </Text>
//       <Divider />
//       <Accordion defaultIndex={[0]} allowMultiple>
//         <AccordionItem>
//           <h2>
//             <AccordionButton>
//               <Box as="span" flex="1" textAlign="start">
//                 MOVIES
//               </Box>
//               <AccordionIcon />
//             </AccordionButton>
//           </h2>
//           <AccordionPanel pb={4}>
//             <Text cursor="pointer" mb="10px" borderBottom="1px solid #ccc">
//               Animation Movies
//             </Text>

//             <Text cursor="pointer" mb="10px" borderBottom="1px solid #ccc">
//               Turkish Movies
//             </Text>
//           </AccordionPanel>
//         </AccordionItem>

//         <AccordionItem>
//           <h2>
//             <AccordionButton>
//               <Box as="span" flex="1" textAlign="start">
//                 SERIES
//               </Box>
//               <AccordionIcon />
//             </AccordionButton>
//           </h2>
//           <AccordionPanel pb={4}>
//             <Text cursor="pointer" mb="10px" borderBottom="1px solid #ccc">
//               Korean Series
//             </Text>
//             <Text cursor="pointer" mb="10px" borderBottom="1px solid #ccc">
//               Turkish Series
//             </Text>
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     </DrawerBody>
//   </DrawerContent>
// </Drawer>

export default DrawerMenu;
