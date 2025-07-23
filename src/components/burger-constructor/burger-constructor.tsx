import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import {
  createOrder,
  closeOrderModal,
  clearConstructor
} from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const {
    bun,
    ingredients = [],
    orderRequest,
    orderModalData
  } = useSelector((state: RootState) => state.constructor);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    dispatch(createOrder());
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
