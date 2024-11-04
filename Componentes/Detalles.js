import React, { useContext } from 'react';
import {  View,Text,StyleSheet,Linking,TouchableOpacity,TextInput,ScrollView   } from "react-native";
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';

function Detalles({ navigation }){
     const { estadocomponente } = useContext(AuthContext);

     const handleOpenUrl = () => {
        const url = estadocomponente.datourl;
        Linking.openURL(url).catch((err) => console.error("No se pudo abrir la URL:", err));
      };
      const registrar_egreso=()=>{
        console.log('hola')

      }
    
    return(
        <ScrollView style={{marginLeft:20,marginRight:5,marginTop:5}}>
            <View style={styles.row}>
              <Text style={styles.label}>RUC EMPRESA:</Text>
              <TextInput style={styles.value}></TextInput>
            </View>
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
            <View style={styles.row}>
              <Text style={styles.label}>Url:</Text>
              <TouchableOpacity onPress={handleOpenUrl}>
                <Text style={[styles.value, styles.link]}>{estadocomponente.datourl}</Text>
              </TouchableOpacity>
            </View>
            <Button 
                            style={{marginTop:10,marginBottom:10,marginLeft:10,marginRight:10,
                              backgroundColor:'rgba(44,148,228,0.7)'
                            }} 
                            
                            icon={() => {
                              return <MaterialCommunityIcons name="content-save-check" size={30} color="white" />
                            }}
                            mode="elevated" 
                            textColor="white"
                            onPress={registrar_egreso}
                            >
                            REGISTRAR 
            </Button>
    </ScrollView>
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
    link: {
      color: 'blue', // Color azul para indicar que es un enlace
      textDecorationLine: 'underline' // Subrayado para resaltar que es un enlace
    },
  });
  
export default Detalles