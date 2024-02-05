import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import MovieCard from "../MovieCard.vue";


// Mock de dados do filme
const mockMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test-poster.jpg",
  genre_ids: [1, 2],
  release_date: "2022-02-04",
  vote_average: 7.5,
};

// Descreve um conjunto de testes para o componente MovieCard
describe("MovieCard Component", () => {
  // Teste 1: Renderiza corretamente com dados simulados
  it("Renderiza corretamente com dados simulados", () => {
    // Monta o componente MovieCard com dados simulados
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
        genres: [
          { id: 1, name: "Action" },
          { id: 2, name: "Adventure" },
        ],
      },
    });

    // Verifica se o componente foi renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifica se a imagem do pôster existe e tem o caminho correto
    const posterImage = wrapper.find("img");
    expect(posterImage.exists()).toBe(true);
    expect(posterImage.attributes("src")).toBe(
      `https://image.tmdb.org/t/p/w500/${mockMovie.poster_path}`
    );

    // Verifica se o título do filme está correto
    const movieTitle = wrapper.find(".text-lg");
    expect(movieTitle.exists()).toBe(true);
    expect(movieTitle.text()).toBe(mockMovie.title);

    // Adicione mais verificações conforme necessário

    // Limpe a montagem após o teste
    wrapper.unmount();
  });

  // Teste 2: Renderiza corretamente com status de erro
  it("Renderiza corretamente com status de erro", () => {
    // Monta o componente MovieCard com status de erro
    const wrapper = mount(MovieCard, {
      props: { status: "error" },
    });

    // Verifica se o componente foi renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifica se o elemento com a classe 'error' existe
    expect(wrapper.find(".error").exists()).toBe(true);

    // Limpe a montagem após o teste
    wrapper.unmount();
  });
});
