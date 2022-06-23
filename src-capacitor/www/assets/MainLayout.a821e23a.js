import { c as createComponent, a as computed, h, d as hSlot, i as inject, r as ref, w as watch, o as onBeforeUnmount, e as hUniqueSlot, g as getCurrentInstance, l as layoutKey, f as onMounted, n as nextTick, j as withDirectives, k as hDir, p as provide, m as pageContainerKey, q as isRuntimeSsrPreHydration, s as reactive, t as onUnmounted, u as hMergeSlot, v as defineComponent, _ as _export_sfc, x as openBlock, y as createBlock, z as withCtx, A as createVNode, Q as QIcon, B as createCommentVNode, C as createTextVNode, D as toDisplayString, E as resolveComponent, F as QBtn, G as createElementBlock, H as renderList, I as Fragment, J as createBaseVNode, K as mergeProps } from "./index.af93674c.js";
import { Q as QResizeObserver, T as TouchPan, a as QScrollObserver } from "./QScrollObserver.68b61a3e.js";
import { Q as QItemSection, a as QItem, b as QList } from "./QItem.c1e7bfd8.js";
import { u as useModelToggleProps, a as useModelToggleEmits, b as useTimeout, c as useModelToggle, d as useHistory, e as usePreventScroll, g as getScrollbarWidth } from "./use-timeout.01474782.js";
import { u as useDarkProps, a as useDark, b as useGlobalStore } from "./global.202de1e2.js";
import { b as between } from "./format.801e7424.js";
import "./selection.f6fbe71f.js";
import "./axios.91ad12ec.js";
var QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : ""));
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : ""));
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QHeader needs to be child of QLayout");
    });
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(() => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $q.platform.is.ios && $layout.isContainer.value === true);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(() => props.modelValue !== true || fixed.value === true && revealed.value !== true);
    const revealOnFocus = computed(() => props.modelValue === true && hidden.value === true && props.reveal === true);
    const classes = computed(() => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : ""));
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(revealed, scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100);
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(h("div", {
        class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
      }));
      child.push(h(QResizeObserver, {
        debounce: 0,
        onResize
      }));
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
var QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(() => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : ""));
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "on-layout",
    "mini-state"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const $layout = inject(layoutKey, () => {
      console.error("QDrawer needs to be child of QLayout");
    });
    let lastDesktopState, timerMini, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    const isMini = computed(() => props.mini === true && belowBreakpoint.value !== true);
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true);
    const hideOnRouteChange = computed(() => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true));
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      noEvent !== true && registerTimeout(() => {
        emit("hide", evt);
      }, duration);
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(() => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1));
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(size.value * stateDirection.value);
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(() => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true);
    const onLayout = computed(() => props.overlay === false && showing.value === true && belowBreakpoint.value === false);
    const onScreenOverlay = computed(() => props.overlay === true && showing.value === true && belowBreakpoint.value === false);
    const backdropClass = computed(() => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : ""));
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(() => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto"));
    const classes = computed(() => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : "")));
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(() => props.behavior + props.breakpoint, updateBelowBreakpoint);
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("on-layout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("mini-state", val);
    });
    function applyPosition(position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position) === size.value)) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position, 0) : Math.min(0, position - width));
      applyBackdrop(between(position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("on-layout", onLayout.value);
      emit("mini-state", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      clearTimeout(timerMini);
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(withDirectives(h("div", {
          key: "open",
          class: `q-drawer__opener fixed-${props.side}`,
          "aria-hidden": "true"
        }), openDirective.value));
        child.push(hDir("div", {
          ref: "backdrop",
          class: backdropClass.value,
          style: backdropStyle.value,
          "aria-hidden": "true",
          onClick: hide
        }, void 0, "backdrop", props.noSwipeBackdrop !== true && showing.value === true, () => backdropCloseDirective.value));
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h("div", {
          ...attrs,
          key: "" + mini,
          class: [
            contentClass.value,
            attrs.class
          ]
        }, mini === true ? slots.mini() : hSlot(slots.default))
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        }));
      }
      child.push(hDir("aside", { ref: "content", class: classes.value, style: style.value }, content, "contentclose", props.noSwipeClose !== true && belowBreakpoint.value === true, () => contentCloseDirective.value));
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QPageContainer needs to be child of QLayout");
    });
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(() => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard"));
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scroll-height", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let timer;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (timer !== void 0) {
          clearTimeout(timer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        timer = setTimeout(() => {
          document.body.classList.remove("q-body--layout-animate");
          timer = void 0;
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer2 = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer2 === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer2);
        }
        timer2 = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer2 !== null && action === "remove") {
          clearTimeout(timer2);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer2 = null;
      const el = document.body;
      watch(() => props.container !== true ? "add" : "remove", updateScrollEvent);
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
const _sfc_main$1 = defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "#"
    },
    icon: {
      type: String,
      default: ""
    }
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    onClick: _cache[0] || (_cache[0] = ($event) => this.$router.push(_ctx.link))
  }, {
    default: withCtx(() => [
      _ctx.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, { name: _ctx.icon }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            _: 1
          }),
          createVNode(QItemLabel, { caption: "" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.caption), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "EssentialLink.vue"]]);
