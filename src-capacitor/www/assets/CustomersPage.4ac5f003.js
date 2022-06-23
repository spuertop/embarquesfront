import { b as QList, a as QItem, Q as QItemSection } from "./QItem.c1e7bfd8.js";
import { _ as _export_sfc, x as openBlock, y as createBlock, z as withCtx, J as createBaseVNode, A as createVNode, G as createElementBlock, H as renderList, I as Fragment, j as withDirectives, a8 as Ripple, C as createTextVNode, D as toDisplayString, Q as QIcon } from "./index.af93674c.js";
import { Q as QPage } from "./QPage.01bdf203.js";
import { b as useGlobalStore } from "./global.202de1e2.js";
import "./axios.91ad12ec.js";
const _sfc_main = {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.getAllCustomers();
    function selectedCustomer(item) {
      globalStore.setCustomer(item.Empresa);
    }
    return {
      globalStore,
      selectedCustomer
    };
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-center text-h4 text-weight-bold" }, " Cliente ", -1);
const _hoisted_2 = { style: { "min-width": "90vw" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex-center q-pa-md" }, {
    default: withCtx(() => [
      _hoisted_1,
      createBaseVNode("div", _hoisted_2, [
        createVNode(QList, {
          bordered: "",
          separator: ""
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.globalStore.customersList, (item) => {
              return withDirectives((openBlock(), createBlock(QItem, {
                class: "q-py-md",
                clickable: "",
                key: item.Empresa,
                onClick: ($event) => $setup.selectedCustomer(item)
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.Empresa), 1)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QItemSection, { avatar: "" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        color: "primary",
                        name: "login"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 2
              }, 1032, ["onClick"])), [
                [Ripple]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ])
    ]),
    _: 1
  });
}
var CustomersPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "CustomersPage.vue"]]);
export { CustomersPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJzUGFnZS40YWM1ZjAwMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL0N1c3RvbWVyc1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8cS1wYWdlIGNsYXNzPVwiZmxleC1jZW50ZXIgcS1wYS1tZFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtaDQgdGV4dC13ZWlnaHQtYm9sZFwiPlxyXG4gICAgICBDbGllbnRlXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgc3R5bGU9XCJtaW4td2lkdGg6IDkwdndcIj5cclxuICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3I+XHJcbiAgICAgICAgPHEtaXRlbSBjbGFzcz1cInEtcHktbWRcIiBjbGlja2FibGUgdi1yaXBwbGUgdi1mb3I9XCJpdGVtIGluIGdsb2JhbFN0b3JlLmN1c3RvbWVyc0xpc3RcIiA6a2V5PVwiaXRlbS5FbXByZXNhXCJcclxuICAgICAgICAgIEBjbGljaz1cInNlbGVjdGVkQ3VzdG9tZXIoaXRlbSlcIj5cclxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj57eyBpdGVtLkVtcHJlc2EgfX0gPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XHJcbiAgICAgICAgICAgIDxxLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImxvZ2luXCIgLz5cclxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgIDwvcS1saXN0PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZUdsb2JhbFN0b3JlIH0gZnJvbSAnc3JjL3N0b3Jlcy9nbG9iYWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0dXAoKSB7XHJcbiAgICBjb25zdCBnbG9iYWxTdG9yZSA9IHVzZUdsb2JhbFN0b3JlKCk7XHJcbiAgICBnbG9iYWxTdG9yZS5nZXRBbGxDdXN0b21lcnMoKTtcclxuICAgIGZ1bmN0aW9uIHNlbGVjdGVkQ3VzdG9tZXIoaXRlbSkge1xyXG4gICAgICBnbG9iYWxTdG9yZS5zZXRDdXN0b21lcihpdGVtLkVtcHJlc2EpXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBnbG9iYWxTdG9yZSxcclxuICAgICAgc2VsZWN0ZWRDdXN0b21lclxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQXFCQSxNQUFLLFlBQVU7QUFBQSxFQUNiLFFBQVE7QUFDTixVQUFNLGNBQWM7QUFDcEIsZ0JBQVksZ0JBQWU7QUFDM0IsOEJBQTBCLE1BQU07QUFDOUIsa0JBQVksWUFBWSxLQUFLLE9BQU87QUFBQSxJQUN0QztBQUNBLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUEvQkksTUFBQSxhQUFBQSxnQ0FFTSxPQUZELEVBQUEsT0FBTSwwQ0FBdUMsYUFFbEQsRUFBQTtBQUNLLE1BQUEsYUFBQSxFQUFBLE9BQUEsRUFBdUIsYUFBQSxPQUFBLEVBQUE7O3NCQUo5QkMsWUFlUyxPQUFBLEVBQUEsT0FBQSx5QkFmMEI7QUFBQSxxQkFDakMsTUFFTTtBQUFBLE1BRk47QUFBQSxNQUdBRCxnQkFVTSxPQVZOLFlBVU07QUFBQSxRQVRKRSxZQVFTLE9BQUE7QUFBQSxVQVJELFVBQUE7QUFBQSxVQUFTLFdBQUE7QUFBQTsyQkFDNEIsTUFBeUM7QUFBQSxZQUFwRkMsV0FBQSxJQUFBLEdBQUFDLG1CQU1TQyxVQU5pRCxNQUFBQyxXQUFBLE9BQUEsWUFBWSxnQkFBcEIsU0FBSTtrREFBdERMLFlBTVMsT0FBQTtBQUFBLGdCQU5ELE9BQU07QUFBQSxnQkFBVSxXQUFBO0FBQUEsZ0JBQThELEtBQUssS0FBSztBQUFBLGdCQUM3RixTQUFLLFlBQUUsT0FBZ0IsaUJBQUMsSUFBSTtBQUFBO2lDQUM3QixNQUFvRDtBQUFBLGtCQUFwREMsWUFBb0QsY0FBQSxNQUFBO0FBQUEscUNBQXBDLE1BQWtCO0FBQUEsc0JBQWZLLGdCQUFBQyxnQkFBQSxLQUFLLE9BQU8sR0FBQSxDQUFBO0FBQUE7OztrQkFDL0JOLFlBRWlCLGNBQUEsRUFBQSxRQUFBLEdBQUEsR0FGSztBQUFBLHFDQUNwQixNQUF1QztBQUFBLHNCQUF2Q0EsWUFBdUMsT0FBQTtBQUFBLHdCQUEvQixPQUFNO0FBQUEsd0JBQVUsTUFBSztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
