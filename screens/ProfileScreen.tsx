import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../components/context/AuthContext';

const ProfileScreen = () => {
  const { state, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Ícone do perfil */}
      <Icon name="account-circle" size={100} color="#61dafb" style={styles.profileIcon} />

      {/* Título / nome da tela */}
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Informações do usuário */}
      {state.userInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="badge" size={20} color="#888" style={styles.infoIcon} />
            <Text style={styles.infoText}>{`Nome: ${state.userInfo.givenName}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="people" size={20} color="#888" style={styles.infoIcon} />
            <Text style={styles.infoText}>{`Sobrenome: ${state.userInfo.familyName}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="person" size={20} color="#888" style={styles.infoIcon} />
            <Text style={styles.infoText}>{`Usuário: ${state.userInfo.username}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#888" style={styles.infoIcon} />
            <Text style={styles.infoText}>{`E-mail: ${state.userInfo.email}`}</Text>
          </View>
        </View>
      )}

      {/* Botão de logout */}
      <View style={styles.buttonContainer}>
        <Icon.Button
          name="logout"
          backgroundColor="#e53935"
          onPress={signOut}
        >
          Sair
        </Icon.Button>
      </View>
    </View>
  );
};

export { ProfileScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 12,
  },
});
