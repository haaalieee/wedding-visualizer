import { useEffect } from "react";

/**
 * Custom hook to update object position
 * @param id - object id to be updated
 * @param localPosition - transformed position of the object
 * @param updateObjectPosition - store method to update object position
 *
 * @return void
 *
 * */
export const useUpdateObjectPosition = (
  id,
  localPosition,
  updateObjectPosition
) => {
  useEffect(() => {
    if (localPosition)
      updateObjectPosition(id, {
        x: localPosition[0],
        y: localPosition[1],
        z: localPosition[2],
      });
  }, [localPosition, updateObjectPosition]);
};

/**
 * Custom hook to update object rotation
 * @param id - object id to be updated
 * @param localRotation - transformed rotation of the object
 * @param updateObjecRotation - store method to update object rotation
 *
 * @return void
 *
 * */
 export const useUpdateObjectRotation = (
  id,
  localRotation,
  updateObjectRotation
) => {
  useEffect(() => {
    if (localRotation)
      updateObjectRotation(id, {
        x: localRotation[0],
        y: localRotation[1],
        z: localRotation[2],
      });
  }, [localRotation, updateObjectRotation]);
};

/**
 * Custom hook to update object scale
 * @param id - object id to be updated
 * @param localScale - transformed scale of the object
 * @param updateObjecScale - store method to update object scale
 *
 * @return void
 *
 * */
 export const useUpdateObjectScale = (
  id,
  localScale,
  updateObjectScale
) => {
  useEffect(() => {
    if (localScale)
      updateObjectScale(id, {
        x: localScale[0],
        y: localScale[1],
        z: localScale[2],
      });
  }, [localScale, updateObjectScale]);
};
