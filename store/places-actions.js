import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResults = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: dbResults.rows._array });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPlace = (title, imageUrl, location) => {
  return async (dispatch) => {
    const fileName = imageUrl.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUrl,
        to: newPath,
      });

      const address = "Temp Address " + Math.random().toFixed(5).toString();

      const dbResults = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );

      console.log(dbResults);

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResults.insertId,
          title,
          imageUrl: newPath,
          address,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
