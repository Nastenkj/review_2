import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { fetchFeedOrders } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feedOrders, feedData, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeedOrders());
  };

  if (loading && feedOrders.length === 0) {
    return <Preloader />;
  }

  return <FeedUI orders={feedOrders} handleGetFeeds={handleGetFeeds} />;
};
