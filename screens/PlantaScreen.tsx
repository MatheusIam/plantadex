import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../components/context/AuthContext';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';

const PlantaScreen = () => {
  const { state, signOut } = useContext(AuthContext);

  // Estados para as funcionalidades de PlantaScreen
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchPlantas = async () => {
      try {
        const response = await axios.get(`https://perenual.com/api/species-list?key=sk-4Qiz675ade82881237980&page=${page}`);
        setPlantas((prevPlantas) => [...prevPlantas, ...response.data.data]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchPlantas();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={({ nativeEvent }) => {
        if (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20) {
          handleLoadMore();
        }
      }}
      scrollEventThrottle={400}
    >
      

      <View style={styles.plantasContainer}>
        {plantas.map((planta) => (
          <View key={planta.id} style={styles.card}>
            <Image
              source={{ uri: planta.default_image?.small_url || 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
            <ThemedText style={styles.title}>{planta.common_name || 'Nome não disponível'}</ThemedText>
<ThemedText>
  <ThemedText style={styles.label}>Nome Científico:</ThemedText> {planta.scientific_name.join(', ')}
</ThemedText>
<ThemedText>
  <ThemedText style={styles.label}>Ciclo:</ThemedText> {planta.cycle}
</ThemedText>
<ThemedText>
  <ThemedText style={styles.label}>Rega:</ThemedText> {planta.watering}
</ThemedText>

          </View>
        ))}
        {isLoadingMore && <ActivityIndicator size="small" color="#00ff00" style={styles.loadingMore} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  plantasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  loadingMore: {
    marginVertical: 16,
  },
});

export default PlantaScreen ;
