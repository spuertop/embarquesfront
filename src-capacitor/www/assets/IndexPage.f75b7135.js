import { Q as QInput } from "./QInput.1a8b15d7.js";
import { b as QList, a as QItem, Q as QItemSection } from "./QItem.c1e7bfd8.js";
import { _ as _export_sfc, r as ref, a as computed, x as openBlock, y as createBlock, z as withCtx, J as createBaseVNode, A as createVNode, G as createElementBlock, H as renderList, I as Fragment, D as toDisplayString, a7 as withKeys, j as withDirectives, F as QBtn, a8 as Ripple, C as createTextVNode, Q as QIcon } from "./index.af93674c.js";
import { Q as QCard, a as QCardSection, b as QCardActions, c as QDialog, C as ClosePopup } from "./ClosePopup.453e91cc.js";
import { Q as QPage } from "./QPage.01bdf203.js";
import { b as useGlobalStore } from "./global.202de1e2.js";
import { u as useQuasar } from "./use-quasar.bc06e08f.js";
import "./format.801e7424.js";
import "./use-timeout.01474782.js";
import "./axios.91ad12ec.js";
const _sfc_main = {
  setup() {
    const globalStore = useGlobalStore();
    const $q = useQuasar();
    globalStore.getAllusers();
    const filteruser = ref("");
    const logindialog = ref(false);
    const holausertxt = ref("");
    const user = ref("");
    const pass = ref("");
    const filteredList = computed(() => {
      let input = filteruser.value.toLowerCase();
      return globalStore.usersList.filter((item) => item.Nombre.toLowerCase().includes(input) || item.Usuario.toLowerCase().includes(input));
    });
    function showlogindialog(item) {
      logindialog.value = true;
      holausertxt.value = item.Nombre;
      user.value = item.Usuario;
      pass.value = "";
    }
    async function postLogin() {
      logindialog.value = false;
      const error = await globalStore.postLogIn({ user: user.value, pass: pass.value });
      if (error) {
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
      }
    }
    return {
      globalStore,
      filteruser,
      filteredList,
      showlogindialog,
      logindialog,
      holausertxt,
      pass,
      postLogin
    };
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-center text-h4 text-weight-bold" }, " CONFIRMAR CARGAS ", -1);
const _hoisted_2 = { style: { "min-width": "90vw" } };
const _hoisted_3 = { class: "text-h6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex-center q-ma-md" }, {
    default: withCtx(() => [
      _hoisted_1,
      createBaseVNode("div", _hoisted_2, [
        createVNode(QInput, {
          class: "q-my-md",
          outlined: "",
          modelValue: $setup.filteruser,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filteruser = $event),
          label: "Buscar usuario",
          autofocus: ""
        }, null, 8, ["modelValue"]),
        createVNode(QList, {
          bordered: "",
          separator: ""
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.filteredList, (item) => {
              return withDirectives((openBlock(), createBlock(QItem, {
                class: "q-py-md",
                clickable: "",
                key: item.Usuario,
                onClick: ($event) => $setup.showlogindialog(item)
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.Usuario) + " - " + toDisplayString(item.Nombre), 1)
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
      ]),
      createVNode(QDialog, {
        modelValue: $setup.logindialog,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.logindialog = $event),
        persistent: ""
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "min-width": "90vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3, "Hola " + toDisplayString($setup.holausertxt), 1)
                ]),
                _: 1
              }),
              createVNode(QCardSection, { class: "q-pt-none" }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: $setup.pass,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.pass = $event),
                    autofocus: "",
                    type: "password",
                    onKeyup: withKeys($setup.postLogin, ["enter"]),
                    placeholder: "Contrase\xF1a"
                  }, null, 8, ["modelValue", "onKeyup"])
                ]),
                _: 1
              }),
              createVNode(QCardActions, {
                align: "right",
                class: "text-primary"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    "no-caps": "",
                    color: "secondary",
                    label: "Cerrar"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  createVNode(QBtn, {
                    "no-caps": "",
                    color: "accent",
                    label: "Entrar",
                    onClick: $setup.postLogin,
                    disable: $setup.pass.length > 3 ? false : true
                  }, null, 8, ["onClick", "disable"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLmY3NWI3MTM1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cImZsZXgtY2VudGVyIHEtbWEtbWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LWg0IHRleHQtd2VpZ2h0LWJvbGRcIj5cclxuICAgICAgQ09ORklSTUFSIENBUkdBU1xyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBzdHlsZT1cIm1pbi13aWR0aDogOTB2d1wiPlxyXG4gICAgICA8cS1pbnB1dCBjbGFzcz1cInEtbXktbWRcIiBvdXRsaW5lZCB2LW1vZGVsPVwiZmlsdGVydXNlclwiIGxhYmVsPVwiQnVzY2FyIHVzdWFyaW9cIiBhdXRvZm9jdXMgLz5cclxuXHJcbiAgICAgIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yPlxyXG4gICAgICAgIDxxLWl0ZW0gY2xhc3M9XCJxLXB5LW1kXCIgY2xpY2thYmxlIHYtcmlwcGxlIHYtZm9yPVwiaXRlbSBpbiBmaWx0ZXJlZExpc3RcIiA6a2V5PVwiaXRlbS5Vc3VhcmlvXCJcclxuICAgICAgICAgIEBjbGljaz1cInNob3dsb2dpbmRpYWxvZyhpdGVtKVwiPlxyXG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IGl0ZW0uVXN1YXJpbyB9fSAtIHt7IGl0ZW0uTm9tYnJlIH19PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XHJcbiAgICAgICAgICAgIDxxLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImxvZ2luXCIgLz5cclxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgIDwvcS1saXN0PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIEVOVEVSIFBBU1NXT1JEIC0tPlxyXG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJsb2dpbmRpYWxvZ1wiIHBlcnNpc3RlbnQ+XHJcbiAgICAgIDxxLWNhcmQgc3R5bGU9XCJtaW4td2lkdGg6IDkwdndcIj5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkhvbGEge3sgaG9sYXVzZXJ0eHQgfX08L2Rpdj5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIj5cclxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJwYXNzXCIgYXV0b2ZvY3VzIHR5cGU9XCJwYXNzd29yZFwiIEBrZXl1cC5lbnRlcj1cInBvc3RMb2dpblwiIHBsYWNlaG9sZGVyPVwiQ29udHJhc2XDsWFcIiAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj5cclxuICAgICAgICAgIDxxLWJ0biBuby1jYXBzIGNvbG9yPVwic2Vjb25kYXJ5XCIgbGFiZWw9XCJDZXJyYXJcIiB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgICA8cS1idG4gbm8tY2FwcyBjb2xvcj1cImFjY2VudFwiIGxhYmVsPVwiRW50cmFyXCIgQGNsaWNrPVwicG9zdExvZ2luXCIgOmRpc2FibGU9XCJwYXNzLmxlbmd0aCA+IDMgPyBmYWxzZSA6IHRydWVcIiAvPlxyXG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG4gICAgPC9xLWRpYWxvZz5cclxuICA8L3EtcGFnZT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZUdsb2JhbFN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZ2xvYmFsXCJcclxuaW1wb3J0IHsgcmVmIH0gZnJvbSAnQHZ1ZS9yZWFjdGl2aXR5JztcclxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICdAdnVlL3J1bnRpbWUtY29yZSc7XHJcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0dXAoKSB7XHJcbiAgICBjb25zdCBnbG9iYWxTdG9yZSA9IHVzZUdsb2JhbFN0b3JlKCk7XHJcbiAgICBjb25zdCAkcSA9IHVzZVF1YXNhcigpO1xyXG4gICAgZ2xvYmFsU3RvcmUuZ2V0QWxsdXNlcnMoKTtcclxuICAgIGNvbnN0IGZpbHRlcnVzZXIgPSByZWYoJycpO1xyXG4gICAgY29uc3QgbG9naW5kaWFsb2cgPSByZWYoZmFsc2UpO1xyXG4gICAgY29uc3QgaG9sYXVzZXJ0eHQgPSByZWYoJycpO1xyXG4gICAgY29uc3QgdXNlciA9IHJlZignJyk7XHJcbiAgICBjb25zdCBwYXNzID0gcmVmKCcnKTtcclxuICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGNvbXB1dGVkKCgpID0+IHtcclxuICAgICAgbGV0IGlucHV0ID0gZmlsdGVydXNlci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICByZXR1cm4gZ2xvYmFsU3RvcmUudXNlcnNMaXN0LmZpbHRlcihpdGVtID0+XHJcbiAgICAgICAgaXRlbS5Ob21icmUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhpbnB1dCkgfHwgaXRlbS5Vc3VhcmlvLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoaW5wdXQpKVxyXG4gICAgfSlcclxuICAgIGZ1bmN0aW9uIHNob3dsb2dpbmRpYWxvZyhpdGVtKSB7XHJcbiAgICAgIGxvZ2luZGlhbG9nLnZhbHVlID0gdHJ1ZTtcclxuICAgICAgaG9sYXVzZXJ0eHQudmFsdWUgPSBpdGVtLk5vbWJyZTtcclxuICAgICAgdXNlci52YWx1ZSA9IGl0ZW0uVXN1YXJpbztcclxuICAgICAgcGFzcy52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcG9zdExvZ2luKCkge1xyXG4gICAgICBsb2dpbmRpYWxvZy52YWx1ZSA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IGdsb2JhbFN0b3JlLnBvc3RMb2dJbih7IHVzZXI6IHVzZXIudmFsdWUsIHBhc3M6IHBhc3MudmFsdWUgfSk7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICRxLm5vdGlmeSh7XHJcbiAgICAgICAgICB0eXBlOiAnbmVnYXRpdmUnLFxyXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IsXHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICB0aW1lb3V0OiAxMDAwMCxcclxuICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgeyBsYWJlbDogJycsIGljb246ICdjbG9zZScsIGNvbG9yOiAnd2hpdGUnLCBoYW5kbGVyOiAoKSA9PiB7IH0gfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdsb2JhbFN0b3JlLFxyXG4gICAgICBmaWx0ZXJ1c2VyLFxyXG4gICAgICBmaWx0ZXJlZExpc3QsXHJcbiAgICAgIHNob3dsb2dpbmRpYWxvZyxcclxuICAgICAgbG9naW5kaWFsb2csXHJcbiAgICAgIGhvbGF1c2VydHh0LFxyXG4gICAgICBwYXNzLFxyXG4gICAgICBwb3N0TG9naW5cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBNkNBLE1BQUssWUFBVTtBQUFBLEVBQ2IsUUFBUTtBQUNO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
