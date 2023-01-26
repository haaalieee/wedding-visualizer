/* eslint-disable react/prop-types */
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import ImagePlaceholder from "../../assets/placeholder/img-placeholder.png";

export function ItemCard({ text, onClick }) {
  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      maxW="sm"
      as="button"
      bg="#f5f4f4"
      color="white"
      px={4}
      py={2}
    >
      <Image src={ImagePlaceholder} alt="" />
      <Text fontSize="md" color="black">
        {text}
      </Text>
    </Box>
  );
}
