import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detalles from "./Componentes/Detalles";
import QRScanner from "./Componentes/QRScanner";
import DetalleXml from "./Componentes/DetalleXml";

import ListadoFacturas from "./Componentes/ListadoFacturas";
import ResumenMes from "./Componentes/ResumenMes";
import CargaManual from "./Componentes/CargaManual";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OpcionesCargaTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Manual" 
        component={CargaManual} 
        
        options={{
          tabBarLabel: 'Manual',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-holding-medical" size={24} color="black" />
          ),
          
          headerShown: false,
          }}
        />
      <Tab.Screen name="QR" 
        component={QRScanner} 
        options={{
          tabBarLabel: 'QR',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="qr-code-scanner" size={24} color="black" />
          ),
          
          headerShown: false,
          }}
      />
    </Tab.Navigator>
  );
}

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Resumen" 
        component={ResumenMes}
        options={{
          tabBarLabel: 'Resumen',
          tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color="black" size={30} />
          ),
          
          
          }}
      />
      <Tab.Screen name="Listado" 
        component={ListadoFacturas} 
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="filetext1" size={24} color="black" />
          ),
          
          
          }}
        />
      <Tab.Screen 
        name="OpcionesCarga"
        component={React.Fragment}  // Usa un componente de marcador
        options={{
          tabBarLabel: 'Opciones de carga',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="addfile" size={24} color="black" />
          ),
          
          headerShown: false,
          }}
        listeners={{
          tabPress: e => {
            e.preventDefault(); // Evita que la pestaña active navegación de tab
            navigation.navigate('OpcionesCarga'); // Navega al stack de OpcionesCarga
          }
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}}/>
      <Stack.Screen name="OpcionesCarga" component={OpcionesCargaTabs} options={{title: 'Opciones de carga'}} />
      <Stack.Screen name="Detalles" component={Detalles} options={{title: 'Detalles'}} />
      <Stack.Screen name="DetalleXml" component={DetalleXml} options={{title: 'DetalleXml'}} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default Navigation;