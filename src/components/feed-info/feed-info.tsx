import { FC } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { feedOrders, feedData } = useSelector(
    (state: RootState) => state.orders
  );

  const readyOrders = getOrders(feedOrders, 'done');

  const pendingOrders = getOrders(feedOrders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedData}
    />
  );
};
