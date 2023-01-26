/* eslint-disable react/prop-types */
import { Box, HStack, Text, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import { sceneActions } from "../../store/sceneData";
import { TextureCard } from "./TextureCard";

export function TextureOptions(props) {
  const options = ["default", "mahogany", "metal", "rattan"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "rooms",
    onChange: (e) => {
      sceneActions.setActiveTexture(e);
    },
  });

  const group = getRootProps();

  return (
    <Box
      style={{}}
    >
      <Text fontSize="xs" mt={8} mb={4} textAlign={props.textAlign}>Textures</Text>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <TextureCard
              textSize="11px"
              key={value}
              {...radio}
            >
              {value}
            </TextureCard>
          );
        })}
      </HStack>
    </Box>
  );
}
