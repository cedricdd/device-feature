import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";

import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LoactionPicker";

const NexPlaceScreen = (props) => {
  const { navigation } = props;
  const [titleValue, setTitleValue] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const onLocationPickedHandler = useCallback((locationSelected) => {
    setLocation(locationSelected);
  }, []);

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    console.log(location);
    dispatch(addPlace(titleValue, image, location));
    navigation.goBack();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={onLocationPickedHandler}
        />
        <Button
          title="Save Place"
          onPress={savePlaceHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 4,
  },
});

export default NexPlaceScreen;
