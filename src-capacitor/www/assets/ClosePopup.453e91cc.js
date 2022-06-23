import { c as createComponent, a as computed, h, d as hSlot, al as useAlignProps, am as useAlign, g as getCurrentInstance, o as onBeforeUnmount, n as nextTick, an as getParentVm, r as ref, t as onUnmounted, ao as Teleport, ap as createGlobalNode, aq as removeGlobalNode, N as isKeyCode, U as client, w as watch, aj as Transition, ar as childHasFocus, T as createDirective } from "./index.af93674c.js";
import { u as useDarkProps, a as useDark } from "./global.202de1e2.js";
import { u as useModelToggleProps, a as useModelToggleEmits, b as useTimeout, c as useModelToggle, d as useHistory, e as usePreventScroll } from "./use-timeout.01474782.js";
import { r as removeFocusWaitFlag, a as addFocusWaitFlag, b as addFocusFn } from "./QInput.1a8b15d7.js";
var QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`);
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(() => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`);
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(() => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : ""));
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
function useTick() {
  let tickFn;
  onBeforeUnmount(() => {
    tickFn = void 0;
  });
  return {
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          tickFn();
          tickFn = void 0;
        }
      });
    },
    removeTick() {
      tickFn = void 0;
    }
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
const portalList = [];
function getPortalVm(el) {
  return portalList.find((vm) => vm.__qPortalInnerRef.value !== null && vm.__qPortalInnerRef.value.contains(el));
}
function closePortalMenus(vm, evt) {
  do {
    if (vm.$options.name === "QMenu") {
      vm.hide(evt);
      if (vm.$props.separateClosePopup === true) {
        return getParentVm(vm);
      }
    } else if (vm.__qPortalInnerRef !== void 0) {
      const parent = getParentVm(vm);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        vm.hide(evt);
        return parent;
      } else {
        return vm;
      }
    }
    vm = getParentVm(vm);
  } while (vm !== void 0 && vm !== null);
}
function closePortals(vm, evt, depth) {
  while (depth !== 0 && vm !== void 0 && vm !== null) {
    if (vm.__qPortalInnerRef !== void 0) {
      depth--;
      if (vm.$options.name === "QMenu") {
        vm = closePortalMenus(vm, evt);
        continue;
      }
      vm.hide(evt);
    }
    vm = getParentVm(vm);
  }
}
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, checkGlobalDialog) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = checkGlobalDialog === true && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode();
      }
      portalIsActive.value = true;
      portalList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) {
      return;
    }
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalList.indexOf(vm.proxy);
    if (index > -1) {
      portalList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  Object.assign(vm.proxy, { __qPortalInnerRef: innerRef });
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, renderPortalContent())] : void 0
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index > -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index > -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const transitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escape-key"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const transitionState = ref(false);
    const animating = ref(false);
    let shakeTimeout, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(() => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(vm, innerRef, renderPortalContent, true);
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : ""));
    const transitionShow = computed(() => "q-transition--" + (props.transitionShow === void 0 ? transitions[props.position][0] : props.transitionShow));
    const transitionHide = computed(() => "q-transition--" + (props.transitionHide === void 0 ? transitions[props.position][1] : props.transitionHide));
    const transition = computed(() => transitionState.value === true ? transitionHide.value : transitionShow.value);
    const transitionStyle = computed(() => `--q-transition-duration: ${props.transitionDuration}ms`);
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(showing, (val) => {
      nextTick(() => {
        transitionState.value = val;
      });
    });
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      removeTimeout();
      removeTick();
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - height, bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2));
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTimeout();
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        refocusTarget.focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = node.querySelector(selector || "[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake() {
      focus();
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escape-key");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      clearTimeout(shakeTimeout);
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: transitionStyle.value,
          "aria-hidden": "true",
          onMousedown: onBackdropClick
        }) : null),
        h(Transition, { name: transition.value, appear: true }, () => showing.value === true ? h("div", {
          ref: innerRef,
          class: classes.value,
          style: transitionStyle.value,
          tabindex: -1,
          ...onEvents.value
        }, hSlot(slots.default)) : null)
      ]);
    }
    return renderPortal;
  }
});
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
var ClosePopup = createDirective({
  name: "close-popup",
  beforeMount(el, { value }) {
    const ctx = {
      depth: getDepth(value),
      handler(evt) {
        ctx.depth !== 0 && setTimeout(() => {
          const vm = getPortalVm(el);
          if (vm !== void 0) {
            closePortals(vm, evt, ctx.depth);
          }
        });
      },
      handlerKey(evt) {
        isKeyCode(evt, 13) === true && ctx.handler(evt);
      }
    };
    el.__qclosepopup = ctx;
    el.addEventListener("click", ctx.handler);
    el.addEventListener("keyup", ctx.handlerKey);
  },
  updated(el, { value, oldValue }) {
    if (value !== oldValue) {
      el.__qclosepopup.depth = getDepth(value);
    }
  },
  beforeUnmount(el) {
    const ctx = el.__qclosepopup;
    el.removeEventListener("click", ctx.handler);
    el.removeEventListener("keyup", ctx.handlerKey);
    delete el.__qclosepopup;
  }
});
export { ClosePopup as C, QCard as Q, QCardSection as a, QCardActions as b, QDialog as c };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvc2VQb3B1cC40NTNlOTFjYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jYXJkL1FDYXJkU2VjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2FyZC9RQ2FyZEFjdGlvbnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9lc2NhcGUta2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9mb2N1c291dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL1FEaWFsb2cuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL0Nsb3NlUG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIGhvcml6b250YWw6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtY2FyZF9fc2VjdGlvbidcbiAgICAgICsgYCBxLWNhcmRfX3NlY3Rpb24tLSR7IHByb3BzLmhvcml6b250YWwgPT09IHRydWUgPyAnaG9yaXogcm93IG5vLXdyYXAnIDogJ3ZlcnQnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYWxpZ24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkQWN0aW9ucycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbGlnblByb3BzLFxuICAgIHZlcnRpY2FsOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWNhcmRfX2FjdGlvbnMgJHsgYWxpZ25DbGFzcy52YWx1ZSB9YFxuICAgICAgKyBgIHEtY2FyZF9fYWN0aW9ucy0tJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndmVydCBjb2x1bW4nIDogJ2hvcml6IHJvdycgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtY2FyZCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWNhcmQtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNhcmQtLXNxdWFyZSBuby1ib3JkZXItcmFkaXVzJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1mbGF0IG5vLXNoYWRvdycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBuZXh0VGljaywgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG4vKlxuICogVXNhZ2U6XG4gKiAgICByZWdpc3RlclRpY2soZm4pXG4gKiAgICByZWdpc3RlclRpY2soZm4pXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlZ2lzdGVyVGljayAoZm4pIHtcbiAgICAgIHRpY2tGbiA9IGZuXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHRpY2tGbiA9PT0gZm4pIHtcbiAgICAgICAgICB0aWNrRm4oKVxuICAgICAgICAgIHRpY2tGbiA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICByZW1vdmVUaWNrICgpIHtcbiAgICAgIHRpY2tGbiA9IHZvaWQgMFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVHJhbnNpdGlvblByb3BzID0ge1xuICB0cmFuc2l0aW9uU2hvdzoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uSGlkZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBzaG93aW5nKSB7XG4gIGNvbnN0IHRyYW5zaXRpb25TdGF0ZSA9IHJlZihzaG93aW5nLnZhbHVlKVxuXG4gIHdhdGNoKHNob3dpbmcsIHZhbCA9PiB7XG4gICAgbmV4dFRpY2soKCkgPT4geyB0cmFuc2l0aW9uU3RhdGUudmFsdWUgPSB2YWwgfSlcbiAgfSlcblxuICAvLyByZXR1cm4gdHJhbnNpdGlvblxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb246IGNvbXB1dGVkKCgpID0+ICdxLXRyYW5zaXRpb24tLScgKyAoXG4gICAgICB0cmFuc2l0aW9uU3RhdGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy50cmFuc2l0aW9uSGlkZSA6IHByb3BzLnRyYW5zaXRpb25TaG93XG4gICAgKSksXG5cbiAgICB0cmFuc2l0aW9uU3R5bGU6IGNvbXB1dGVkKCgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2ApXG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFBhcmVudFZtIH0gZnJvbSAnLi92bS5qcydcblxuZXhwb3J0IGNvbnN0IHBvcnRhbExpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsVm0gKGVsKSB7XG4gIHJldHVybiBwb3J0YWxMaXN0LmZpbmQodm0gPT5cbiAgICB2bS5fX3FQb3J0YWxJbm5lclJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICYmIHZtLl9fcVBvcnRhbElubmVyUmVmLnZhbHVlLmNvbnRhaW5zKGVsKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBvcnRhbE1lbnVzICh2bSwgZXZ0KSB7XG4gIGRvIHtcbiAgICBpZiAodm0uJG9wdGlvbnMubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgdm0uaGlkZShldnQpXG5cbiAgICAgIC8vIGlzIHRoaXMgYSBwb2ludCBvZiBzZXBhcmF0aW9uP1xuICAgICAgaWYgKHZtLiRwcm9wcy5zZXBhcmF0ZUNsb3NlUG9wdXAgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcmVudFZtKHZtKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh2bS5fX3FQb3J0YWxJbm5lclJlZiAhPT0gdm9pZCAwKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFZtKHZtKVxuXG4gICAgICBpZiAocGFyZW50ICE9PSB2b2lkIDAgJiYgcGFyZW50LiRvcHRpb25zLm5hbWUgPT09ICdRUG9wdXBQcm94eScpIHtcbiAgICAgICAgdm0uaGlkZShldnQpXG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdm1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2bSA9IGdldFBhcmVudFZtKHZtKVxuICB9IHdoaWxlICh2bSAhPT0gdm9pZCAwICYmIHZtICE9PSBudWxsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxzICh2bSwgZXZ0LCBkZXB0aCkge1xuICB3aGlsZSAoZGVwdGggIT09IDAgJiYgdm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS5fX3FQb3J0YWxJbm5lclJlZiAhPT0gdm9pZCAwKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmICh2bS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHZtID0gY2xvc2VQb3J0YWxNZW51cyh2bSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2bS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICB2bSA9IGdldFBhcmVudFZtKHZtKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2dsb2JhbC1ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbExpc3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcblxuZnVuY3Rpb24gaXNPbkdsb2JhbERpYWxvZyAodm0pIHtcbiAgdm0gPSB2bS5wYXJlbnRcblxuICB3aGlsZSAodm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRR2xvYmFsRGlhbG9nJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FEaWFsb2cnIHx8IHZtLnR5cGUubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdm0gPSB2bS5wYXJlbnRcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBXYXJuaW5nIVxuLy8gWW91IE1VU1Qgc3BlY2lmeSBcImluaGVyaXRBdHRyczogZmFsc2VcIiBpbiB5b3VyIGNvbXBvbmVudFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCBjaGVja0dsb2JhbERpYWxvZykge1xuICAvLyBzaG93aW5nLCBpbmNsdWRpbmcgd2hpbGUgaW4gc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY3RpdmUgPSByZWYoZmFsc2UpXG5cbiAgLy8gc2hvd2luZyAmIG5vdCBpbiBhbnkgc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY2Nlc3NpYmxlID0gcmVmKGZhbHNlKVxuXG4gIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICAgIHNob3dQb3J0YWw6IG5vb3AsXG4gICAgICBoaWRlUG9ydGFsOiBub29wLFxuICAgICAgcmVuZGVyUG9ydGFsOiBub29wXG4gICAgfVxuICB9XG5cbiAgbGV0IHBvcnRhbEVsID0gbnVsbFxuICBjb25zdCBmb2N1c09iaiA9IHt9XG4gIGNvbnN0IG9uR2xvYmFsRGlhbG9nID0gY2hlY2tHbG9iYWxEaWFsb2cgPT09IHRydWUgJiYgaXNPbkdsb2JhbERpYWxvZyh2bSlcblxuICBmdW5jdGlvbiBzaG93UG9ydGFsIChpc1JlYWR5KSB7XG4gICAgaWYgKGlzUmVhZHkgPT09IHRydWUpIHtcbiAgICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaWYgKG9uR2xvYmFsRGlhbG9nID09PSBmYWxzZSAmJiBwb3J0YWxFbCA9PT0gbnVsbCkge1xuICAgICAgICBwb3J0YWxFbCA9IGNyZWF0ZUdsb2JhbE5vZGUoKVxuICAgICAgfVxuXG4gICAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9IHRydWVcblxuICAgICAgLy8gcmVnaXN0ZXIgcG9ydGFsXG4gICAgICBwb3J0YWxMaXN0LnB1c2godm0ucHJveHkpXG5cbiAgICAgIGFkZEZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBvcnRhbCAoaXNSZWFkeSkge1xuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAoaXNSZWFkeSAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9IGZhbHNlXG5cbiAgICAvLyB1bnJlZ2lzdGVyIHBvcnRhbFxuICAgIGNvbnN0IGluZGV4ID0gcG9ydGFsTGlzdC5pbmRleE9mKHZtLnByb3h5KVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwb3J0YWxMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsRWwgIT09IG51bGwpIHtcbiAgICAgIHJlbW92ZUdsb2JhbE5vZGUocG9ydGFsRWwpXG4gICAgICBwb3J0YWxFbCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvblVubW91bnRlZCgoKSA9PiB7IGhpZGVQb3J0YWwodHJ1ZSkgfSlcblxuICAvLyBleHBvc2UgcHVibGljbHkgbmVlZGVkIHN0dWZmIGZvciBwb3J0YWwgdXRpbHNcbiAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwgeyBfX3FQb3J0YWxJbm5lclJlZjogaW5uZXJSZWYgfSlcblxuICByZXR1cm4ge1xuICAgIHNob3dQb3J0YWwsXG4gICAgaGlkZVBvcnRhbCxcblxuICAgIHBvcnRhbElzQWN0aXZlLFxuICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgIHJlbmRlclBvcnRhbDogKCkgPT4gKFxuICAgICAgb25HbG9iYWxEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyByZW5kZXJQb3J0YWxDb250ZW50KClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IFsgaChUZWxlcG9ydCwgeyB0bzogcG9ydGFsRWwgfSwgcmVuZGVyUG9ydGFsQ29udGVudCgpKSBdXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4va2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5jb25zdCBoYW5kbGVycyA9IFtdXG5sZXQgZXNjRG93blxuXG5mdW5jdGlvbiBvbktleWRvd24gKGV2dCkge1xuICBlc2NEb3duID0gZXZ0LmtleUNvZGUgPT09IDI3XG59XG5cbmZ1bmN0aW9uIG9uQmx1ciAoKSB7XG4gIGlmIChlc2NEb3duID09PSB0cnVlKSB7XG4gICAgZXNjRG93biA9IGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gb25LZXl1cCAoZXZ0KSB7XG4gIGlmIChlc2NEb3duID09PSB0cnVlKSB7XG4gICAgZXNjRG93biA9IGZhbHNlXG5cbiAgICBpZiAoaXNLZXlDb2RlKGV2dCwgMjcpID09PSB0cnVlKSB7XG4gICAgICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGV2dClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlIChhY3Rpb24pIHtcbiAgd2luZG93WyBhY3Rpb24gXSgna2V5ZG93bicsIG9uS2V5ZG93bilcbiAgd2luZG93WyBhY3Rpb24gXSgnYmx1cicsIG9uQmx1cilcbiAgd2luZG93WyBhY3Rpb24gXSgna2V5dXAnLCBvbktleXVwKVxuICBlc2NEb3duID0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEVzY2FwZUtleSAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHVwZGF0ZSgnYWRkRXZlbnRMaXN0ZW5lcicpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFc2NhcGVLZXkgKGZuKSB7XG4gIGNvbnN0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihmbilcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBoYW5kbGVycy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoJ3JlbW92ZUV2ZW50TGlzdGVuZXInKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuY29uc3QgaGFuZGxlcnMgPSBbXVxuXG5mdW5jdGlvbiB0cmlnZ2VyIChlKSB7XG4gIGhhbmRsZXJzWyBoYW5kbGVycy5sZW5ndGggLSAxIF0oZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3Vzb3V0IChmbikge1xuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICBoYW5kbGVycy5wdXNoKGZuKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3Vzb3V0IChmbikge1xuICBjb25zdCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoZm4pXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzJ1xuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGljay5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VQb3J0YWwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcHJldmVudC1zY3JvbGwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2hpbGRIYXNGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRFc2NhcGVLZXksIHJlbW92ZUVzY2FwZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZXNjYXBlLWtleS5qcydcbmltcG9ydCB7IGFkZEZvY3Vzb3V0LCByZW1vdmVGb2N1c291dCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXNvdXQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5sZXQgbWF4aW1pemVkTW9kYWxzID0gMFxuXG5jb25zdCBwb3NpdGlvbkNsYXNzID0ge1xuICBzdGFuZGFyZDogJ2ZpeGVkLWZ1bGwgZmxleC1jZW50ZXInLFxuICB0b3A6ICdmaXhlZC10b3AganVzdGlmeS1jZW50ZXInLFxuICBib3R0b206ICdmaXhlZC1ib3R0b20ganVzdGlmeS1jZW50ZXInLFxuICByaWdodDogJ2ZpeGVkLXJpZ2h0IGl0ZW1zLWNlbnRlcicsXG4gIGxlZnQ6ICdmaXhlZC1sZWZ0IGl0ZW1zLWNlbnRlcidcbn1cblxuY29uc3QgdHJhbnNpdGlvbnMgPSB7XG4gIHN0YW5kYXJkOiBbICdzY2FsZScsICdzY2FsZScgXSxcbiAgdG9wOiBbICdzbGlkZS1kb3duJywgJ3NsaWRlLXVwJyBdLFxuICBib3R0b206IFsgJ3NsaWRlLXVwJywgJ3NsaWRlLWRvd24nIF0sXG4gIHJpZ2h0OiBbICdzbGlkZS1sZWZ0JywgJ3NsaWRlLXJpZ2h0JyBdLFxuICBsZWZ0OiBbICdzbGlkZS1yaWdodCcsICdzbGlkZS1sZWZ0JyBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRGlhbG9nJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzogU3RyaW5nLFxuICAgIHRyYW5zaXRpb25IaWRlOiBTdHJpbmcsXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBhbGxvd0ZvY3VzT3V0c2lkZTogQm9vbGVhbixcblxuICAgIG5vRXNjRGlzbWlzczogQm9vbGVhbixcbiAgICBub0JhY2tkcm9wRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JvdXRlRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JlZm9jdXM6IEJvb2xlYW4sXG4gICAgbm9Gb2N1czogQm9vbGVhbixcbiAgICBub1NoYWtlOiBCb29sZWFuLFxuXG4gICAgc2VhbWxlc3M6IEJvb2xlYW4sXG5cbiAgICBtYXhpbWl6ZWQ6IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGZ1bGxIZWlnaHQ6IEJvb2xlYW4sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3N0YW5kYXJkJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsID0+IHZhbCA9PT0gJ3N0YW5kYXJkJ1xuICAgICAgICB8fCBbICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModmFsKVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ3NoYWtlJywgJ2NsaWNrJywgJ2VzY2FwZS1rZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IHRyYW5zaXRpb25TdGF0ZSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBhbmltYXRpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgc2hha2VUaW1lb3V0LCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgaXNNYXhpbWl6ZWQsIGF2b2lkQXV0b0Nsb3NlXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuc2VhbWxlc3MgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCBwb3J0YWxJc0FjY2Vzc2libGUsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKFxuICAgICAgdm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAvKiBwbHMgZG8gY2hlY2sgaWYgb24gYSBnbG9iYWwgZGlhbG9nICovIHRydWVcbiAgICApXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1kaWFsb2dfX2lubmVyIGZsZXggbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5tYXhpbWl6ZWQgPT09IHRydWUgPyAnbWF4aW1pemVkJyA6ICdtaW5pbWl6ZWQnIH1gXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5wb3NpdGlvbiB9ICR7IHBvc2l0aW9uQ2xhc3NbIHByb3BzLnBvc2l0aW9uIF0gfWBcbiAgICAgICsgKGFuaW1hdGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1hbmltYXRpbmcnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsV2lkdGggPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tZnVsbHdpZHRoJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZnVsbEhlaWdodCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsaGVpZ2h0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLXNxdWFyZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB0cmFuc2l0aW9uU2hvdyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10cmFuc2l0aW9uLS0nXG4gICAgICArIChwcm9wcy50cmFuc2l0aW9uU2hvdyA9PT0gdm9pZCAwID8gdHJhbnNpdGlvbnNbIHByb3BzLnBvc2l0aW9uIF1bIDAgXSA6IHByb3BzLnRyYW5zaXRpb25TaG93KVxuICAgIClcblxuICAgIGNvbnN0IHRyYW5zaXRpb25IaWRlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRyYW5zaXRpb24tLSdcbiAgICAgICsgKHByb3BzLnRyYW5zaXRpb25IaWRlID09PSB2b2lkIDAgPyB0cmFuc2l0aW9uc1sgcHJvcHMucG9zaXRpb24gXVsgMSBdIDogcHJvcHMudHJhbnNpdGlvbkhpZGUpXG4gICAgKVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHRyYW5zaXRpb25TdGF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHRyYW5zaXRpb25IaWRlLnZhbHVlXG4gICAgICAgIDogdHJhbnNpdGlvblNob3cudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3QgdHJhbnNpdGlvblN0eWxlID0gY29tcHV0ZWQoXG4gICAgICAoKSA9PiBgLS1xLXRyYW5zaXRpb24tZHVyYXRpb246ICR7IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiB9bXNgXG4gICAgKVxuXG4gICAgY29uc3QgdXNlQmFja2Ryb3AgPSBjb21wdXRlZCgoKSA9PiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCByb290Q2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IFtcbiAgICAgICdxLWRpYWxvZyBmdWxsc2NyZWVuIG5vLXBvaW50ZXItZXZlbnRzICdcbiAgICAgICAgKyBgcS1kaWFsb2ctLSR7IHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlID8gJ21vZGFsJyA6ICdzZWFtbGVzcycgfWAsXG4gICAgICBhdHRycy5jbGFzc1xuICAgIF0pXG5cbiAgICB3YXRjaChzaG93aW5nLCB2YWwgPT4ge1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0cmFuc2l0aW9uU3RhdGUudmFsdWUgPSB2YWxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1heGltaXplZCwgc3RhdGUgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXhpbWl6ZWQoc3RhdGUpXG4gICAgfSlcblxuICAgIHdhdGNoKHVzZUJhY2tkcm9wLCB2YWwgPT4ge1xuICAgICAgcHJldmVudEJvZHlTY3JvbGwodmFsKVxuXG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCkge1xuICAgICAgcmVtb3ZlVGltZW91dCgpXG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIGFkZFRvSGlzdG9yeSgpXG5cbiAgICAgIHJlZm9jdXNUYXJnZXQgPSBwcm9wcy5ub1JlZm9jdXMgPT09IGZhbHNlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IG51bGxcbiAgICAgICAgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIDogbnVsbFxuXG4gICAgICB1cGRhdGVNYXhpbWl6ZWQocHJvcHMubWF4aW1pemVkKVxuICAgICAgc2hvd1BvcnRhbCgpXG4gICAgICBhbmltYXRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICAgIGlmIChwcm9wcy5ub0ZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IG51bGwgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgICAgcmVnaXN0ZXJUaWNrKGZvY3VzKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodm0ucHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHsgdG9wLCBib3R0b20gfSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgIHsgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdyxcbiAgICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IHdpbmRvdy52aXN1YWxWaWV3cG9ydC5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IGlubmVySGVpZ2h0XG5cbiAgICAgICAgICAgIGlmICh0b3AgPiAwICYmIGJvdHRvbSA+IGhlaWdodCAvIDIpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbEhlaWdodCAtIGhlaWdodCxcbiAgICAgICAgICAgICAgICBib3R0b20gPj0gaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICAgICAgID8gSW5maW5pdHlcbiAgICAgICAgICAgICAgICAgIDogTWF0aC5jZWlsKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wICsgYm90dG9tIC0gaGVpZ2h0IC8gMilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSB0cnVlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGltZW91dCgpXG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcbiAgICAgIGNsZWFudXAodHJ1ZSlcbiAgICAgIGFuaW1hdGluZy52YWx1ZSA9IHRydWVcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBpZiAocmVmb2N1c1RhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0LmZvY3VzKClcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGlkZVBvcnRhbCh0cnVlKSAvLyBkb25lIGhpZGluZywgbm93IGRlc3Ryb3lcbiAgICAgICAgYW5pbWF0aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoc2VsZWN0b3IpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvciB8fCAnW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKSB8fCBub2RlXG4gICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNoYWtlICgpIHtcbiAgICAgIGZvY3VzKClcbiAgICAgIGVtaXQoJ3NoYWtlJylcblxuICAgICAgY29uc3Qgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgIGlmIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChpbm5lclJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgICAgIC8vIHNvbWUgcGxhdGZvcm1zIChsaWtlIGRlc2t0b3AgQ2hyb21lKVxuICAgICAgICAgICAgLy8gcmVxdWlyZSBjYWxsaW5nIGZvY3VzKCkgYWdhaW5cbiAgICAgICAgICAgIGZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDE3MClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVzY2FwZUtleSAoKSB7XG4gICAgICBpZiAocHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKHByb3BzLnBlcnNpc3RlbnQgPT09IHRydWUgfHwgcHJvcHMubm9Fc2NEaXNtaXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgcHJvcHMubWF4aW1pemVkICE9PSB0cnVlICYmIHByb3BzLm5vU2hha2UgIT09IHRydWUgJiYgc2hha2UoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ2VzY2FwZS1rZXknKVxuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWF4aW1pemVkKGZhbHNlKVxuXG4gICAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgIT09IHRydWUpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXhpbWl6ZWQgKGFjdGl2ZSkge1xuICAgICAgaWYgKGFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaXNNYXhpbWl6ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICBtYXhpbWl6ZWRNb2RhbHMgPCAxICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1kaWFsb2cnKVxuICAgICAgICAgIG1heGltaXplZE1vZGFscysrXG5cbiAgICAgICAgICBpc01heGltaXplZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNNYXhpbWl6ZWQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKG1heGltaXplZE1vZGFscyA8IDIpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZGlhbG9nJylcbiAgICAgICAgfVxuXG4gICAgICAgIG1heGltaXplZE1vZGFscy0tXG4gICAgICAgIGlzTWF4aW1pemVkID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkF1dG9DbG9zZSAoZSkge1xuICAgICAgaWYgKGF2b2lkQXV0b0Nsb3NlICE9PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoZSlcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmFja2Ryb3BDbGljayAoZSkge1xuICAgICAgaWYgKHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWUgJiYgcHJvcHMubm9CYWNrZHJvcERpc21pc3MgIT09IHRydWUpIHtcbiAgICAgICAgaGlkZShlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMubm9TaGFrZSAhPT0gdHJ1ZSkge1xuICAgICAgICBzaGFrZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZSAoZXZ0KSB7XG4gICAgICAvLyB0aGUgZm9jdXMgaXMgbm90IGluIGEgdnVlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5hbGxvd0ZvY3VzT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICAgIGZvY3VzLCBzaGFrZSxcblxuICAgICAgLy8gcHJpdmF0ZSBidXQgbmVlZGVkIGJ5IFFTZWxlY3RcbiAgICAgIF9fdXBkYXRlUmVmb2N1c1RhcmdldCAodGFyZ2V0KSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSB0YXJnZXQgfHwgbnVsbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGNsYXNzOiByb290Q2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyxcbiAgICAgICAgICBhcHBlYXI6IHRydWVcbiAgICAgICAgfSwgKCkgPT4gKFxuICAgICAgICAgIHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWRpYWxvZ19fYmFja2Ryb3AgZml4ZWQtZnVsbCcsXG4gICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICAgb25Nb3VzZWRvd246IG9uQmFja2Ryb3BDbGlja1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApKSxcblxuICAgICAgICBoKFxuICAgICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgICAgeyBuYW1lOiB0cmFuc2l0aW9uLnZhbHVlLCBhcHBlYXI6IHRydWUgfSxcbiAgICAgICAgICAoKSA9PiAoXG4gICAgICAgICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICAgICAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyUG9ydGFsXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFscywgZ2V0UG9ydGFsVm0gfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuLypcbiAqIGRlcHRoXG4gKiAgIDwgMCAgLS0+IGNsb3NlIGFsbCBjaGFpblxuICogICAwICAgIC0tPiBkaXNhYmxlZFxuICogICA+IDAgIC0tPiBjbG9zZSBjaGFpbiB1cCB0byBOIHBhcmVudFxuICovXG5cbmZ1bmN0aW9uIGdldERlcHRoICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBjb25zdCBkZXB0aCA9IHBhcnNlSW50KHZhbHVlLCAxMClcbiAgcmV0dXJuIGlzTmFOKGRlcHRoKSA/IDAgOiBkZXB0aFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAnY2xvc2UtcG9wdXAnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ2Nsb3NlLXBvcHVwJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlIH0pIHtcbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGRlcHRoOiBnZXREZXB0aCh2YWx1ZSksXG5cbiAgICAgICAgICBoYW5kbGVyIChldnQpIHtcbiAgICAgICAgICAgIC8vIGFsbG93IEBjbGljayB0byBiZSBlbWl0dGVkXG4gICAgICAgICAgICBjdHguZGVwdGggIT09IDAgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZtID0gZ2V0UG9ydGFsVm0oZWwpXG4gICAgICAgICAgICAgIGlmICh2bSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3J0YWxzKHZtLCBldnQsIGN0eC5kZXB0aClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaGFuZGxlcktleSAoZXZ0KSB7XG4gICAgICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgY3R4LmhhbmRsZXIoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsLl9fcWNsb3NlcG9wdXAgPSBjdHhcblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5oYW5kbGVyKVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5oYW5kbGVyS2V5KVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIHsgdmFsdWUsIG9sZFZhbHVlIH0pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgIGVsLl9fcWNsb3NlcG9wdXAuZGVwdGggPSBnZXREZXB0aCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xY2xvc2Vwb3B1cFxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5oYW5kbGVyKVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5oYW5kbGVyS2V5KVxuICAgICAgICBkZWxldGUgZWwuX19xY2xvc2Vwb3B1cFxuICAgICAgfVxuICAgIH1cbilcbiJdLCJuYW1lcyI6WyJoYW5kbGVycyJdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLElBQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsWUFBWTtBQUFBLEVBQ2I7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVLFNBQVMsTUFDdkIsb0NBQ3dCLE1BQU0sZUFBZSxPQUFPLHNCQUFzQixRQUMzRTtBQUVELFdBQU8sTUFBTSxFQUFFLE1BQU0sS0FBSyxFQUFFLE9BQU8sUUFBUSxTQUFTLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN6RTtBQUNILENBQUM7QUNsQkQsSUFBQSxlQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILFVBQVU7QUFBQSxFQUNYO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sYUFBYSxTQUFTLEtBQUs7QUFFakMsVUFBTSxVQUFVLFNBQVMsTUFDdkIs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
