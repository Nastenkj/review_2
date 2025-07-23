import ordersReducer, { fetchFeedOrders, fetchUserOrders } from './ordersSlice';
import { TOrder, TOrdersData } from '../../utils/types';

describe('ordersSlice', () => {
  it('инициализируется с пустыми заказами', () => {
    const state = ordersReducer(undefined, { type: '' });
    expect(state.feedOrders).toEqual([]);
    expect(state.userOrders).toEqual([]);
  });

  it('записывает feedOrders и feedData при fetchFeedOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      }
    ];
    const payload: TOrdersData = { orders, total: 1, totalToday: 1 };
    const action = { type: fetchFeedOrders.fulfilled.type, payload };
    const state = ordersReducer(undefined, action);
    expect(state.feedOrders).toEqual(orders);
    expect(state.feedData).toEqual(payload);
    expect(state.loading).toBe(false);
  });

  it('записывает userOrders при fetchUserOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      }
    ];
    const action = { type: fetchUserOrders.fulfilled.type, payload: orders };
    const state = ordersReducer(undefined, action);
    expect(state.userOrders).toEqual(orders);
    expect(state.loading).toBe(false);
  });

  it('записывает ошибку при fetchFeedOrders.rejected', () => {
    const action = { type: fetchFeedOrders.rejected.type, payload: 'fail' };
    const state = ordersReducer(undefined, action);
    expect(state.error).toBe('fail');
    expect(state.loading).toBe(false);
  });

  it('записывает ошибку при fetchUserOrders.rejected', () => {
    const action = { type: fetchUserOrders.rejected.type, payload: 'fail' };
    const state = ordersReducer(undefined, action);
    expect(state.error).toBe('fail');
    expect(state.loading).toBe(false);
  });
});
