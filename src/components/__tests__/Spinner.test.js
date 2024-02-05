import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Spinner from "../Spinner.vue";
import { useSpinnerStore } from "/src/store/spinnerStore";
import { waitFor } from "@testing-library/vue";

describe("Spinner Component", () => {
  it("Renderiza corretamente quando showSpinner é true", async () => {
    const wrapper = mount(Spinner);
    const spinnerStore = useSpinnerStore();

    // Inicialmente, o componente deve estar oculto
    expect(wrapper.find(".hollow-dots-spinner").exists()).toBe(false);

    // Atualiza o estado para mostrar o spinner
    spinnerStore.showSpinner = true;

    // Espera até que o componente esteja visível
    await waitFor(() => {
      expect(wrapper.find(".hollow-dots-spinner").exists()).toBe(true);
    });
  });

  it("Renderiza corretamente quando showSpinner é false", async () => {
    const wrapper = mount(Spinner);
    const spinnerStore = useSpinnerStore();

    // Atualiza o estado para ocultar o spinner
    spinnerStore.showSpinner = false;

    // Espera até que o componente esteja oculto
    await waitFor(() => {
      expect(wrapper.find(".hollow-dots-spinner").exists()).toBe(false);
    });
  });
});
