import { createClient, Action } from 'react-fetching-library';

export const requestHostInterceptor = (host: string) => () => async (
  action: Action
) => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
  };
};

type Response = {
  error: boolean;
  headers: Object;
  status: number;
  payload: {
    data: any;
  };
};

export const client = createClient({
  requestInterceptors: [requestHostInterceptor('https://api.pro.coinbase.com')],
});
