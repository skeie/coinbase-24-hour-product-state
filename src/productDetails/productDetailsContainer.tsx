import React from 'react';
import { StyleSheet } from 'react-native';

import { Action, Query } from 'react-fetching-library';
import Loading from '../common/Loading';
import ProductDetailsComponents from './productDetailsComponents';
import ErrorButton from '../common/ErrorButton';

const fetchCoinBaseProduct: Action = (id: string) => ({
  method: 'GET',
  endpoint: `/products/${id}/stats`,
});

type Props = {
  productId: string;
};

export type Item = {
  index: number;
  item: {
    id: string;
    display_name: string;
  };
};

export default function ProductDetailsContainer({ productId }: Props) {
  return (
    <Query action={fetchCoinBaseProduct(productId)} initFetch={true}>
      {({ loading, error, payload, query }) => {
        if (loading) {
          return <Loading style={styles.loadingContainer} />;
        }

        if (error) {
          return (
            <ErrorButton
              title='Something went wrong, please try again'
              onPress={query}
            />
          );
        }

        const { open, high, low } = payload;
        return (
          <ProductDetailsComponents
            name={productId}
            open={open}
            high={high}
            low={low}
            loading={loading}
          />
        );
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    minHeight: 50,
  },
});
