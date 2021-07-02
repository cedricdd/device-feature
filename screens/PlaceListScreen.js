import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/places-actions";

const PlaceListScreen = (props) => {
  const { navigation } = props;
  const places = useSelector((state) => state.places.places);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const renderPlaceList = (itemData) => {
    return (
      <PlaceItem
        item={itemData.item}
        onSelect={() => {
          navigation.navigate("PlaceDetail", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPlaceList}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceListScreen;
