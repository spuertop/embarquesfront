import { Q as QInput } from "./QInput.1a8b15d7.js";
import { Q as QPage } from "./QPage.01bdf203.js";
import { b as useGlobalStore } from "./global.202de1e2.js";
import { _ as _export_sfc, r as ref, x as openBlock, y as createBlock, z as withCtx, J as createBaseVNode, C as createTextVNode, D as toDisplayString, A as createVNode, a7 as withKeys } from "./index.af93674c.js";
import { u as useQuasar } from "./use-quasar.bc06e08f.js";
import "./format.801e7424.js";
import "./axios.91ad12ec.js";
const _sfc_main = {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.aeinfo = "";
    globalStore.aedocument = "";
    const $q = useQuasar();
    const numae = ref("");
    async function searchae() {
      let value = numae.value.trim();
      if (value) {
        let query = {
          albaran: numae.value,
          empresa: globalStore.customer
        };
        let error = await globalStore.getDeliveryInfo(query);
        if (error) {
          numae.value = "";
          $q.notify({
            type: "negative",
            message: error,
            position: "center",
            timeout: 1e4,
            actions: [
              { label: "", icon: "close", color: "white", handler: () => {
              } }
            ]
          });
        } else {
          globalStore.aedocument = numae.value;
        }
      }
    }
    return {
      globalStore,
      numae,
      searchae
    };
  }
};
const _hoisted_1 = { class: "text-center text-h4 text-weight-bold" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("hr", null, null, -1);
const _hoisted_3 = { class: "q-pa-md" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("span", null, "N\xFAmero de Albar\xE1n de Entrega", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex-center q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createTextVNode(" Cliente " + toDisplayString($setup.globalStore.customer) + " ", 1),
        _hoisted_2
      ]),
      createBaseVNode("div", _hoisted_3, [
        _hoisted_4,
        createVNode(QInput, {
          modelValue: $setup.numae,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.numae = $event),
          onKeyup: withKeys($setup.searchae, ["enter"]),
          filled: "",
          autofocus: "",
          hint: "Pistolear AE a cargar o descargar"
        }, null, 8, ["modelValue", "onKeyup"])
      ])
    ]),
    _: 1
  });
}
var DocumentPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "DocumentPage.vue"]]);
export { DocumentPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRQYWdlLjJkYjBjYTZmLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvRG9jdW1lbnRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cImZsZXgtY2VudGVyIHEtcGEtbWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LWg0IHRleHQtd2VpZ2h0LWJvbGRcIj5cclxuICAgICAgQ2xpZW50ZSB7eyBnbG9iYWxTdG9yZS5jdXN0b21lciB9fVxyXG4gICAgICA8aHI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCI+XHJcbiAgICAgIDxzcGFuPk7Dum1lcm8gZGUgQWxiYXLDoW4gZGUgRW50cmVnYTwvc3Bhbj5cclxuICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIm51bWFlXCIgQGtleXVwLmVudGVyPVwic2VhcmNoYWVcIiBmaWxsZWQgYXV0b2ZvY3VzIGhpbnQ9XCJQaXN0b2xlYXIgQUUgYSBjYXJnYXIgbyBkZXNjYXJnYXJcIiAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIDxwcmU+e3sgZ2xvYmFsU3RvcmUuYWVpbmZvIH19PC9wcmU+IC0tPlxyXG4gIDwvcS1wYWdlPlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VHbG9iYWxTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyByZWYgfSBmcm9tICdAdnVlL3JlYWN0aXZpdHknO1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNldHVwKCkge1xyXG4gICAgY29uc3QgZ2xvYmFsU3RvcmUgPSB1c2VHbG9iYWxTdG9yZSgpO1xyXG4gICAgZ2xvYmFsU3RvcmUuYWVpbmZvID0gJyc7XHJcbiAgICBnbG9iYWxTdG9yZS5hZWRvY3VtZW50ID0gJyc7XHJcbiAgICBjb25zdCAkcSA9IHVzZVF1YXNhcigpO1xyXG4gICAgY29uc3QgbnVtYWUgPSByZWYoJycpO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2VhcmNoYWUoKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IG51bWFlLnZhbHVlLnRyaW0oKTtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge1xyXG4gICAgICAgICAgYWxiYXJhbjogbnVtYWUudmFsdWUsXHJcbiAgICAgICAgICBlbXByZXNhOiBnbG9iYWxTdG9yZS5jdXN0b21lclxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXJyb3IgPSBhd2FpdCBnbG9iYWxTdG9yZS5nZXREZWxpdmVyeUluZm8ocXVlcnkpXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICBudW1hZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgJHEubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgdGltZW91dDogMTAwMDAsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7IGxhYmVsOiAnJywgaWNvbjogJ2Nsb3NlJywgY29sb3I6ICd3aGl0ZScsIGhhbmRsZXI6ICgpID0+IHsgfSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdsb2JhbFN0b3JlLmFlZG9jdW1lbnQgPSBudW1hZS52YWx1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdsb2JhbFN0b3JlLFxyXG4gICAgICBudW1hZSxcclxuICAgICAgc2VhcmNoYWVcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFrQkEsTUFBSyxZQUFVO0FBQUEsRUFDYixRQUFRO0FBQ04sVUFBTSxjQUFjO0FBQ3BCLGdCQUFZLFNBQVM7QUFDckIsZ0JBQVksYUFBYTtBQUN6QixVQUFNLEtBQUs7QUFDWCxVQUFNLFFBQVEsSUFBSSxFQUFFO0FBQ3BCLDhCQUEwQjtBQUN4QixVQUFJLFFBQVEsTUFBTSxNQUFNLEtBQUk7QUFDNUIsVUFBSSxPQUFPO0FBQ1QsWUFBSSxRQUFRO0FBQUEsVUFDVixTQUFTLE1BQU07QUFBQSxVQUNmLFNBQVMsWUFBWTtBQUFBLFFBQ3ZCO0FBQ0EsWUFBSSxRQUFRLE1BQU0sWUFBWSxnQkFBZ0IsS0FBSztBQUNuRCxZQUFJLE9BQU87QUFDVCxnQkFBTSxRQUFRO0FBQ2QsYUFBRyxPQUFPO0FBQUEsWUFDUixNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsWUFDVCxVQUFVO0FBQUEsWUFDVixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxFQUFFLE9BQU8sSUFBSSxNQUFNLFNBQVMsT0FBTyxTQUFTLFNBQVMsTUFBTTtBQUFBLGdCQUFJO0FBQUEsWUFDakU7QUFBQSxXQUNEO0FBQUEsZUFDSTtBQUNMLHNCQUFZLGFBQWEsTUFBTTtBQUFBLFFBQ2pDO0FBQUEsTUFFRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQXREUyxNQUFBLGFBQUEsRUFBQSxPQUFNLHVDQUFzQzttQkFFL0NBLGdDQUFJLE1BQUEsTUFBQSxNQUFBLEVBQUE7QUFFRCxNQUFBLGFBQUEsRUFBQSxPQUFNLFVBQVM7QUFDbEIsTUFBQSxhQUFBQSxnQ0FBeUMsY0FBbkMsc0NBQTRCLEVBQUE7O3NCQU50Q0MsWUFVUyxPQUFBLEVBQUEsT0FBQSx5QkFWMEI7QUFBQSxxQkFDakMsTUFHTTtBQUFBLE1BSE5ELGdCQUdNLE9BSE4sWUFHTTtBQUFBLFFBSDRDRSxnQkFBQSxjQUNyQ0MsZ0JBQUEsT0FBQSxZQUFZLFFBQVEsSUFBRyxLQUNsQyxDQUFBO0FBQUEsUUFBQTtBQUFBO01BRUZILGdCQUdNLE9BSE4sWUFHTTtBQUFBLFFBRko7QUFBQSxRQUNBSSxZQUE2RyxRQUFBO0FBQUEsc0JBQTNGLE9BQUs7QUFBQSx1RUFBTCxPQUFLLFFBQUE7QUFBQSxVQUFHLGtCQUFhLE9BQVEsVUFBQSxDQUFBLE9BQUEsQ0FBQTtBQUFBLFVBQUUsUUFBQTtBQUFBLFVBQU8sV0FBQTtBQUFBLFVBQVUsTUFBSztBQUFBOzs7Ozs7OzsifQ==
