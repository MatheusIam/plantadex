import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About-Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

export { AboutScreen };
