import React, { useState, useEffect,useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert,ActivityIndicator,TouchableOpacity   } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { AuthContext } from '../AuthContext';
import { useNavigation } from "@react-navigation/native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
function QRScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isFetching, setIsFetching] = useState(false); 
  const {  actualizarEstadocomponente } = useContext(AuthContext);
  const { navigate } = useNavigation();
  useEffect(() => {
    if (permission && !permission.granted) {
      Alert.alert("Permiso denegado", "No se concedió permiso para acceder a la cámara.");
    }
  }, [permission]);

 

  const startScanning = () => {
    if (permission && permission.granted) {
      setScanning(true); // Iniciar el escaneo
      setScannedData(null)
    } else {
      requestPermission(); // Solicitar permiso si no está concedido
    }
  };

  const handleBarcodeScanned = async ({ data }) => {
    if (data && !isFetching) { // Verifica que no se esté procesando otra solicitud
      setIsFetching(true); // Marca que la solicitud está en progreso
      // console.log('LA DATA', data)
      try {
        
        const response = await fetch(`https://tax.rafaelibarra.xyz/api/scrapingselenium/`, {
          method: "POST", // Cambia a POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: data }), // Envía el objeto con la clave 'url'
        });
  
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
  
        const dataFetched = await response.json(); // Asegúrate de que el backend devuelva JSON
        // console.log("Datos obtenidos:", dataFetched);
        actualizarEstadocomponente('datositem',dataFetched['datos'])
        
        actualizarEstadocomponente('datourl',dataFetched['url'])
        navigate("Detalles")
        setScannedData(dataFetched['url']); // Guarda los datos para mostrarlos en la app
  
      } catch (error) {
        console.error("Error al realizar el fetch:", error);
      } finally {
        setIsFetching(false); // Restablece el estado de la petición después de que se complete
        setScanning(false); // Detiene el escaneo después de recibir la respuesta
      }
    }
  };

  return (
    <View style={styles.container}>
      {!scanning ? (
        <>
          <Text>iniciar el escaneo del QR</Text>
          <Button title="Iniciar Escaneo" onPress={startScanning} />
         
        </>
      ) : (
        <>
           <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing='back'
              onBarcodeScanned={handleBarcodeScanned} 
            />
            {isFetching && ( // Muestra el ActivityIndicator sobre la cámara
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#006400" style={styles.spinner} />
                <Text style={styles.waitingText}>Detectado, esperando datos...</Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.closeIcon} 
              onPress={() => setScanning(false)}
            >
              <SimpleLineIcons name="close" size={40} color="red" />
            </TouchableOpacity>
          </View>
          {/* <Button title="Detener Escaneo" onPress={() => setScanning(false)} /> */}
          
        </>
      )}
  
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative', // Permite el uso de posicionamiento absoluto para el spinner
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  scannedText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semi-transparente para la superposición
  },
  spinner: {
    marginBottom: 10, // Espaciado entre el spinner y el texto
  },
  waitingText: {
    color: 'red', // Cambia el color del texto si es necesario
    fontSize: 25,
    textAlign: 'center', // Centra el texto
    fontWeight:'bold'
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1, // Asegura que el icono esté al frente
  },
});
export default QRScanner;
