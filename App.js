import React,{useEffect} from "react";


import { AuthProvider } from "./AuthContext";
import Navigation from "./Navigation";
import AppContent from "./AppContent";
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
