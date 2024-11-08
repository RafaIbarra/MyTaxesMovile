import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, TextInput, ScrollView, PermissionsAndroid, Alert,Platform  } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
// import RNFS from 'react-native-fs';
// import * as FileSystem from 'expo-file-system';

import * as FileSystem from 'expo-file-system';
import * as RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library'; // Para Expo SDK 42+


function DetalleXml({ navigation }) {
  const { estadocomponente } = useContext(AuthContext);
  const [nombrecdc, setNombrecdc] = useState('');

  // Solicitar permisos al montar el componente
  
  const requestStoragePermission = async () => {
    if (Platform.Version >= 33) {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        
        return Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permiso de Almacenamiento",
            message: "La aplicación necesita acceso al almacenamiento para leer archivos XML",
            buttonNeutral: "Preguntarme Después",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  };
  const  checkReadPermission = async () => {
        try {
          const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          if (granted) {
            console.log("Permiso de lectura concedido");
          } else {
            console.log("Permiso de lectura no concedido");
          }
        } catch (err) {
          console.warn(err);
        }
      }

  const handleOpenUrl = () => {
    const url = estadocomponente.datourl;
    const nombrearc = estadocomponente.datositem.cdc + '.xml';
    setNombrecdc(nombrearc);
    Linking.openURL(url).catch((err) => console.error("No se pudo abrir la URL:", err));
  };

 
  

  const buscarArchivo = async () => {
    const hasPermission = await requestStoragePermission();
    console.log("Tiene permisos:", hasPermission);
    
    if (!hasPermission) {
      Alert.alert('Permiso Denegado', 'La aplicación necesita permisos para acceder al archivo');
      return;
    }

    const nombrearc = estadocomponente.datositem.cdc + '.xml';
    const filePath = `${RNFS.ExternalStorageDirectoryPath}/Download/${nombrearc}`;

    try {
      // Vamos a hacer varias verificaciones
      console.log("Intentando acceder al archivo en:", filePath);
      
      // Verificar con RNFS
      const existsRNFS = await RNFS.exists(filePath);
      console.log("Existe según RNFS:", existsRNFS);
      
      // Verificar con FileSystem de Expo
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      console.log("Información del archivo según FileSystem:", fileInfo);

      // Listar archivos en el directorio Download
      const files = await RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Download`);
      data_files=files.map(file => file.name)
      console.log("Archivos en el directorio Download:",data_files)

      if (existsRNFS) {
        try {
          // Intentar leer el archivo para ver si tenemos acceso real
          const fileContent = await RNFS.readFile(filePath, 'utf8');
          console.log("Primeros 100 caracteres del archivo:", fileContent.substring(0, 100));
          
          const formData = new FormData();
          formData.append('file', {
            uri: `file://${filePath}`,
            type: 'application/xml',
            name: nombrearc,
          });

          console.log("FormData creado, intentando enviar...");

          const response = await fetch('https://tax.rafaelibarra.xyz/api/LecturaArchivoXml/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
            },
            body: formData,
          });

          const jsonResponse = await response.json();
          Alert.alert("Respuesta del servidor:", jsonResponse);
          
        } catch (error) {
          console.error("Error al procesar el archivo:", error);
          Alert.alert('Error al procesar archivo', error.message);
        }
      } else {
        console.log("Archivo no encontrado en:", filePath);
        Alert.alert('Archivo no encontrado');
      }
    } catch (error) {
      console.error("Error en la verificación del archivo:", error);
      Alert.alert('Error', error.message);
    }
};
  return (
    <ScrollView style={{ marginLeft: 20, marginRight: 5, marginTop: 5 }}>
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
        <Text style={styles.value}>{Number(estadocomponente.datositem.totaloperacion).toLocaleString('es-ES')}</Text>
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
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: 'rgba(44,148,228,0.7)',
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'column',
    marginBottom: 10,
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
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default DetalleXml;
