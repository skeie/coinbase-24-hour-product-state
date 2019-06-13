import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { client } from './src/common/fetch';
import AllProductsContainer from './src/allProducts/allProductsContainer';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <ClientContextProvider client={client}>
      <SafeAreaView>
        <AllProductsContainer />
      </SafeAreaView>
    </ClientContextProvider>
  );
}
