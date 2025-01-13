import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ManagerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Manager-Screen</Text>
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

export { ManagerScreen };
