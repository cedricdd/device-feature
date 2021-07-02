import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const PlaceNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={Platform.OS === "android" ? "screen" : "float"}
        initialRouteName="Places"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Places"
          component={PlaceListScreen}
          options={({ navigation }) => ({
            title: "All Places",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Add Place"
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => {
                    navigation.navigate("NewPlace");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={({ route }) => ({
            title: route.params.placeTitle + " Details",
          })}
        />
        <Stack.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={() => ({
            title: "New Place",
          })}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={() => ({
            title: "Map",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlaceNavigator;
