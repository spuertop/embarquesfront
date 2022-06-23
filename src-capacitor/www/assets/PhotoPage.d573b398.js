import { a as computed, c as createComponent, r as ref, w as watch, o as onBeforeUnmount, h, aj as Transition, d as hSlot, ai as QSpinner, T as createDirective, U as client, R as noop, V as leftClick, W as addEvt, X as preventDraggable, $ as position, O as stopAndPrevent, a0 as cleanEvt, g as getCurrentInstance, ay as KeepAlive, az as getNormalizedVNodes, n as nextTick, a2 as vmHasRouter, aA as onBeforeMount, f as onMounted, a1 as History, k as hDir, u as hMergeSlot, aB as isNumber, F as QBtn, at as registerPlugin, _ as _export_sfc, x as openBlock, y as createBlock, z as withCtx, J as createBaseVNode, A as createVNode, Q as QIcon, C as createTextVNode, D as toDisplayString, G as createElementBlock, H as renderList, I as Fragment } from "./index.af93674c.js";
import { Q as QRadio, a as QPageSticky } from "./QPageSticky.662bbd1b.js";
import { Q as QInput } from "./QInput.1a8b15d7.js";
import { g as getModifierDirections, s as shouldStart, c as clearSelection } from "./selection.f6fbe71f.js";
import { u as useDarkProps, a as useDark, b as useGlobalStore } from "./global.202de1e2.js";
import { Q as QPage } from "./QPage.01bdf203.js";
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0));
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer;
    const images = [
      ref(null),
      ref(props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null)
    ];
    const position2 = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(() => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`);
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(() => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`);
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function addImage(imgProps) {
      clearTimeout(loadTimer);
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[0].value = null;
        images[1].value = null;
        return;
      }
      isLoading.value = true;
      images[position2.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (loadTimer === null) {
        return;
      }
      clearTimeout(loadTimer);
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (loadTimer === null || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (loadTimer === null) {
        return;
      }
      position2.value = position2.value === 1 ? 0 : 1;
      images[position2.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      clearTimeout(loadTimer);
      isLoading.value = false;
      hasError.value = true;
      images[0].value = null;
      images[1].value = null;
      emit("error", err);
    }
    function getContainer(key, child) {
      return h("div", { class: "q-img__container absolute-full", key }, child);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position2.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return getContainer("img" + index, h("img", data));
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        clearTimeout(loadTimer);
        loadTimer = null;
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(h("div", { key: "filler", style: ratioStyle.value }));
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(h(Transition, { name: "q-transition--fade" }, getContent));
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
var TouchSwipe = createDirective({
  name: "touch-swipe",
  beforeMount(el, { value, arg, modifiers }) {
    if (modifiers.mouse !== true && client.has.touch !== true) {
      return;
    }
    const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
    const ctx = {
      handler: value,
      sensitivity: parseArg(arg),
      direction: getModifierDirections(modifiers),
      noop,
      mouseStart(evt) {
        if (shouldStart(evt, ctx) && leftClick(evt)) {
          addEvt(ctx, "temp", [
            [document, "mousemove", "move", `notPassive${mouseCapture}`],
            [document, "mouseup", "end", "notPassiveCapture"]
          ]);
          ctx.start(evt, true);
        }
      },
      touchStart(evt) {
        if (shouldStart(evt, ctx)) {
          const target = evt.target;
          addEvt(ctx, "temp", [
            [target, "touchmove", "move", "notPassiveCapture"],
            [target, "touchcancel", "end", "notPassiveCapture"],
            [target, "touchend", "end", "notPassiveCapture"]
          ]);
          ctx.start(evt);
        }
      },
      start(evt, mouseEvent) {
        client.is.firefox === true && preventDraggable(el, true);
        const pos = position(evt);
        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: Date.now(),
          mouse: mouseEvent === true,
          dir: false
        };
      },
      move(evt) {
        if (ctx.event === void 0) {
          return;
        }
        if (ctx.event.dir !== false) {
          stopAndPrevent(evt);
          return;
        }
        const time = Date.now() - ctx.event.time;
        if (time === 0) {
          return;
        }
        const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
        if (ctx.event.mouse !== true) {
          if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
            ctx.end(evt);
            return;
          }
        } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
          return;
        }
        const velX = absX / time, velY = absY / time;
        if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = distY < 0 ? "up" : "down";
        }
        if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = distX < 0 ? "left" : "right";
        }
        if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = "up";
        }
        if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = "down";
        }
        if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = "left";
        }
        if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = "right";
        }
        if (ctx.event.dir !== false) {
          stopAndPrevent(evt);
          if (ctx.event.mouse === true) {
            document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelay) => {
              ctx.styleCleanup = void 0;
              document.body.classList.remove("non-selectable");
              const remove = () => {
                document.body.classList.remove("no-pointer-events--children");
              };
              if (withDelay === true) {
                setTimeout(remove, 50);
              } else {
                remove();
              }
            };
          }
          ctx.handler({
            evt,
            touch: ctx.event.mouse !== true,
            mouse: ctx.event.mouse,
            direction: ctx.event.dir,
            duration: time,
            distance: {
              x: absX,
              y: absY
            }
          });
        } else {
          ctx.end(evt);
        }
      },
      end(evt) {
        if (ctx.event === void 0) {
          return;
        }
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup(true);
        evt !== void 0 && ctx.event.dir !== false && stopAndPrevent(evt);
        ctx.event = void 0;
      }
    };
    el.__qtouchswipe = ctx;
    modifiers.mouse === true && addEvt(ctx, "main", [
      [el, "mousedown", "mouseStart", `passive${mouseCapture}`]
    ]);
    client.has.touch === true && addEvt(ctx, "main", [
      [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
      [el, "touchmove", "noop", "notPassiveCapture"]
    ]);
  },
  updated(el, bindings) {
    const ctx = el.__qtouchswipe;
    if (ctx !== void 0) {
      if (bindings.oldValue !== bindings.value) {
        typeof bindings.value !== "function" && ctx.end();
        ctx.handler = bindings.value;
      }
      ctx.direction = getModifierDirections(bindings.modifiers);
    }
  },
  beforeUnmount(el) {
    const ctx = el.__qtouchswipe;
    if (ctx !== void 0) {
      cleanEvt(ctx, "main");
      cleanEvt(ctx, "temp");
      client.is.firefox === true && preventDraggable(el, false);
      ctx.styleCleanup !== void 0 && ctx.styleCleanup();
      delete el.__qtouchswipe;
    }
  }
});
function useCache() {
  const cache = /* @__PURE__ */ new Map();
  return {
    getCache: function(key, obj) {
      return cache[key] === void 0 ? cache[key] = obj : cache[key];
    },
    getCacheWithFn: function(key, fn) {
      return cache[key] === void 0 ? cache[key] = fn() : cache[key];
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "before-transition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCacheWithFn } = useCache();
  let panels, forcedPanelTransition;
  const panelIndex = ref(null);
  const panelTransition = ref(null);
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(() => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`);
  const transitionNext = computed(() => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`);
  const transitionStyle = computed(() => `--q-transition-duration: ${props.transitionDuration}ms`);
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(() => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0);
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1);
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("before-transition", newVal, oldVal);
      nextTick(() => {
        emit("transition", newVal, oldVal);
      });
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index > -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length > 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper, { key: contentKey.value, style: transitionStyle.value }, () => panel)
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) {
      return;
    }
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(hSlot(slots.default, [])).filter((panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true);
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
var QCarouselSlide = createComponent({
  name: "QCarouselSlide",
  props: {
    ...usePanelChildProps,
    imgSrc: String
  },
  setup(props, { slots }) {
    const style = computed(() => props.imgSrc ? { backgroundImage: `url("${props.imgSrc}")` } : {});
    return () => h("div", {
      class: "q-carousel__slide",
      style: style.value
    }, hSlot(slots.default));
  }
});
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) {
      return;
    }
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) {
      return;
    }
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
const navigationPositionOptions = ["top", "right", "bottom", "left"];
const controlTypeOptions = ["regular", "flat", "outline", "push", "unelevated"];
var QCarousel = createComponent({
  name: "QCarousel",
  props: {
    ...useDarkProps,
    ...usePanelProps,
    ...useFullscreenProps,
    transitionPrev: {
      type: String,
      default: "fade"
    },
    transitionNext: {
      type: String,
      default: "fade"
    },
    height: String,
    padding: Boolean,
    controlColor: String,
    controlTextColor: String,
    controlType: {
      type: String,
      validator: (v) => controlTypeOptions.includes(v),
      default: "flat"
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: {
      type: String,
      validator: (v) => navigationPositionOptions.includes(v)
    },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean
  },
  emits: [
    ...useFullscreenEmits,
    ...usePanelEmits
  ],
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    let timer, panelsLen;
    const {
      updatePanelsList,
      getPanelContent,
      panelDirectives,
      goToPanel,
      previousPanel,
      nextPanel,
      getEnabledPanels,
      panelIndex
    } = usePanel();
    const { inFullscreen } = useFullscreen();
    const style = computed(() => inFullscreen.value !== true && props.height !== void 0 ? { height: props.height } : {});
    const direction = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const classes = computed(() => `q-carousel q-panel-parent q-carousel--with${props.padding === true ? "" : "out"}-padding` + (inFullscreen.value === true ? " fullscreen" : "") + (isDark.value === true ? " q-carousel--dark q-dark" : "") + (props.arrows === true ? ` q-carousel--arrows-${direction.value}` : "") + (props.navigation === true ? ` q-carousel--navigation-${navigationPosition.value}` : ""));
    const arrowIcons = computed(() => {
      const ico = [
        props.prevIcon || $q.iconSet.carousel[props.vertical === true ? "up" : "left"],
        props.nextIcon || $q.iconSet.carousel[props.vertical === true ? "down" : "right"]
      ];
      return props.vertical === false && $q.lang.rtl === true ? ico.reverse() : ico;
    });
    const navIcon = computed(() => props.navigationIcon || $q.iconSet.carousel.navigationIcon);
    const navActiveIcon = computed(() => props.navigationActiveIcon || navIcon.value);
    const navigationPosition = computed(() => props.navigationPosition || (props.vertical === true ? "right" : "bottom"));
    const controlProps = computed(() => ({
      color: props.controlColor,
      textColor: props.controlTextColor,
      round: true,
      [props.controlType]: true,
      dense: true
    }));
    watch(() => props.modelValue, () => {
      if (props.autoplay) {
        clearInterval(timer);
        startTimer();
      }
    });
    watch(() => props.autoplay, (val) => {
      if (val) {
        startTimer();
      } else {
        clearInterval(timer);
      }
    });
    function startTimer() {
      const duration = isNumber(props.autoplay) === true ? props.autoplay : 5e3;
      timer = setTimeout(duration >= 0 ? nextPanel : previousPanel, Math.abs(duration));
    }
    onMounted(() => {
      props.autoplay && startTimer();
    });
    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    function getNavigationContainer(type, mapping) {
      return h("div", {
        class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${type} q-carousel__navigation--${navigationPosition.value}` + (props.controlColor !== void 0 ? ` text-${props.controlColor}` : "")
      }, [
        h("div", {
          class: "q-carousel__navigation-inner flex flex-center no-wrap"
        }, getEnabledPanels().map(mapping))
      ]);
    }
    function getContent() {
      const node = [];
      if (props.navigation === true) {
        const fn = slots["navigation-icon"] !== void 0 ? slots["navigation-icon"] : (opts) => h(QBtn, {
          key: "nav" + opts.name,
          class: `q-carousel__navigation-icon q-carousel__navigation-icon--${opts.active === true ? "" : "in"}active`,
          ...opts.btnProps,
          onClick: opts.onClick
        });
        const maxIndex = panelsLen - 1;
        node.push(getNavigationContainer("buttons", (panel, index) => {
          const name = panel.props.name;
          const active = panelIndex.value === index;
          return fn({
            index,
            maxIndex,
            name,
            active,
            btnProps: {
              icon: active === true ? navActiveIcon.value : navIcon.value,
              size: "sm",
              ...controlProps.value
            },
            onClick: () => {
              goToPanel(name);
            }
          });
        }));
      } else if (props.thumbnails === true) {
        const color = props.controlColor !== void 0 ? ` text-${props.controlColor}` : "";
        node.push(getNavigationContainer("thumbnails", (panel) => {
          const slide = panel.props;
          return h("img", {
            key: "tmb#" + slide.name,
            class: `q-carousel__thumbnail q-carousel__thumbnail--${slide.name === props.modelValue ? "" : "in"}active` + color,
            src: slide.imgSrc || slide["img-src"],
            onClick: () => {
              goToPanel(slide.name);
            }
          });
        }));
      }
      if (props.arrows === true && panelIndex.value >= 0) {
        if (props.infinite === true || panelIndex.value > 0) {
          node.push(h("div", {
            key: "prev",
            class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${direction.value} absolute flex flex-center`
          }, [
            h(QBtn, {
              icon: arrowIcons.value[0],
              ...controlProps.value,
              onClick: previousPanel
            })
          ]));
        }
        if (props.infinite === true || panelIndex.value < panelsLen - 1) {
          node.push(h("div", {
            key: "next",
            class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${direction.value} absolute flex flex-center`
          }, [
            h(QBtn, {
              icon: arrowIcons.value[1],
              ...controlProps.value,
              onClick: nextPanel
            })
          ]));
        }
      }
      return hMergeSlot(slots.control, node);
    }
    return () => {
      panelsLen = updatePanelsList(slots);
      return h("div", {
        class: classes.value,
        style: style.value
      }, [
        hDir("div", { class: "q-carousel__slides-container" }, getPanelContent(), "sl-cont", props.swipeable, () => panelDirectives.value)
      ].concat(getContent()));
    };
  }
});
var CameraSource;
(function(CameraSource2) {
  CameraSource2["Prompt"] = "PROMPT";
  CameraSource2["Camera"] = "CAMERA";
  CameraSource2["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function(CameraDirection2) {
  CameraDirection2["Rear"] = "REAR";
  CameraDirection2["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function(CameraResultType2) {
  CameraResultType2["Uri"] = "uri";
  CameraResultType2["Base64"] = "base64";
  CameraResultType2["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));
const Camera = registerPlugin("Camera", {
  web: () => import("./web.20208c68.js").then((m) => new m.CameraWeb())
});
const _sfc_main = {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.getPhotos();
    const action = ref("photo");
    const imageSrc = ref("");
    const slide = ref(1);
    function nuevaEntrega() {
      globalStore.changeAE();
    }
    async function captureImage() {
      const image = await Camera.getPhoto({
        quality: 75,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: "CAMERA",
        correctOrientation: true
      });
      imageSrc.value = "data:image/jpeg;base64, " + image.base64String;
      console.log(image.base64String);
      await globalStore.uploadPhoto(image.base64String);
      globalStore.getPhotos();
    }
    return {
      globalStore,
      action,
      nuevaEntrega,
      imageSrc,
      captureImage,
      slide
    };
  }
};
const _hoisted_1 = { class: "text-center text-h5 text-weight-bold" };
const _hoisted_2 = { class: "text-center" };
const _hoisted_3 = {
  class: "q-pa-sm",
  style: { "font-size": "20px" }
};
const _hoisted_4 = { class: "row items-center" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "col-3" }, "Albar\xE1n", -1);
const _hoisted_6 = { class: "col" };
const _hoisted_7 = { class: "row items-center q-pt-sm" };
const _hoisted_8 = { class: "col-12 flex justify-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex-center q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QIcon, { name: "photo_camera" }),
        createTextVNode(" Fotografiar " + toDisplayString($setup.globalStore.customer) + " ", 1),
        createVNode(QIcon, { name: "photo_camera" })
      ]),
      createBaseVNode("div", _hoisted_2, [
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.action = $event),
          class: "text-grey-5",
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "load",
          label: "Cargar",
          onClick: _cache[1] || (_cache[1] = ($event) => this.$router.push({ path: "/readings", query: { action: "load" } }))
        }, null, 8, ["modelValue"]),
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.action = $event),
          class: "text-grey-5",
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "download",
          label: "Descargar",
          onClick: _cache[3] || (_cache[3] = ($event) => this.$router.push({ path: "/readings", query: { action: "download" } }))
        }, null, 8, ["modelValue"]),
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.action = $event),
          class: "text-primary",
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "photo",
          label: "Fotografiar"
        }, null, 8, ["modelValue"])
      ]),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createBaseVNode("div", _hoisted_6, [
            createVNode(QInput, {
              dense: "",
              square: "",
              outlined: "",
              standout: "text-black",
              modelValue: $setup.globalStore.aedocument,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.globalStore.aedocument = $event),
              disable: ""
            }, null, 8, ["modelValue"])
          ])
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createVNode(QBtn, {
              style: { "width": "100vw" },
              icon: "photo_camera",
              color: "primary",
              label: "Hacer Foto",
              onClick: $setup.captureImage
            }, null, 8, ["onClick"])
          ])
        ])
      ]),
      createVNode(QCarousel, {
        animated: "",
        modelValue: $setup.slide,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.slide = $event),
        arrows: "",
        navigation: "",
        infinite: "",
        style: { "height": "55vh" }
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.globalStore.photoList, (item) => {
            return openBlock(), createBlock(QCarouselSlide, {
              key: item.id,
              name: item.id,
              class: "q-pa-xs"
            }, {
              default: withCtx(() => [
                createVNode(QImg, {
                  src: item.src
                }, null, 8, ["src"])
              ]),
              _: 2
            }, 1032, ["name"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageSticky, {
        position: "bottom",
        offset: [0, 18]
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            style: { "width": "95vw" },
            color: "accent",
            "text-color": "white",
            label: "Cargar otra entrega",
            "no-caps": "",
            onClick: $setup.nuevaEntrega
          }, null, 8, ["onClick"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var PhotoPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PhotoPage.vue"]]);
var PhotoPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": PhotoPage
}, Symbol.toStringTag, { value: "Module" }));
export { CameraSource as C, PhotoPage$1 as P, CameraDirection as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvdG9QYWdlLmQ1NzNiMzk4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yYXRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL1RvdWNoU3dpcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBhbmVsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jYXJvdXNlbC9RQ2Fyb3VzZWxTbGlkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZ1bGxzY3JlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Nhcm91c2VsL1FDYXJvdXNlbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NhbWVyYS9kaXN0L2VzbS9kZWZpbml0aW9ucy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NhbWVyYS9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9QaG90b1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlUmF0aW9Qcm9wcyA9IHtcbiAgcmF0aW86IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIG5hdHVyYWxSYXRpbykge1xuICAvLyByZXR1cm4gcmF0aW9TdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHJhdGlvID0gTnVtYmVyKFxuICAgICAgcHJvcHMucmF0aW8gfHwgKG5hdHVyYWxSYXRpbyAhPT0gdm9pZCAwID8gbmF0dXJhbFJhdGlvLnZhbHVlIDogdm9pZCAwKVxuICAgIClcblxuICAgIHJldHVybiBpc05hTihyYXRpbykgIT09IHRydWUgJiYgcmF0aW8gPiAwXG4gICAgICA/IHsgcGFkZGluZ0JvdHRvbTogYCR7IDEwMCAvIHJhdGlvIH0lYCB9XG4gICAgICA6IG51bGxcbiAgfSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VSYXRpbywgeyB1c2VSYXRpb1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmF0aW8uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmNvbnN0IGRlZmF1bHRSYXRpbyA9IDE2IC8gOVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUltZycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSYXRpb1Byb3BzLFxuXG4gICAgc3JjOiBTdHJpbmcsXG4gICAgc3Jjc2V0OiBTdHJpbmcsXG4gICAgc2l6ZXM6IFN0cmluZyxcblxuICAgIGFsdDogU3RyaW5nLFxuICAgIGNyb3Nzb3JpZ2luOiBTdHJpbmcsXG4gICAgZGVjb2Rpbmc6IFN0cmluZyxcbiAgICByZWZlcnJlcnBvbGljeTogU3RyaW5nLFxuXG4gICAgZHJhZ2dhYmxlOiBCb29sZWFuLFxuXG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xhenknXG4gICAgfSxcbiAgICBmZXRjaHByaW9yaXR5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHdpZHRoOiBTdHJpbmcsXG4gICAgaGVpZ2h0OiBTdHJpbmcsXG4gICAgaW5pdGlhbFJhdGlvOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiBkZWZhdWx0UmF0aW9cbiAgICB9LFxuXG4gICAgcGxhY2Vob2xkZXJTcmM6IFN0cmluZyxcblxuICAgIGZpdDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NvdmVyJ1xuICAgIH0sXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc1MCUgNTAlJ1xuICAgIH0sXG5cbiAgICBpbWdDbGFzczogU3RyaW5nLFxuICAgIGltZ1N0eWxlOiBPYmplY3QsXG5cbiAgICBub1NwaW5uZXI6IEJvb2xlYW4sXG4gICAgbm9OYXRpdmVNZW51OiBCb29sZWFuLFxuICAgIG5vVHJhbnNpdGlvbjogQm9vbGVhbixcblxuICAgIHNwaW5uZXJDb2xvcjogU3RyaW5nLFxuICAgIHNwaW5uZXJTaXplOiBTdHJpbmdcbiAgfSxcblxuICBlbWl0czogWyAnbG9hZCcsICdlcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IG5hdHVyYWxSYXRpbyA9IHJlZihwcm9wcy5pbml0aWFsUmF0aW8pXG4gICAgY29uc3QgcmF0aW9TdHlsZSA9IHVzZVJhdGlvKHByb3BzLCBuYXR1cmFsUmF0aW8pXG5cbiAgICBsZXQgbG9hZFRpbWVyXG5cbiAgICBjb25zdCBpbWFnZXMgPSBbXG4gICAgICByZWYobnVsbCksXG4gICAgICByZWYocHJvcHMucGxhY2Vob2xkZXJTcmMgIT09IHZvaWQgMCA/IHsgc3JjOiBwcm9wcy5wbGFjZWhvbGRlclNyYyB9IDogbnVsbClcbiAgICBdXG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHJlZigwKVxuXG4gICAgY29uc3QgaXNMb2FkaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGhhc0Vycm9yID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWcgcS1pbWctLSR7IHByb3BzLm5vTmF0aXZlTWVudSA9PT0gdHJ1ZSA/ICduby0nIDogJycgfW1lbnVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHRcbiAgICB9KSlcblxuICAgIGNvbnN0IGltZ0NsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZ19faW1hZ2UgJHsgcHJvcHMuaW1nQ2xhc3MgIT09IHZvaWQgMCA/IHByb3BzLmltZ0NsYXNzICsgJyAnIDogJycgfWBcbiAgICAgICsgYHEtaW1nX19pbWFnZS0td2l0aCR7IHByb3BzLm5vVHJhbnNpdGlvbiA9PT0gdHJ1ZSA/ICdvdXQnIDogJycgfS10cmFuc2l0aW9uYFxuICAgIClcblxuICAgIGNvbnN0IGltZ1N0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLnByb3BzLmltZ1N0eWxlLFxuICAgICAgb2JqZWN0Rml0OiBwcm9wcy5maXQsXG4gICAgICBvYmplY3RQb3NpdGlvbjogcHJvcHMucG9zaXRpb25cbiAgICB9KSlcblxuICAgIHdhdGNoKCgpID0+IGdldEN1cnJlbnRTcmMoKSwgYWRkSW1hZ2UpXG5cbiAgICBmdW5jdGlvbiBnZXRDdXJyZW50U3JjICgpIHtcbiAgICAgIHJldHVybiBwcm9wcy5zcmMgfHwgcHJvcHMuc3Jjc2V0IHx8IHByb3BzLnNpemVzXG4gICAgICAgID8ge1xuICAgICAgICAgICAgc3JjOiBwcm9wcy5zcmMsXG4gICAgICAgICAgICBzcmNzZXQ6IHByb3BzLnNyY3NldCxcbiAgICAgICAgICAgIHNpemVzOiBwcm9wcy5zaXplc1xuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSW1hZ2UgKGltZ1Byb3BzKSB7XG4gICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICBpZiAoaW1nUHJvcHMgPT09IG51bGwpIHtcbiAgICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaW1hZ2VzWyAwIF0udmFsdWUgPSBudWxsXG4gICAgICAgIGltYWdlc1sgMSBdLnZhbHVlID0gbnVsbFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gaW1nUHJvcHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWQgKHsgdGFyZ2V0IH0pIHtcbiAgICAgIC8vIGlmIGNvbXBvbmVudCBoYXMgYmVlbiBhbHJlYWR5IGRlc3Ryb3llZFxuICAgICAgaWYgKGxvYWRUaW1lciA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuXG4gICAgICBuYXR1cmFsUmF0aW8udmFsdWUgPSB0YXJnZXQubmF0dXJhbEhlaWdodCA9PT0gMFxuICAgICAgICA/IDAuNVxuICAgICAgICA6IHRhcmdldC5uYXR1cmFsV2lkdGggLyB0YXJnZXQubmF0dXJhbEhlaWdodFxuXG4gICAgICB3YWl0Rm9yQ29tcGxldGVuZXNzKHRhcmdldCwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWl0Rm9yQ29tcGxldGVuZXNzICh0YXJnZXQsIGNvdW50KSB7XG4gICAgICAvLyBwcm90ZWN0IGFnYWluc3QgcnVubmluZyBmb3JldmVyXG4gICAgICBpZiAobG9hZFRpbWVyID09PSBudWxsIHx8IGNvdW50ID09PSAxMDAwKSB7IHJldHVybiB9XG5cbiAgICAgIGlmICh0YXJnZXQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgb25SZWFkeSh0YXJnZXQpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbG9hZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIGNvdW50ICsgMSlcbiAgICAgICAgfSwgNTApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSAoaW1nKSB7XG4gICAgICAvLyBpZiBjb21wb25lbnQgaGFzIGJlZW4gYWxyZWFkeSBkZXN0cm95ZWRcbiAgICAgIGlmIChsb2FkVGltZXIgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgcG9zaXRpb24udmFsdWUgPSBwb3NpdGlvbi52YWx1ZSA9PT0gMSA/IDAgOiAxXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBudWxsXG4gICAgICBpc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgICAgZW1pdCgnbG9hZCcsIGltZy5jdXJyZW50U3JjIHx8IGltZy5zcmMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FcnJvciAoZXJyKSB7XG4gICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgaW1hZ2VzWyAwIF0udmFsdWUgPSBudWxsXG4gICAgICBpbWFnZXNbIDEgXS52YWx1ZSA9IG51bGxcbiAgICAgIGVtaXQoJ2Vycm9yJywgZXJyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRhaW5lciAoa2V5LCBjaGlsZCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiAncS1pbWdfX2NvbnRhaW5lciBhYnNvbHV0ZS1mdWxsJywga2V5IH0sXG4gICAgICAgIGNoaWxkXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW1hZ2UgKGluZGV4KSB7XG4gICAgICBjb25zdCBpbWcgPSBpbWFnZXNbIGluZGV4IF0udmFsdWVcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAga2V5OiAnaW1nXycgKyBpbmRleCxcbiAgICAgICAgY2xhc3M6IGltZ0NsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogaW1nU3R5bGUudmFsdWUsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiBwcm9wcy5jcm9zc29yaWdpbixcbiAgICAgICAgZGVjb2Rpbmc6IHByb3BzLmRlY29kaW5nLFxuICAgICAgICByZWZlcnJlcnBvbGljeTogcHJvcHMucmVmZXJyZXJwb2xpY3ksXG4gICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICAgIGxvYWRpbmc6IHByb3BzLmxvYWRpbmcsXG4gICAgICAgIGZldGNocHJpb3JpdHk6IHByb3BzLmZldGNocHJpb3JpdHksXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgZHJhZ2dhYmxlOiBwcm9wcy5kcmFnZ2FibGUsXG4gICAgICAgIC4uLmltZ1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24udmFsdWUgPT09IGluZGV4KSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJyBxLWltZ19faW1hZ2UtLXdhaXRpbmcnXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkxvYWQsIG9uRXJyb3IgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgcS1pbWdfX2ltYWdlLS1sb2FkZWQnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRDb250YWluZXIoJ2ltZycgKyBpbmRleCwgaCgnaW1nJywgZGF0YSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBpZiAoaXNMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWltZ19fY29udGVudCBhYnNvbHV0ZS1mdWxsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoU2xvdChzbG90c1sgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnZXJyb3InIDogJ2RlZmF1bHQnIF0pKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdsb2FkaW5nJyxcbiAgICAgICAgY2xhc3M6ICdxLWltZ19fbG9hZGluZyBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICB9LCAoXG4gICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLm5vU3Bpbm5lciA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIGgoUVNwaW5uZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuc3Bpbm5lckNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHByb3BzLnNwaW5uZXJTaXplXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICApKVxuICAgIH1cblxuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGlmIChfX1FVQVNBUl9TU1JfQ0xJRU5UX18gJiYgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgICAgYWRkSW1hZ2UoZ2V0Q3VycmVudFNyYygpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFkZEltYWdlKGdldEN1cnJlbnRTcmMoKSlcbiAgICAgIH1cblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IFtdXG5cbiAgICAgIGlmIChyYXRpb1N0eWxlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGtleTogJ2ZpbGxlcicsIHN0eWxlOiByYXRpb1N0eWxlLnZhbHVlIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChpbWFnZXNbIDAgXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChnZXRJbWFnZSgwKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbWFnZXNbIDEgXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChnZXRJbWFnZSgxKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb250ZW50LnB1c2goXG4gICAgICAgIGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyB9LCBnZXRDb250ZW50KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5hbHRcbiAgICAgIH0sIGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRNb2RpZmllckRpcmVjdGlvbnMsIHNob3VsZFN0YXJ0IH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS90b3VjaC5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHBvc2l0aW9uLCBsZWZ0Q2xpY2ssIHN0b3BBbmRQcmV2ZW50LCBwcmV2ZW50RHJhZ2dhYmxlLCBub29wIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gcGFyc2VBcmcgKGFyZykge1xuICAvLyBkZWx0YSAobWluIHZlbG9jaXR5IC0tIGRpc3QgLyB0aW1lKVxuICAvLyBtb2JpbGUgbWluIGRpc3RhbmNlIG9uIGZpcnN0IG1vdmVcbiAgLy8gZGVza3RvcCBtaW4gZGlzdGFuY2UgdW50aWwgZGVjaWRpbmcgaWYgaXQncyBhIHN3aXBlIG9yIG5vdFxuICBjb25zdCBkYXRhID0gWyAwLjA2LCA2LCA1MCBdXG5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnICYmIGFyZy5sZW5ndGgpIHtcbiAgICBhcmcuc3BsaXQoJzonKS5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB2ID0gcGFyc2VGbG9hdCh2YWwpXG4gICAgICB2ICYmIChkYXRhWyBpbmRleCBdID0gdilcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ3RvdWNoLXN3aXBlJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICd0b3VjaC1zd2lwZScsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSwgYXJnLCBtb2RpZmllcnMgfSkge1xuICAgICAgICAvLyBlYXJseSByZXR1cm4sIHdlIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKG1vZGlmaWVycy5tb3VzZSAhPT0gdHJ1ZSAmJiBjbGllbnQuaGFzLnRvdWNoICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZUNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJydcblxuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgaGFuZGxlcjogdmFsdWUsXG4gICAgICAgICAgc2Vuc2l0aXZpdHk6IHBhcnNlQXJnKGFyZyksXG4gICAgICAgICAgZGlyZWN0aW9uOiBnZXRNb2RpZmllckRpcmVjdGlvbnMobW9kaWZpZXJzKSxcblxuICAgICAgICAgIG5vb3AsXG5cbiAgICAgICAgICBtb3VzZVN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkgJiYgbGVmdENsaWNrKGV2dCkpIHtcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNlbW92ZScsICdtb3ZlJywgYG5vdFBhc3NpdmUkeyBtb3VzZUNhcHR1cmUgfWAgXSxcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2V1cCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgdG91Y2hTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoY2FuY2VsJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoZW5kJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCB0cnVlKVxuXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHtcbiAgICAgICAgICAgICAgeDogcG9zLmxlZnQsXG4gICAgICAgICAgICAgIHk6IHBvcy50b3AsXG4gICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIG1vdXNlOiBtb3VzZUV2ZW50ID09PSB0cnVlLFxuICAgICAgICAgICAgICBkaXI6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG1vdmUgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGltZSA9IERhdGUubm93KCkgLSBjdHguZXZlbnQudGltZVxuXG4gICAgICAgICAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgcG9zID0gcG9zaXRpb24oZXZ0KSxcbiAgICAgICAgICAgICAgZGlzdFggPSBwb3MubGVmdCAtIGN0eC5ldmVudC54LFxuICAgICAgICAgICAgICBhYnNYID0gTWF0aC5hYnMoZGlzdFgpLFxuICAgICAgICAgICAgICBkaXN0WSA9IHBvcy50b3AgLSBjdHguZXZlbnQueSxcbiAgICAgICAgICAgICAgYWJzWSA9IE1hdGguYWJzKGRpc3RZKVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGlmIChhYnNYIDwgY3R4LnNlbnNpdGl2aXR5WyAxIF0gJiYgYWJzWSA8IGN0eC5zZW5zaXRpdml0eVsgMSBdKSB7XG4gICAgICAgICAgICAgICAgY3R4LmVuZChldnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFic1ggPCBjdHguc2Vuc2l0aXZpdHlbIDIgXSAmJiBhYnNZIDwgY3R4LnNlbnNpdGl2aXR5WyAyIF0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHZlbFggPSBhYnNYIC8gdGltZSxcbiAgICAgICAgICAgICAgdmVsWSA9IGFic1kgLyB0aW1lXG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFkgPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSBkaXN0WSA8IDAgPyAndXAnIDogJ2Rvd24nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5ob3Jpem9udGFsID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGFic1kgPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWCA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9IGRpc3RYIDwgMCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnVwID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPCBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RZIDwgMFxuICAgICAgICAgICAgICAmJiBhYnNYIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFkgPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAndXAnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5kb3duID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPCBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RZID4gMFxuICAgICAgICAgICAgICAmJiBhYnNYIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFkgPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAnZG93bidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmxlZnQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA+IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFggPCAwXG4gICAgICAgICAgICAgICYmIGFic1kgPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWCA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICdsZWZ0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24ucmlnaHQgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA+IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFggPiAwXG4gICAgICAgICAgICAgICYmIGFic1kgPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWCA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICdyaWdodCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kaXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgICAgICAgICBpZiAoY3R4LmV2ZW50Lm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcblxuICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB3aXRoRGVsYXkgPT4ge1xuICAgICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHZvaWQgMFxuXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICh3aXRoRGVsYXkgPT09IHRydWUpIHsgc2V0VGltZW91dChyZW1vdmUsIDUwKSB9XG4gICAgICAgICAgICAgICAgICBlbHNlIHsgcmVtb3ZlKCkgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGN0eC5oYW5kbGVyKHtcbiAgICAgICAgICAgICAgICBldnQsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBtb3VzZTogY3R4LmV2ZW50Lm1vdXNlLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogY3R4LmV2ZW50LmRpcixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGltZSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZToge1xuICAgICAgICAgICAgICAgICAgeDogYWJzWCxcbiAgICAgICAgICAgICAgICAgIHk6IGFic1lcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY3R4LmVuZChldnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVuZCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDAgJiYgY3R4LnN0eWxlQ2xlYW51cCh0cnVlKVxuICAgICAgICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3F0b3VjaHN3aXBlID0gY3R4XG5cbiAgICAgICAgbW9kaWZpZXJzLm1vdXNlID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgbW91c2VDYXB0dXJlIH1gIF1cbiAgICAgICAgXSlcblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5ncykge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHN3aXBlXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKGJpbmRpbmdzLm9sZFZhbHVlICE9PSBiaW5kaW5ncy52YWx1ZSkge1xuICAgICAgICAgICAgdHlwZW9mIGJpbmRpbmdzLnZhbHVlICE9PSAnZnVuY3Rpb24nICYmIGN0eC5lbmQoKVxuICAgICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5ncy52YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0eC5kaXJlY3Rpb24gPSBnZXRNb2RpZmllckRpcmVjdGlvbnMoYmluZGluZ3MubW9kaWZpZXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHN3aXBlXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAnbWFpbicpXG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG5cbiAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDAgJiYgY3R4LnN0eWxlQ2xlYW51cCgpXG5cbiAgICAgICAgICBkZWxldGUgZWwuX19xdG91Y2hzd2lwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBjYWNoZSA9IG5ldyBNYXAoKVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Q2FjaGU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyBmdW5jdGlvbiAoXywgb2JqKSB7IHJldHVybiBvYmogfVxuICAgICAgOiBmdW5jdGlvbiAoa2V5LCBvYmopIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlWyBrZXkgXSA9PT0gdm9pZCAwXG4gICAgICAgICAgPyAoY2FjaGVbIGtleSBdID0gb2JqKVxuICAgICAgICAgIDogY2FjaGVbIGtleSBdXG4gICAgICB9LFxuXG4gICAgZ2V0Q2FjaGVXaXRoRm46IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyBmdW5jdGlvbiAoXywgZm4pIHsgcmV0dXJuIGZuKCkgfVxuICAgICAgOiBmdW5jdGlvbiAoa2V5LCBmbikge1xuICAgICAgICByZXR1cm4gY2FjaGVbIGtleSBdID09PSB2b2lkIDBcbiAgICAgICAgICA/IChjYWNoZVsga2V5IF0gPSBmbigpKVxuICAgICAgICAgIDogY2FjaGVbIGtleSBdXG4gICAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlLCBUcmFuc2l0aW9uLCBLZWVwQWxpdmUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBUb3VjaFN3aXBlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hTd2lwZS5qcydcblxuaW1wb3J0IHVzZUNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhY2hlLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZ2V0Tm9ybWFsaXplZFZOb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbENoaWxkUHJvcHMgPSB7XG4gIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5jb25zdCBQYW5lbFdyYXBwZXIgPSB7XG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICByb2xlOiAndGFicGFuZWwnXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuXG4gIGFuaW1hdGVkOiBCb29sZWFuLFxuICBpbmZpbml0ZTogQm9vbGVhbixcbiAgc3dpcGVhYmxlOiBCb29sZWFuLFxuICB2ZXJ0aWNhbDogQm9vbGVhbixcblxuICB0cmFuc2l0aW9uUHJldjogU3RyaW5nLFxuICB0cmFuc2l0aW9uTmV4dDogU3RyaW5nLFxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH0sXG5cbiAga2VlcEFsaXZlOiBCb29sZWFuLFxuICBrZWVwQWxpdmVJbmNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVFeGNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVNYXg6IE51bWJlclxufVxuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2JlZm9yZS10cmFuc2l0aW9uJywgJ3RyYW5zaXRpb24nIF1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBnZXRDYWNoZVdpdGhGbiB9ID0gdXNlQ2FjaGUoKVxuXG4gIGxldCBwYW5lbHMsIGZvcmNlZFBhbmVsVHJhbnNpdGlvblxuXG4gIGNvbnN0IHBhbmVsSW5kZXggPSByZWYobnVsbClcbiAgY29uc3QgcGFuZWxUcmFuc2l0aW9uID0gcmVmKG51bGwpXG5cbiAgZnVuY3Rpb24gb25Td2lwZSAoZXZ0KSB7XG4gICAgY29uc3QgZGlyID0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndXAnIDogJ2xlZnQnXG4gICAgZ29Ub1BhbmVsQnlPZmZzZXQoKHByb3h5LiRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIChldnQuZGlyZWN0aW9uID09PSBkaXIgPyAxIDogLTEpKVxuICB9XG5cbiAgY29uc3QgcGFuZWxEaXJlY3RpdmVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIC8vIGlmIHByb3BzLnN3aXBlYWJsZVxuICAgIHJldHVybiBbIFtcbiAgICAgIFRvdWNoU3dpcGUsXG4gICAgICBvblN3aXBlLFxuICAgICAgdm9pZCAwLFxuICAgICAge1xuICAgICAgICBob3Jpem9udGFsOiBwcm9wcy52ZXJ0aWNhbCAhPT0gdHJ1ZSxcbiAgICAgICAgdmVydGljYWw6IHByb3BzLnZlcnRpY2FsLFxuICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgfVxuICAgIF0gXVxuICB9KVxuXG4gIGNvbnN0IHRyYW5zaXRpb25QcmV2ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy50cmFuc2l0aW9uUHJldiB8fCBgc2xpZGUtJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnZG93bicgOiAncmlnaHQnIH1gXG4gIClcblxuICBjb25zdCB0cmFuc2l0aW9uTmV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudHJhbnNpdGlvbk5leHQgfHwgYHNsaWRlLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyB9YFxuICApXG5cbiAgY29uc3QgdHJhbnNpdGlvblN0eWxlID0gY29tcHV0ZWQoXG4gICAgKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYFxuICApXG5cbiAgY29uc3QgY29udGVudEtleSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIDogU3RyaW5nKHByb3BzLm1vZGVsVmFsdWUpXG4gICkpXG5cbiAgY29uc3Qga2VlcEFsaXZlUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGluY2x1ZGU6IHByb3BzLmtlZXBBbGl2ZUluY2x1ZGUsXG4gICAgZXhjbHVkZTogcHJvcHMua2VlcEFsaXZlRXhjbHVkZSxcbiAgICBtYXg6IHByb3BzLmtlZXBBbGl2ZU1heFxuICB9KSlcblxuICBjb25zdCBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmtlZXBBbGl2ZUluY2x1ZGUgIT09IHZvaWQgMFxuICAgIHx8IHByb3BzLmtlZXBBbGl2ZUV4Y2x1ZGUgIT09IHZvaWQgMFxuICApXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBpc1ZhbGlkUGFuZWxOYW1lKG5ld1ZhbCkgPT09IHRydWVcbiAgICAgID8gZ2V0UGFuZWxJbmRleChuZXdWYWwpXG4gICAgICA6IC0xXG5cbiAgICBpZiAoZm9yY2VkUGFuZWxUcmFuc2l0aW9uICE9PSB0cnVlKSB7XG4gICAgICB1cGRhdGVQYW5lbFRyYW5zaXRpb24oXG4gICAgICAgIGluZGV4ID09PSAtMSA/IDAgOiAoaW5kZXggPCBnZXRQYW5lbEluZGV4KG9sZFZhbCkgPyAtMSA6IDEpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHBhbmVsSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICBwYW5lbEluZGV4LnZhbHVlID0gaW5kZXhcbiAgICAgIGVtaXQoJ2JlZm9yZS10cmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGVtaXQoJ3RyYW5zaXRpb24nLCBuZXdWYWwsIG9sZFZhbClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KDEpIH1cbiAgZnVuY3Rpb24gcHJldmlvdXNQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KC0xKSB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICBuZXh0OiBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXM6IHByZXZpb3VzUGFuZWwsXG4gICAgZ29UbzogZ29Ub1BhbmVsXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsIChuYW1lKSB7XG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBuYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZFBhbmVsTmFtZSAobmFtZSkge1xuICAgIHJldHVybiBuYW1lICE9PSB2b2lkIDAgJiYgbmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxJbmRleCAobmFtZSkge1xuICAgIHJldHVybiBwYW5lbHMuZmluZEluZGV4KHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5uYW1lID09PSBuYW1lXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5hYmxlZFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVscy5maWx0ZXIocGFuZWwgPT4ge1xuICAgICAgcmV0dXJuIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxUcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICBjb25zdCB2YWwgPSBkaXJlY3Rpb24gIT09IDAgJiYgcHJvcHMuYW5pbWF0ZWQgPT09IHRydWUgJiYgcGFuZWxJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAgID8gJ3EtdHJhbnNpdGlvbi0tJyArIChkaXJlY3Rpb24gPT09IC0xID8gdHJhbnNpdGlvblByZXYudmFsdWUgOiB0cmFuc2l0aW9uTmV4dC52YWx1ZSlcbiAgICAgIDogbnVsbFxuXG4gICAgaWYgKHBhbmVsVHJhbnNpdGlvbi52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICBwYW5lbFRyYW5zaXRpb24udmFsdWUgPSB2YWxcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvUGFuZWxCeU9mZnNldCAoZGlyZWN0aW9uLCBzdGFydEluZGV4ID0gcGFuZWxJbmRleC52YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IHN0YXJ0SW5kZXggKyBkaXJlY3Rpb25cblxuICAgIHdoaWxlIChpbmRleCA+IC0xICYmIGluZGV4IDwgcGFuZWxzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0ID0gcGFuZWxzWyBpbmRleCBdXG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIG9wdC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKGRpcmVjdGlvbilcbiAgICAgICAgZm9yY2VkUGFuZWxUcmFuc2l0aW9uID0gdHJ1ZVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG9wdC5wcm9wcy5uYW1lKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaW5kZXggKz0gZGlyZWN0aW9uXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmluZmluaXRlID09PSB0cnVlICYmIHBhbmVscy5sZW5ndGggPiAwICYmIHN0YXJ0SW5kZXggIT09IC0xICYmIHN0YXJ0SW5kZXggIT09IHBhbmVscy5sZW5ndGgpIHtcbiAgICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KGRpcmVjdGlvbiwgZGlyZWN0aW9uID09PSAtMSA/IHBhbmVscy5sZW5ndGggOiAtMSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbEluZGV4ICgpIHtcbiAgICBjb25zdCBpbmRleCA9IGdldFBhbmVsSW5kZXgocHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudENoaWxkICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWVcbiAgICAgICYmIHVwZGF0ZVBhbmVsSW5kZXgoKVxuICAgICAgJiYgcGFuZWxzWyBwYW5lbEluZGV4LnZhbHVlIF1cblxuICAgIHJldHVybiBwcm9wcy5rZWVwQWxpdmUgPT09IHRydWVcbiAgICAgID8gW1xuICAgICAgICAgIGgoS2VlcEFsaXZlLCBrZWVwQWxpdmVQcm9wcy52YWx1ZSwgW1xuICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyBnZXRDYWNoZVdpdGhGbihjb250ZW50S2V5LnZhbHVlLCAoKSA9PiAoeyAuLi5QYW5lbFdyYXBwZXIsIG5hbWU6IGNvbnRlbnRLZXkudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgOiBQYW5lbFdyYXBwZXIsXG4gICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgICAgICgpID0+IHBhbmVsXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAga2V5OiBjb250ZW50S2V5LnZhbHVlLFxuICAgICAgICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgICAgICAgIH0sIFsgcGFuZWwgXSlcbiAgICAgICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxDb250ZW50ICgpIHtcbiAgICBpZiAocGFuZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICA/IFsgaChUcmFuc2l0aW9uLCB7IG5hbWU6IHBhbmVsVHJhbnNpdGlvbi52YWx1ZSB9LCBnZXRQYW5lbENvbnRlbnRDaGlsZCkgXVxuICAgICAgOiBnZXRQYW5lbENvbnRlbnRDaGlsZCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbHNMaXN0IChzbG90cykge1xuICAgIHBhbmVscyA9IGdldE5vcm1hbGl6ZWRWTm9kZXMoXG4gICAgICBoU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICApLmZpbHRlcihcbiAgICAgIHBhbmVsID0+IHBhbmVsLnByb3BzICE9PSBudWxsXG4gICAgICAgICYmIHBhbmVsLnByb3BzLnNsb3QgPT09IHZvaWQgMFxuICAgICAgICAmJiBpc1ZhbGlkUGFuZWxOYW1lKHBhbmVsLnByb3BzLm5hbWUpID09PSB0cnVlXG4gICAgKVxuXG4gICAgcmV0dXJuIHBhbmVscy5sZW5ndGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVsc1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYW5lbEluZGV4LFxuICAgIHBhbmVsRGlyZWN0aXZlcyxcblxuICAgIHVwZGF0ZVBhbmVsc0xpc3QsXG4gICAgdXBkYXRlUGFuZWxJbmRleCxcblxuICAgIGdldFBhbmVsQ29udGVudCxcbiAgICBnZXRFbmFibGVkUGFuZWxzLFxuICAgIGdldFBhbmVscyxcblxuICAgIGlzVmFsaWRQYW5lbE5hbWUsXG5cbiAgICBrZWVwQWxpdmVQcm9wcyxcbiAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG5cbiAgICBnb1RvUGFuZWxCeU9mZnNldCxcbiAgICBnb1RvUGFuZWwsXG5cbiAgICBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXNQYW5lbFxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJvdXNlbFNsaWRlJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVBhbmVsQ2hpbGRQcm9wcyxcbiAgICBpbWdTcmM6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5pbWdTcmNcbiAgICAgICAgPyB7IGJhY2tncm91bmRJbWFnZTogYHVybChcIiR7IHByb3BzLmltZ1NyYyB9XCIpYCB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1jYXJvdXNlbF9fc2xpZGUnLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgSGlzdG9yeSBmcm9tICcuLi8uLi9oaXN0b3J5LmpzJ1xuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5sZXQgY291bnRlciA9IDBcblxuZXhwb3J0IGNvbnN0IHVzZUZ1bGxzY3JlZW5Qcm9wcyA9IHtcbiAgZnVsbHNjcmVlbjogQm9vbGVhbixcbiAgbm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuRW1pdHMgPSBbICd1cGRhdGU6ZnVsbHNjcmVlbicsICdmdWxsc2NyZWVuJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cblxuICBsZXQgaGlzdG9yeUVudHJ5LCBmdWxsc2NyZWVuRmlsbGVyTm9kZSwgY29udGFpbmVyXG4gIGNvbnN0IGluRnVsbHNjcmVlbiA9IHJlZihmYWxzZSlcblxuICB2bUhhc1JvdXRlcih2bSkgPT09IHRydWUgJiYgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgcHJvcHMubm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0ICE9PSB0cnVlICYmIGV4aXRGdWxsc2NyZWVuKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB2KSB7XG4gICAgICB0b2dnbGVGdWxsc2NyZWVuKClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goaW5GdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBlbWl0KCd1cGRhdGU6ZnVsbHNjcmVlbicsIHYpXG4gICAgZW1pdCgnZnVsbHNjcmVlbicsIHYpXG4gIH0pXG5cbiAgZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNldEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IHRydWVcbiAgICBjb250YWluZXIgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQoZnVsbHNjcmVlbkZpbGxlck5vZGUsIHByb3h5LiRlbClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb3h5LiRlbClcblxuICAgIGNvdW50ZXIrK1xuICAgIGlmIChjb3VudGVyID09PSAxKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG4gICAgfVxuXG4gICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgaGFuZGxlcjogZXhpdEZ1bGxzY3JlZW5cbiAgICB9XG4gICAgSGlzdG9yeS5hZGQoaGlzdG9yeUVudHJ5KVxuICB9XG5cbiAgZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgIT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChoaXN0b3J5RW50cnkgIT09IHZvaWQgMCkge1xuICAgICAgSGlzdG9yeS5yZW1vdmUoaGlzdG9yeUVudHJ5KVxuICAgICAgaGlzdG9yeUVudHJ5ID0gdm9pZCAwXG4gICAgfVxuXG4gICAgY29udGFpbmVyLnJlcGxhY2VDaGlsZChwcm94eS4kZWwsIGZ1bGxzY3JlZW5GaWxsZXJOb2RlKVxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IGZhbHNlXG5cbiAgICBjb3VudGVyID0gTWF0aC5tYXgoMCwgY291bnRlciAtIDEpXG5cbiAgICBpZiAoY291bnRlciA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZ1bGxzY3JlZW4tbWl4aW4nKVxuXG4gICAgICBpZiAocHJveHkuJGVsLnNjcm9sbEludG9WaWV3ICE9PSB2b2lkIDApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHByb3h5LiRlbC5zY3JvbGxJbnRvVmlldygpIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgZnVsbHNjcmVlbkZpbGxlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHByb3BzLmZ1bGxzY3JlZW4gPT09IHRydWUgJiYgc2V0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KGV4aXRGdWxsc2NyZWVuKVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgdG9nZ2xlRnVsbHNjcmVlbixcbiAgICBzZXRGdWxsc2NyZWVuLFxuICAgIGV4aXRGdWxsc2NyZWVuXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBpbkZ1bGxzY3JlZW4sXG4gICAgdG9nZ2xlRnVsbHNjcmVlblxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBhbmVsLCB7IHVzZVBhbmVsUHJvcHMsIHVzZVBhbmVsRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcbmltcG9ydCB1c2VGdWxsc2NyZWVuLCB7IHVzZUZ1bGxzY3JlZW5Qcm9wcywgdXNlRnVsbHNjcmVlbkVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZnVsbHNjcmVlbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaXMuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IG5hdmlnYXRpb25Qb3NpdGlvbk9wdGlvbnMgPSBbICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnIF1cbmNvbnN0IGNvbnRyb2xUeXBlT3B0aW9ucyA9IFsgJ3JlZ3VsYXInLCAnZmxhdCcsICdvdXRsaW5lJywgJ3B1c2gnLCAndW5lbGV2YXRlZCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcm91c2VsJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZUZ1bGxzY3JlZW5Qcm9wcyxcblxuICAgIHRyYW5zaXRpb25QcmV2OiB7IC8vIHVzZVBhbmVsUGFyZW50UHJvcHMgb3ZlcnJpZGVcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbk5leHQ6IHsgLy8gdXNlUGFuZWxQYXJlbnRQcm9wcyBvdmVycmlkZVxuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2ZhZGUnXG4gICAgfSxcblxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHBhZGRpbmc6IEJvb2xlYW4sXG5cbiAgICBjb250cm9sQ29sb3I6IFN0cmluZyxcbiAgICBjb250cm9sVGV4dENvbG9yOiBTdHJpbmcsXG4gICAgY29udHJvbFR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBjb250cm9sVHlwZU9wdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZmxhdCdcbiAgICB9LFxuXG4gICAgYXV0b3BsYXk6IFsgTnVtYmVyLCBCb29sZWFuIF0sXG5cbiAgICBhcnJvd3M6IEJvb2xlYW4sXG4gICAgcHJldkljb246IFN0cmluZyxcbiAgICBuZXh0SWNvbjogU3RyaW5nLFxuXG4gICAgbmF2aWdhdGlvbjogQm9vbGVhbixcbiAgICBuYXZpZ2F0aW9uUG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBuYXZpZ2F0aW9uUG9zaXRpb25PcHRpb25zLmluY2x1ZGVzKHYpXG4gICAgfSxcbiAgICBuYXZpZ2F0aW9uSWNvbjogU3RyaW5nLFxuICAgIG5hdmlnYXRpb25BY3RpdmVJY29uOiBTdHJpbmcsXG5cbiAgICB0aHVtYm5haWxzOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGdWxsc2NyZWVuRW1pdHMsXG4gICAgLi4udXNlUGFuZWxFbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBsZXQgdGltZXIsIHBhbmVsc0xlblxuXG4gICAgY29uc3Qge1xuICAgICAgdXBkYXRlUGFuZWxzTGlzdCwgZ2V0UGFuZWxDb250ZW50LFxuICAgICAgcGFuZWxEaXJlY3RpdmVzLCBnb1RvUGFuZWwsXG4gICAgICBwcmV2aW91c1BhbmVsLCBuZXh0UGFuZWwsIGdldEVuYWJsZWRQYW5lbHMsXG4gICAgICBwYW5lbEluZGV4XG4gICAgfSA9IHVzZVBhbmVsKClcblxuICAgIGNvbnN0IHsgaW5GdWxsc2NyZWVuIH0gPSB1c2VGdWxsc2NyZWVuKClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLmhlaWdodCAhPT0gdm9pZCAwXG4gICAgICAgID8geyBoZWlnaHQ6IHByb3BzLmhlaWdodCB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJykpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWNhcm91c2VsIHEtcGFuZWwtcGFyZW50IHEtY2Fyb3VzZWwtLXdpdGgkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJycgOiAnb3V0JyB9LXBhZGRpbmdgXG4gICAgICArIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUgPyAnIGZ1bGxzY3JlZW4nIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtY2Fyb3VzZWwtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYXJyb3dzID09PSB0cnVlID8gYCBxLWNhcm91c2VsLS1hcnJvd3MtJHsgZGlyZWN0aW9uLnZhbHVlIH1gIDogJycpXG4gICAgICArIChwcm9wcy5uYXZpZ2F0aW9uID09PSB0cnVlID8gYCBxLWNhcm91c2VsLS1uYXZpZ2F0aW9uLSR7IG5hdmlnYXRpb25Qb3NpdGlvbi52YWx1ZSB9YCA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGFycm93SWNvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBpY28gPSBbXG4gICAgICAgIHByb3BzLnByZXZJY29uIHx8ICRxLmljb25TZXQuY2Fyb3VzZWxbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyBdLFxuICAgICAgICBwcm9wcy5uZXh0SWNvbiB8fCAkcS5pY29uU2V0LmNhcm91c2VsWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdkb3duJyA6ICdyaWdodCcgXVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gcHJvcHMudmVydGljYWwgPT09IGZhbHNlICYmICRxLmxhbmcucnRsID09PSB0cnVlXG4gICAgICAgID8gaWNvLnJldmVyc2UoKVxuICAgICAgICA6IGljb1xuICAgIH0pXG5cbiAgICBjb25zdCBuYXZJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmF2aWdhdGlvbkljb24gfHwgJHEuaWNvblNldC5jYXJvdXNlbC5uYXZpZ2F0aW9uSWNvbilcbiAgICBjb25zdCBuYXZBY3RpdmVJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmF2aWdhdGlvbkFjdGl2ZUljb24gfHwgbmF2SWNvbi52YWx1ZSlcbiAgICBjb25zdCBuYXZpZ2F0aW9uUG9zaXRpb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYXZpZ2F0aW9uUG9zaXRpb25cbiAgICAgIHx8IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnYm90dG9tJylcbiAgICApXG5cbiAgICBjb25zdCBjb250cm9sUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgY29sb3I6IHByb3BzLmNvbnRyb2xDb2xvcixcbiAgICAgIHRleHRDb2xvcjogcHJvcHMuY29udHJvbFRleHRDb2xvcixcbiAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgWyBwcm9wcy5jb250cm9sVHlwZSBdOiB0cnVlLFxuICAgICAgZGVuc2U6IHRydWVcbiAgICB9KSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5hdXRvcGxheSkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b3BsYXksIHZhbCA9PiB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHN0YXJ0VGltZXIoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIgKCkge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBpc051bWJlcihwcm9wcy5hdXRvcGxheSkgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5hdXRvcGxheVxuICAgICAgICA6IDUwMDBcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgICBkdXJhdGlvbiA+PSAwID8gbmV4dFBhbmVsIDogcHJldmlvdXNQYW5lbCxcbiAgICAgICAgTWF0aC5hYnMoZHVyYXRpb24pXG4gICAgICApXG4gICAgfVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9wbGF5ICYmIHN0YXJ0VGltZXIoKVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0TmF2aWdhdGlvbkNvbnRhaW5lciAodHlwZSwgbWFwcGluZykge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWNhcm91c2VsX19jb250cm9sIHEtY2Fyb3VzZWxfX25hdmlnYXRpb24gbm8td3JhcCBhYnNvbHV0ZSBmbGV4J1xuICAgICAgICAgICsgYCBxLWNhcm91c2VsX19uYXZpZ2F0aW9uLS0keyB0eXBlIH0gcS1jYXJvdXNlbF9fbmF2aWdhdGlvbi0tJHsgbmF2aWdhdGlvblBvc2l0aW9uLnZhbHVlIH1gXG4gICAgICAgICAgKyAocHJvcHMuY29udHJvbENvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29udHJvbENvbG9yIH1gIDogJycpXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2Fyb3VzZWxfX25hdmlnYXRpb24taW5uZXIgZmxleCBmbGV4LWNlbnRlciBuby13cmFwJ1xuICAgICAgICB9LCBnZXRFbmFibGVkUGFuZWxzKCkubWFwKG1hcHBpbmcpKVxuICAgICAgXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgICBpZiAocHJvcHMubmF2aWdhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBmbiA9IHNsb3RzWyAnbmF2aWdhdGlvbi1pY29uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzWyAnbmF2aWdhdGlvbi1pY29uJyBdXG4gICAgICAgICAgOiBvcHRzID0+IGgoUUJ0biwge1xuICAgICAgICAgICAga2V5OiAnbmF2JyArIG9wdHMubmFtZSxcbiAgICAgICAgICAgIGNsYXNzOiBgcS1jYXJvdXNlbF9fbmF2aWdhdGlvbi1pY29uIHEtY2Fyb3VzZWxfX25hdmlnYXRpb24taWNvbi0tJHsgb3B0cy5hY3RpdmUgPT09IHRydWUgPyAnJyA6ICdpbicgfWFjdGl2ZWAsXG4gICAgICAgICAgICAuLi5vcHRzLmJ0blByb3BzLFxuICAgICAgICAgICAgb25DbGljazogb3B0cy5vbkNsaWNrXG4gICAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBtYXhJbmRleCA9IHBhbmVsc0xlbiAtIDFcbiAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgIGdldE5hdmlnYXRpb25Db250YWluZXIoJ2J1dHRvbnMnLCAocGFuZWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcGFuZWwucHJvcHMubmFtZVxuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gcGFuZWxJbmRleC52YWx1ZSA9PT0gaW5kZXhcblxuICAgICAgICAgICAgcmV0dXJuIGZuKHtcbiAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgIG1heEluZGV4LFxuICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgICAgIGJ0blByb3BzOiB7XG4gICAgICAgICAgICAgICAgaWNvbjogYWN0aXZlID09PSB0cnVlID8gbmF2QWN0aXZlSWNvbi52YWx1ZSA6IG5hdkljb24udmFsdWUsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICAgICAgICAuLi5jb250cm9sUHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4geyBnb1RvUGFuZWwobmFtZSkgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwcm9wcy50aHVtYm5haWxzID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29udHJvbENvbG9yICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb250cm9sQ29sb3IgfWBcbiAgICAgICAgICA6ICcnXG5cbiAgICAgICAgbm9kZS5wdXNoKGdldE5hdmlnYXRpb25Db250YWluZXIoJ3RodW1ibmFpbHMnLCBwYW5lbCA9PiB7XG4gICAgICAgICAgY29uc3Qgc2xpZGUgPSBwYW5lbC5wcm9wc1xuXG4gICAgICAgICAgcmV0dXJuIGgoJ2ltZycsIHtcbiAgICAgICAgICAgIGtleTogJ3RtYiMnICsgc2xpZGUubmFtZSxcbiAgICAgICAgICAgIGNsYXNzOiBgcS1jYXJvdXNlbF9fdGh1bWJuYWlsIHEtY2Fyb3VzZWxfX3RodW1ibmFpbC0tJHsgc2xpZGUubmFtZSA9PT0gcHJvcHMubW9kZWxWYWx1ZSA/ICcnIDogJ2luJyB9YWN0aXZlYCArIGNvbG9yLFxuICAgICAgICAgICAgc3JjOiBzbGlkZS5pbWdTcmMgfHwgc2xpZGVbICdpbWctc3JjJyBdLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4geyBnb1RvUGFuZWwoc2xpZGUubmFtZSkgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXJyb3dzID09PSB0cnVlICYmIHBhbmVsSW5kZXgudmFsdWUgPj0gMCkge1xuICAgICAgICBpZiAocHJvcHMuaW5maW5pdGUgPT09IHRydWUgfHwgcGFuZWxJbmRleC52YWx1ZSA+IDApIHtcbiAgICAgICAgICBub2RlLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGtleTogJ3ByZXYnLFxuICAgICAgICAgICAgICBjbGFzczogYHEtY2Fyb3VzZWxfX2NvbnRyb2wgcS1jYXJvdXNlbF9fYXJyb3cgcS1jYXJvdXNlbF9fcHJldi1hcnJvdyBxLWNhcm91c2VsX19wcmV2LWFycm93LS0keyBkaXJlY3Rpb24udmFsdWUgfSBhYnNvbHV0ZSBmbGV4IGZsZXgtY2VudGVyYFxuICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgICBpY29uOiBhcnJvd0ljb25zLnZhbHVlWyAwIF0sXG4gICAgICAgICAgICAgICAgLi4uY29udHJvbFByb3BzLnZhbHVlLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHByZXZpb3VzUGFuZWxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmluZmluaXRlID09PSB0cnVlIHx8IHBhbmVsSW5kZXgudmFsdWUgPCBwYW5lbHNMZW4gLSAxKSB7XG4gICAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICduZXh0JyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWNhcm91c2VsX19jb250cm9sIHEtY2Fyb3VzZWxfX2Fycm93IHEtY2Fyb3VzZWxfX25leHQtYXJyb3cnXG4gICAgICAgICAgICAgICAgKyBgIHEtY2Fyb3VzZWxfX25leHQtYXJyb3ctLSR7IGRpcmVjdGlvbi52YWx1ZSB9IGFic29sdXRlIGZsZXggZmxleC1jZW50ZXJgXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICAgIGljb246IGFycm93SWNvbnMudmFsdWVbIDEgXSxcbiAgICAgICAgICAgICAgICAuLi5jb250cm9sUHJvcHMudmFsdWUsXG4gICAgICAgICAgICAgICAgb25DbGljazogbmV4dFBhbmVsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90cy5jb250cm9sLCBub2RlKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBwYW5lbHNMZW4gPSB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgICB9LCBbXG4gICAgICAgIGhEaXIoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgeyBjbGFzczogJ3EtY2Fyb3VzZWxfX3NsaWRlcy1jb250YWluZXInIH0sXG4gICAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICAgJ3NsLWNvbnQnLFxuICAgICAgICAgIHByb3BzLnN3aXBlYWJsZSxcbiAgICAgICAgICAoKSA9PiBwYW5lbERpcmVjdGl2ZXMudmFsdWVcbiAgICAgICAgKVxuICAgICAgXS5jb25jYXQoZ2V0Q29udGVudCgpKSlcbiAgICB9XG4gIH1cbn0pXG4iLCJleHBvcnQgdmFyIENhbWVyYVNvdXJjZTtcbihmdW5jdGlvbiAoQ2FtZXJhU291cmNlKSB7XG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byBzZWxlY3QgZWl0aGVyIHRoZSBwaG90byBhbGJ1bSBvciB0YWtlIGEgcGhvdG8uXG4gICAgICovXG4gICAgQ2FtZXJhU291cmNlW1wiUHJvbXB0XCJdID0gXCJQUk9NUFRcIjtcbiAgICAvKipcbiAgICAgKiBUYWtlIGEgbmV3IHBob3RvIHVzaW5nIHRoZSBjYW1lcmEuXG4gICAgICovXG4gICAgQ2FtZXJhU291cmNlW1wiQ2FtZXJhXCJdID0gXCJDQU1FUkFcIjtcbiAgICAvKipcbiAgICAgKiBQaWNrIGFuIGV4aXN0aW5nIHBob3RvIGZyb24gdGhlIGdhbGxlcnkgb3IgcGhvdG8gYWxidW0uXG4gICAgICovXG4gICAgQ2FtZXJhU291cmNlW1wiUGhvdG9zXCJdID0gXCJQSE9UT1NcIjtcbn0pKENhbWVyYVNvdXJjZSB8fCAoQ2FtZXJhU291cmNlID0ge30pKTtcbmV4cG9ydCB2YXIgQ2FtZXJhRGlyZWN0aW9uO1xuKGZ1bmN0aW9uIChDYW1lcmFEaXJlY3Rpb24pIHtcbiAgICBDYW1lcmFEaXJlY3Rpb25bXCJSZWFyXCJdID0gXCJSRUFSXCI7XG4gICAgQ2FtZXJhRGlyZWN0aW9uW1wiRnJvbnRcIl0gPSBcIkZST05UXCI7XG59KShDYW1lcmFEaXJlY3Rpb24gfHwgKENhbWVyYURpcmVjdGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIENhbWVyYVJlc3VsdFR5cGU7XG4oZnVuY3Rpb24gKENhbWVyYVJlc3VsdFR5cGUpIHtcbiAgICBDYW1lcmFSZXN1bHRUeXBlW1wiVXJpXCJdID0gXCJ1cmlcIjtcbiAgICBDYW1lcmFSZXN1bHRUeXBlW1wiQmFzZTY0XCJdID0gXCJiYXNlNjRcIjtcbiAgICBDYW1lcmFSZXN1bHRUeXBlW1wiRGF0YVVybFwiXSA9IFwiZGF0YVVybFwiO1xufSkoQ2FtZXJhUmVzdWx0VHlwZSB8fCAoQ2FtZXJhUmVzdWx0VHlwZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZpbml0aW9ucy5qcy5tYXAiLCJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5jb25zdCBDYW1lcmEgPSByZWdpc3RlclBsdWdpbignQ2FtZXJhJywge1xuICAgIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4obSA9PiBuZXcgbS5DYW1lcmFXZWIoKSksXG59KTtcbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgQ2FtZXJhIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJmbGV4LWNlbnRlciBxLXBhLW1kXCI+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtaDUgdGV4dC13ZWlnaHQtYm9sZFwiPlxuICAgICAgPHEtaWNvbiBuYW1lPVwicGhvdG9fY2FtZXJhXCIgLz5cbiAgICAgIEZvdG9ncmFmaWFyIHt7IGdsb2JhbFN0b3JlLmN1c3RvbWVyIH19XG4gICAgICA8cS1pY29uIG5hbWU9XCJwaG90b19jYW1lcmFcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPHEtcmFkaW8gdi1tb2RlbD1cImFjdGlvblwiIGNsYXNzPSd0ZXh0LWdyZXktNScgY2hlY2tlZC1pY29uPVwidGFza19hbHRcIiB1bmNoZWNrZWQtaWNvbj1cInBhbm9yYW1hX2Zpc2hfZXllXCJcbiAgICAgICAgdmFsPVwibG9hZFwiIGxhYmVsPVwiQ2FyZ2FyXCIgQGNsaWNrPVwidGhpcy4kcm91dGVyLnB1c2goeyBwYXRoOiAnL3JlYWRpbmdzJywgcXVlcnk6IHsgYWN0aW9uOiAnbG9hZCcgfSB9KVwiIC8+XG4gICAgICA8cS1yYWRpbyB2LW1vZGVsPVwiYWN0aW9uXCIgY2xhc3M9J3RleHQtZ3JleS01JyBjaGVja2VkLWljb249XCJ0YXNrX2FsdFwiIHVuY2hlY2tlZC1pY29uPVwicGFub3JhbWFfZmlzaF9leWVcIlxuICAgICAgICB2YWw9XCJkb3dubG9hZFwiIGxhYmVsPVwiRGVzY2FyZ2FyXCJcbiAgICAgICAgQGNsaWNrPVwidGhpcy4kcm91dGVyLnB1c2goeyBwYXRoOiAnL3JlYWRpbmdzJywgcXVlcnk6IHsgYWN0aW9uOiAnZG93bmxvYWQnIH0gfSlcIiAvPlxuICAgICAgPHEtcmFkaW8gdi1tb2RlbD1cImFjdGlvblwiIGNsYXNzPVwidGV4dC1wcmltYXJ5XCIgY2hlY2tlZC1pY29uPVwidGFza19hbHRcIiB1bmNoZWNrZWQtaWNvbj1cInBhbm9yYW1hX2Zpc2hfZXllXCJcbiAgICAgICAgdmFsPVwicGhvdG9cIiBsYWJlbD1cIkZvdG9ncmFmaWFyXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicS1wYS1zbVwiIHN0eWxlPVwiZm9udC1zaXplOiAyMHB4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5BbGJhcsOhbjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgPHEtaW5wdXQgZGVuc2Ugc3F1YXJlIG91dGxpbmVkIHN0YW5kb3V0PVwidGV4dC1ibGFja1wiIHYtbW9kZWw9XCJnbG9iYWxTdG9yZS5hZWRvY3VtZW50XCIgZGlzYWJsZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wdC1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGZsZXgganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG4gc3R5bGU9XCJ3aWR0aDogMTAwdnc7XCIgaWNvbj1cInBob3RvX2NhbWVyYVwiIGNvbG9yPVwicHJpbWFyeVwiIGxhYmVsPVwiSGFjZXIgRm90b1wiIEBjbGljaz1cImNhcHR1cmVJbWFnZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtY2Fyb3VzZWwgYW5pbWF0ZWQgdi1tb2RlbD1cInNsaWRlXCIgYXJyb3dzIG5hdmlnYXRpb24gaW5maW5pdGUgc3R5bGU9XCJoZWlnaHQ6NTV2aDtcIj5cbiAgICAgIDxxLWNhcm91c2VsLXNsaWRlIHYtZm9yPVwiaXRlbSBpbiBnbG9iYWxTdG9yZS5waG90b0xpc3RcIiA6a2V5PVwiaXRlbS5pZFwiIDpuYW1lPVwiaXRlbS5pZFwiIGNsYXNzPVwicS1wYS14c1wiPlxuICAgICAgICA8cS1pbWcgOnNyYz1cIml0ZW0uc3JjXCIgLz5cbiAgICAgIDwvcS1jYXJvdXNlbC1zbGlkZT5cblxuICAgIDwvcS1jYXJvdXNlbD5cbiAgICA8IS0tIEZPT1RFUiAtLT5cbiAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbVwiIDpvZmZzZXQ9XCJbMCwgMThdXCI+XG4gICAgICA8cS1idG4gc3R5bGU9XCJ3aWR0aDogOTV2dztcIiBjb2xvcj1cImFjY2VudFwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiIGxhYmVsPVwiQ2FyZ2FyIG90cmEgZW50cmVnYVwiIG5vLWNhcHNcbiAgICAgICAgQGNsaWNrPVwibnVldmFFbnRyZWdhXCIgLz5cbiAgICA8L3EtcGFnZS1zdGlja3k+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5pbXBvcnQgeyB1c2VHbG9iYWxTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2dsb2JhbFwiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAnQHZ1ZS9yZWFjdGl2aXR5JztcbmltcG9ydCB7IENhbWVyYSwgQ2FtZXJhUmVzdWx0VHlwZSB9IGZyb20gJ0BjYXBhY2l0b3IvY2FtZXJhJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNldHVwKCkge1xuICAgIGNvbnN0IGdsb2JhbFN0b3JlID0gdXNlR2xvYmFsU3RvcmUoKTtcbiAgICBnbG9iYWxTdG9yZS5nZXRQaG90b3MoKTtcbiAgICBjb25zdCBhY3Rpb24gPSByZWYoJ3Bob3RvJyk7XG4gICAgY29uc3QgaW1hZ2VTcmMgPSByZWYoJycpO1xuICAgIGNvbnN0IHNsaWRlID0gcmVmKDEpO1xuXG4gICAgZnVuY3Rpb24gbnVldmFFbnRyZWdhKCkge1xuICAgICAgZ2xvYmFsU3RvcmUuY2hhbmdlQUUoKTtcbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gY2FwdHVyZUltYWdlKCkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBDYW1lcmEuZ2V0UGhvdG8oe1xuICAgICAgICBxdWFsaXR5OiA3NSxcbiAgICAgICAgYWxsb3dFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgLy9yZXN1bHRUeXBlOiBDYW1lcmFSZXN1bHRUeXBlLlVyaSxcbiAgICAgICAgcmVzdWx0VHlwZTogQ2FtZXJhUmVzdWx0VHlwZS5CYXNlNjQsXG4gICAgICAgIHNvdXJjZTogXCJDQU1FUkFcIixcbiAgICAgICAgY29ycmVjdE9yaWVudGF0aW9uOiB0cnVlXG4gICAgICB9KVxuICAgICAgaW1hZ2VTcmMudmFsdWUgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsIFwiICsgaW1hZ2UuYmFzZTY0U3RyaW5nXG4gICAgICBjb25zb2xlLmxvZyhpbWFnZS5iYXNlNjRTdHJpbmcpXG4gICAgICBhd2FpdCBnbG9iYWxTdG9yZS51cGxvYWRQaG90byhpbWFnZS5iYXNlNjRTdHJpbmcpO1xuICAgICAgZ2xvYmFsU3RvcmUuZ2V0UGhvdG9zKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdsb2JhbFN0b3JlLFxuICAgICAgYWN0aW9uLFxuICAgICAgbnVldmFFbnRyZWdhLFxuICAgICAgaW1hZ2VTcmMsXG4gICAgICBjYXB0dXJlSW1hZ2UsXG4gICAgICBzbGlkZVxuXG4gICAgfVxuICB9XG59XG5cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVPLE1BQU0sZ0JBQWdCO0FBQUEsRUFDM0IsT0FBTyxDQUFFLFFBQVEsTUFBUTtBQUMzQjtBQUVlLGtCQUFVLE9BQU8sY0FBYztBQUU1QyxTQUFPLFNBQVMsTUFBTTtBQUNwQixVQUFNLFFBQVEsT0FDWixNQUFNLFNBQVUsa0JBQWlCLFNBQVMsYUFBYSxRQUFRLE9BQ2hFO0FBRUQsV0FBTyxNQUFNLEtBQUssTUFBTSxRQUFRLFFBQVEsSUFDcEMsRUFBRSxlQUFlLEdBQUksTUFBTSxTQUFXLElBQ3RDO0FBQUEsRUFDUixDQUFHO0FBQ0g7QUNQQSxNQUFNLGVBQWUsS0FBSztBQUUxQixJQUFBLE9BQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBRVAsS0FB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
