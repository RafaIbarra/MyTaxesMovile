import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRScanner from "./Componentes/QRScanner";
import Detalles from "./Componentes/Detalles";

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator initialRouteName="Detalles">
      <HomeStack.Screen
        name="Detalles"
        component={Detalles}
      />
    <HomeStack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{ headerShown: false }}
    />
      
    </HomeStack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <HomeStackGroup />
    </NavigationContainer>
  );
}

export default Navigation;
