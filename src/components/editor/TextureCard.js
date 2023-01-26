/* eslint-disable react/prop-types */
import { Box, Center, Image, useRadio } from "@chakra-ui/react";
import React from "react";
import { useAsync } from "react-use";
import texturePlaceholder from "../../assets/textures/texture-placeholder.jpg";

export function TextureCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const imgState = useAsync(async () => {
    const image = await import(`../../assets/textures/${props.children}.png`);
    return image.default;
  });

  return (
    <Box as="label" maxWidth="44px">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        _checked={{
          bg: "#c5c5c5",
        }}
        p={1}
      >
        {imgState.loading ? (
          <Image src={texturePlaceholder} alt="" />
        ) : (
          <Image src={imgState.value} alt="" />
        )}
        <Center>
          <Box p={1} style={{ textTransform: "capitalize" }} fontSize={props.textSize} >
            {props.children}
          </Box>
        </Center>
      </Box>
    </Box>
  );
}
