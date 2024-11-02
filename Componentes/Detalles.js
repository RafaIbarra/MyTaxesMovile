import React, { useContext } from 'react';
import {  View,Text,StyleSheet } from "react-native";


import { AuthContext } from '../AuthContext';

function Detalles({ navigation }){
    const { estadocomponente } = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>CDC:</Text>
        <Text style={styles.value}>{estadocomponente.datositem.cdc}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha Emisión:</Text>
        <Text style={styles.value}>{estadocomponente.datositem.fechaemision}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>RUC:</Text>
        <Text style={styles.value}>{estadocomponente.datositem.rucreceptor}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Operación:</Text>
        <Text style={styles.value}> {Number(estadocomponente.datositem.totaloperacion).toLocaleString('es-ES')}</Text>
       
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Iva:</Text>
        <Text style={styles.value}>{Number(estadocomponente.datositem.totaliva).toLocaleString('es-ES')}</Text>
        
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cantidad Items:</Text>
        <Text style={styles.value}>{estadocomponente.datositem.cantidaditems}</Text>
      </View>
    </View>
    )


}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    row: {
      flexDirection: 'column', // Coloca label y valor en una columna
      marginBottom: 10, // Espacio entre cada fila
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 8,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333',
    },
    value: {
      fontSize: 16,
      color: '#555',
    },
  });
  
export default Detalles