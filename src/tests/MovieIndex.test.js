import { test, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MoviesIndex from "../views/MoviesIndex.vue";


test("mount component", () => {
  expect(MoviesIndex).toBeTruthy;
  const wrapper = mount(MoviesIndex, {
    props: {
      msg: "Hello from Vitest",
    },
  });

  expect(wrapper.text()).toContain("Hello From Vitest");
});
