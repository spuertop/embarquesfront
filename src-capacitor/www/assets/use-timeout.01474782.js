import { o as onBeforeUnmount, a1 as History, w as watch, a2 as vmHasRouter, f as onMounted, g as getCurrentInstance, n as nextTick, a3 as css, a4 as getElement, U as client, S as listenOpts, O as stopAndPrevent, a5 as getEventPath } from "./index.af93674c.js";
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "before-show",
  "show",
  "before-hide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("before-show", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("before-hide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
function animVerticalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getVerticalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setScroll(el, newPos);
    if (newPos !== to) {
      animVerticalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function animHorizontalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getHorizontalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setHorizontalScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setHorizontalScroll(el, newPos);
    if (newPos !== to) {
      animHorizontalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function setScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, offset);
    return;
  }
  scrollTarget.scrollTop = offset;
}
function setHorizontalScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(offset, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  scrollTarget.scrollLeft = offset;
}
function setVerticalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animVerticalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setScroll(scrollTarget, offset);
}
function setHorizontalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animHorizontalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setHorizontalScroll(scrollTarget, offset);
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, closeTimer;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    window.scrollTo(scrollPositionX, scrollPositionY);
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== void 0) {
      clearTimeout(closeTimer);
      closeTimer = void 0;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = void 0;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
function useTimeout() {
  let timer;
  onBeforeUnmount(() => {
    clearTimeout(timer);
  });
  return {
    registerTimeout(fn, delay) {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    },
    removeTimeout() {
      clearTimeout(timer);
    }
  };
}
export { useModelToggleEmits as a, useTimeout as b, useModelToggle as c, useHistory as d, usePreventScroll as e, getScrollTarget as f, getScrollbarWidth as g, getVerticalScrollPosition as h, getHorizontalScrollPosition as i, setHorizontalScrollPosition as j, setVerticalScrollPosition as s, useModelToggleProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXRpbWVvdXQuMDE0NzQ3ODIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBIaXN0b3J5IGZyb20gJy4uLy4uL2hpc3RvcnkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSkge1xuICBsZXQgaGlzdG9yeUVudHJ5XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRnJvbUhpc3RvcnkgKCkge1xuICAgIGlmIChoaXN0b3J5RW50cnkgIT09IHZvaWQgMCkge1xuICAgICAgSGlzdG9yeS5yZW1vdmUoaGlzdG9yeUVudHJ5KVxuICAgICAgaGlzdG9yeUVudHJ5ID0gdm9pZCAwXG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHJlbW92ZUZyb21IaXN0b3J5KClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUZyb21IaXN0b3J5LFxuXG4gICAgYWRkVG9IaXN0b3J5ICgpIHtcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgICAgY29uZGl0aW9uOiAoKSA9PiBoaWRlT25Sb3V0ZUNoYW5nZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgaGFuZGxlcjogaGlkZVxuICAgICAgfVxuXG4gICAgICBIaXN0b3J5LmFkZChoaXN0b3J5RW50cnkpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB3YXRjaCwgbmV4dFRpY2ssIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUhhc1JvdXRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG5cbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZUVtaXRzID0gW1xuICAnYmVmb3JlLXNob3cnLCAnc2hvdycsICdiZWZvcmUtaGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZS1zaG93JywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZVNob3cgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlU2hvdyhldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlIChldnQpIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fIHx8IHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc0hpZGUoZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NIaWRlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNob3dpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgZW1pdCgnYmVmb3JlLWhpZGUnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlSGlkZSAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVIaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NNb2RlbENoYW5nZSAodmFsKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUgJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKHZhbCA9PT0gdHJ1ZSkgIT09IHNob3dpbmcudmFsdWUpIHtcbiAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gcHJvY2Vzc1Nob3cgOiBwcm9jZXNzSGlkZVxuICAgICAgZm4ocGF5bG9hZClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBwcm9jZXNzTW9kZWxDaGFuZ2UpXG5cbiAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlICE9PSB2b2lkIDAgJiYgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlKSB7XG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UudmFsdWUgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc09uTW91bnQgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9jZXNzTW9kZWxDaGFuZ2UocHJvcHMubW9kZWxWYWx1ZSlcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgY29uc3QgcHVibGljTWV0aG9kcyA9IHsgc2hvdywgaGlkZSwgdG9nZ2xlIH1cbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljTWV0aG9kcylcblxuICByZXR1cm4gcHVibGljTWV0aG9kc1xufVxuIiwiaW1wb3J0IHsgY3NzLCBnZXRFbGVtZW50IH0gZnJvbSAnLi9kb20uanMnXG5cbmNvbnN0IHNjcm9sbFRhcmdldHMgPSBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyBbXVxuICA6IFsgbnVsbCwgZG9jdW1lbnQsIGRvY3VtZW50LmJvZHksIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBdXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxUYXJnZXQgKGVsLCB0YXJnZXRFbCkge1xuICBsZXQgdGFyZ2V0ID0gZ2V0RWxlbWVudCh0YXJnZXRFbClcblxuICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHtcbiAgICBpZiAoZWwgPT09IHZvaWQgMCB8fCBlbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHdpbmRvd1xuICAgIH1cblxuICAgIHRhcmdldCA9IGVsLmNsb3Nlc3QoJy5zY3JvbGwsLnNjcm9sbC15LC5vdmVyZmxvdy1hdXRvJylcbiAgfVxuXG4gIHJldHVybiBzY3JvbGxUYXJnZXRzLmluY2x1ZGVzKHRhcmdldClcbiAgICA/IHdpbmRvd1xuICAgIDogdGFyZ2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQgKGVsKSB7XG4gIHJldHVybiAoZWwgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBlbCkuc2Nyb2xsSGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxXaWR0aCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxXaWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0KSB7XG4gIHJldHVybiBzY3JvbGxUYXJnZXQgPT09IHdpbmRvd1xuICAgID8gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxUb3Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0KSB7XG4gIHJldHVybiBzY3JvbGxUYXJnZXQgPT09IHdpbmRvd1xuICAgID8gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwXG4gICAgOiBzY3JvbGxUYXJnZXQuc2Nyb2xsTGVmdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbVZlcnRpY2FsU2Nyb2xsVG8gKGVsLCB0bywgZHVyYXRpb24gPSAwIC8qICwgcHJldlRpbWUgKi8pIHtcbiAgY29uc3QgcHJldlRpbWUgPSBhcmd1bWVudHNbIDMgXSA9PT0gdm9pZCAwID8gcGVyZm9ybWFuY2Uubm93KCkgOiBhcmd1bWVudHNbIDMgXVxuICBjb25zdCBwb3MgPSBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKGVsKVxuXG4gIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgaWYgKHBvcyAhPT0gdG8pIHtcbiAgICAgIHNldFNjcm9sbChlbCwgdG8pXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG5vd1RpbWUgPT4ge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IG5vd1RpbWUgLSBwcmV2VGltZVxuICAgIGNvbnN0IG5ld1BvcyA9IHBvcyArICh0byAtIHBvcykgLyBNYXRoLm1heChmcmFtZVRpbWUsIGR1cmF0aW9uKSAqIGZyYW1lVGltZVxuICAgIHNldFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltVmVydGljYWxTY3JvbGxUbyhlbCwgdG8sIGR1cmF0aW9uIC0gZnJhbWVUaW1lLCBub3dUaW1lKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8gKGVsLCB0bywgZHVyYXRpb24gPSAwIC8qICwgcHJldlRpbWUgKi8pIHtcbiAgY29uc3QgcHJldlRpbWUgPSBhcmd1bWVudHNbIDMgXSA9PT0gdm9pZCAwID8gcGVyZm9ybWFuY2Uubm93KCkgOiBhcmd1bWVudHNbIDMgXVxuICBjb25zdCBwb3MgPSBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgdG8pXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG5vd1RpbWUgPT4ge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IG5vd1RpbWUgLSBwcmV2VGltZVxuICAgIGNvbnN0IG5ld1BvcyA9IHBvcyArICh0byAtIHBvcykgLyBNYXRoLm1heChmcmFtZVRpbWUsIGR1cmF0aW9uKSAqIGZyYW1lVGltZVxuICAgIHNldEhvcml6b250YWxTY3JvbGwoZWwsIG5ld1BvcylcbiAgICBpZiAobmV3UG9zICE9PSB0bykge1xuICAgICAgYW5pbUhvcml6b250YWxTY3JvbGxUbyhlbCwgdG8sIGR1cmF0aW9uIC0gZnJhbWVUaW1lLCBub3dUaW1lKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsIChzY3JvbGxUYXJnZXQsIG9mZnNldCkge1xuICBpZiAoc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3cpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCBvZmZzZXQpXG4gICAgcmV0dXJuXG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcCA9IG9mZnNldFxufVxuXG5mdW5jdGlvbiBzZXRIb3Jpem9udGFsU2Nyb2xsIChzY3JvbGxUYXJnZXQsIG9mZnNldCkge1xuICBpZiAoc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3cpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8ob2Zmc2V0LCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsTGVmdCA9IG9mZnNldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbilcbiAgICByZXR1cm5cbiAgfVxuICBzZXRTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbikge1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbilcbiAgICByZXR1cm5cbiAgfVxuICBzZXRIb3Jpem9udGFsU2Nyb2xsKHNjcm9sbFRhcmdldCwgb2Zmc2V0KVxufVxuXG5sZXQgc2l6ZVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoICgpIHtcbiAgaWYgKHNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzaXplXG4gIH1cblxuICBjb25zdFxuICAgIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxuICAgIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBjc3MoaW5uZXIsIHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzIwMHB4J1xuICB9KVxuICBjc3Mob3V0ZXIsIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICcwcHgnLFxuICAgIGxlZnQ6ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgIHdpZHRoOiAnMjAwcHgnLFxuICAgIGhlaWdodDogJzE1MHB4JyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgfSlcblxuICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcilcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKVxuXG4gIGNvbnN0IHcxID0gaW5uZXIub2Zmc2V0V2lkdGhcbiAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJ1xuICBsZXQgdzIgPSBpbm5lci5vZmZzZXRXaWR0aFxuXG4gIGlmICh3MSA9PT0gdzIpIHtcbiAgICB3MiA9IG91dGVyLmNsaWVudFdpZHRoXG4gIH1cblxuICBvdXRlci5yZW1vdmUoKVxuICBzaXplID0gdzEgLSB3MlxuXG4gIHJldHVybiBzaXplXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNTY3JvbGxiYXIgKGVsLCBvblkgPSB0cnVlKSB7XG4gIGlmICghZWwgfHwgZWwubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gb25ZXG4gICAgPyAoXG4gICAgICAgIGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCAmJiAoXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKVxuICAgICAgICAgIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmZsb3ctYXV0bycpXG4gICAgICAgICAgfHwgWyAnYXV0bycsICdzY3JvbGwnIF0uaW5jbHVkZXMod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyAnb3ZlcmZsb3cteScgXSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIDogKFxuICAgICAgICBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy14JyBdKVxuICAgICAgICApXG4gICAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0U2Nyb2xsVGFyZ2V0LFxuXG4gIGdldFNjcm9sbEhlaWdodCxcbiAgZ2V0U2Nyb2xsV2lkdGgsXG5cbiAgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGFuaW1WZXJ0aWNhbFNjcm9sbFRvLFxuICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvLFxuXG4gIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sXG4gIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbixcblxuICBnZXRTY3JvbGxiYXJXaWR0aCxcbiAgaGFzU2Nyb2xsYmFyXG59XG4iLCJpbXBvcnQgeyBnZXRFdmVudFBhdGgsIGxpc3Rlbk9wdHMsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoYXNTY3JvbGxiYXIsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiB9IGZyb20gJy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmxldFxuICByZWdpc3RlcmVkID0gMCxcbiAgc2Nyb2xsUG9zaXRpb25YLFxuICBzY3JvbGxQb3NpdGlvblksXG4gIG1heFNjcm9sbFRvcCxcbiAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2UsXG4gIGJvZHlMZWZ0LFxuICBib2R5VG9wLFxuICBjbG9zZVRpbWVyXG5cbmZ1bmN0aW9uIG9uV2hlZWwgKGUpIHtcbiAgaWYgKHNob3VsZFByZXZlbnRTY3JvbGwoZSkpIHtcbiAgICBzdG9wQW5kUHJldmVudChlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZFByZXZlbnRTY3JvbGwgKGUpIHtcbiAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5IHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1sYXlvdXRfX2JhY2tkcm9wJykpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY29uc3RcbiAgICBwYXRoID0gZ2V0RXZlbnRQYXRoKGUpLFxuICAgIHNoaWZ0ID0gZS5zaGlmdEtleSAmJiAhZS5kZWx0YVgsXG4gICAgc2Nyb2xsWSA9ICFzaGlmdCAmJiBNYXRoLmFicyhlLmRlbHRhWCkgPD0gTWF0aC5hYnMoZS5kZWx0YVkpLFxuICAgIGRlbHRhID0gc2hpZnQgfHwgc2Nyb2xsWSA/IGUuZGVsdGFZIDogZS5kZWx0YVhcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbCA9IHBhdGhbIGluZGV4IF1cblxuICAgIGlmIChoYXNTY3JvbGxiYXIoZWwsIHNjcm9sbFkpKSB7XG4gICAgICByZXR1cm4gc2Nyb2xsWVxuICAgICAgICA/IChcbiAgICAgICAgICAgIGRlbHRhIDwgMCAmJiBlbC5zY3JvbGxUb3AgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA9PT0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIGRlbHRhIDwgMCAmJiBlbC5zY3JvbGxMZWZ0ID09PSAwXG4gICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICA6IGRlbHRhID4gMCAmJiBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50V2lkdGggPT09IGVsLnNjcm9sbFdpZHRoXG4gICAgICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIG9uQXBwbGVTY3JvbGwgKGUpIHtcbiAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgIC8vIHJlcXVpcmVkLCBvdGhlcndpc2UgaU9TIGJsb2NrcyBmdXJ0aGVyIHNjcm9sbGluZ1xuICAgIC8vIHVudGlsIHRoZSBtb2JpbGUgc2Nyb2xsYmFyIGRpc3NhcHBlYXJzXG4gICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cbn1cblxuZnVuY3Rpb24gb25BcHBsZVJlc2l6ZSAoZXZ0KSB7XG4gIGlmICh2cFBlbmRpbmdVcGRhdGUgPT09IHRydWUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZwUGVuZGluZ1VwZGF0ZSA9IHRydWVcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHZwUGVuZGluZ1VwZGF0ZSA9IGZhbHNlXG5cbiAgICBjb25zdFxuICAgICAgeyBoZWlnaHQgfSA9IGV2dC50YXJnZXQsXG4gICAgICB7IGNsaWVudEhlaWdodCwgc2Nyb2xsVG9wIH0gPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50XG5cbiAgICBpZiAobWF4U2Nyb2xsVG9wID09PSB2b2lkIDAgfHwgaGVpZ2h0ICE9PSB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgIG1heFNjcm9sbFRvcCA9IGNsaWVudEhlaWdodCAtIGhlaWdodFxuICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID4gbWF4U2Nyb2xsVG9wKSB7XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCAtPSBNYXRoLmNlaWwoKHNjcm9sbFRvcCAtIG1heFNjcm9sbFRvcCkgLyA4KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gYXBwbHkgKGFjdGlvbikge1xuICBjb25zdFxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgIGhhc1ZpZXdwb3J0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcblxuICBpZiAoYWN0aW9uID09PSAnYWRkJykge1xuICAgIGNvbnN0IHsgb3ZlcmZsb3dZLCBvdmVyZmxvd1ggfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvZHkpXG5cbiAgICBzY3JvbGxQb3NpdGlvblggPSBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24od2luZG93KVxuICAgIHNjcm9sbFBvc2l0aW9uWSA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24od2luZG93KVxuICAgIGJvZHlMZWZ0ID0gYm9keS5zdHlsZS5sZWZ0XG4gICAgYm9keVRvcCA9IGJvZHkuc3R5bGUudG9wXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWCB9cHhgXG4gICAgYm9keS5zdHlsZS50b3AgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWSB9cHhgXG5cbiAgICBpZiAob3ZlcmZsb3dYICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIH1cbiAgICBpZiAob3ZlcmZsb3dZICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dZID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gdHJ1ZVxuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlICYmIGNsaWVudC5pcy5tYWMgPT09IHRydWUpIHtcbiAgICAvLyByZWYuIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTcvMDEvc2Nyb2xsaW5nLWludGVydmVudGlvblxuICAgIHdpbmRvd1sgYCR7IGFjdGlvbiB9RXZlbnRMaXN0ZW5lcmAgXSgnd2hlZWwnLCBvbldoZWVsLCBsaXN0ZW5PcHRzLm5vdFBhc3NpdmUpXG4gIH1cblxuICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlU2Nyb2xsLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBib2R5TGVmdFxuICAgIGJvZHkuc3R5bGUudG9wID0gYm9keVRvcFxuXG4gICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWCwgc2Nyb2xsUG9zaXRpb25ZKVxuICAgIG1heFNjcm9sbFRvcCA9IHZvaWQgMFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSkge1xuICBsZXQgYWN0aW9uID0gJ2FkZCdcblxuICBpZiAoc3RhdGUgPT09IHRydWUpIHtcbiAgICByZWdpc3RlcmVkKytcblxuICAgIGlmIChjbG9zZVRpbWVyICE9PSB2b2lkIDApIHtcbiAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVyKVxuICAgICAgY2xvc2VUaW1lciA9IHZvaWQgMFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHJlZ2lzdGVyZWQgPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlZ2lzdGVyZWQtLVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhY3Rpb24gPSAncmVtb3ZlJ1xuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgY2xpZW50LmlzLm5hdGl2ZU1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG5cbiAgICAgIGNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYXBwbHkoYWN0aW9uKVxuICAgICAgICBjbG9zZVRpbWVyID0gdm9pZCAwXG4gICAgICB9LCAxMDApXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBhcHBseShhY3Rpb24pXG59XG4iLCJpbXBvcnQgcHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi91dGlscy9wcmV2ZW50LXNjcm9sbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgY3VycmVudFN0YXRlXG5cbiAgcmV0dXJuIHtcbiAgICBwcmV2ZW50Qm9keVNjcm9sbCAoc3RhdGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUgIT09IGN1cnJlbnRTdGF0ZVxuICAgICAgICAmJiAoY3VycmVudFN0YXRlICE9PSB2b2lkIDAgfHwgc3RhdGUgPT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gc3RhdGVcbiAgICAgICAgcHJldmVudFNjcm9sbChzdGF0ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGltZXJcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlZ2lzdGVyVGltZW91dCAoZm4sIGRlbGF5KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoZm4sIGRlbGF5KVxuICAgIH0sXG5cbiAgICByZW1vdmVUaW1lb3V0ICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSWUsb0JBQVUsU0FBUyxNQUFNLG1CQUFtQjtBQUN6RCxNQUFJO0FBRUosK0JBQThCO0FBQzVCLFFBQUksaUJBQWlCLFFBQVE7QUFDM0IsY0FBUSxPQUFPLFlBQVk7QUFDM0IscUJBQWU7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFRCxrQkFBZ0IsTUFBTTtBQUNwQixZQUFRLFVBQVUsUUFBUSxrQkFBbUI7QUFBQSxFQUNqRCxDQUFHO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGVBQWdCO0FBQ2QscUJBQWU7QUFBQSxRQUNiLFdBQVcsTUFBTSxrQkFBa0IsVUFBVTtBQUFBLFFBQzdDLFNBQVM7QUFBQSxNQUNWO0FBRUQsY0FBUSxJQUFJLFlBQVk7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDSDtBQzFCWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDLFlBQVk7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCx1QkFBdUIsQ0FBRSxVQUFVLEtBQU87QUFDNUM7QUFFWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDO0FBQUEsRUFBZTtBQUFBLEVBQVE7QUFBQSxFQUFlO0FBQ3hDO0FBSWUsd0JBQVU7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FDQztBQUNE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
