import { defineStore } from 'pinia';

export const useSpinnerStore = defineStore({
  id: 'spinner',
  state: () => ({
    showSpinner: false,
  }),
  actions: {
    show() {
      this.showSpinner = true;
    },
    hide() {
      this.showSpinner = false;
    },
  },
});
