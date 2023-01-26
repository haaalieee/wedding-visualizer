/* eslint-disable react/prop-types */
import { Box, Center, Image, useRadio } from "@chakra-ui/react";
import React from "react";
import { useAsync } from "react-use";
import roomPlaceholder from "../../assets/rooms/room-placeholder.jpg";

export function RoomCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const imgState = useAsync(async () => {
    const image = await import(`../../assets/rooms/${props.children}.jpg`);
    console.log(image);
    return image.default;
  });

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {imgState.loading ? (
          <Image src={roomPlaceholder} alt="" />
        ) : (
          <Image src={imgState.value} alt="" />
        )}
        <Center>
          <Box p={2} style={{ textTransform: "capitalize" }} fontSize={props.textSize}>
            {props.children}
          </Box>
        </Center>
      </Box>
    </Box>
  );
}
