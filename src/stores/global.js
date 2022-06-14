import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from "boot/axios"

export const useGlobalStore = defineStore('useGlobalStore', {
  persist: {
    storage: window.sessionStorage
  },
  state: () => ({
    usersList: [],
    userName: null,
    customersList: [],
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
        sessionStorage.setItem('token', res.data.token);
        this.setHeaders();
        this.router.push('/customers')
      } catch (error) {
        return error.response.data.error
      }
    },
    setHeaders() {
      this.token = sessionStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = this.token;
    },
    async getAllCustomers() {
      try {
        this.setHeaders();
        const res = await api.get("/customers/all");
        this.customersList = res.data;
      } catch (error) {
        return error.response.data.error
      }
    },
    setCustomer(customer) {
      this.customer = customer;
      this.router.push('/documents')
    }
  }
})
