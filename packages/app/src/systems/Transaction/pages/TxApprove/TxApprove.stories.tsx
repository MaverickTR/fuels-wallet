import { BoxCentered, Button } from '@fuel-ui/react';
import type { ComponentStoryFn, Meta } from '@storybook/react';
import { Wallet } from 'fuels';
import { useEffect } from 'react';

import { TxApprove } from './TxApprove';

import { Layout } from '~/systems/Core';
import { useTransactionRequest } from '~/systems/DApp';
import { sendLoader } from '~/systems/Send/__mocks__/send';
import { store } from '~/systems/Store';

const wallet = Wallet.generate();

export default {
  component: TxApprove,
  title: 'Transaction/Pages/TxApprove',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'chromeExtension',
    },
  },
} as Meta;

const Template: ComponentStoryFn<typeof TxApprove> = (_args, { loaded }) => {
  const txRequest = useTransactionRequest();
  const { transactionRequest, network, address } = loaded || {};

  useEffect(() => {
    txRequest.handlers.request({
      address,
      transactionRequest,
      providerUrl: network?.url,
    });
  }, []);

  return (
    <Layout>
      <BoxCentered css={{ minW: '100%', minH: '100%' }}>
        <Button onPress={store.openTransactionApprove}>Toggle Modal</Button>
      </BoxCentered>
    </Layout>
  );
};

export const Usage = Template.bind({});
Usage.loaders = [sendLoader(wallet)];
