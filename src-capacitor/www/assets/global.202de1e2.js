import { a as computed, P as defineStore } from "./index.af93674c.js";
import { api } from "./axios.91ad12ec.js";
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
const useGlobalStore = defineStore("useGlobalStore", {
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
    photoList: []
  }),
  getters: {},
  actions: {
    async getAllusers() {
      try {
        const res = await api.get("/users/all");
        this.usersList = res.data;
      } catch (error) {
        return error.response.data.error;
      }
    },
    async postLogIn(ob) {
      try {
        const res = await api.post("/users/login", ob);
        sessionStorage.setItem("token", res.data.token);
        this.setHeaders();
        this.router.push("/customers");
      } catch (error) {
        return error.response.data.error;
      }
    },
    setHeaders() {
      this.token = sessionStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = this.token;
    },
    async getAllCustomers() {
      try {
        this.setHeaders();
        const res = await api.get("/customers/all");
        this.customersList = res.data;
      } catch (error) {
        return error.response.data.error;
      }
    },
    setCustomer(customer) {
      this.customer = customer;
      this.router.push("/documents");
    },
    async getDeliveryInfo(ob) {
      try {
        this.setHeaders();
        const res = await api.get("/delivery", { params: ob });
        this.aeinfo = res.data;
        this.router.push("/readings");
      } catch (error) {
        return error.response.data.error;
      }
    },
    async uploadUnit(ob) {
      try {
        this.setHeaders();
        const res = await api.put("/upload", ob);
        this.aeinfo.lecturas.map((item) => {
          if (item.Descripcion === ob.ud) {
            item.NroDS = true;
          }
        });
      } catch (error) {
        return error.response.data.error;
      }
    },
    async downloadUnit(ob) {
      try {
        this.setHeaders();
        const res = await api.put("/download", ob);
        this.aeinfo.lecturas.map((item) => {
          if (item.Descripcion === ob.ud) {
            item.NroDS = null;
          }
        });
      } catch (error) {
        return error.response.data.error;
      }
    },
    changeAE() {
      this.router.push("/documents");
    },
    async uploadPhoto(photo) {
      try {
        this.setHeaders();
        await api.post("/postphoto", { customer: this.customer, aedocument: this.aedocument, photo });
      } catch (error) {
        return error.response.data.error;
      }
    },
    async getPhotos() {
      try {
        this.setHeaders();
        this.photoList = [];
        const res = await api.get("/getphotos", { params: { ae: this.aedocument } });
        let counter = 1;
        for (let i = 0; i < res.data.length; i++) {
          this.photoList.push({ id: counter, src: "http://172.18.10.150:4002/" + this.aedocument + "/" + res.data[i] });
          counter++;
        }
      } catch (error) {
        return error.response.data.error;
      }
    }
  }
});
export { useDark as a, useGlobalStore as b, useDarkProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLjIwMmRlMWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9nbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VEYXJrUHJvcHMgPSB7XG4gIGRhcms6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsICRxKSB7XG4gIC8vIHJldHVybiBpc0RhcmtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kYXJrID09PSBudWxsXG4gICAgICA/ICRxLmRhcmsuaXNBY3RpdmVcbiAgICAgIDogcHJvcHMuZGFya1xuICApKVxufVxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tICdwaW5pYSdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwiYm9vdC9heGlvc1wiXG5cbmV4cG9ydCBjb25zdCB1c2VHbG9iYWxTdG9yZSA9IGRlZmluZVN0b3JlKCd1c2VHbG9iYWxTdG9yZScsIHtcbiAgcGVyc2lzdDoge1xuICAgIHN0b3JhZ2U6IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVxuICB9LFxuICBzdGF0ZTogKCkgPT4gKHtcbiAgICB1c2Vyc0xpc3Q6IFtdLFxuICAgIHVzZXJOYW1lOiBudWxsLFxuICAgIGN1c3RvbWVyc0xpc3Q6IFtdLFxuICAgIGN1c3RvbWVyOiBudWxsLFxuICAgIGFlZG9jdW1lbnQ6IG51bGwsXG4gICAgYWVpbmZvOiBudWxsLFxuICAgIHRva2VuOiBudWxsLFxuICAgIHBob3RvTGlzdDogW11cbiAgfSksXG4gIGdldHRlcnM6IHtcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGFzeW5jIGdldEFsbHVzZXJzKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldChcIi91c2Vycy9hbGxcIik7XG4gICAgICAgIHRoaXMudXNlcnNMaXN0ID0gcmVzLmRhdGE7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvclxuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgcG9zdExvZ0luKG9iKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdChcIi91c2Vycy9sb2dpblwiLCBvYik7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgcmVzLmRhdGEudG9rZW4pO1xuICAgICAgICB0aGlzLnNldEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucHVzaCgnL2N1c3RvbWVycycpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvclxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0SGVhZGVycygpIHtcbiAgICAgIHRoaXMudG9rZW4gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgYXBpLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSB0aGlzLnRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0QWxsQ3VzdG9tZXJzKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zZXRIZWFkZXJzKCk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQoXCIvY3VzdG9tZXJzL2FsbFwiKTtcbiAgICAgICAgdGhpcy5jdXN0b21lcnNMaXN0ID0gcmVzLmRhdGE7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvclxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q3VzdG9tZXIoY3VzdG9tZXIpIHtcbiAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcjtcbiAgICAgIHRoaXMucm91dGVyLnB1c2goJy9kb2N1bWVudHMnKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0RGVsaXZlcnlJbmZvKG9iKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNldEhlYWRlcnMoKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldChcIi9kZWxpdmVyeVwiLCB7IHBhcmFtczogb2IgfSlcbiAgICAgICAgdGhpcy5hZWluZm8gPSByZXMuZGF0YTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucHVzaCgnL3JlYWRpbmdzJylcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yXG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB1cGxvYWRVbml0KG9iKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNldEhlYWRlcnMoKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnB1dCgnL3VwbG9hZCcsIG9iKTtcbiAgICAgICAgdGhpcy5hZWluZm8ubGVjdHVyYXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0uRGVzY3JpcGNpb24gPT09IG9iLnVkKSB7XG4gICAgICAgICAgICBpdGVtLk5yb0RTID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvclxuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZG93bmxvYWRVbml0KG9iKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNldEhlYWRlcnMoKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnB1dCgnL2Rvd25sb2FkJywgb2IpO1xuICAgICAgICB0aGlzLmFlaW5mby5sZWN0dXJhcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5EZXNjcmlwY2lvbiA9PT0gb2IudWQpIHtcbiAgICAgICAgICAgIGl0ZW0uTnJvRFMgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yXG4gICAgICB9XG4gICAgfSxcbiAgICBjaGFuZ2VBRSgpIHtcbiAgICAgIHRoaXMucm91dGVyLnB1c2goJy9kb2N1bWVudHMnKVxuICAgIH0sXG4gICAgYXN5bmMgdXBsb2FkUGhvdG8ocGhvdG8pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc2V0SGVhZGVycygpO1xuICAgICAgICBhd2FpdCBhcGkucG9zdCgnL3Bvc3RwaG90bycsIHsgY3VzdG9tZXI6IHRoaXMuY3VzdG9tZXIsIGFlZG9jdW1lbnQ6IHRoaXMuYWVkb2N1bWVudCwgcGhvdG86IHBob3RvIH0pXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvclxuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0UGhvdG9zKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zZXRIZWFkZXJzKCk7XG4gICAgICAgIHRoaXMucGhvdG9MaXN0ID0gW107XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQoXCIvZ2V0cGhvdG9zXCIsIHsgcGFyYW1zOiB7IGFlOiB0aGlzLmFlZG9jdW1lbnQgfSB9KVxuICAgICAgICBsZXQgY291bnRlciA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnBob3RvTGlzdC5wdXNoKHsgaWQ6IGNvdW50ZXIsIHNyYzogJ2h0dHA6Ly8xNzIuMTguMTAuMTUwOjQwMDIvJyArIHRoaXMuYWVkb2N1bWVudCArICcvJyArIHJlcy5kYXRhW2ldIH0pO1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3JcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFWSxNQUFDLGVBQWU7QUFBQSxFQUMxQixNQUFNO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDVjtBQUNIO0FBRWUsaUJBQVUsT0FBTyxJQUFJO0FBRWxDLFNBQU8sU0FBUyxNQUNkLE1BQU0sU0FBUyxPQUNYLEdBQUcsS0FBSyxXQUNSLE1BQU0sSUFDWDtBQUNIO0FDWlksTUFBQyxpQkFBaUIsWUFBWSxrQkFBa0I7QUFBQSxFQUMxRCxTQUFTO0FBQUEsSUFDUCxTQUFTLE9BQU87QUFBQSxFQUNqQjtBQUFBLEVBQ0QsT0FBTyxNQUFPO0FBQUEsSUFDWixXQUFXLENBQUU7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWUsQ0FBRTtBQUFBLElBQ2pCLFVBQVU7QUFBQSxJQUNWLFlBQVk7QUFBQSxJQUNaLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLFdBQVcsQ0FBRTtBQUFBLEVBQ2pCO0FBQUEsRUFDRSxTQUFTLENBQ1I7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLE1BQU0sY0FBYztBQUNsQixVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sSUFBSSxJQUFJLFlBQVk7QUFDdEMsYUFBSyxZQUFZLElBQUk7QUFBQSxNQUN0QixTQUFRLE9BQVA7QUFDQSxlQUFPLE1BQU0sU0FBUyxLQUFLO0FBQUEsTUFDNUI7QUFBQSxJQUNGO0FBQUEsSUFDRCxNQUFNLFVBQVUsSUFBSTtBQUNsQixVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sSUFBSSxLQUFLLGdCQUFnQixFQUFFO0FB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
