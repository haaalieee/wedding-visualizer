/* eslint-disable react/prop-types */
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Center, Grid, IconButton, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { subscribe } from "valtio";
import ImagePlaceholder from "../../assets/placeholder/img-placeholder.png";
import { sceneActions, sceneStateStore } from "../../store/sceneData";

export function ItemCard({ text, onAdd, onRemove, objectType }) {
  const [hover, set] = useState(false);
  const [totalObjType, setTotalObjType] = useState(0)

  useEffect(() => subscribe(sceneStateStore.sceneObjects, () => {
    setTotalObjType(sceneActions.getObjectTypeTotal(objectType))
  }), [])

  return (
    <>
      <Box
        onPointerEnter={() => set(true)}
        onPointerLeave={() => set(false)}
        maxW="sm"
      >
        <Box maxW="sm" bg="#f5f4f4" color="white" px={4} py={2}>
          <Center>
            <Image src={ImagePlaceholder} alt="" />
          </Center>
          {hover ? (
            <Box bg="#f5f4f4" maxW="sm">
              <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                <IconButton
                  colorScheme="teal"
                  aria-label="Remove to scene"
                  size="xs"
                  icon={<MinusIcon />}
                  onClick={onRemove}
                />
                <Center>
                  <Text color="black" fontSize="sm">
                    {totalObjType}
                  </Text>
                </Center>
                <IconButton
                  colorScheme="teal"
                  aria-label="Add to scene"
                  size="xs"
                  icon={<AddIcon />}
                  onClick={onAdd}
                />
              </Grid>
            </Box>
          ) : (
            <Text fontSize="md" color="black" textAlign="center">
              {text}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
}
