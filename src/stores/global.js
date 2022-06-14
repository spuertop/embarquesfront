import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from "boot/axios"

export const useGlobalStore = defineStore('useGlobalStore', {
  state: () => ({
    usersList: [],
    customer: null,
    aedocument: null,
    token: null,
  }),

  getters: {
  },

  actions: {
    async getAllusers() {
      try {
        const res = await api.get("/users/all");
        this.usersList = res.data;
      } catch (error) {
        return error.response.data.error
      }
    },
    async postLogIn(ob) {
      try {
        const res = await api.post("/users/login", ob);
        //SET TOKEN WITH RES
        sessionStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = res.data.token;
        //PUSH TO CUSTOMERS
        this.router.push('/customers')
      } catch (error) {
        return error.response.data.error
      }
    }

  }
})
