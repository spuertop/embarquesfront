import { r as ref, a as computed, h, c as createComponent, aa as useSizeProps, ab as useSize, ax as toRaw, Q as QIcon, u as hMergeSlot, d as hSlot, g as getCurrentInstance, O as stopAndPrevent, i as inject, l as layoutKey } from "./index.af93674c.js";
import { u as useDarkProps, a as useDark } from "./global.202de1e2.js";
import { u as useFormProps, c as useFormInject } from "./QInput.1a8b15d7.js";
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable !== true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
var QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
    const classes = computed(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props.dense === true ? " q-radio--dense" : "") + (props.leftLabel === true ? " reverse" : ""));
    const innerClass = computed(() => {
      const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(() => (isTrue.value === true ? props.checkedIcon : props.uncheckedIcon) || null);
    const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props.name !== void 0 && Object.assign(prop, {
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props.name,
        value: props.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props.disable !== true && isTrue.value !== true) {
        emit("update:modelValue", props.val, e);
      }
    }
    function onKeydown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props.disable !== true && injectFormInput(content, "unshift", " q-radio__native q-ma-none q-pa-none");
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
      label !== void 0 && child.push(h("div", {
        class: "q-radio__label q-anchor--skip"
      }, label));
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props.disable === true ? "true" : void 0,
        onClick,
        onKeydown,
        onKeyup
      }, child);
    };
  }
});
const usePageStickyProps = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (v) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(v)
  },
  offset: {
    type: Array,
    validator: (v) => v.length === 2
  },
  expand: Boolean
};
function usePageSticky() {
  const { props, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const $layout = inject(layoutKey, () => {
    console.error("QPageSticky needs to be child of QLayout");
  });
  const attach = computed(() => {
    const pos = props.position;
    return {
      top: pos.indexOf("top") > -1,
      right: pos.indexOf("right") > -1,
      bottom: pos.indexOf("bottom") > -1,
      left: pos.indexOf("left") > -1,
      vertical: pos === "top" || pos === "bottom",
      horizontal: pos === "left" || pos === "right"
    };
  });
  const top = computed(() => $layout.header.offset);
  const right = computed(() => $layout.right.offset);
  const bottom = computed(() => $layout.footer.offset);
  const left = computed(() => $layout.left.offset);
  const style = computed(() => {
    let posX = 0, posY = 0;
    const side = attach.value;
    const dir = $q.lang.rtl === true ? -1 : 1;
    if (side.top === true && top.value !== 0) {
      posY = `${top.value}px`;
    } else if (side.bottom === true && bottom.value !== 0) {
      posY = `${-bottom.value}px`;
    }
    if (side.left === true && left.value !== 0) {
      posX = `${dir * left.value}px`;
    } else if (side.right === true && right.value !== 0) {
      posX = `${-dir * right.value}px`;
    }
    const css = { transform: `translate(${posX}, ${posY})` };
    if (props.offset) {
      css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
    }
    if (side.vertical === true) {
      if (left.value !== 0) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${left.value}px`;
      }
      if (right.value !== 0) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${right.value}px`;
      }
    } else if (side.horizontal === true) {
      if (top.value !== 0) {
        css.top = `${top.value}px`;
      }
      if (bottom.value !== 0) {
        css.bottom = `${bottom.value}px`;
      }
    }
    return css;
  });
  const classes = computed(() => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand === true ? "expand" : "shrink"}`);
  function getStickyContent(slots) {
    const content = hSlot(slots.default);
    return h("div", {
      class: classes.value,
      style: style.value
    }, props.expand === true ? content : [h("div", content)]);
  }
  return {
    $layout,
    getStickyContent
  };
}
var QPageSticky = createComponent({
  name: "QPageSticky",
  props: usePageStickyProps,
  setup(_, { slots }) {
    const { getStickyContent } = usePageSticky();
    return () => getStickyContent(slots);
  }
});
export { QRadio as Q, QPageSticky as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVBhZ2VTdGlja3kuNjYyYmJkMWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9vcHRpb24tc2l6ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3JhZGlvL1FSYWRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcGFnZS1zdGlja3kvdXNlLXBhZ2Utc3RpY2t5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlLXN0aWNreS9RUGFnZVN0aWNreS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcmVmIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJvb3RSZWYpIHtcbiAgY29uc3QgcmVmb2N1c1JlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IHJlZm9jdXNUYXJnZXRFbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gaCgnc3BhbicsIHtcbiAgICAgIHJlZjogcmVmb2N1c1JlZixcbiAgICAgIGNsYXNzOiAnbm8tb3V0bGluZScsXG4gICAgICB0YWJpbmRleDogLTFcbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlZm9jdXNUYXJnZXQgKGUpIHtcbiAgICBjb25zdCByb290ID0gcm9vdFJlZi52YWx1ZVxuXG4gICAgaWYgKGUgIT09IHZvaWQgMCAmJiBlLnR5cGUuaW5kZXhPZigna2V5JykgPT09IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAgcm9vdCAhPT0gbnVsbFxuICAgICAgICAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSByb290XG4gICAgICAgICYmIHJvb3QuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWVcbiAgICAgICkge1xuICAgICAgICByb290LmZvY3VzKClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICByZWZvY3VzUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAmJiAoZSA9PT0gdm9pZCAwIHx8IChyb290ICE9PSBudWxsICYmIHJvb3QuY29udGFpbnMoZS50YXJnZXQpID09PSB0cnVlKSlcbiAgICApIHtcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVmb2N1c1RhcmdldEVsLFxuICAgIHJlZm9jdXNUYXJnZXRcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICB4czogMzAsXG4gIHNtOiAzNSxcbiAgbWQ6IDQwLFxuICBsZzogNTAsXG4gIHhsOiA2MFxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCB0b1JhdyB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHVzZVJlZm9jdXNUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmVmb2N1cy10YXJnZXQuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbmplY3QgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCBvcHRpb25TaXplcyBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL29wdGlvbi1zaXplcy5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBzdmcgPSBoKCdzdmcnLCB7XG4gIGtleTogJ3N2ZycsXG4gIGNsYXNzOiAncS1yYWRpb19fYmcgYWJzb2x1dGUgbm9uLXNlbGVjdGFibGUnLFxuICB2aWV3Qm94OiAnMCAwIDI0IDI0JyxcbiAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG59LCBbXG4gIGgoJ3BhdGgnLCB7XG4gICAgZDogJ00xMiwyMmExMCwxMCAwIDAgMSAtMTAsLTEwYTEwLDEwIDAgMCAxIDEwLC0xMGExMCwxMCAwIDAgMSAxMCwxMGExMCwxMCAwIDAgMSAtMTAsMTBtMCwtMjJhMTIsMTIgMCAwIDAgLTEyLDEyYTEyLDEyIDAgMCAwIDEyLDEyYTEyLDEyIDAgMCAwIDEyLC0xMmExMiwxMiAwIDAgMCAtMTIsLTEyJ1xuICB9KSxcblxuICBoKCdwYXRoJywge1xuICAgIGNsYXNzOiAncS1yYWRpb19fY2hlY2snLFxuICAgIGQ6ICdNMTIsNmE2LDYgMCAwIDAgLTYsNmE2LDYgMCAwIDAgNiw2YTYsNiAwIDAgMCA2LC02YTYsNiAwIDAgMCAtNiwtNidcbiAgfSlcbl0pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUmFkaW8nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgdmFsOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcblxuICAgIGNoZWNrZWRJY29uOiBTdHJpbmcsXG4gICAgdW5jaGVja2VkSWNvbjogU3RyaW5nLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgb3B0aW9uU2l6ZXMpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgeyByZWZvY3VzVGFyZ2V0RWwsIHJlZm9jdXNUYXJnZXQgfSA9IHVzZVJlZm9jdXNUYXJnZXQocHJvcHMsIHJvb3RSZWYpXG5cbiAgICBjb25zdCBpc1RydWUgPSBjb21wdXRlZCgoKSA9PiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMudmFsKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtcmFkaW8gY3Vyc29yLXBvaW50ZXIgbm8tb3V0bGluZSByb3cgaW5saW5lIG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtcmFkaW8tLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1yYWRpby0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5sZWZ0TGFiZWwgPT09IHRydWUgPyAnIHJldmVyc2UnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgaW5uZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiAoXG4gICAgICAgIHByb3BzLmtlZXBDb2xvciA9PT0gdHJ1ZVxuICAgICAgICB8fCBpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgIClcbiAgICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgICAgOiAnJ1xuXG4gICAgICByZXR1cm4gJ3EtcmFkaW9fX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uICdcbiAgICAgICAgKyBgcS1yYWRpb19faW5uZXItLSR7IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnV0aHknIDogJ2ZhbHN5JyB9JHsgY29sb3IgfWBcbiAgICB9KVxuXG4gICAgY29uc3QgaWNvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAoaXNUcnVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY2hlY2tlZEljb25cbiAgICAgICAgOiBwcm9wcy51bmNoZWNrZWRJY29uXG4gICAgICApIHx8IG51bGxcbiAgICApXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAtMSA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgICApKVxuXG4gICAgY29uc3QgZm9ybUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IHsgdHlwZTogJ3JhZGlvJyB9XG5cbiAgICAgIHByb3BzLm5hbWUgIT09IHZvaWQgMCAmJiBPYmplY3QuYXNzaWduKHByb3AsIHtcbiAgICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgICB2YWx1ZTogcHJvcHMudmFsXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcFxuICAgIH0pXG5cbiAgICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgcmVmb2N1c1RhcmdldChlKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc1RydWUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy52YWwsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBvbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzZXQ6IG9uQ2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaWNvbi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaWNvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1yYWRpb19faWNvbi1jb250YWluZXIgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2ljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgc3ZnIF1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbmplY3RGb3JtSW5wdXQoXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgICd1bnNoaWZ0JyxcbiAgICAgICAgJyBxLXJhZGlvX19uYXRpdmUgcS1tYS1ub25lIHEtcGEtbm9uZSdcbiAgICAgIClcblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlXG4gICAgICAgIH0sIGNvbnRlbnQpXG4gICAgICBdXG5cbiAgICAgIGlmIChyZWZvY3VzVGFyZ2V0RWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY2hpbGQucHVzaChyZWZvY3VzVGFyZ2V0RWwudmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgICA6IGhTbG90KHNsb3RzLmRlZmF1bHQpXG5cbiAgICAgIGxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1yYWRpb19fbGFiZWwgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGxhYmVsKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgIHJvbGU6ICdyYWRpbycsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgICdhcmlhLWNoZWNrZWQnOiBpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAndHJ1ZScgOiB2b2lkIDAsXG4gICAgICAgIG9uQ2xpY2ssXG4gICAgICAgIG9uS2V5ZG93bixcbiAgICAgICAgb25LZXl1cFxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlUGFnZVN0aWNreVByb3BzID0ge1xuICBwb3NpdGlvbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnYm90dG9tLXJpZ2h0JyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gW1xuICAgICAgJ3RvcC1yaWdodCcsICd0b3AtbGVmdCcsXG4gICAgICAnYm90dG9tLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JyxcbiAgICAgICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXG4gICAgXS5pbmNsdWRlcyh2KVxuICB9LFxuICBvZmZzZXQ6IHtcbiAgICB0eXBlOiBBcnJheSxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdi5sZW5ndGggPT09IDJcbiAgfSxcbiAgZXhwYW5kOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksICgpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdRUGFnZVN0aWNreSBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgfSlcblxuICBjb25zdCBhdHRhY2ggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcG9zID0gcHJvcHMucG9zaXRpb25cblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHBvcy5pbmRleE9mKCd0b3AnKSA+IC0xLFxuICAgICAgcmlnaHQ6IHBvcy5pbmRleE9mKCdyaWdodCcpID4gLTEsXG4gICAgICBib3R0b206IHBvcy5pbmRleE9mKCdib3R0b20nKSA+IC0xLFxuICAgICAgbGVmdDogcG9zLmluZGV4T2YoJ2xlZnQnKSA+IC0xLFxuICAgICAgdmVydGljYWw6IHBvcyA9PT0gJ3RvcCcgfHwgcG9zID09PSAnYm90dG9tJyxcbiAgICAgIGhvcml6b250YWw6IHBvcyA9PT0gJ2xlZnQnIHx8IHBvcyA9PT0gJ3JpZ2h0J1xuICAgIH1cbiAgfSlcblxuICBjb25zdCB0b3AgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LmhlYWRlci5vZmZzZXQpXG4gIGNvbnN0IHJpZ2h0ID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5yaWdodC5vZmZzZXQpXG4gIGNvbnN0IGJvdHRvbSA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQuZm9vdGVyLm9mZnNldClcbiAgY29uc3QgbGVmdCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQubGVmdC5vZmZzZXQpXG5cbiAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgbGV0IHBvc1ggPSAwLCBwb3NZID0gMFxuXG4gICAgY29uc3Qgc2lkZSA9IGF0dGFjaC52YWx1ZVxuICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxXG5cbiAgICBpZiAoc2lkZS50b3AgPT09IHRydWUgJiYgdG9wLnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NZID0gYCR7IHRvcC52YWx1ZSB9cHhgXG4gICAgfVxuICAgIGVsc2UgaWYgKHNpZGUuYm90dG9tID09PSB0cnVlICYmIGJvdHRvbS52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWSA9IGAkeyAtYm90dG9tLnZhbHVlIH1weGBcbiAgICB9XG5cbiAgICBpZiAoc2lkZS5sZWZ0ID09PSB0cnVlICYmIGxlZnQudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1ggPSBgJHsgZGlyICogbGVmdC52YWx1ZSB9cHhgXG4gICAgfVxuICAgIGVsc2UgaWYgKHNpZGUucmlnaHQgPT09IHRydWUgJiYgcmlnaHQudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1ggPSBgJHsgLWRpciAqIHJpZ2h0LnZhbHVlIH1weGBcbiAgICB9XG5cbiAgICBjb25zdCBjc3MgPSB7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgkeyBwb3NYIH0sICR7IHBvc1kgfSlgIH1cblxuICAgIGlmIChwcm9wcy5vZmZzZXQpIHtcbiAgICAgIGNzcy5tYXJnaW4gPSBgJHsgcHJvcHMub2Zmc2V0WyAxIF0gfXB4ICR7IHByb3BzLm9mZnNldFsgMCBdIH1weGBcbiAgICB9XG5cbiAgICBpZiAoc2lkZS52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGxlZnQudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXSA9IGAkeyBsZWZ0LnZhbHVlIH1weGBcbiAgICAgIH1cbiAgICAgIGlmIChyaWdodC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdID0gYCR7IHJpZ2h0LnZhbHVlIH1weGBcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5ob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBpZiAodG9wLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzcy50b3AgPSBgJHsgdG9wLnZhbHVlIH1weGBcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b20udmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyBib3R0b20udmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjc3NcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS1wYWdlLXN0aWNreSByb3cgZmxleC1jZW50ZXIgZml4ZWQtJHsgcHJvcHMucG9zaXRpb24gfWBcbiAgICArIGAgcS1wYWdlLXN0aWNreS0tJHsgcHJvcHMuZXhwYW5kID09PSB0cnVlID8gJ2V4cGFuZCcgOiAnc2hyaW5rJyB9YFxuICApXG5cbiAgZnVuY3Rpb24gZ2V0U3RpY2t5Q29udGVudCAoc2xvdHMpIHtcbiAgICBjb25zdCBjb250ZW50ID0gaFNsb3Qoc2xvdHMuZGVmYXVsdClcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sXG4gICAgcHJvcHMuZXhwYW5kID09PSB0cnVlXG4gICAgICA/IGNvbnRlbnRcbiAgICAgIDogWyBoKCdkaXYnLCBjb250ZW50KSBdXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAkbGF5b3V0LFxuICAgIGdldFN0aWNreUNvbnRlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlUGFnZVN0aWNreSwgeyB1c2VQYWdlU3RpY2t5UHJvcHMgfSBmcm9tICcuL3VzZS1wYWdlLXN0aWNreSdcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlU3RpY2t5JyxcblxuICBwcm9wczogdXNlUGFnZVN0aWNreVByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGdldFN0aWNreUNvbnRlbnQgfSA9IHVzZVBhZ2VTdGlja3koKVxuICAgIHJldHVybiAoKSA9PiBnZXRTdGlja3lDb250ZW50KHNsb3RzKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVlLDBCQUFVLE9BQU8sU0FBUztBQUN2QyxRQUFNLGFBQWEsSUFBSSxJQUFJO0FBRTNCLFFBQU0sa0JBQWtCLFNBQVMsTUFBTTtBQUNyQyxRQUFJLE1BQU0sWUFBWSxNQUFNO0FBQzFCLGFBQU87QUFBQSxJQUNSO0FBRUQsV0FBTyxFQUFFLFFBQVE7QUFBQSxNQUNmLEtBQUs7QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxJQUNoQixDQUFLO0FBQUEsRUFDTCxDQUFHO0FBRUQseUJBQXdCLEdBQUc7QUFDekIsVUFBTSxPQUFPLFFBQVE7QUFFckIsUUFBSSxNQUFNLFVBQVUsRUFBRSxLQUFLLFFBQVEsS0FBSyxNQUFNLEdBQUc7QUFDL0MsVUFDRSxTQUFTLFFBQ04sU0FBUyxrQkFBa0IsUUFDM0IsS0FBSyxTQUFTLFNBQVMsYUFBYSxNQUFNLE1BQzdDO0FBQ0EsYUFBSyxNQUFPO0FBQUEsTUFDYjtBQUFBLElBQ0YsV0FFQyxXQUFXLFVBQVUsUUFDakIsT0FBTSxVQUFXLFNBQVMsUUFBUSxLQUFLLFNBQVMsRUFBRSxNQUFNLE1BQU0sT0FDbEU7QUFDQSxpQkFBVyxNQUFNLE1BQU87QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNEO0FBQ0g7QUN6Q0EsSUFB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