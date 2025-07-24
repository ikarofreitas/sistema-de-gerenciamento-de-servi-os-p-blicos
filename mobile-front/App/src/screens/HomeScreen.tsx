import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { listarServicos } from '../services/servicoService';
import { useAuth } from '../contexts/AuthContext';

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

  const { logout } = useAuth();

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
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

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
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 12,
    left: 20,
    zIndex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
});
