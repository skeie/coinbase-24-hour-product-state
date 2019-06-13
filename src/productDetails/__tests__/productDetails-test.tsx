import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import Container from '../../allProducts/allProductsContainer';
import { ClientContextProvider } from 'react-fetching-library';

jest.mock('LayoutAnimation');

describe('Product details test', () => {
  const productStat = {
    open: '257.34000000',
    high: '264.75000000',
    low: '253.71000000',
    volume: '131293.40583183',
    last: '258.75000000',
    volume_30day: '6517624.99270939',
  };

  const resultProducts = [
    {
      id: 'REP/USD',
      display_name: 'REP/USD',
    },
    {
      id: 'EOS/USD',
      display_name: 'EOS/USD',
    },
    {
      id: 'BTC/USD',
      display_name: 'BTC/USD',
    },
  ];

  const client = {
    query: async ({ endpoint }: { endpoint: string }) => ({
      error: false,
      status: 200,
      payload: endpoint === '/products' ? resultProducts : productStat,
    }),
  };

  it('Should toggle product info', async () => {
    jest.useFakeTimers();

    const { getByTestId, queryByText } = render(
      // @ts-ignore
      <ClientContextProvider client={client}>
        <Container />
      </ClientContextProvider>
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId(resultProducts[0].id));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId(productStat.high)).toBeTruthy();
    expect(getByTestId(productStat.low)).toBeTruthy();
    expect(getByTestId(productStat.open)).toBeTruthy();

    // Toggle back
    fireEvent.press(getByTestId(resultProducts[0].id));

    expect(queryByText(productStat.open)).toBeNull();
  });

  it('Should show error state and try to refresh', async () => {
    const queryMock = jest.fn(({ endpoint }) => ({
      // first time the client its called, it's to get all the products
      // Then we want to return 200
      error: endpoint === '/products' ? false : true,
      status: endpoint === '/products' ? 200 : 500,
      payload: endpoint === '/products' ? resultProducts : [],
    }));
    const client = {
      query: queryMock,
    };

    jest.useFakeTimers();

    const { getByTestId } = render(
      // @ts-ignore
      <ClientContextProvider client={client}>
        <Container />
      </ClientContextProvider>
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId(resultProducts[0].id));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('errorButton'));

    act(() => {
      jest.runAllTimers();
    });

    // called first once with /products,
    // then it fails on the first products/id/stats
    // then it tries again
    expect(queryMock).toBeCalledTimes(3);
  });
});
