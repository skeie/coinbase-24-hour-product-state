import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

export default function Loading({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]} testID='loading'>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
