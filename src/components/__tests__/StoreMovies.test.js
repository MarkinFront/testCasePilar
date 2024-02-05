import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStoreMovies } from '/src/store/storeMovies';

describe('useStoreMovies', () => {
  let pinia;

  // Antes de todos os testes, inicializa o Pinia
  beforeAll(() => {
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreMovies;
  });

  it('should fetch movies and update state', async () => {
    const store = pinia.useStore();

    globalThis.fetch = async () => ({
      json: async () => ({
        success: true,
        results: [
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' },
          { id: 3, title: 'Movie 3' },
          { id: 4, title: 'Movie 4' },
          { id: 5, title: 'Movie 5' },
          { id: 6, title: 'Movie 6' },
          { id: 7, title: 'Movie 7' },
          { id: 8, title: 'Movie 8' },
          { id: 9, title: 'Movie 9' },
          { id: 10, title: 'Movie 10' },
        ],
      }),
    });

    await store.fetchMovies();

    // Verifica se os estados foram atualizados corretamente
    expect(store.popularMovies.length).toBe(10);
    expect(store.upcomingMovies.length).toBe(10);
    expect(store.trendMovies.length).toBe(10);
    expect(store.renderTemplate).toBe(true);

    // Verifica se os getters podem acessar os dados
    expect(store.totalPopularMovies).toBe(10);
    expect(store.totalUpcomingMovies).toBe(10);
    expect(store.totalTrendMovies).toBe(10);
  });

  it('should handle errors during fetchMovies', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreMovies;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação fetchMovies
    await store.fetchMovies();

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  it('should handle errors during loadMoreMovies', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStoreMovies;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação loadMoreMovies
    await store.loadMoreMovies('popular'); // Modifique conforme necessário

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  afterEach(() => {
    globalThis.fetch = undefined;
  });
});
