/* eslint-disable react/prop-types */
import {
  GridItem,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";
import React from "react";

export function InputEditor({ inputLabel, value }) {
  return (
    <GridItem w="100%">
      <HStack>
        <Text fontSize="xs">{inputLabel}</Text>
        <NumberInput size="xs" defaultValue={0} value={value}>
          <NumberInputField pr={4} />
          <NumberInputStepper width="13px">
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </GridItem>
  );
}
