import userReducer, { fetchUser } from './userSlice';

describe('userSlice', () => {
  it('инициализируется с пустым пользователем', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state.user).toBeNull();
  });

  it('записывает пользователя при fetchUser.fulfilled', () => {
    const user = { email: 'test@example.com', name: 'Test' };
    const action = { type: fetchUser.fulfilled.type, payload: user };
    const state = userReducer(undefined, action);
    expect(state.user).toEqual(user);
    expect(state.loading).toBe(false);
  });

  it('записывает ошибку при fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
      error: { message: 'fail' }
    };
    const state = userReducer(undefined, action);
    expect(state.error).toBe('Ошибка получения пользователя');
    expect(state.loading).toBe(false);
  });
});
