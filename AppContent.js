import React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./Navigation";
import Detalles from "./Componentes/Detalles";
import QRScanner from "./Componentes/QRScanner";

export default function AppContent() {
  return (
    <View style={styles.container}>
      <Detalles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red", // Solo para que sea visible
    alignItems: "center",
    justifyContent: "center",
  },
});
