import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#706E6E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loader;
