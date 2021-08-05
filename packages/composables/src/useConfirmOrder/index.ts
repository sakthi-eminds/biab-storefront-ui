import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

const factoryParams = {
  poll: async (context: Context, { params }): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onConfirmOrder(params);
    return ackResponse;
  },

  dataHandler: (_, { newResults }) => {
    return newResults;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  continuePolling: (_, { oldResults, newResults }) => {
    if (newResults?.message?.order) {
      return false;
    }
    return true;
  },
  init: async (context: Context, { params }) => {
    const ackResponse: AckResponse = await context.$beckn.api.confirmOrder(params);
    return ackResponse;
  },
  pollTime: () => 60000,
  intervalTime: () => 2000

};

export default usePollerFactory(factoryParams);
