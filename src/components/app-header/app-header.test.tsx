import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppHeaderUI } from '../ui/app-header/app-header';
import '@testing-library/jest-dom';

describe('AppHeaderUI', () => {
  it('отображает все основные элементы меню', () => {
    render(
      <BrowserRouter>
        <AppHeaderUI userName='Тест' />
      </BrowserRouter>
    );
    expect(screen.getByText('Конструктор')).toBeInTheDocument();
    expect(screen.getByText('Лента заказов')).toBeInTheDocument();
    expect(screen.getByText('Тест')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 