import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalUI } from './modal';
import '@testing-library/jest-dom';

describe('ModalUI', () => {
  it('отображает заголовок и children', () => {
    render(
      <ModalUI title='Заголовок' onClose={jest.fn()}>
        <div>Контент</div>
      </ModalUI>
    );
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
    expect(screen.getByText('Контент')).toBeInTheDocument();
  });

  it('вызывает onClose при клике на кнопку', () => {
    const onClose = jest.fn();
    render(
      <ModalUI title='Заголовок' onClose={onClose}>
        <div>Контент</div>
      </ModalUI>
    );
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalled();
  });
}); 