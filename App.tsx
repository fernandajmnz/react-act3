import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/itesmguillermorivas/partial2/45f22905941b70964102fce8caf882b51e988d23/carros.json';

type Item = {
  marca: string;
  modelo: string;
  anio: number;
};

export default function App() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(GITHUB_JSON_URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (item: Item) => {
    Alert.alert(
      "Detalles del Vehículo",
      `Marca: ${item.marca}\nModelo: ${item.modelo}\nAño: ${item.anio}`
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Vehículos</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
            <Text>{item.marca} - {item.modelo}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});