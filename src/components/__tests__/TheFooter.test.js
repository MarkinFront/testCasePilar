import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TheFooter from "../TheFooter.vue";

describe("TheFooter Component", () => {
  // Teste 1: Renderiza corretamente
  it("Renderiza corretamente", () => {
    // Monta o componente TheFooter
    const wrapper = mount(TheFooter);

    // Verifica se o componente foi renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifica se os elementos de texto estão presentes
    expect(wrapper.text()).toContain("Created by @MarkinFront");
    expect(wrapper.text()).toContain("This product uses the");

    // Verifica se o link da API TMDB está presente
    const tmdbLink = wrapper.find("a");
    expect(tmdbLink.exists()).toBe(true);
    expect(tmdbLink.attributes("href")).toBe(
      "https://www.themoviedb.org/documentation/api"
    );

    // Limpe a montagem após o teste
    wrapper.unmount();
  });
});
