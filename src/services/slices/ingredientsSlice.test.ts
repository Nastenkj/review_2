import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('isLoading становится true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);
    expect(state.loading).toBe(true);
  });

  it('записывает данные и loading=false при fetchIngredients.fulfilled', () => {
    const mockData = [
      {
        _id: '1',
        name: 'test',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: mockData };
    const state = ingredientsReducer(undefined, action);
    expect(state.ingredients).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it('записывает ошибку и loading=false при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'fail' }
    };
    const state = ingredientsReducer(undefined, action);
    expect(state.error).toBe('Ошибка получения ингредиентов');
    expect(state.loading).toBe(false);
  });
});
