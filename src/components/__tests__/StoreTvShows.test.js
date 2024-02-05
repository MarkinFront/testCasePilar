import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStoreTvShows } from '/src/store/storeTvShows';

describe('useStoreTvShows', () => {
  let pinia;

  beforeAll(() => {
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreTvShows;
  });

  it('should fetch TV shows and update state', async () => {
    const store = pinia.useStore();

    globalThis.fetch = async (url) => ({
      json: async () => {
        if (url.includes('tv/popular')) {
          return {
            success: true,
            results: Array.from({ length: 10 }, (_, index) => ({
              id: index + 1,
              name: `TV Show ${index + 1}`,
            })),
          };
        } else if (url.includes('tv/on_the_air')) {
          return {
            success: true,
            results: Array.from({ length: 10 }, (_, index) => ({
              id: index + 1,
              name: `On the Air ${index + 1}`,
            })),
          };
        } else if (url.includes('tv/top_rated')) {
          return {
            success: true,
            results: Array.from({ length: 10 }, (_, index) => ({
              id: index + 1,
              name: `Top Rated ${index + 1}`,
            })),
          };
        } else if (url.includes('genre/tv/list')) {
          return {
            success: true,
            genres: Array.from({ length: 5 }, (_, index) => ({
              id: index + 1,
              name: `Genre ${index + 1}`,
            })),
          };
        }
      },
    });

    await store.fetchTv();

    // Verifica se os estados foram atualizados corretamente
    expect(store.popularTvShows.length).toBe(10);
    expect(store.onTheAirTvShows.length).toBe(10);
    expect(store.topRatedTvShows.length).toBe(10);
    expect(store.genres.length).toBe(5);
    expect(store.renderTemplate).toBe(true);

    // Verifica se os getters podem acessar os dados
    expect(store.totalPopularTvShows).toBe(10);
    expect(store.totalOnTheAirTvShows).toBe(10);
    expect(store.totalTopRatedTvShows).toBe(10);
  });

  it('should handle errors during fetchTv', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreTvShows;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação fetchTv
    await store.fetchTv();

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  afterEach(() => {
    globalThis.fetch = undefined;
  });
});
