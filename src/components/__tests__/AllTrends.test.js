import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStoreAllTrend } from '/src/store/allTrends';

describe('useStoreAllTrend', () => {
  let pinia;

  beforeAll(() => {
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreAllTrend;
  });

  it('should fetch trend movies and update state', async () => {
    const store = pinia.useStore();

    globalThis.fetch = async (url) => ({
      json: async () => {
        if (url.includes('movie/now_playing')) {
          return {
            success: true,
            results: Array.from({ length: 10 }, (_, index) => ({
              id: index + 1,
              title: `Trend Movie ${index + 1}`,
            })),
          };
        }
      },
    });

    await store.fetchTrendMovies();

    // Verifica se os estados foram atualizados corretamente
    expect(store.trendMovies.length).toBe(10);
    expect(store.renderTemplate).toBe(true);

    // Verifica se os getters podem acessar os dados
    expect(store.totalTrendMovies).toBe(10);
  });

  it('should handle errors during fetchTrendMovies', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreAllTrend;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação fetchTrendMovies
    await store.fetchTrendMovies();

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  afterEach(() => {
    globalThis.fetch = undefined;
  });
});
