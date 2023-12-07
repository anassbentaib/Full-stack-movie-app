import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { LuImagePlus } from "react-icons/lu";

const ImageUpload = () => {


  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = useQueryClient();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "diqc42ri"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcq0jzieu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      return response.json();
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  const { mutate } = useMutation(uploadImage, {
    onSuccess: () => {
      // Invalidate relevant queries or perform other actions on successful upload
      queryClient.invalidateQueries("images");
    },
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      mutate();
    }
  };

  return (
    <Box>
      <Text mb={4}>Upload an Image</Text>
      <InputGroup>
        <Input
          type="file"
          accept="image/*"
          display="none" // Hide the actual file input
          onChange={handleFileChange}
        />
        <InputRightElement width="5rem">
          <Button
            onClick={handleUploadClick}
            colorScheme="teal"
            variant="outline"
          >
            <LuImagePlus size={20} /> {/* Adjust the size as needed */}
          </Button>
        </InputRightElement>
        <Input
          placeholder="Choose a file..."
          readOnly
          pointerEvents="none"
          onClick={() => document.querySelector('input[type="file"]').click()}
        />
      </InputGroup>
      <Box mt={4}>
        <CloudinaryContext cloudName="dcq0jzieu">
          {selectedFile && (
            <Image publicId={selectedFile.name} width="300" crop="scale" />
          )}
        </CloudinaryContext>
      </Box>
    </Box>
  );
};

export default ImageUpload;
