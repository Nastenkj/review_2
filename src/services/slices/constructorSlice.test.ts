import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const mockIngredient: TConstructorIngredient = {
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
    image_mobile: '',
    id: '1'
  };

  it('добавляет ингредиент', () => {
    const initialState = { bun: null, ingredients: [] } as any;
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients).toContainEqual(mockIngredient);
  });

  it('удаляет ингредиент', () => {
    const initialState = { bun: null, ingredients: [mockIngredient] } as any;
    const state = constructorReducer(initialState, removeIngredient('1'));
    expect(state.ingredients).toHaveLength(0);
  });

  it('меняет порядок ингредиентов', () => {
    const ing2 = { ...mockIngredient, id: '2', _id: '2' };
    const initialState = {
      bun: null,
      ingredients: [mockIngredient, ing2]
    } as any;
    const state = constructorReducer(
      initialState,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });
});
