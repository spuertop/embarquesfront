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
    aeinfo: null,
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
    },
    async getDeliveryInfo(ob) {
      try {
        this.setHeaders();
        const res = await api.get("/delivery", { params: ob })
        this.aeinfo = res.data;
        this.router.push('/readings')
      } catch (error) {
        return error.response.data.error
      }
    },
    async uploadUnit(ob) {
      try {
        this.setHeaders();
        const res = await api.put('/upload', ob);
        this.aeinfo.lecturas.map((item) => {
          if (item.Descripcion === ob.ud) {
            item.NroDS = true;
          }
        })
      } catch (error) {
        return error.response.data.error
      }
    },
    async downloadUnit(ob) {
      try {
        this.setHeaders();
        const res = await api.put('/download', ob);
        this.aeinfo.lecturas.map((item) => {
          if (item.Descripcion === ob.ud) {
            item.NroDS = null;
          }
        })
      } catch (error) {
        return error.response.data.error
      }
    },
    changeAE() {
      this.router.push('/documents')
    }
  }
})
