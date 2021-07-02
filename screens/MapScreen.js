import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const [location, setLocation] = useState();
  const { navigation } = props;

  const selectLocationHandler = (event) => {
    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (location) {
    markerCoordinates = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  const saveLocationHandler = useCallback(() => {
    if (!location) {
      return;
    }

    navigation.navigate("NewPlace", {
      pickedLocation: location,
    });
  }, [location]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={saveLocationHandler}
        >
          <Text style={styles.touchText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [saveLocationHandler]);

  return (
    <MapView
      style={styles.container}
      region={{
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
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
  touchContainer: {
    marginHorizontal: 20,
  },
  touchText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;
