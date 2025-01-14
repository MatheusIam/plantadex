import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Ícone grande e centralizado */}
      <Icon
        name="eco"
        size={120}
        color="#61dafb"
        style={styles.icon}
      />

      {/* Título / nome da tela */}
      <Text style={styles.title}>Sobre o App</Text>

      {/* Informações sobre quem desenvolveu */}
      <Text style={styles.description}>
        Aplicativo desenvolvido por:
        {'\n'}• Rafael Soares
        {'\n'}• Matheus Ferreira
        {'\n'}• David Fontes
      </Text>

      {/* Frase bonita sobre a natureza */}
      <Text style={styles.phrase}>
        “A natureza não faz nada em vão.”
      </Text>
    </View>
  );
};

export { AboutScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  phrase: {
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});
