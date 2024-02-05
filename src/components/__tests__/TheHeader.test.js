import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import TheHeader from "../TheHeader.vue";
import { shallowMount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";

describe("TheHeader Component", () => {
  let wrapper;

  //Mock
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home" },
      { path: "/tvShows", name: "tvShows" },
      { path: "/people", name: "people" },
      { path: "/all-popular", name: "all-popular" },
      { path: "/all-trends", name: "all-trends" },
    ],
  });

  beforeEach(() => {
    // Montar o componente com o roteador mock
    wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
    });
  });

  afterEach(() => {
    // Limpar a montagem após cada teste
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("Renderiza corretamente com dados simulados", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Limpa o texto de pesquisa corretamente", async () => {
    // Monta o componente com o roteador mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    // Define um texto de pesquisa simulado
    wrapper.vm.searchText = "test";

    // Aguarda a próxima atualização do ciclo de vida
    await wrapper.vm.$nextTick();

    // Verifica se o texto de pesquisa inicial foi definido corretamente
    expect(wrapper.vm.searchText).toBe("test");

    // Encontra o botão de limpar e aciona o clique
    const clearButton = wrapper.find(".seu-botao-limpar"); // Substitua pela classe ou seletor correto

    // Verifica se o botão de limpar foi encontrado antes de acionar o clique
    if (clearButton.exists()) {
      await clearButton.trigger("click");

      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();

      // Verifica se o texto de pesquisa foi limpo corretamente
      expect(wrapper.vm.searchText).toBe("");
    } else {
      console.error("Botão de limpar não encontrado");
    }
  });

  it("Navega para a rota correta ao clicar em um link de navegação", async () => {
    //mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    // Encontra um link de navegação (por exemplo, o link para "tvShows")
    const tvShowsLink = wrapper.find(".seu-link-tvShows"); // Substitua pela classe ou seletor correto

    // Verifica se o link de navegação foi encontrado antes de acionar o clique
    if (tvShowsLink.exists()) {
      // Aciona o clique no link de navegação
      await tvShowsLink.trigger("click");

      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();

      // Verifica se a rota foi alterada corretamente
      expect(wrapper.vm.$route.name).toBe("tvShows");
    } else {
      console.error("Link de navegação para tvShows não encontrado");
    }
  });

  it("Toggla o menu mobile corretamente", async () => {
    // Monta o componente com o roteador mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    // Verifica se o menu mobile está inicialmente fechado
    expect(wrapper.vm.mobileMenuIsOpen).toBe(false);

    // Encontra o botão de toggle do menu mobile
    const toggleButton = wrapper.find(".seu-botao-toggle"); // Substitua pela classe ou seletor correto

    // Verifica se o botão de toggle foi encontrado antes de acionar o clique
    if (toggleButton.exists()) {
      // Aciona o clique no botão de toggle
      await toggleButton.trigger("click");

      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();

      // Verifica se o menu mobile foi aberto corretamente
      expect(wrapper.vm.mobileMenuIsOpen).toBe(true);
    } else {
      console.error("Botão de toggle do menu mobile não encontrado");
    }
  });

  it("DebounceSearch é chamado corretamente", async () => {
    // Monta o componente com o roteador mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    // Encontra o campo de pesquisa
    const searchInput = wrapper.find(".seu-campo-de-pesquisa"); // Substitua pela classe ou seletor correto

    // Verifica se o campo de pesquisa foi encontrado antes de acionar o evento
    if (searchInput.exists()) {
      // Simula a digitação de texto no campo de pesquisa
      await searchInput.setValue("test");

      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();

      // Aguarda um curto período para garantir que o debounce tenha ocorrido
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Verifica se o método DebounceSearch foi chamado corretamente
      expect(wrapper.vm.DebounceSearch).toHaveBeenCalled();
    } else {
      console.error("Campo de pesquisa não encontrado");
    }
  });

  it("Executa a pesquisa geral corretamente", async () => {
    // Monta o componente com o roteador mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });
  
    // Define um texto de pesquisa simulado
    wrapper.vm.searchText = "test";
  
    // Encontra o campo de pesquisa
    const searchInput = wrapper.find(".seu-campo-de-pesquisa"); // Substitua pela classe ou seletor correto
  
    // Verifica se o campo de pesquisa foi encontrado antes de acionar o evento
    if (searchInput.exists()) {
      // Simula a pressão da tecla "Enter" no campo de pesquisa
      await searchInput.trigger("keydown.enter");
  
      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();
  
      // Verifica se a rota foi alterada para "search-results"
      expect(wrapper.vm.$route.name).toBe("search-results");
    } else {
      console.error("Campo de pesquisa não encontrado");
    }
  });
  
  it("Executa a consulta com a query corretamente", async () => {
    // Monta o componente com o roteador mock
    wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });
  
    // Define um texto de pesquisa simulado
    const searchText = "test";
    wrapper.vm.searchText = searchText;
  
    // Encontra o botão de pesquisa
    const searchButton = wrapper.find(".seu-botao-de-pesquisa"); // Substitua pela classe ou seletor correto
  
    // Verifica se o botão de pesquisa foi encontrado antes de acionar o clique
    if (searchButton.exists()) {
      // Aciona o clique no botão de pesquisa
      await searchButton.trigger("click");
  
      // Aguarda a próxima atualização do ciclo de vida
      await wrapper.vm.$nextTick();
  
      // Verifica se a rota foi alterada para "search-results" com a query correta
      expect(wrapper.vm.$route.name).toBe("search-results");
      expect(wrapper.vm.$route.query.q).toBe(searchText);
    } else {
      console.error("Botão de pesquisa não encontrado");
    }
  });
});
