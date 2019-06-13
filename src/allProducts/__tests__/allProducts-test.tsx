import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import Container from '../allProductsContainer';
import { ClientContextProvider } from 'react-fetching-library';

describe('All products test', () => {
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
  it('Should render list of products', async () => {
    jest.useFakeTimers();

    const { getByTestId, queryByText } = render(
      // @ts-ignore
      <ClientContextProvider client={client}>
        <Container />
      </ClientContextProvider>
    );

    expect(getByTestId('loading')).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });

    resultProducts.forEach(({ id }) => {
      expect(queryByText(id)).toBeTruthy();
    });

    expect(queryByText(`Fake/Id`)).toBeNull();
  });

  it('Should show error state and try to refresh', async () => {
    const queryMock = jest.fn(() => ({
      error: true,
      status: 500,
      payload: [],
    }));

    jest.useFakeTimers();

    const { getByTestId, queryByText } = render(
      // @ts-ignore
      <ClientContextProvider client={{ query: queryMock }}>
        <Container />
      </ClientContextProvider>
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('errorButton'));

    act(() => {
      jest.runAllTimers();
    });
    expect(queryMock).toBeCalledTimes(2);
  });
});
