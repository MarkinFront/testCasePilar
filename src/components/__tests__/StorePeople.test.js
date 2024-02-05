import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStorePeople } from '/src/store/storePeople';

describe('useStorePeople', () => {
  let pinia;

  // Antes de todos os testes, inicializa o Pinia
  beforeAll(() => {
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStorePeople;
  });

  it('should fetch people and update state', async () => {
    const store = pinia.useStore();

    globalThis.fetch = async () => ({
      json: async () => ({
        success: true,
        results: [
          { id: 1, name: 'Person 1' },
          { id: 2, name: 'Person 2' },
          { id: 3, name: 'Person 3' },
          { id: 4, name: 'Person 4' },
          { id: 5, name: 'Person 5' },
          { id: 6, name: 'Person 6' },
          { id: 7, name: 'Person 7' },
          { id: 8, name: 'Person 8' },
          { id: 9, name: 'Person 9' },
          { id: 10, name: 'Person 10' },
        ],
      }),
    });

    await store.fetchPeople();

    // Verifica se os estados foram atualizados corretamente
    expect(store.popularPeople.length).toBe(10);
    expect(store.renderTemplate).toBe(true);

    // Verifica se os getters podem acessar os dados
    expect(store.totalPopularPeople).toBe(10);
  });

  it('should handle errors during fetchPeople', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStorePeople;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação fetchPeople
    await store.fetchPeople();

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  it('should handle errors during fetchMorePeople', async () => {
    // Reinicializa o Pinia para garantir uma nova instância
    const app = createApp();
    pinia = createPinia();
    app.use(pinia);
    pinia.useStore = useStorePeople;

    // Cria uma nova instância da store
    const store = pinia.useStore();

    // Mocka a função fetch para simular um erro
    globalThis.fetch = async () => {
      throw new Error('Network Error');
    };

    // Dispara a ação fetchMorePeople
    await store.fetchMorePeople();

    // Verifica se o estado de renderTemplate ainda é falso após um erro
    expect(store.renderTemplate).toBe(false);
  });

  afterEach(() => {
    globalThis.fetch = undefined;
  });
});
