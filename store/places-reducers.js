const initialState = {
  places: [],
};

import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.imageUrl,
        action.placeData.address,
        action.placeData.latitude,
        action.placeData.longitude
      );

      return {
        ...state,
        places: state.places.concat(newPlace),
      };

    case SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    default:
      return state;
  }
};
