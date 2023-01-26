/* eslint-disable react/prop-types */
import { Box, HStack, Text, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import { roomStateStore } from "../../store/sceneData";
import { RoomCard } from "./RoomCard";

export function RoomOptions(props) {
  const options = ["warehouse", "vintage", "bricks"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "rooms",
    onChange: (e) => {
      roomStateStore.currentRoom = e;
    },
  });

  const group = getRootProps();

  return (
    <Box
      className={props.className}
    >
      <Text mb={4} textAlign={props.textAlign}>Room options</Text>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RoomCard
              textSize={props.textSize}
              key={value}
              {...radio}
            >
              {value}
            </RoomCard>
          );
        })}
      </HStack>
    </Box>
  );
}
