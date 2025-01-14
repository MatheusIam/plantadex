import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Biblioteca de ícones
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext';
import { ThemedText } from '@/components/ThemedText'; // Ou use Text do RN

export const Menu = () => {
  const { hasRole } = useContext(AuthContext);
  const navigation = useNavigation();

  // Estado para armazenar a planta aleatória e carregamento
  const [randomPlant, setRandomPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Buscar planta aleatória ao montar o componente
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 10) + 1; // Página entre 1 e 10
    axios
      .get(`https://perenual.com/api/species-list?key=sk-4Qiz675ade82881237980&page=${randomPage}`)
      .then((response) => {
        const data = response.data.data || [];
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomPlant(data[randomIndex]);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar planta aleatória:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Título "Planta do Dia" */}
      <View style={styles.dailyPlantHeader}>
        <Icon name="eco" size={24} color="#4CAF50" style={styles.dailyPlantIcon} />
        <ThemedText style={styles.dailyPlantText} lightColor="#4CAF50" darkColor="#81C784">
          Planta do Dia
        </ThemedText>
      </View>

      {/* Se ainda estiver carregando, mostra indicador de carregamento */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <ThemedText lightColor="#000" darkColor="#000">
            Carregando...
          </ThemedText>
        </View>
      ) : (
        // Caso tenhamos uma planta, exibe o card
        randomPlant && (
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  randomPlant.default_image?.small_url ||
                  'https://via.placeholder.com/150',
              }}
              style={styles.image}
            />
            <ThemedText style={styles.title} lightColor="#000" darkColor="#000">
              {randomPlant.common_name || 'Nome não disponível'}
            </ThemedText>
            <ThemedText lightColor="#000" darkColor="#000">
              <ThemedText style={styles.label} lightColor="#000" darkColor="#000">
                Nome Científico:{' '}
              </ThemedText>
              {randomPlant.scientific_name?.join(', ')}
            </ThemedText>
            <ThemedText lightColor="#000" darkColor="#000">
              <ThemedText style={styles.label} lightColor="#000" darkColor="#000">
                Ciclo:{' '}
              </ThemedText>
              {randomPlant.cycle}
            </ThemedText>
            <ThemedText lightColor="#000" darkColor="#000">
              <ThemedText style={styles.label} lightColor="#000" darkColor="#000">
                Rega:{' '}
              </ThemedText>
              {randomPlant.watering}
            </ThemedText>
          </View>
        )
      )}

      {/* Botões */}
      <View style={styles.buttonGroup}>
        {hasRole('Manager') && (
          <Icon.Button
            name="admin-panel-settings"
            backgroundColor="#61dafb"
            onPress={() => navigation.navigate('Manager')}
            style={styles.iconButton}
          >
            Manager
          </Icon.Button>
        )}

        {hasRole('IC') && (
          <Icon.Button
            name="engineering"
            backgroundColor="#61dafb"
            onPress={() => navigation.navigate('IC')}
            style={styles.iconButton}
          >
            IC
          </Icon.Button>
        )}

        <Icon.Button
          name="person"
          backgroundColor="#61dafb"
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconButton}
        >
          Perfil
        </Icon.Button>

        <Icon.Button
          name="local_florist"
          backgroundColor="#61dafb"
          onPress={() => navigation.navigate('Plantas')}
          style={styles.iconButton}
        >
          Plantas
        </Icon.Button>

        <Icon.Button
          name="info"
          backgroundColor="#61dafb"
          onPress={() => navigation.navigate('About')}
          style={styles.iconButton}
        >
          Sobre
        </Icon.Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  // Estilo de card semelhante ao PlantaScreen
  card: {
    width: '90%', // Ocupa 90% da largura da tela
    borderWidth: 0.5, // Borda mais fina
    borderColor: '#ccc', // Cor neutra para a borda
    borderRadius: 6, // Bordas mais sutis
    padding: 16,
    marginVertical: 12, // Espaçamento entre cards
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para destaque
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para efeito de elevação
  },
  image: {
    width: '100%', // Ocupa toda a largura do card
    aspectRatio: 16 / 9, // Mantém proporção 16:9 para imagens
    borderRadius: 4, // Suaviza as bordas da imagem
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
  buttonGroup: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around', // Espaçamento uniforme entre os botões
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 14,
    marginHorizontal: 5, // Espaçamento entre os botões
  },
  dailyPlantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // Espaçamento inferior para separar do card
  },
  dailyPlantIcon: {
    marginRight: 8, // Espaço entre o ícone e o texto
  },
  dailyPlantText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
