import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function ErrorButton({ title, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onPress} testID='errorButton' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
