import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

const MapPreview = (props) => {
  const { coordinate } = props;

  return (
    <MapView
      style={{ ...styles.map, ...props.style }}
      initialRegion={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={coordinate} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
