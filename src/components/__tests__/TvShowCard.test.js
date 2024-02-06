import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import TvShowCard from "../TvShowCard.vue";

describe("TvShowCard Component", () => {
  let wrapper;

  beforeEach(() => {
    // Montar o componente antes de cada teste
    wrapper = mount(TvShowCard, {
      props: {
        tvShow: {
          title: "Breaking Bad",
          genre_ids: [1, 2],
        },
        genres: [
          { id: 1, name: "Drama" },
          { id: 2, name: "Comedy" },
        ],
      },
      global: {},
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("Renderiza corretamente", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
