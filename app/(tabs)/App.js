import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // use native stack
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Navigation/Container>
      <Stack.Navigator>
        <Stack.Screen name="Metals" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
   // </NavigationContainer>
  );
}
