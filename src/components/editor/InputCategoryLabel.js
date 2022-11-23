/* eslint-disable react/prop-types */
import { GridItem, Text } from "@chakra-ui/react";
import React from "react";

export default function InputCategoryLabel({catergoryLabel}) {
  return (
    <GridItem w="100%" colSpan={4}>
      <Text fontSize="xs" mt={2}>
        {catergoryLabel}
      </Text>
    </GridItem>
  );
}
