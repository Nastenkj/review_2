import * as api from './burger-api';

// Мокаем глобальный fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Мокаем localStorage для node-среды
beforeAll(() => {
  const localStorageMock = (function() {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) { return store[key] || null; },
      setItem(key: string, value: string) { store[key] = value; },
      removeItem(key: string) { delete store[key]; },
      clear() { store = {}; }
    };
  })();
  Object.defineProperty(global, 'localStorage', { value: localStorageMock });
});

describe('burger-api', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('getIngredientsApi: возвращает данные при успехе', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: [{ _id: '1', name: 'test', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_large: '', image_mobile: '' }] })
    });
    const data = await api.getIngredientsApi();
    expect(data[0].name).toBe('test');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/ingredients'));
  });

  it('getIngredientsApi: кидает ошибку при неуспехе', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false })
    });
    await expect(api.getIngredientsApi()).rejects.toBeDefined();
  });

  it('registerUserApi: отправляет данные и возвращает пользователя', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: { email: 'a', name: 'b' }, refreshToken: 'r', accessToken: 'a' })
    });
    const data = await api.registerUserApi({ email: 'a', name: 'b', password: 'c' });
    expect(data.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/auth/register'), expect.objectContaining({ method: 'POST' }));
  });

  it('loginUserApi: возвращает данные пользователя', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: { email: 'a', name: 'b' }, refreshToken: 'r', accessToken: 'a' })
    });
    const data = await api.loginUserApi({ email: 'a', password: 'b' });
    expect(data.success).toBe(true);
  });

  it('forgotPasswordApi: возвращает success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    const data = await api.forgotPasswordApi({ email: 'a' });
    expect(data.success).toBe(true);
  });

  it('resetPasswordApi: возвращает success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    const data = await api.resetPasswordApi({ password: 'a', token: 'b' });
    expect(data.success).toBe(true);
  });

  it('logoutApi: возвращает success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    const data = await api.logoutApi();
    expect(data.success).toBe(true);
  });
}); 