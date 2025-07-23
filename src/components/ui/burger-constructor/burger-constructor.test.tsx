import React from 'react';
import { render, screen } from '@testing-library/react';
import { BurgerConstructorUI } from './burger-constructor';
import '@testing-library/jest-dom';

describe('BurgerConstructorUI', () => {
  it('отображает сообщение, если булка не выбрана', () => {
    render(
      <BurgerConstructorUI
        price={0}
        orderRequest={false}
        constructorItems={{ bun: null, ingredients: [] }}
        orderModalData={null}
        onOrderClick={jest.fn()}
        closeOrderModal={jest.fn()}
      />
    );
    expect(screen.getAllByText('Выберите булки').length).toBeGreaterThan(0);
  });

  it('отображает сообщение, если начинка не выбрана', () => {
    render(
      <BurgerConstructorUI
        price={0}
        orderRequest={false}
        constructorItems={{ bun: { _id: '1', name: 'Булка', type: 'bun', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_large: '', image_mobile: '' }, ingredients: [] }}
        orderModalData={null}
        onOrderClick={jest.fn()}
        closeOrderModal={jest.fn()}
      />
    );
    expect(screen.getByText('Выберите начинку')).toBeInTheDocument();
  });
}); 