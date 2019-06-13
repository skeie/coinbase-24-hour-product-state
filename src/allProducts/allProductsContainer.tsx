import React from 'react';
import { FlatList } from 'react-native';

import { Action, Query } from 'react-fetching-library';
import AllProductsComponents from './allProductsComponents';
import Loading from '../common/Loading';
import Separator from '../common/Separator';
import Header from './header';
import ErrorButton from '../common/ErrorButton';

const fetchCoinBaseProducts: Action = {
  method: 'GET',
  endpoint: '/products',
};

export type Item = {
  id: string;
  display_name: string;
};

type FlatListItem = {
  index: number;
  item: Item;
};

export default function AllProductsContainer() {
  return (
    <Query action={fetchCoinBaseProducts} initFetch>
      {({ loading, error, payload, query }) => {
        if (loading) {
          return <Loading style={{ height: '100%' }} />;
        }

        if (error) {
          return (
            <ErrorButton
              title='Something went wrong, please try again'
              onPress={query}
            />
          );
        }

        return (
          <FlatList
            initialNumToRender={20}
            ListHeaderComponent={Header}
            data={payload}
            keyExtractor={(item: Item) => item.id}
            ItemSeparatorComponent={Separator}
            renderItem={(flatlistItem: FlatListItem) => (
              <AllProductsComponents item={flatlistItem.item} />
            )}
          />
        );
      }}
    </Query>
  );
}
