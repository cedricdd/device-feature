import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";

import MapPreview from "../components/MapPreview";

const LocationPicker = (props) => {
  const [location, setLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { route } = props;
  const { onLocationPicked } = props;

  const pickedLocation = route.params?.pickedLocation;

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onLocationPicked(pickedLocation);
    }
  }, [pickedLocation, onLocationPicked]);

  const checkPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "Sorry, we need location permissions to make this work!",
        [{ text: "Ok" }]
      );

      return false;
    }

    return true;
  };

  const fetchLocation = async () => {
    const permission = await checkPermission();

    if (!permission) {
      return;
    }

    setIsFetching(true);

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      console.log(location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      props.onLocationPicked({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Could not fetch the location!", "Please try again later!", [
        { text: "Ok" },
      ]);
      console.log(error);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : location ? (
          <MapPreview coordinate={location} />
        ) : (
          <Text>No Location Chosen</Text>
        )}
      </View>
      <View style={styles.btnAction}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={fetchLocation}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={() => {
            props.navigation.navigate("Map");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAction: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
