import React, { useContext,useState } from 'react';
import {  View,Text,StyleSheet,Linking,TouchableOpacity,TextInput,ScrollView   } from "react-native";
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';

import RNFS from 'react-native-fs'; // Importar react-native-fs
import { PermissionsAndroid, Alert } from 'react-native';


function Detalles({ navigation }){
     const { estadocomponente } = useContext(AuthContext);
     const [nombrecdc,setNombrecdc]=useState('')

     const handleOpenUrl = () => {
        const url = estadocomponente.datourl;
        nombrearc=estadocomponente.datositem.cdc+'.xml'
        setNombrecdc(nombrearc)
        Linking.openURL(url).catch((err) => console.error("No se pudo abrir la URL:", err));
        
      };
      const registrar_egreso=()=>{
        console.log('hola')

      }
      const requestPermissions = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Permiso de almacenamiento",
              message: "Necesitamos acceso al almacenamiento para buscar el archivo",
              buttonNeutral: "Preguntar después",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceptar",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permiso otorgado para acceder a los archivos");
          } else {
            console.log("Permiso denegado");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      const buscarArchivo = async () => {
        try {
          // Solicitar permisos antes de acceder
          await requestPermissions();
      
          // Ruta de la carpeta de descargas en el almacenamiento externo de Android
          const downloadDirectory = RNFS.ExternalStorageDirectoryPath + '/Download/';
          // const filePath = `${downloadDirectory}01800319702001005008254822024103013609116639.xml`;
          const filePath = `${downloadDirectory}${nombrecdc}`;
      
          // Verifica si el archivo existe
          const fileExists = await RNFS.exists(filePath);
      
          if (fileExists) {
            console.log("Archivo encontrado", filePath);
            Alert.alert('Archivo encontrado', `Ruta: ${filePath}`);
          } else {
            console.log("Archivo no encontrado");
            Alert.alert('Archivo no encontrado');
          }
        } catch (error) {
          console.error("Error al buscar archivo:", error);
          Alert.alert('Error al buscar archivo', error.message);
        }
      };

      // const buscarArchivoEnDescargas = async () => {
      //   try {
      //     // Solicita permisos para acceder al almacenamiento externo
      //     const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          
      //     if (!permissions.granted) {
      //       console.log('Permiso denegado');
      //       return;
      //     }
      
      //     // Accede al URI de la carpeta de descargas elegida por el usuario
      //     const directoryUri = permissions.directoryUri;
      
      //     // Lista los archivos en la carpeta de descargas
      //     const archivos = await FileSystem.StorageAccessFramework.readDirectoryAsync(directoryUri);
      //     console.log('Archivos en la carpeta seleccionada:', archivos);
      
      //     // Busca el archivo específico
      //     const fileName = '01800319702001005008254822024103013609116639.xml';
      //     const archivoEncontrado = archivos.find((archivoUri) => archivoUri.endsWith(fileName));
      
      //     if (archivoEncontrado) {
      //       Alert.alert('Archivo encontrado', `Ruta: ${archivoEncontrado}`);
      //     } else {
      //       Alert.alert('Archivo no encontrado en la carpeta seleccionada');
      //     }
      //   } catch (error) {
      //     console.error('Error buscando archivos:', error);
      //     Alert.alert('Error buscando archivos', error.message);
      //   }
      // };
    
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
                            onPress={buscarArchivo}
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