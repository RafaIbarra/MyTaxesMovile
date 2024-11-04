import React,{useEffect} from "react";


import { AuthProvider } from "./AuthContext";
import Navigation from "./Navigation";
import AppContent from "./AppContent";
import ScannerSimple from "./Componentes/ScannerSimple";
import Detalles from "./Componentes/Detalles";
import "react-native-gesture-handler";
export default function App() {
  
  // useEffect(() => {
  //   setNavigationBarColor('red', 'light')
    
  // }, []);
  
  return (
     <AuthProvider>
       <Navigation />
     </AuthProvider>
  );
}
