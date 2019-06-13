import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Separator from '../common/Separator';
import Loading from '../common/Loading';

type Props = {
  name: string;
  high: string;
  open: string;
  low: string;
  loading: boolean;
};

function Element({ name, value }: { name: string; value: string }) {
  return (
    <View style={styles.elementContainer} testID={value}>
      <Text style={styles.bold}>{name}</Text>
      <Text>{value}</Text>
      <Separator />
    </View>
  );
}

export default function ProductDetailsComponents({
  name,
  high,
  open,
  low,
  loading,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.bold}>
          24 hour stat for {name} with {name.split('-')[0]} as base
        </Text>
      </View>
      <Element name='Highest point: ' value={high} />
      <Element name='Lowest point: ' value={low} />
      <Element name='current point: ' value={open} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  elementContainer: {
    flexDirection: 'row',
  },
});
