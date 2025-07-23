import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BurgerIngredientUI } from './burger-ingredient';
import '@testing-library/jest-dom';

const mockIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('BurgerIngredientUI', () => {
  it('отображает имя и цену ингредиента', () => {
    render(
      <BrowserRouter>
        <BurgerIngredientUI ingredient={mockIngredient} count={2} handleAdd={jest.fn()} locationState={{ background: {} as any }} />
      </BrowserRouter>
    );
    expect(screen.getByText('Булка')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  it('вызывает handleAdd при клике на кнопку', () => {
    const handleAdd = jest.fn();
    render(
      <BrowserRouter>
        <BurgerIngredientUI ingredient={mockIngredient} count={2} handleAdd={handleAdd} locationState={{ background: {} as any }} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Добавить'));
    expect(handleAdd).toHaveBeenCalled();
  });
}); 