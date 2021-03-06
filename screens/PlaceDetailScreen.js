import React from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  const placeId = props.route.params.placeId;
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = {
    latitude: selectedPlace.lat,
    longitude: selectedPlace.lng,
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUrl }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview style={styles.mapPreview} coordinate={selectedLocation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
