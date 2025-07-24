import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { listarServicos } from '../services/servicoService';

interface Servico {
  id_servico: number;
  nome: string;
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: number;
  longitude: number;
}

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState<{latitude: number, longitude: number}[] | null>(null);

  // Sua chave da API do Google Maps (directions API) - coloque a sua
  const GOOGLE_MAPS_APIKEY = process.env.GOOGLE_MAPS_APIKEY

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const dados = await listarServicos();
        setServicos(dados);
      } catch (error) {
        Alert.alert('Erro ao carregar os serviços');
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando mapa e serviços...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {servicos.map((servico) => (
          <Marker
            key={servico.id_servico}
            coordinate={{
              latitude: servico.latitude,
              longitude: servico.longitude,
            }}
            title={servico.nome}
            description={`${servico.rua}, ${servico.cidade}`}
          />
        ))}

        {routeCoords && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#007bff"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