const linksList = [
  {
    title: "Inicio",
    caption: "Ir al inicio, cambiar de usuario",
    icon: "home",
    link: "/"
  },
  {
    title: "Empresas",
    caption: "Cambiar la empresa actual",
    icon: "business_center",
    link: "/customers"
  },
  {
    title: "Salir",
    caption: "logout",
    icon: "logout",
    link: "/logout"
  },
  {
    title: "Photo",
    caption: "Photo camera",
    icon: "photo_camera",
    link: "/photos"
  }
];
const _sfc_main = defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink
  },
  setup() {
    const globalStore = useGlobalStore();
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      globalStore
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Embarques ");
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" Men\xFA opciones ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EssentialLink = resolveComponent("EssentialLink");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, { elevated: "" }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                "aria-label": "Menu",
                onClick: _ctx.toggleLeftDrawer
              }, null, 8, ["onClick"]),
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              }),
              _hoisted_2
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.leftDrawerOpen = $event),
        "show-if-above": "",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QList, null, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  _hoisted_3
                ]),
                _: 1
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.essentialLinks, (link) => {
                return openBlock(), createBlock(_component_EssentialLink, mergeProps({
                  key: link.title
                }, link), null, 16);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC5hODIxZTIzYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyVGl0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Rvb2xiYXIvUVRvb2xiYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2hlYWRlci9RSGVhZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtTGFiZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RyYXdlci9RRHJhd2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9sYXlvdXQvUUxheW91dC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Vzc2VudGlhbExpbmsudnVlIiwiLi4vLi4vLi4vc3JjL2xheW91dHMvTWFpbkxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb29sYmFyVGl0bGUnLFxuXG4gIHByb3BzOiB7XG4gICAgc2hyaW5rOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRvb2xiYXJfX3RpdGxlIGVsbGlwc2lzJ1xuICAgICAgKyAocHJvcHMuc2hyaW5rID09PSB0cnVlID8gJyBjb2wtc2hyaW5rJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb29sYmFyJyxcblxuICBwcm9wczoge1xuICAgIGluc2V0OiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRvb2xiYXIgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuaW5zZXQgPT09IHRydWUgPyAnIHEtdG9vbGJhci0taW5zZXQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSGVhZGVyJyxcblxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICByZXZlYWw6IEJvb2xlYW4sXG4gICAgcmV2ZWFsT2Zmc2V0OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAyNTBcbiAgICB9LFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGVsZXZhdGVkOiBCb29sZWFuLFxuXG4gICAgaGVpZ2h0SGludDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNTBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3JldmVhbCcsICdmb2N1c2luJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksICgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FIZWFkZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgfSlcblxuICAgIGNvbnN0IHNpemUgPSByZWYocGFyc2VJbnQocHJvcHMuaGVpZ2h0SGludCwgMTApKVxuICAgIGNvbnN0IHJldmVhbGVkID0gcmVmKHRydWUpXG5cbiAgICBjb25zdCBmaXhlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICAgIHx8ICRsYXlvdXQudmlldy52YWx1ZS5pbmRleE9mKCdIJykgPiAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJldmVhbGVkLnZhbHVlID09PSB0cnVlID8gc2l6ZS52YWx1ZSA6IDBcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9mZnNldCA9IHNpemUudmFsdWUgLSAkbGF5b3V0LnNjcm9sbC52YWx1ZS5wb3NpdGlvblxuICAgICAgcmV0dXJuIG9mZnNldCA+IDAgPyBvZmZzZXQgOiAwXG4gICAgfSlcblxuICAgIGNvbnN0IGhpZGRlbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgIHx8IChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSAmJiByZXZlYWxlZC52YWx1ZSAhPT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCByZXZlYWxPbkZvY3VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgaGlkZGVuLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnJldmVhbCA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaGVhZGVyIHEtbGF5b3V0X19zZWN0aW9uLS1tYXJnaW5hbCAnXG4gICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnKSArICctdG9wJ1xuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtaGVhZGVyLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1oZWFkZXItLWhpZGRlbicgOiAnJylcbiAgICAgICsgKHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWUgPyAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgdmlldyA9ICRsYXlvdXQucm93cy52YWx1ZS50b3AsXG4gICAgICAgIGNzcyA9IHt9XG5cbiAgICAgIGlmICh2aWV3WyAwIF0gPT09ICdsJyAmJiAkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAodmlld1sgMiBdID09PSAncicgJiYgJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKCdoZWFkZXInLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIHVwZGF0ZUxvY2FsKHNpemUsIGhlaWdodClcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIGhlaWdodClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzaW4gKGV2dCkge1xuICAgICAgaWYgKHJldmVhbE9uRm9jdXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2ZvY3VzaW4nLCBldnQpXG4gICAgfVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCB2YWwpXG4gICAgICB1cGRhdGVMb2NhbChyZXZlYWxlZCwgdHJ1ZSlcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5yZXZlYWwsIHZhbCA9PiB7XG4gICAgICB2YWwgPT09IGZhbHNlICYmIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCBwcm9wcy5tb2RlbFZhbHVlKVxuICAgIH0pXG5cbiAgICB3YXRjaChyZXZlYWxlZCwgdmFsID0+IHtcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBlbWl0KCdyZXZlYWwnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsLCBzY3JvbGwgPT4ge1xuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlICYmIHVwZGF0ZUxvY2FsKHJldmVhbGVkLFxuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID09PSAndXAnXG4gICAgICAgIHx8IHNjcm9sbC5wb3NpdGlvbiA8PSBwcm9wcy5yZXZlYWxPZmZzZXRcbiAgICAgICAgfHwgc2Nyb2xsLnBvc2l0aW9uIC0gc2Nyb2xsLmluZmxlY3Rpb25Qb2ludCA8IDEwMFxuICAgICAgKVxuICAgIH0pXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHt9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlcy5oZWFkZXIgPSBpbnN0YW5jZVxuICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTGF5b3V0KCdzaXplJywgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIG9mZnNldC52YWx1ZSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlcy5oZWFkZXIgPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwge1xuICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgIG9uUmVzaXplXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdoZWFkZXInLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIG9uRm9jdXNpblxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtTGFiZWwnLFxuXG4gIHByb3BzOiB7XG4gICAgb3ZlcmxpbmU6IEJvb2xlYW4sXG4gICAgY2FwdGlvbjogQm9vbGVhbixcbiAgICBoZWFkZXI6IEJvb2xlYW4sXG4gICAgbGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgcGFyc2VkTGluZXMgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5saW5lcywgMTApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19sYWJlbCdcbiAgICAgICsgKHByb3BzLm92ZXJsaW5lID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1vdmVybGluZSB0ZXh0LW92ZXJsaW5lJyA6ICcnKVxuICAgICAgKyAocHJvcHMuY2FwdGlvbiA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tY2FwdGlvbiB0ZXh0LWNhcHRpb24nIDogJycpXG4gICAgICArIChwcm9wcy5oZWFkZXIgPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWhlYWRlcicgOiAnJylcbiAgICAgICsgKHBhcnNlZExpbmVzLnZhbHVlID09PSAxID8gJyBlbGxpcHNpcycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5saW5lcyAhPT0gdm9pZCAwICYmIHBhcnNlZExpbmVzLnZhbHVlID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JpZW50JzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICctd2Via2l0LWxpbmUtY2xhbXAnOiBwYXJzZWRMaW5lcy52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgd2l0aERpcmVjdGl2ZXMsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSGlzdG9yeSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1oaXN0b3J5LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuY29uc3QgZHVyYXRpb24gPSAxNTBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEcmF3ZXInLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsZWZ0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9LFxuXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBtaW5pVG9PdmVybGF5OiBCb29sZWFuLFxuICAgIG1pbmlXaWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNTdcbiAgICB9LFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAyM1xuICAgIH0sXG4gICAgc2hvd0lmQWJvdmU6IEJvb2xlYW4sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnZGVza3RvcCcsICdtb2JpbGUnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBvdmVybGF5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Td2lwZU9wZW46IEJvb2xlYW4sXG4gICAgbm9Td2lwZUNsb3NlOiBCb29sZWFuLFxuICAgIG5vU3dpcGVCYWNrZHJvcDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnb24tbGF5b3V0JywgJ21pbmktc3RhdGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcHJldmVudEJvZHlTY3JvbGwgfSA9IHVzZVByZXZlbnRTY3JvbGwoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRRHJhd2VyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgIH0pXG5cbiAgICBsZXQgbGFzdERlc2t0b3BTdGF0ZSwgdGltZXJNaW5pLCBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlclxuXG4gICAgY29uc3QgYmVsb3dCcmVha3BvaW50ID0gcmVmKFxuICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICApXG5cbiAgICBjb25zdCBpc01pbmkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubWluaSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBzaXplID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgaXNNaW5pLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMubWluaVdpZHRoXG4gICAgICAgIDogcHJvcHMud2lkdGhcbiAgICApKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgb25TY3JlZW5PdmVybGF5LnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCwgbm9FdmVudCkge1xuICAgICAgYWRkVG9IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgYXBwbHlQb3NpdGlvbigwKVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG90aGVySW5zdGFuY2UgPSAkbGF5b3V0Lmluc3RhbmNlc1sgb3RoZXJTaWRlLnZhbHVlIF1cbiAgICAgICAgaWYgKG90aGVySW5zdGFuY2UgIT09IHZvaWQgMCAmJiBvdGhlckluc3RhbmNlLmJlbG93QnJlYWtwb2ludCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG90aGVySW5zdGFuY2UuaGlkZShmYWxzZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMSlcbiAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh0cnVlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgZXZ0ICE9PSBmYWxzZSAmJiBzZXRTY3JvbGxhYmxlKGZhbHNlKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUodHJ1ZSlcbiAgICAgICAgbm9FdmVudCAhPT0gdHJ1ZSAmJiBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG5cbiAgICAgIGV2dCAhPT0gZmFsc2UgJiYgJGxheW91dC5hbmltYXRlKClcblxuICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHNpemUudmFsdWUpXG5cbiAgICAgIGNsZWFudXAoKVxuXG4gICAgICBub0V2ZW50ICE9PSB0cnVlICYmIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgYWRkVG9IaXN0b3J5LCByZW1vdmVGcm9tSGlzdG9yeSB9ID0gdXNlSGlzdG9yeShzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSlcblxuICAgIGNvbnN0IGluc3RhbmNlID0ge1xuICAgICAgYmVsb3dCcmVha3BvaW50LFxuICAgICAgaGlkZVxuICAgIH1cblxuICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNpZGUgPT09ICdyaWdodCcpXG5cbiAgICBjb25zdCBzdGF0ZURpcmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAoJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiAtMSlcbiAgICApXG5cbiAgICBjb25zdCBmbGFnQmFja2Ryb3BCZyA9IHJlZigwKVxuICAgIGNvbnN0IGZsYWdQYW5uaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdNaW5pQW5pbWF0ZSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBmbGFnQ29udGVudFBvc2l0aW9uID0gcmVmKCAvLyBzdGFydGluZyB3aXRoIFwiaGlkZGVuXCIgZm9yIFNTUlxuICAgICAgc2l6ZS52YWx1ZSAqIHN0YXRlRGlyZWN0aW9uLnZhbHVlXG4gICAgKVxuXG4gICAgY29uc3Qgb3RoZXJTaWRlID0gY29tcHV0ZWQoKCkgPT4gKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcpKVxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICA/IChwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZS52YWx1ZSlcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IGZpeGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8ICRsYXlvdXQudmlldy52YWx1ZS5pbmRleE9mKHJpZ2h0U2lkZS52YWx1ZSA/ICdSJyA6ICdMJykgPiAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9uTGF5b3V0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgKVxuXG4gICAgY29uc3Qgb25TY3JlZW5PdmVybGF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdmdWxsc2NyZWVuIHEtZHJhd2VyX19iYWNrZHJvcCdcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIGZsYWdQYW5uaW5nLnZhbHVlID09PSBmYWxzZSA/ICcgaGlkZGVuJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSgwLDAsMCwkeyBmbGFnQmFja2Ryb3BCZy52YWx1ZSAqIDAuNCB9KWBcbiAgICB9KSlcblxuICAgIGNvbnN0IGhlYWRlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUudG9wWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGZvb3RlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUuYm90dG9tWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGFib3ZlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUgJiYgaGVhZGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUgJiYgZm9vdGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBgJHsgc2l6ZS52YWx1ZSB9cHhgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7IGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgfXB4KWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHN0eWxlXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbihzdHlsZSwgYWJvdmVTdHlsZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRyYXdlcl9fY29udGVudCBmaXQgJ1xuICAgICAgKyAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdzY3JvbGwnIDogJ292ZXJmbG93LWF1dG8nKVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtZHJhd2VyIHEtZHJhd2VyLS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChmbGFnTWluaUFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1taW5pLWFuaW1hdGUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgbm8tdHJhbnNpdGlvbidcbiAgICAgICAgICA6IChzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJylcbiAgICAgIClcbiAgICAgICsgKFxuICAgICAgICBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgZml4ZWQgcS1kcmF3ZXItLW9uLXRvcCBxLWRyYXdlci0tbW9iaWxlIHEtZHJhd2VyLS10b3AtcGFkZGluZydcbiAgICAgICAgICA6IGAgcS1kcmF3ZXItLSR7IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSA/ICdtaW5pJyA6ICdzdGFuZGFyZCcgfWBcbiAgICAgICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBvbkxheW91dC52YWx1ZSAhPT0gdHJ1ZSA/ICcgZml4ZWQnIDogJycpXG4gICAgICAgICAgKyAocHJvcHMub3ZlcmxheSA9PT0gdHJ1ZSB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gJyBxLWRyYXdlci0tb24tdG9wJyA6ICcnKVxuICAgICAgICAgICsgKGhlYWRlclNsb3QudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS10b3AtcGFkZGluZycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBvcGVuRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgcHJvcHMubm9Td2lwZU9wZW4gIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gcHJvcHMuc2lkZSA6IG90aGVyU2lkZS52YWx1ZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbk9wZW5QYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRlbnRDbG9zZURpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBiYWNrZHJvcENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlLFxuICAgICAgICAgIG1vdXNlQWxsRGlyOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCZWxvd0JyZWFrcG9pbnQgKCkge1xuICAgICAgdXBkYXRlTG9jYWwoYmVsb3dCcmVha3BvaW50LCAoXG4gICAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICAgICkpXG4gICAgfVxuXG4gICAgd2F0Y2goYmVsb3dCcmVha3BvaW50LCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkgeyAvLyBmcm9tIGxnIHRvIHhzXG4gICAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBzaG93aW5nLnZhbHVlXG4gICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgaGlkZShmYWxzZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKFxuICAgICAgICBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ21vYmlsZSdcbiAgICAgICAgJiYgbGFzdERlc2t0b3BTdGF0ZSAhPT0gZmFsc2VcbiAgICAgICkgeyAvLyBmcm9tIHhzIHRvIGxnXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNpZGUsIChuZXdTaWRlLCBvbGRTaWRlKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9IHZvaWQgMFxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0uc3BhY2UgPSBmYWxzZVxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0ub2Zmc2V0ID0gMFxuICAgICAgfVxuXG4gICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgbmV3U2lkZSBdID0gaW5zdGFuY2VcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5zaXplID0gc2l6ZS52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNwYWNlID0gb25MYXlvdXQudmFsdWVcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5vZmZzZXQgPSBvZmZzZXQudmFsdWVcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcHJvcHMuYmVoYXZpb3IgKyBwcm9wcy5icmVha3BvaW50LFxuICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50XG4gICAgKVxuXG4gICAgd2F0Y2goJGxheW91dC5pc0NvbnRhaW5lciwgdmFsID0+IHtcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodmFsICE9PSB0cnVlKVxuICAgICAgdmFsID09PSB0cnVlICYmIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgsICgpID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiB2b2lkIDApXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHsgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCB2YWwpIH0pXG5cbiAgICB3YXRjaChvbkxheW91dCwgdmFsID0+IHtcbiAgICAgIGVtaXQoJ29uLWxheW91dCcsIHZhbClcbiAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKHJpZ2h0U2lkZSwgKCkgPT4geyBhcHBseVBvc2l0aW9uKCkgfSlcblxuICAgIHdhdGNoKHNpemUsIHZhbCA9PiB7XG4gICAgICBhcHBseVBvc2l0aW9uKClcbiAgICAgIHVwZGF0ZVNpemVPbkxheW91dChwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1pbmlUb092ZXJsYXksIHZhbCA9PiB7XG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQodmFsLCBzaXplLnZhbHVlKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiAkcS5sYW5nLnJ0bCwgKCkgPT4geyBhcHBseVBvc2l0aW9uKCkgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1pbmksICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGFuaW1hdGVNaW5pKClcbiAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goaXNNaW5pLCB2YWwgPT4geyBlbWl0KCdtaW5pLXN0YXRlJywgdmFsKSB9KVxuXG4gICAgZnVuY3Rpb24gYXBwbHlQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogc2l6ZS52YWx1ZVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgTWF0aC5hYnMocG9zaXRpb24pID09PSBzaXplLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdGF0ZURpcmVjdGlvbi52YWx1ZSAqICRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgPSBwb3NpdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5QmFja2Ryb3AgKHgpIHtcbiAgICAgIGZsYWdCYWNrZHJvcEJnLnZhbHVlID0geFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGFibGUgKHYpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHYgPT09IHRydWVcbiAgICAgICAgPyAncmVtb3ZlJ1xuICAgICAgICA6ICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ2FkZCcgOiAnJylcblxuICAgICAgYWN0aW9uICE9PSAnJyAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFsgYWN0aW9uIF0oJ3EtYm9keS0tZHJhd2VyLXRvZ2dsZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1pbmkgKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcblxuICAgICAgaWYgKHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAvLyBuZWVkIHRvIHNwZWVkIGl0IHVwIGFuZCBhcHBseSBpdCBpbW1lZGlhdGVseSxcbiAgICAgICAgLy8gZXZlbiBmYXN0ZXIgdGhhbiBWdWUncyBuZXh0VGljayFcbiAgICAgICAgdm0ucHJveHkuJGVsLmNsYXNzTGlzdC5hZGQoJ3EtZHJhd2VyLS1taW5pLWFuaW1hdGUnKVxuICAgICAgfVxuXG4gICAgICBmbGFnTWluaUFuaW1hdGUudmFsdWUgPSB0cnVlXG4gICAgICB0aW1lck1pbmkgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaWYgKHZtICYmIHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgICAgfVxuICAgICAgfSwgMTUwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlblBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBvcGVuZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgcG9zaXRpb24gPSBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IHBvc2l0aW9uID49IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvdygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihcbiAgICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gcmlnaHRTaWRlLnZhbHVlICE9PSB0cnVlIDogcmlnaHRTaWRlLnZhbHVlKVxuICAgICAgICAgID8gTWF0aC5tYXgod2lkdGggLSBwb3NpdGlvbiwgMClcbiAgICAgICAgICA6IE1hdGgubWluKDAsIHBvc2l0aW9uIC0gd2lkdGgpXG4gICAgICApXG4gICAgICBhcHBseUJhY2tkcm9wKFxuICAgICAgICBiZXR3ZWVuKHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpXG4gICAgICApXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gY2xvc2VkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIGRpciA9IGV2dC5kaXJlY3Rpb24gPT09IHByb3BzLnNpZGUsXG4gICAgICAgIHBvc2l0aW9uID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gZGlyICE9PSB0cnVlIDogZGlyKVxuICAgICAgICAgID8gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG4gICAgICAgICAgOiAwXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBNYXRoLmFicyhwb3NpdGlvbikgPCBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgIGFwcGx5QmFja2Ryb3AoYmV0d2VlbigxIC0gcG9zaXRpb24gLyB3aWR0aCwgMCwgMSkpXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZShwcm9wcy5zaWRlLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZU9uTGF5b3V0IChtaW5pVG9PdmVybGF5LCBzaXplKSB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBtaW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZSlcbiAgICB9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gaW5zdGFuY2VcbiAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgb25MYXlvdXQudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcbiAgICApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgZW1pdCgnb24tbGF5b3V0Jywgb25MYXlvdXQudmFsdWUpXG4gICAgICBlbWl0KCdtaW5pLXN0YXRlJywgaXNNaW5pLnZhbHVlKVxuXG4gICAgICBsYXN0RGVza3RvcFN0YXRlID0gcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWVcblxuICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyBoYW5kbGVTaG93IDogaGFuZGxlSGlkZVxuICAgICAgICBhY3Rpb24oZmFsc2UsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgIT09IDApIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgYWxsIGNvbXB1dGVkIHByb3BlcnRpZXNcbiAgICAgICAgLy8gaGF2ZSBiZWVuIHVwZGF0ZWQgYmVmb3JlIGNhbGxpbmcgaGFuZGxlU2hvdy9oYW5kbGVIaWRlKClcbiAgICAgICAgbmV4dFRpY2soZm4pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHdhdGNoKCRsYXlvdXQudG90YWxXaWR0aCwgKCkgPT4ge1xuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlcigpXG4gICAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyID0gdm9pZCAwXG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZuKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyICE9PSB2b2lkIDAgJiYgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcblxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcblxuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPT09IGluc3RhbmNlKSB7XG4gICAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcHJvcHMubm9Td2lwZU9wZW4gPT09IGZhbHNlICYmIGNoaWxkLnB1c2goXG4gICAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGtleTogJ29wZW4nLFxuICAgICAgICAgICAgICBjbGFzczogYHEtZHJhd2VyX19vcGVuZXIgZml4ZWQtJHsgcHJvcHMuc2lkZSB9YCxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9wZW5EaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGhEaXIoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVmOiAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgICBjbGFzczogYmFja2Ryb3BDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IGJhY2tkcm9wU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICAgb25DbGljazogaGlkZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgICdiYWNrZHJvcCcsXG4gICAgICAgICAgICBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICgpID0+IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluaSA9IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSAmJiBzbG90cy5taW5pICE9PSB2b2lkIDBcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICBrZXk6ICcnICsgbWluaSwgLy8gcmVxdWlyZWQgb3RoZXJ3aXNlIFZ1ZSB3aWxsIG5vdCBkaWZmIGNvcnJlY3RseVxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgIF1cbiAgICAgICAgfSwgbWluaSA9PT0gdHJ1ZVxuICAgICAgICAgID8gc2xvdHMubWluaSgpXG4gICAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgICApXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0X19zaGFkb3cgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoRGlyKFxuICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgeyByZWY6ICdjb250ZW50JywgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHN0eWxlOiBzdHlsZS52YWx1ZSB9LFxuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgJ2NvbnRlbnRjbG9zZScsXG4gICAgICAgICAgcHJvcHMubm9Td2lwZUNsb3NlICE9PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAoKSA9PiBjb250ZW50Q2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgeyBjbGFzczogJ3EtZHJhd2VyLWNvbnRhaW5lcicgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHByb3ZpZGUsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZUNvbnRhaW5lcicsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZUNvbnRhaW5lciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICB9KVxuXG4gICAgcHJvdmlkZShwYWdlQ29udGFpbmVyS2V5LCB0cnVlKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdUb3AgPSBgJHsgJGxheW91dC5oZWFkZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnTGVmdCcgOiAnUmlnaHQnIH1gIF0gPSBgJHsgJGxheW91dC5yaWdodC5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ0JvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0JyB9YCBdID0gYCR7ICRsYXlvdXQubGVmdC5zaXplIH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhZ2UtY29udGFpbmVyJyxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQsIHdhdGNoLCBwcm92aWRlLCBvblVubW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUVNjcm9sbE9ic2VydmVyIGZyb20gJy4uL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsYmFyV2lkdGggfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTGF5b3V0JyxcblxuICBwcm9wczoge1xuICAgIGNvbnRhaW5lcjogQm9vbGVhbixcbiAgICB2aWV3OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaGhoIGxwciBmZmYnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IC9eKGh8bCloKGh8cikgbHByIChmfGwpZihmfHIpJC8udGVzdCh2LnRvTG93ZXJDYXNlKCkpXG4gICAgfSxcblxuICAgIG9uU2Nyb2xsOiBGdW5jdGlvbixcbiAgICBvblNjcm9sbEhlaWdodDogRnVuY3Rpb24sXG4gICAgb25SZXNpemU6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICAvLyBwYWdlIHJlbGF0ZWRcbiAgICBjb25zdCBoZWlnaHQgPSByZWYoJHEuc2NyZWVuLmhlaWdodClcbiAgICBjb25zdCB3aWR0aCA9IHJlZihwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAwIDogJHEuc2NyZWVuLndpZHRoKVxuICAgIGNvbnN0IHNjcm9sbCA9IHJlZih7IHBvc2l0aW9uOiAwLCBkaXJlY3Rpb246ICdkb3duJywgaW5mbGVjdGlvblBvaW50OiAwIH0pXG5cbiAgICAvLyBjb250YWluZXIgb25seSBwcm9wXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gcmVmKDApXG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSByZWYoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlID8gMCA6IGdldFNjcm9sbGJhcldpZHRoKCkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxheW91dCBxLWxheW91dC0tJ1xuICAgICAgKyAocHJvcHMuY29udGFpbmVyID09PSB0cnVlID8gJ2NvbnRhaW5lcml6ZWQnIDogJ3N0YW5kYXJkJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmNvbnRhaW5lciA9PT0gZmFsc2VcbiAgICAgICAgPyB7IG1pbkhlaWdodDogJHEuc2NyZWVuLmhlaWdodCArICdweCcgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgLy8gdXNlZCBieSBjb250YWluZXIgb25seVxuICAgIGNvbnN0IHRhcmdldFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IDBcbiAgICAgICAgPyB7IFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAkeyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHhgIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGNvbnN0IHRhcmdldENoaWxkU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF06IDAsXG4gICAgICAgICAgICBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdOiBgLSR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAsXG4gICAgICAgICAgICB3aWR0aDogYGNhbGMoMTAwJSArICR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weClgXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gb25QYWdlU2Nyb2xsIChkYXRhKSB7XG4gICAgICBpZiAocHJvcHMuY29udGFpbmVyID09PSB0cnVlIHx8IGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICBwb3NpdGlvbjogZGF0YS5wb3NpdGlvbi50b3AsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkYXRhLmRpcmVjdGlvbixcbiAgICAgICAgICBkaXJlY3Rpb25DaGFuZ2VkOiBkYXRhLmRpcmVjdGlvbkNoYW5nZWQsXG4gICAgICAgICAgaW5mbGVjdGlvblBvaW50OiBkYXRhLmluZmxlY3Rpb25Qb2ludC50b3AsXG4gICAgICAgICAgZGVsdGE6IGRhdGEuZGVsdGEudG9wXG4gICAgICAgIH1cblxuICAgICAgICBzY3JvbGwudmFsdWUgPSBpbmZvXG4gICAgICAgIHByb3BzLm9uU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgnc2Nyb2xsJywgaW5mbylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhZ2VSZXNpemUgKGRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaGVpZ2h0OiBuZXdIZWlnaHQsIHdpZHRoOiBuZXdXaWR0aCB9ID0gZGF0YVxuICAgICAgbGV0IHJlc2l6ZWQgPSBmYWxzZVxuXG4gICAgICBpZiAoaGVpZ2h0LnZhbHVlICE9PSBuZXdIZWlnaHQpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgaGVpZ2h0LnZhbHVlID0gbmV3SGVpZ2h0XG4gICAgICAgIHByb3BzLm9uU2Nyb2xsSGVpZ2h0ICE9PSB2b2lkIDAgJiYgZW1pdCgnc2Nyb2xsLWhlaWdodCcsIG5ld0hlaWdodClcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgICAgaWYgKHdpZHRoLnZhbHVlICE9PSBuZXdXaWR0aCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICB3aWR0aC52YWx1ZSA9IG5ld1dpZHRoXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVkID09PSB0cnVlICYmIHByb3BzLm9uUmVzaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgncmVzaXplJywgZGF0YSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRhaW5lclJlc2l6ZSAoeyBoZWlnaHQgfSkge1xuICAgICAgaWYgKGNvbnRhaW5lckhlaWdodC52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIGNvbnRhaW5lckhlaWdodC52YWx1ZSA9IGhlaWdodFxuICAgICAgICB1cGRhdGVTY3JvbGxiYXJXaWR0aCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsYmFyV2lkdGggKCkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGhlaWdodC52YWx1ZSA+IGNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgID8gZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgICAgIDogMFxuXG4gICAgICAgIGlmIChzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGltZXJcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgICB0aW1lciA9IHZvaWQgMFxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1pdGVtIGNsaWNrYWJsZSBAY2xpY2s9XCJ0aGlzLiRyb3V0ZXIucHVzaChsaW5rKVwiPlxyXG4gICAgPHEtaXRlbS1zZWN0aW9uIHYtaWY9XCJpY29uXCIgYXZhdGFyPlxyXG4gICAgICA8cS1pY29uIDpuYW1lPVwiaWNvblwiIC8+XHJcbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxyXG5cclxuICAgIDxxLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgPHEtaXRlbS1sYWJlbD57eyB0aXRsZSB9fTwvcS1pdGVtLWxhYmVsPlxyXG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+e3sgY2FwdGlvbiB9fTwvcS1pdGVtLWxhYmVsPlxyXG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICA8L3EtaXRlbT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XHJcbiAgbmFtZTogJ0Vzc2VudGlhbExpbmsnLFxyXG4gIHByb3BzOiB7XHJcbiAgICB0aXRsZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIGNhcHRpb246IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICBsaW5rOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJyMnXHJcbiAgICB9LFxyXG5cclxuICAgIGljb246IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1sYXlvdXQgdmlldz1cImxIaCBMcHIgbEZmXCI+XHJcbiAgICA8cS1oZWFkZXIgZWxldmF0ZWQ+XHJcbiAgICAgIDxxLXRvb2xiYXI+XHJcbiAgICAgICAgPHEtYnRuIGZsYXQgZGVuc2Ugcm91bmQgaWNvbj1cIm1lbnVcIiBhcmlhLWxhYmVsPVwiTWVudVwiIEBjbGljaz1cInRvZ2dsZUxlZnREcmF3ZXJcIiAvPlxyXG5cclxuICAgICAgICA8cS10b29sYmFyLXRpdGxlPlxyXG4gICAgICAgICAgRW1iYXJxdWVzXHJcbiAgICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XHJcblxyXG4gICAgICAgIDxkaXY+PC9kaXY+XHJcbiAgICAgIDwvcS10b29sYmFyPlxyXG4gICAgPC9xLWhlYWRlcj5cclxuXHJcbiAgICA8cS1kcmF3ZXIgdi1tb2RlbD1cImxlZnREcmF3ZXJPcGVuXCIgc2hvdy1pZi1hYm92ZSBib3JkZXJlZD5cclxuICAgICAgPHEtbGlzdD5cclxuICAgICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5cclxuICAgICAgICAgIE1lbsO6IG9wY2lvbmVzXHJcbiAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XHJcblxyXG4gICAgICAgIDxFc3NlbnRpYWxMaW5rIHYtZm9yPVwibGluayBpbiBlc3NlbnRpYWxMaW5rc1wiIDprZXk9XCJsaW5rLnRpdGxlXCIgdi1iaW5kPVwibGlua1wiIC8+XHJcbiAgICAgIDwvcS1saXN0PlxyXG4gICAgPC9xLWRyYXdlcj5cclxuXHJcbiAgICA8cS1wYWdlLWNvbnRhaW5lcj5cclxuICAgICAgPHJvdXRlci12aWV3IC8+XHJcbiAgICA8L3EtcGFnZS1jb250YWluZXI+XHJcbiAgPC9xLWxheW91dD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVmIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgRXNzZW50aWFsTGluayBmcm9tICdjb21wb25lbnRzL0Vzc2VudGlhbExpbmsudnVlJ1xyXG5pbXBvcnQgeyB1c2VHbG9iYWxTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dsb2JhbFwiXHJcblxyXG5jb25zdCBsaW5rc0xpc3QgPSBbXHJcbiAge1xyXG4gICAgdGl0bGU6ICdJbmljaW8nLFxyXG4gICAgY2FwdGlvbjogJ0lyIGFsIGluaWNpbywgY2FtYmlhciBkZSB1c3VhcmlvJyxcclxuICAgIGljb246ICdob21lJyxcclxuICAgIGxpbms6ICcvJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGl0bGU6ICdFbXByZXNhcycsXHJcbiAgICBjYXB0aW9uOiAnQ2FtYmlhciBsYSBlbXByZXNhIGFjdHVhbCcsXHJcbiAgICBpY29uOiAnYnVzaW5lc3NfY2VudGVyJyxcclxuICAgIGxpbms6ICcvY3VzdG9tZXJzJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGl0bGU6ICdTYWxpcicsXHJcbiAgICBjYXB0aW9uOiAnbG9nb3V0JyxcclxuICAgIGljb246ICdsb2dvdXQnLFxyXG4gICAgbGluazogJy9sb2dvdXQnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogJ1Bob3RvJyxcclxuICAgIGNhcHRpb246ICdQaG90byBjYW1lcmEnLFxyXG4gICAgaWNvbjogJ3Bob3RvX2NhbWVyYScsXHJcbiAgICBsaW5rOiAnL3Bob3RvcydcclxuICB9LFxyXG5cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcclxuICBuYW1lOiAnTWFpbkxheW91dCcsXHJcblxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIEVzc2VudGlhbExpbmtcclxuICB9LFxyXG5cclxuICBzZXR1cCgpIHtcclxuICAgIGNvbnN0IGdsb2JhbFN0b3JlID0gdXNlR2xvYmFsU3RvcmUoKTtcclxuICAgIGNvbnN0IGxlZnREcmF3ZXJPcGVuID0gcmVmKGZhbHNlKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVzc2VudGlhbExpbmtzOiBsaW5rc0xpc3QsXHJcbiAgICAgIGxlZnREcmF3ZXJPcGVuLFxyXG4gICAgICB0b2dnbGVMZWZ0RHJhd2VyKCkge1xyXG4gICAgICAgIGxlZnREcmF3ZXJPcGVuLnZhbHVlID0gIWxlZnREcmF3ZXJPcGVuLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGdsb2JhbFN0b3JlXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG48L3NjcmlwdD5cclxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfb3BlbkJsb2NrIiwiX21lcmdlUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0EsSUFBQSxnQkFBZSxnQkFBZ0I7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
