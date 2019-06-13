import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Separator() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
