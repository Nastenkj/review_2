import React from 'react';
import { render, screen } from '@testing-library/react';
import { IngredientDetailsUI } from './ingredient-details';
import '@testing-library/jest-dom';

describe('IngredientDetailsUI', () => {
  it('отображает данные ингредиента', () => {
    const ingredientData = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: '',
      image_large: 'test.png',
      image_mobile: ''
    };
    render(<IngredientDetailsUI ingredientData={ingredientData} />);
    expect(screen.getByText('Булка')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
}); 