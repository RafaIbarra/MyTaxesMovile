import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [estadocomponente,setEstadocomponente]=useState({
        
        datositem:[],
    
        
    
      })

    const actualizarEstadocomponente = (campo, valor) => {
        setEstadocomponente(prevState => ({
          ...prevState,
          [campo]: valor,
        }));
      };
    
    return (
        <AuthContext.Provider value={{ estadocomponente,actualizarEstadocomponente,}}>
          {children}
        </AuthContext.Provider>
      );

}
