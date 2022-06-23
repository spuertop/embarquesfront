import { c as createComponent, aa as useSizeProps, ab as useSize, a as computed, h, u as hMergeSlot, g as getCurrentInstance, o as onBeforeUnmount, aj as Transition, k as hDir, a8 as Ripple, Q as QIcon, ac as hMergeSlotSafely, O as stopAndPrevent, r as ref, ad as debounce, ag as onDeactivated, ah as onActivated, j as withDirectives, at as registerPlugin, _ as _export_sfc, au as useRouter, f as onMounted, x as openBlock, y as createBlock, z as withCtx, J as createBaseVNode, A as createVNode, C as createTextVNode, D as toDisplayString, av as normalizeClass, a7 as withKeys, aw as vShow, G as createElementBlock, H as renderList, I as Fragment, F as QBtn } from "./index.af93674c.js";
import { Q as QRadio, a as QPageSticky } from "./QPageSticky.662bbd1b.js";
import { Q as QInput } from "./QInput.1a8b15d7.js";
import { u as useDarkProps, a as useDark, b as useGlobalStore } from "./global.202de1e2.js";
import { Q as QResizeObserver, a as QScrollObserver, T as TouchPan } from "./QScrollObserver.68b61a3e.js";
import { b as between } from "./format.801e7424.js";
import { s as setVerticalScrollPosition, j as setHorizontalScrollPosition } from "./use-timeout.01474782.js";
import { Q as QCard, a as QCardSection, b as QCardActions, c as QDialog, C as ClosePopup } from "./ClosePopup.453e91cc.js";
import { Q as QPage } from "./QPage.01bdf203.js";
import "./axios.91ad12ec.js";
import "./selection.f6fbe71f.js";
const defaultSizes$1 = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function width(val, reverse, $q) {
  return {
    transform: reverse === true ? `translateX(${$q.lang.rtl === true ? "-" : ""}100%) scale3d(${-val},1,1)` : `scale3d(${val},1,1)`
  };
}
var QLinearProgress = createComponent({
  name: "QLinearProgress",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes$1);
    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...sizeStyle.value !== null ? sizeStyle.value : {},
      "--q-linear-progress-speed": `${props.animationSpeed}ms`
    }));
    const classes = computed(() => "q-linear-progress" + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.reverse === true || props.query === true ? " q-linear-progress--reverse" : "") + (props.rounded === true ? " rounded-borders" : ""));
    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const trackClass = computed(() => `q-linear-progress__track absolute-full q-linear-progress__track--with${props.instantFeedback === true ? "out" : ""}-transition q-linear-progress__track--${isDark.value === true ? "dark" : "light"}` + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : ""));
    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(() => `q-linear-progress__model absolute-full q-linear-progress__model--with${props.instantFeedback === true ? "out" : ""}-transition q-linear-progress__model--${motion.value === true ? "in" : ""}determinate`);
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }));
    const stripeClass = computed(() => `q-linear-progress__stripe absolute-${props.reverse === true ? "right" : "left"}`);
    return () => {
      const child = [
        h("div", {
          class: trackClass.value,
          style: trackStyle.value
        }),
        h("div", {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];
      props.stripe === true && motion.value === false && child.push(h("div", {
        class: stripeClass.value,
        style: stripeStyle.value
      }));
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": props.indeterminate === true ? void 0 : props.value
      }, hMergeSlot(slots.default, child));
    };
  }
});
var QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer, timerFallback, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      clearTimeout(timer);
      clearTimeout(timerFallback);
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      el.style.overflowY = "hidden";
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = 0;
        animListener = (evt) => {
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(() => props.disable === false && (props.clickable === true || props.selected !== null));
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(h("div", { class: "q-focus-helper" }));
      hasLeftIcon.value === true && child.push(h(QIcon, {
        class: "q-chip__icon q-chip__icon--left",
        name: leftIcon.value
      }));
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(h("div", {
        class: "q-chip__content col row no-wrap items-center q-anchor--skip"
      }, hMergeSlotSafely(slots.default, label)));
      props.iconRight && child.push(h(QIcon, {
        class: "q-chip__icon q-chip__icon--right",
        name: props.iconRight
      }));
      props.removable === true && child.push(h(QIcon, {
        class: "q-chip__icon q-chip__icon--remove cursor-pointer",
        name: removeIcon.value,
        ...attributes.value,
        onClick: onRemove,
        onKeyup: onRemove
      }));
      return child;
    }
    return () => {
      if (props.modelValue === false) {
        return;
      }
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(data, attributes.value, { onClick, onKeyup });
      return hDir("div", data, getContent(), "ripple", props.ripple !== false && props.disable !== true, () => [[Ripple, props.ripple]]);
    };
  }
});
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
var QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    let timer, panRefPos;
    const targetRef = ref(null);
    const classes = computed(() => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : ""));
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1);
    scroll.vertical.thumbStart = computed(() => scroll.vertical.percentage.value * (container.vertical.value - scroll.vertical.thumbSize.value));
    scroll.vertical.thumbSize = computed(() => Math.round(between(container.vertical.value * container.vertical.value / scroll.vertical.size.value, 50, container.vertical.value)));
    scroll.vertical.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.verticalThumbStyle,
        top: `${scroll.vertical.thumbStart.value}px`,
        height: `${scroll.vertical.thumbSize.value}px`
      };
    });
    scroll.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.horizontal.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1);
    scroll.horizontal.thumbStart = computed(() => scroll.horizontal.percentage.value * (container.horizontal.value - scroll.horizontal.thumbSize.value));
    scroll.horizontal.thumbSize = computed(() => Math.round(between(container.horizontal.value * container.horizontal.value / scroll.horizontal.size.value, 50, container.horizontal.value)));
    scroll.horizontal.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.horizontalThumbStyle,
        left: `${scroll.horizontal.thumbStart.value}px`,
        width: `${scroll.horizontal.thumbSize.value}px`
      };
    });
    scroll.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    const thumbVertDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "vertical");
      },
      void 0,
      { vertical: true, ...panOpts }
    ]];
    const thumbHorizDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "horizontal");
      },
      void 0,
      { horizontal: true, ...panOpts }
    ]];
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        info[axis + "Position"] = data.position.value;
        info[axis + "Percentage"] = data.percentage.value;
        info[axis + "Size"] = data.size.value;
        info[axis + "ContainerSize"] = container[axis].value;
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = vm.proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration);
    }
    function updateContainer({ height, width: width2 }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width2) {
        container.horizontal.value = width2;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position }) {
      let change = false;
      if (scroll.vertical.position.value !== position.top) {
        scroll.vertical.position.value = position.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position.left) {
        scroll.horizontal.position.value = position.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width: width2 }) {
      if (scroll.horizontal.size.value !== width2) {
        scroll.horizontal.size.value = width2;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) {
          return;
        }
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const containerSize = container[axis].value;
      const multiplier = (data.size.value - containerSize) / (containerSize - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const offset = evt[dirProps[axis].offset];
        if (offset < data.thumbStart.value || offset > data.thumbStart.value + data.thumbSize.value) {
          const pos = offset - data.thumbSize.value / 2;
          setScroll(pos / container[axis].value * data.size.value, axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function onVerticalMousedown(evt) {
      onMousedown(evt, "vertical");
    }
    function onHorizontalMousedown(evt) {
      onMousedown(evt, "horizontal");
    }
    function startTimer() {
      if (tempShowing.value === true) {
        clearTimeout(timer);
      } else {
        tempShowing.value = true;
      }
      timer = setTimeout(() => {
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    function onMouseenter() {
      hover.value = true;
    }
    function onMouseleave() {
      hover.value = false;
    }
    Object.assign(vm.proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration) {
        localSetScrollPosition(axis, percentage * (scroll[axis].size.value - container[axis].value), duration);
      }
    });
    let scrollPosition = null;
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) {
        return;
      }
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h("div", {
          class: scroll.vertical.barClass.value,
          style: [props.barStyle, props.verticalBarStyle],
          "aria-hidden": "true",
          onMousedown: onVerticalMousedown
        }),
        h("div", {
          class: scroll.horizontal.barClass.value,
          style: [props.barStyle, props.horizontalBarStyle],
          "aria-hidden": "true",
          onMousedown: onHorizontalMousedown
        }),
        withDirectives(h("div", {
          ref: scroll.vertical.ref,
          class: scroll.vertical.thumbClass.value,
          style: scroll.vertical.style.value,
          "aria-hidden": "true"
        }), thumbVertDir),
        withDirectives(h("div", {
          ref: scroll.horizontal.ref,
          class: scroll.horizontal.thumbClass.value,
          style: scroll.horizontal.style.value,
          "aria-hidden": "true"
        }), thumbHorizDir)
      ]);
    };
  }
});
var KeyboardStyle;
(function(KeyboardStyle2) {
  KeyboardStyle2["Dark"] = "DARK";
  KeyboardStyle2["Light"] = "LIGHT";
  KeyboardStyle2["Default"] = "DEFAULT";
})(KeyboardStyle || (KeyboardStyle = {}));
var KeyboardResize;
(function(KeyboardResize2) {
  KeyboardResize2["Body"] = "body";
  KeyboardResize2["Ionic"] = "ionic";
  KeyboardResize2["Native"] = "native";
  KeyboardResize2["None"] = "none";
})(KeyboardResize || (KeyboardResize = {}));
const Keyboard = registerPlugin("Keyboard");
const _sfc_main = {
  setup() {
    const router = useRouter();
    const globalStore = useGlobalStore();
    const action = ref("load");
    if (router.currentRoute.value.query.action) {
      action.value = router.currentRoute.value.query.action;
    }
    const barcode = ref("");
    const barcodeinput = ref(null);
    const audioError = new Audio("../mixkit-wrong-long-buzzer-954.wav");
    const alert = ref(false);
    const alertMsg = ref("");
    const progress = computed(() => {
      let total = globalStore.aeinfo.lecturas.length;
      let uploads = globalStore.aeinfo.lecturas.filter((item) => item.NroDS === true).length;
      return uploads / total;
    });
    const radioIcons = computed(() => {
      if (action.value === "load") {
        return "upload";
      } else if (action.value === "download") {
        return "download";
      } else {
        return "photo_camera";
      }
    });
    const radioText = computed(() => {
      if (action.value === "load") {
        return "Cargando";
      } else if (action.value === "download") {
        return "Descargando";
      } else {
        return "Fotografiar";
      }
    });
    const visibleEnd = computed(() => {
      let total = globalStore.aeinfo.lecturas.length;
      let uploads = globalStore.aeinfo.lecturas.filter((item) => item.NroDS === true).length;
      if (uploads / total === 1) {
        return true;
      } else {
        return false;
      }
    });
    Keyboard.addListener("keyboardWillShow", returnFocus);
    Keyboard.addListener("keyboardDidShow", returnFocus);
    function returnFocus() {
      barcode.value = "";
      barcodeinput.value.focus();
      Keyboard.hide();
    }
    async function readBarcode() {
      let ob = { ae: globalStore.aedocument, ud: barcode.value, empresa: globalStore.customer };
      if (checkBarcode(action.value)) {
        if (action.value === "load") {
          const error = await globalStore.uploadUnit(ob);
          console.log(error);
          returnFocus();
        }
        if (action.value === "download") {
          const error = await globalStore.downloadUnit(ob);
          console.log(error);
          returnFocus();
        }
      }
    }
    function checkBarcode(action2) {
      let lecturas = globalStore.aeinfo.lecturas;
      let search = lecturas.filter((item) => item.Descripcion === barcode.value);
      if (search.length > 0) {
        let estadoActual = search[0].NroDS;
        if (action2 === "load" && estadoActual === true) {
          alertMsg.value = "Esto ya esta cargado.";
          alert.value = true;
          audioError.play();
          return false;
        }
        if (action2 === "download" && estadoActual === null) {
          alertMsg.value = "Esto ya est\xE1 descargado";
          alert.value = true;
          audioError.play();
          return false;
        }
        return true;
      } else {
        alertMsg.value = "No pertenece a este pedido.";
        alert.value = true;
        audioError.play();
        return false;
      }
    }
    function playError() {
      audioError.play();
    }
    function nuevaEntrega() {
      globalStore.changeAE();
    }
    onMounted(() => {
      returnFocus();
    });
    return {
      globalStore,
      action,
      radioIcons,
      radioText,
      barcode,
      returnFocus,
      barcodeinput,
      progress,
      readBarcode,
      alert,
      alertMsg,
      playError,
      nuevaEntrega,
      visibleEnd
    };
  }
};
const _hoisted_1 = { class: "text-center text-h5 text-weight-bold" };
const _hoisted_2 = { class: "text-center" };
const _hoisted_3 = {
  class: "q-pa-none",
  style: { "font-size": "16px" }
};
const _hoisted_4 = { class: "row items-center" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "col-3" }, "Albar\xE1n", -1);
const _hoisted_6 = { class: "col" };
const _hoisted_7 = { class: "row items-center" };
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "col-3" }, "Agencia", -1);
const _hoisted_9 = { class: "col" };
const _hoisted_10 = { class: "row items-center" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", { class: "col-3" }, "Barras", -1);
const _hoisted_12 = { class: "col" };
const _hoisted_13 = { class: "q-pa-sm" };
const _hoisted_14 = { class: "text-center q-pa-sm" };
const _hoisted_15 = { class: "text-h5" };
const _hoisted_16 = /* @__PURE__ */ createTextVNode("Todo Cargado ");
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Error", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex-center q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QIcon, { name: $setup.radioIcons }, null, 8, ["name"]),
        createTextVNode(" " + toDisplayString($setup.radioText) + " " + toDisplayString($setup.globalStore.customer) + " ", 1),
        createVNode(QIcon, { name: $setup.radioIcons }, null, 8, ["name"])
      ]),
      createBaseVNode("div", _hoisted_2, [
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.action = $event),
          class: normalizeClass($setup.action === "load" ? "text-primary" : "text-grey-5"),
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "load",
          label: "Cargar",
          onClick: $setup.returnFocus
        }, null, 8, ["modelValue", "class", "onClick"]),
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.action = $event),
          class: normalizeClass($setup.action === "download" ? "text-primary" : "text-grey-5"),
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "download",
          label: "Descargar",
          onClick: $setup.returnFocus
        }, null, 8, ["modelValue", "class", "onClick"]),
        createVNode(QRadio, {
          modelValue: $setup.action,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.action = $event),
          class: normalizeClass($setup.action === "photo" ? "text-primary" : "text-grey-5"),
          "checked-icon": "task_alt",
          "unchecked-icon": "panorama_fish_eye",
          val: "photo",
          label: "Fotografiar",
          onClick: _cache[3] || (_cache[3] = ($event) => this.$router.push("/photos"))
        }, null, 8, ["modelValue", "class"])
      ]),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createBaseVNode("div", _hoisted_6, [
            createVNode(QInput, {
              dense: "",
              modelValue: $setup.globalStore.aedocument,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.globalStore.aedocument = $event),
              disable: ""
            }, null, 8, ["modelValue"])
          ])
        ]),
        createBaseVNode("div", _hoisted_7, [
          _hoisted_8,
          createBaseVNode("div", _hoisted_9, [
            createVNode(QInput, {
              dense: "",
              modelValue: $setup.globalStore.aeinfo.agencia.CodigoDeServicioDeTransporte,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.globalStore.aeinfo.agencia.CodigoDeServicioDeTransporte = $event),
              disable: ""
            }, null, 8, ["modelValue"])
          ])
        ]),
        createBaseVNode("div", _hoisted_10, [
          _hoisted_11,
          createBaseVNode("div", _hoisted_12, [
            createVNode(QInput, {
              dense: "",
              modelValue: $setup.barcode,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.barcode = $event),
              ref: "barcodeinput",
              onKeyup: withKeys($setup.readBarcode, ["enter"])
            }, null, 8, ["modelValue", "onKeyup"])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_13, [
        createVNode(QLinearProgress, {
          value: $setup.progress,
          rounded: "",
          stripe: "",
          size: "15px",
          color: "positive",
          class: "q-mt-sm"
        }, null, 8, ["value"]),
        createVNode(QSlideTransition, null, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_14, [
              createBaseVNode("span", _hoisted_15, [
                _hoisted_16,
                createVNode(QIcon, {
                  color: "positive",
                  name: "check_circle"
                })
              ])
            ], 512), [
              [vShow, $setup.visibleEnd]
            ])
          ]),
          _: 1
        }),
        createVNode(QScrollArea, {
          class: "q-pt-xs",
          style: { "height": "38vh", "max-width": "95vw" }
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.globalStore.aeinfo.lecturas, (item) => {
              return openBlock(), createBlock(QChip, {
                size: "md",
                key: item.Descripcion,
                color: item.NroDS ? $setup.action === "load" ? "positive" : "primary" : "",
                "text-color": "white"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.Descripcion2), 1)
                ]),
                _: 2
              }, 1032, ["color"]);
            }), 128))
          ]),
          _: 1
        })
      ]),
      createVNode(QDialog, {
        persistent: "",
        modelValue: $setup.alert,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.alert = $event),
        onKeyup: withKeys($setup.playError, ["enter"])
      }, {
        default: withCtx(() => [
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _hoisted_17
                ]),
                _: 1
              }),
              createVNode(QCardSection, { class: "bg-negative text-white" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($setup.alertMsg), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: "ENTENDIDO",
                    color: "primary",
                    onClick: $setup.returnFocus
                  }, null, 8, ["onClick"]), [
                    [ClosePopup]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "onKeyup"]),
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
var ReadingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ReadingPage.vue"]]);
export { ReadingPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZGluZ1BhZ2UuMDRlZWRjYjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL1FMaW5lYXJQcm9ncmVzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2xpZGUtdHJhbnNpdGlvbi9RU2xpZGVUcmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGlwL1FDaGlwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtYXJlYS9RU2Nyb2xsQXJlYS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2tleWJvYXJkL2Rpc3QvZXNtL2RlZmluaXRpb25zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3Iva2V5Ym9hcmQvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvUmVhZGluZ1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFNpemVzID0ge1xuICB4czogMixcbiAgc206IDQsXG4gIG1kOiA2LFxuICBsZzogMTAsXG4gIHhsOiAxNFxufVxuXG5mdW5jdGlvbiB3aWR0aCAodmFsLCByZXZlcnNlLCAkcSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zZm9ybTogcmV2ZXJzZSA9PT0gdHJ1ZVxuICAgICAgPyBgdHJhbnNsYXRlWCgkeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICctJyA6ICcnIH0xMDAlKSBzY2FsZTNkKCR7IC12YWwgfSwxLDEpYFxuICAgICAgOiBgc2NhbGUzZCgkeyB2YWwgfSwxLDEpYFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTGluZWFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBidWZmZXI6IE51bWJlcixcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gICAgcmV2ZXJzZTogQm9vbGVhbixcbiAgICBzdHJpcGU6IEJvb2xlYW4sXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcbiAgICBxdWVyeTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgYW5pbWF0aW9uU3BlZWQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDIxMDBcbiAgICB9LFxuXG4gICAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IG1vdGlvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmluZGV0ZXJtaW5hdGUgPT09IHRydWUgfHwgcHJvcHMucXVlcnkgPT09IHRydWUpXG4gICAgY29uc3Qgd2lkdGhSZXZlcnNlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucmV2ZXJzZSAhPT0gcHJvcHMucXVlcnkpXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4uKHNpemVTdHlsZS52YWx1ZSAhPT0gbnVsbCA/IHNpemVTdHlsZS52YWx1ZSA6IHt9KSxcbiAgICAgICctLXEtbGluZWFyLXByb2dyZXNzLXNwZWVkJzogYCR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tc2BcbiAgICB9KSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGluZWFyLXByb2dyZXNzJ1xuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMucmV2ZXJzZSA9PT0gdHJ1ZSB8fCBwcm9wcy5xdWVyeSA9PT0gdHJ1ZSA/ICcgcS1saW5lYXItcHJvZ3Jlc3MtLXJldmVyc2UnIDogJycpXG4gICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdHJhY2tTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHdpZHRoKHByb3BzLmJ1ZmZlciAhPT0gdm9pZCAwID8gcHJvcHMuYnVmZmVyIDogMSwgd2lkdGhSZXZlcnNlLnZhbHVlLCBwcm94eS4kcSkpXG4gICAgY29uc3QgdHJhY2tDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrIGFic29sdXRlLWZ1bGwnXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS13aXRoJHsgcHJvcHMuaW5zdGFudEZlZWRiYWNrID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH1gXG4gICAgICArIChwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLnRyYWNrQ29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBtb2RlbFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gd2lkdGgobW90aW9uLnZhbHVlID09PSB0cnVlID8gMSA6IHByb3BzLnZhbHVlLCB3aWR0aFJldmVyc2UudmFsdWUsIHByb3h5LiRxKSlcbiAgICBjb25zdCBtb2RlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwgYWJzb2x1dGUtZnVsbCdcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLXdpdGgkeyBwcm9wcy5pbnN0YW50RmVlZGJhY2sgPT09IHRydWUgPyAnb3V0JyA6ICcnIH0tdHJhbnNpdGlvbmBcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLSR7IG1vdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3RyaXBlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoeyB3aWR0aDogYCR7IHByb3BzLnZhbHVlICogMTAwIH0lYCB9KSlcbiAgICBjb25zdCBzdHJpcGVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1saW5lYXItcHJvZ3Jlc3NfX3N0cmlwZSBhYnNvbHV0ZS0keyBwcm9wcy5yZXZlcnNlID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiB0cmFja0NsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiB0cmFja1N0eWxlLnZhbHVlXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogbW9kZWxDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogbW9kZWxTdHlsZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5zdHJpcGUgPT09IHRydWUgJiYgbW90aW9uLnZhbHVlID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IHN0cmlwZUNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBzdHJpcGVTdHlsZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgICAgICdhcmlhLXZhbHVlbWF4JzogMSxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlXG4gICAgICAgICAgPyB2b2lkIDBcbiAgICAgICAgICA6IHByb3BzLnZhbHVlXG4gICAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNoaWxkKSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNsaWRlVHJhbnNpdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhcHBlYXI6IEJvb2xlYW4sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnc2hvdycsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgbGV0IGFuaW1hdGluZyA9IGZhbHNlLCBkb25lRm4sIGVsZW1lbnRcbiAgICBsZXQgdGltZXIsIHRpbWVyRmFsbGJhY2ssIGFuaW1MaXN0ZW5lciwgbGFzdEV2ZW50XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGRvbmVGbiAmJiBkb25lRm4oKVxuICAgICAgZG9uZUZuID0gbnVsbFxuICAgICAgYW5pbWF0aW5nID0gZmFsc2VcblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyRmFsbGJhY2spXG4gICAgICBlbGVtZW50ICE9PSB2b2lkIDAgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgYW5pbUxpc3RlbmVyID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luIChlbCwgaGVpZ2h0LCBkb25lKSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgaWYgKGhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBoZWlnaHQgfXB4YFxuICAgICAgfVxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgJHsgcHJvcHMuZHVyYXRpb24gfW1zIGN1YmljLWJlemllciguMjUsIC44LCAuNTAsIDEpYFxuXG4gICAgICBhbmltYXRpbmcgPSB0cnVlXG4gICAgICBkb25lRm4gPSBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kIChlbCwgZXZlbnQpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9IG51bGxcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IG51bGxcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjbGVhbnVwKClcbiAgICAgIGV2ZW50ICE9PSBsYXN0RXZlbnQgJiYgZW1pdChldmVudClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVudGVyIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvcyA9IDBcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgICBwb3MgPSBlbC5vZmZzZXRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodCA/IDAgOiB2b2lkIDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnaGlkZSdcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7IGVsLnNjcm9sbEhlaWdodCB9cHhgXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgcG9zID0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IDBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ3VwZGF0ZTpzZWxlY3RlZCcsICdyZW1vdmUnLCAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBoYXNMZWZ0SWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNlbGVjdGVkID09PSB0cnVlIHx8IHByb3BzLmljb24gIT09IHZvaWQgMClcblxuICAgIGNvbnN0IGxlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2VsZWN0ZWQgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5pY29uU2VsZWN0ZWQgfHwgJHEuaWNvblNldC5jaGlwLnNlbGVjdGVkXG4gICAgICAgIDogcHJvcHMuaWNvblxuICAgICkpXG5cbiAgICBjb25zdCByZW1vdmVJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuaWNvblJlbW92ZSB8fCAkcS5pY29uU2V0LmNoaXAucmVtb3ZlKVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2VcbiAgICAgICYmIChwcm9wcy5jbGlja2FibGUgPT09IHRydWUgfHwgcHJvcHMuc2VsZWN0ZWQgIT09IG51bGwpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgICAgIDogcHJvcHMudGV4dENvbG9yXG5cbiAgICAgIHJldHVybiAncS1jaGlwIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IGZhbHNlICYmIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICsgKHRleHQgPyBgIHRleHQtJHsgdGV4dCB9IHEtY2hpcC0tY29sb3JlZGAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWNoaXAtLWRlbnNlJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5vdXRsaW5lID09PSB0cnVlID8gJyBxLWNoaXAtLW91dGxpbmUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNlbGVjdGVkID09PSB0cnVlID8gJyBxLWNoaXAtLXNlbGVjdGVkJyA6ICcnKVxuICAgICAgICArIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1jbGlja2FibGUgY3Vyc29yLXBvaW50ZXIgbm9uLXNlbGVjdGFibGUgcS1ob3ZlcmFibGUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1zcXVhcmUnIDogJycpXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgb25DbGljazogb25SZW1vdmUsXG4gICAgICAgICAgb25LZXl1cDogb25SZW1vdmVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICB7IG9uQ2xpY2ssIG9uS2V5dXAgfVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdldENvbnRlbnQoKSxcbiAgICAgICAgJ3JpcHBsZScsXG4gICAgICAgIHByb3BzLnJpcHBsZSAhPT0gZmFsc2UgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSxcbiAgICAgICAgKCkgPT4gWyBbIFJpcHBsZSwgcHJvcHMucmlwcGxlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdpdGhEaXJlY3RpdmVzLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS5qcydcblxuY29uc3QgYXhpc0xpc3QgPSBbICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJyBdXG5jb25zdCBkaXJQcm9wcyA9IHtcbiAgdmVydGljYWw6IHsgb2Zmc2V0OiAnb2Zmc2V0WScsIHNjcm9sbDogJ3Njcm9sbFRvcCcsIGRpcjogJ2Rvd24nLCBkaXN0OiAneScgfSxcbiAgaG9yaXpvbnRhbDogeyBvZmZzZXQ6ICdvZmZzZXRYJywgc2Nyb2xsOiAnc2Nyb2xsTGVmdCcsIGRpcjogJ3JpZ2h0JywgZGlzdDogJ3gnIH1cbn1cbmNvbnN0IHBhbk9wdHMgPSB7XG4gIHByZXZlbnQ6IHRydWUsXG4gIG1vdXNlOiB0cnVlLFxuICBtb3VzZUFsbERpcjogdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNjcm9sbEFyZWEnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGh1bWJTdHlsZTogT2JqZWN0LFxuICAgIHZlcnRpY2FsVGh1bWJTdHlsZTogT2JqZWN0LFxuICAgIGhvcml6b250YWxUaHVtYlN0eWxlOiBPYmplY3QsXG5cbiAgICBiYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICB2ZXJ0aWNhbEJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhvcml6b250YWxCYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIGNvbnRlbnRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBjb250ZW50QWN0aXZlU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICBkZWxheToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTAwMFxuICAgIH0sXG5cbiAgICB2aXNpYmxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICAvLyBzdGF0ZSBtYW5hZ2VtZW50XG4gICAgY29uc3QgdGVtcFNob3dpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgcGFubmluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBob3ZlciA9IHJlZihmYWxzZSlcblxuICAgIC8vIG90aGVyLi4uXG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgdmVydGljYWw6IHJlZigwKSxcbiAgICAgIGhvcml6b250YWw6IHJlZigwKVxuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgIHJlZjogcmVmKG51bGwpLFxuICAgICAgICBwb3NpdGlvbjogcmVmKDApLFxuICAgICAgICBzaXplOiByZWYoMClcbiAgICAgIH0sXG5cbiAgICAgIGhvcml6b250YWw6IHtcbiAgICAgICAgcmVmOiByZWYobnVsbCksXG4gICAgICAgIHBvc2l0aW9uOiByZWYoMCksXG4gICAgICAgIHNpemU6IHJlZigwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgbGV0IHRpbWVyLCBwYW5SZWZQb3NcblxuICAgIGNvbnN0IHRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWEtLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnBlcmNlbnRhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkaWZmID0gc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgLSBjb250YWluZXIudmVydGljYWwudmFsdWVcbiAgICAgIGlmIChkaWZmIDw9IDApIHsgcmV0dXJuIDAgfVxuICAgICAgY29uc3QgcCA9IGJldHdlZW4oc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChcbiAgICAgICAgKHByb3BzLnZpc2libGUgPT09IG51bGwgPyBob3Zlci52YWx1ZSA6IHByb3BzLnZpc2libGUpICE9PSB0cnVlXG4gICAgICAgICYmIHRlbXBTaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwYW5uaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB8fCBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSA8PSBjb250YWluZXIudmVydGljYWwudmFsdWUgKyAxXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlN0YXJ0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlICogKGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAtIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUpXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgTWF0aC5yb3VuZChcbiAgICAgICAgYmV0d2VlbihcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWUgKiBjb250YWluZXIudmVydGljYWwudmFsdWUgLyBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSxcbiAgICAgICAgICA1MCxcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgICBzY3JvbGwudmVydGljYWwuc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcm9wcy50aHVtYlN0eWxlLFxuICAgICAgICAuLi5wcm9wcy52ZXJ0aWNhbFRodW1iU3R5bGUsXG4gICAgICAgIHRvcDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlN0YXJ0LnZhbHVlIH1weGAsXG4gICAgICAgIGhlaWdodDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH0pXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0tdiBhYnNvbHV0ZS1yaWdodCdcbiAgICAgICsgKHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcbiAgICBzY3JvbGwudmVydGljYWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fYmFyIHEtc2Nyb2xsYXJlYV9fYmFyLS12IGFic29sdXRlLXJpZ2h0J1xuICAgICAgKyAoc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX2Jhci0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcblxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnBlcmNlbnRhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkaWZmID0gc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlXG4gICAgICBpZiAoZGlmZiA8PSAwKSB7IHJldHVybiAwIH1cbiAgICAgIGNvbnN0IHAgPSBiZXR3ZWVuKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKFxuICAgICAgICAocHJvcHMudmlzaWJsZSA9PT0gbnVsbCA/IGhvdmVyLnZhbHVlIDogcHJvcHMudmlzaWJsZSkgIT09IHRydWVcbiAgICAgICAgJiYgdGVtcFNob3dpbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICYmIHBhbm5pbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHx8IHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgPD0gY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgKyAxXG4gICAgKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZSAqIChjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSAtIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU2l6ZS52YWx1ZSlcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIE1hdGgucm91bmQoXG4gICAgICAgIGJldHdlZW4oXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgKiBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSAvIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUsXG4gICAgICAgICAgNTAsXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnByb3BzLnRodW1iU3R5bGUsXG4gICAgICAgIC4uLnByb3BzLmhvcml6b250YWxUaHVtYlN0eWxlLFxuICAgICAgICBsZWZ0OiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTdGFydC52YWx1ZSB9cHhgLFxuICAgICAgICB3aWR0aDogYCR7IHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU2l6ZS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNjcm9sbGFyZWFfX3RodW1iIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWggYWJzb2x1dGUtYm90dG9tJ1xuICAgICAgKyAoc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWludmlzaWJsZScgOiAnJylcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fYmFyIHEtc2Nyb2xsYXJlYV9fYmFyLS1oIGFic29sdXRlLWJvdHRvbSdcbiAgICAgICsgKHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX2Jhci0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG1haW5TdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICA6IHByb3BzLmNvbnRlbnRBY3RpdmVTdHlsZVxuICAgICkpXG5cbiAgICBjb25zdCB0aHVtYlZlcnREaXIgPSBbIFtcbiAgICAgIFRvdWNoUGFuLFxuICAgICAgZSA9PiB7IG9uUGFuVGh1bWIoZSwgJ3ZlcnRpY2FsJykgfSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHsgdmVydGljYWw6IHRydWUsIC4uLnBhbk9wdHMgfVxuICAgIF0gXVxuXG4gICAgY29uc3QgdGh1bWJIb3JpekRpciA9IFsgW1xuICAgICAgVG91Y2hQYW4sXG4gICAgICBlID0+IHsgb25QYW5UaHVtYihlLCAnaG9yaXpvbnRhbCcpIH0sXG4gICAgICB2b2lkIDAsXG4gICAgICB7IGhvcml6b250YWw6IHRydWUsIC4uLnBhbk9wdHMgfVxuICAgIF0gXVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsICgpIHtcbiAgICAgIGNvbnN0IGluZm8gPSB7fVxuXG4gICAgICBheGlzTGlzdC5mb3JFYWNoKGF4aXMgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gc2Nyb2xsWyBheGlzIF1cblxuICAgICAgICBpbmZvWyBheGlzICsgJ1Bvc2l0aW9uJyBdID0gZGF0YS5wb3NpdGlvbi52YWx1ZVxuICAgICAgICBpbmZvWyBheGlzICsgJ1BlcmNlbnRhZ2UnIF0gPSBkYXRhLnBlcmNlbnRhZ2UudmFsdWVcbiAgICAgICAgaW5mb1sgYXhpcyArICdTaXplJyBdID0gZGF0YS5zaXplLnZhbHVlXG4gICAgICAgIGluZm9bIGF4aXMgKyAnQ29udGFpbmVyU2l6ZScgXSA9IGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8vIHdlIGhhdmUgbG90cyBvZiBsaXN0ZW5lcnMsIHNvXG4gICAgLy8gZW5zdXJlIHdlJ3JlIG5vdCBlbWl0dGluZyBzYW1lIGluZm9cbiAgICAvLyBtdWx0aXBsZSB0aW1lc1xuICAgIGNvbnN0IGVtaXRTY3JvbGwgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmZvID0gZ2V0U2Nyb2xsKClcbiAgICAgIGluZm8ucmVmID0gdm0ucHJveHlcbiAgICAgIGVtaXQoJ3Njcm9sbCcsIGluZm8pXG4gICAgfSwgMClcblxuICAgIGZ1bmN0aW9uIGxvY2FsU2V0U2Nyb2xsUG9zaXRpb24gKGF4aXMsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgICAgIGlmIChheGlzTGlzdC5pbmNsdWRlcyhheGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1FTY3JvbGxBcmVhXTogd3JvbmcgZmlyc3QgcGFyYW0gb2Ygc2V0U2Nyb2xsUG9zaXRpb24gKHZlcnRpY2FsL2hvcml6b250YWwpJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gYXhpcyA9PT0gJ3ZlcnRpY2FsJ1xuICAgICAgICA/IHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb25cbiAgICAgICAgOiBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb25cblxuICAgICAgZm4odGFyZ2V0UmVmLnZhbHVlLCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lciAoeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZiAoY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlICE9PSBoZWlnaHQpIHtcbiAgICAgICAgY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlID0gaGVpZ2h0XG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlICE9PSB3aWR0aCkge1xuICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgY2hhbmdlID09PSB0cnVlICYmIHN0YXJ0VGltZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbCAoeyBwb3NpdGlvbiB9KSB7XG4gICAgICBsZXQgY2hhbmdlID0gZmFsc2VcblxuICAgICAgaWYgKHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSAhPT0gcG9zaXRpb24udG9wKSB7XG4gICAgICAgIHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnRvcFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZSAhPT0gcG9zaXRpb24ubGVmdCkge1xuICAgICAgICBzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLmxlZnRcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgc3RhcnRUaW1lcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsU2l6ZSAoeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgICAgIGlmIChzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlICE9PSB3aWR0aCkge1xuICAgICAgICBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlID0gd2lkdGhcbiAgICAgICAgc3RhcnRUaW1lcigpXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlID0gaGVpZ2h0XG4gICAgICAgIHN0YXJ0VGltZXIoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFuVGh1bWIgKGUsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICBpZiAoZS5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChkYXRhLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBwYW5SZWZQb3MgPSBkYXRhLnBvc2l0aW9uLnZhbHVlXG4gICAgICAgIHBhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwYW5uaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZS5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIHBhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkUHJvcCA9IGRpclByb3BzWyBheGlzIF1cbiAgICAgIGNvbnN0IGNvbnRhaW5lclNpemUgPSBjb250YWluZXJbIGF4aXMgXS52YWx1ZVxuXG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gKGRhdGEuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lclNpemUpIC8gKGNvbnRhaW5lclNpemUgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSlcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gZS5kaXN0YW5jZVsgZFByb3AuZGlzdCBdXG4gICAgICBjb25zdCBwb3MgPSBwYW5SZWZQb3MgKyAoZS5kaXJlY3Rpb24gPT09IGRQcm9wLmRpciA/IDEgOiAtMSkgKiBkaXN0YW5jZSAqIG11bHRpcGxpZXJcblxuICAgICAgc2V0U2Nyb2xsKHBvcywgYXhpcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZG93biAoZXZ0LCBheGlzKSB7XG4gICAgICBjb25zdCBkYXRhID0gc2Nyb2xsWyBheGlzIF1cblxuICAgICAgaWYgKGRhdGEudGh1bWJIaWRkZW4udmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZXZ0WyBkaXJQcm9wc1sgYXhpcyBdLm9mZnNldCBdXG4gICAgICAgIGlmIChvZmZzZXQgPCBkYXRhLnRodW1iU3RhcnQudmFsdWUgfHwgb2Zmc2V0ID4gZGF0YS50aHVtYlN0YXJ0LnZhbHVlICsgZGF0YS50aHVtYlNpemUudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBwb3MgPSBvZmZzZXQgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSAvIDJcbiAgICAgICAgICBzZXRTY3JvbGwocG9zIC8gY29udGFpbmVyWyBheGlzIF0udmFsdWUgKiBkYXRhLnNpemUudmFsdWUsIGF4aXMpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aHVtYiBwYW5cbiAgICAgICAgaWYgKGRhdGEucmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZGF0YS5yZWYudmFsdWUuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldnQudHlwZSwgZXZ0KSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVmVydGljYWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgb25Nb3VzZWRvd24oZXZ0LCAndmVydGljYWwnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSG9yaXpvbnRhbE1vdXNlZG93biAoZXZ0KSB7XG4gICAgICBvbk1vdXNlZG93bihldnQsICdob3Jpem9udGFsJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyICgpIHtcbiAgICAgIGlmICh0ZW1wU2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGVtcFNob3dpbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7IHRlbXBTaG93aW5nLnZhbHVlID0gZmFsc2UgfSwgcHJvcHMuZGVsYXkpXG4gICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXRTY3JvbGwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbCAob2Zmc2V0LCBheGlzKSB7XG4gICAgICB0YXJnZXRSZWYudmFsdWVbIGRpclByb3BzWyBheGlzIF0uc2Nyb2xsIF0gPSBvZmZzZXRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZW50ZXIgKCkge1xuICAgICAgaG92ZXIudmFsdWUgPSB0cnVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWxlYXZlICgpIHtcbiAgICAgIGhvdmVyLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICBnZXRTY3JvbGxUYXJnZXQ6ICgpID0+IHRhcmdldFJlZi52YWx1ZSxcbiAgICAgIGdldFNjcm9sbCxcbiAgICAgIGdldFNjcm9sbFBvc2l0aW9uOiAoKSA9PiAoe1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWVcbiAgICAgIH0pLFxuICAgICAgZ2V0U2Nyb2xsUGVyY2VudGFnZTogKCkgPT4gKHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucGVyY2VudGFnZS52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZVxuICAgICAgfSksXG4gICAgICBzZXRTY3JvbGxQb3NpdGlvbjogbG9jYWxTZXRTY3JvbGxQb3NpdGlvbixcbiAgICAgIHNldFNjcm9sbFBlcmNlbnRhZ2UgKGF4aXMsIHBlcmNlbnRhZ2UsIGR1cmF0aW9uKSB7XG4gICAgICAgIGxvY2FsU2V0U2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwZXJjZW50YWdlICogKHNjcm9sbFsgYXhpcyBdLnNpemUudmFsdWUgLSBjb250YWluZXJbIGF4aXMgXS52YWx1ZSksXG4gICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSBudWxsXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNjcm9sbFBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHRhcmdldFJlZi52YWx1ZVxuXG4gICAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihzY3JvbGxUYXJnZXQsIHNjcm9sbFBvc2l0aW9uLmxlZnQpXG4gICAgICAgIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oc2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3NpdGlvbi50b3ApXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChlbWl0U2Nyb2xsLmNhbmNlbClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgb25Nb3VzZWVudGVyLFxuICAgICAgICBvbk1vdXNlbGVhdmVcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogdGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1zY3JvbGxhcmVhX19jb250YWluZXIgc2Nyb2xsIHJlbGF0aXZlLXBvc2l0aW9uIGZpdCBoaWRlLXNjcm9sbGJhcicsXG4gICAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4ICE9PSB2b2lkIDAgPyBwcm9wcy50YWJpbmRleCA6IHZvaWQgMFxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXNjcm9sbGFyZWFfX2NvbnRlbnQgYWJzb2x1dGUnLFxuICAgICAgICAgICAgc3R5bGU6IG1haW5TdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgICAgIG9uUmVzaXplOiB1cGRhdGVTY3JvbGxTaXplXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pKSxcblxuICAgICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7XG4gICAgICAgICAgICBheGlzOiAnYm90aCcsXG4gICAgICAgICAgICBvblNjcm9sbDogdXBkYXRlU2Nyb2xsXG4gICAgICAgICAgfSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZTogdXBkYXRlQ29udGFpbmVyXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogc2Nyb2xsLnZlcnRpY2FsLmJhckNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBbIHByb3BzLmJhclN0eWxlLCBwcm9wcy52ZXJ0aWNhbEJhclN0eWxlIF0sXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgIG9uTW91c2Vkb3duOiBvblZlcnRpY2FsTW91c2Vkb3duXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IFsgcHJvcHMuYmFyU3R5bGUsIHByb3BzLmhvcml6b250YWxCYXJTdHlsZSBdLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICBvbk1vdXNlZG93bjogb25Ib3Jpem9udGFsTW91c2Vkb3duXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogc2Nyb2xsLnZlcnRpY2FsLnJlZixcbiAgICAgICAgICAgIGNsYXNzOiBzY3JvbGwudmVydGljYWwudGh1bWJDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgIHN0eWxlOiBzY3JvbGwudmVydGljYWwuc3R5bGUudmFsdWUsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0aHVtYlZlcnREaXJcbiAgICAgICAgKSxcblxuICAgICAgICB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICByZWY6IHNjcm9sbC5ob3Jpem9udGFsLnJlZixcbiAgICAgICAgICAgIGNsYXNzOiBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgc3R5bGU6IHNjcm9sbC5ob3Jpem9udGFsLnN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGh1bWJIb3JpekRpclxuICAgICAgICApXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiQGNhcGFjaXRvci9jbGlcIiAvPlxuZXhwb3J0IHZhciBLZXlib2FyZFN0eWxlO1xuKGZ1bmN0aW9uIChLZXlib2FyZFN0eWxlKSB7XG4gICAgLyoqXG4gICAgICogRGFyayBrZXlib2FyZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAxLjAuMFxuICAgICAqL1xuICAgIEtleWJvYXJkU3R5bGVbXCJEYXJrXCJdID0gXCJEQVJLXCI7XG4gICAgLyoqXG4gICAgICogTGlnaHQga2V5Ym9hcmQuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMS4wLjBcbiAgICAgKi9cbiAgICBLZXlib2FyZFN0eWxlW1wiTGlnaHRcIl0gPSBcIkxJR0hUXCI7XG4gICAgLyoqXG4gICAgICogT24gaU9TIDEzIGFuZCBuZXdlciB0aGUga2V5Ym9hcmQgc3R5bGUgaXMgYmFzZWQgb24gdGhlIGRldmljZSBhcHBlYXJhbmNlLlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgRGFyayBtb2RlLCB0aGUga2V5Ym9hcmQgd2lsbCBiZSBkYXJrLlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgTGlnaHQgbW9kZSwgdGhlIGtleWJvYXJkIHdpbGwgYmUgbGlnaHQuXG4gICAgICogT24gaU9TIDEyIHRoZSBrZXlib2FyZCB3aWxsIGJlIGxpZ2h0LlxuICAgICAqXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICovXG4gICAgS2V5Ym9hcmRTdHlsZVtcIkRlZmF1bHRcIl0gPSBcIkRFRkFVTFRcIjtcbn0pKEtleWJvYXJkU3R5bGUgfHwgKEtleWJvYXJkU3R5bGUgPSB7fSkpO1xuZXhwb3J0IHZhciBLZXlib2FyZFJlc2l6ZTtcbihmdW5jdGlvbiAoS2V5Ym9hcmRSZXNpemUpIHtcbiAgICAvKipcbiAgICAgKiBPbmx5IHRoZSBgYm9keWAgSFRNTCBlbGVtZW50IHdpbGwgYmUgcmVzaXplZC5cbiAgICAgKiBSZWxhdGl2ZSB1bml0cyBhcmUgbm90IGFmZmVjdGVkLCBiZWNhdXNlIHRoZSB2aWV3cG9ydCBkb2VzIG5vdCBjaGFuZ2UuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMS4wLjBcbiAgICAgKi9cbiAgICBLZXlib2FyZFJlc2l6ZVtcIkJvZHlcIl0gPSBcImJvZHlcIjtcbiAgICAvKipcbiAgICAgKiBPbmx5IHRoZSBgaW9uLWFwcGAgSFRNTCBlbGVtZW50IHdpbGwgYmUgcmVzaXplZC5cbiAgICAgKiBVc2UgaXQgb25seSBmb3IgSW9uaWMgRnJhbWV3b3JrIGFwcHMuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMS4wLjBcbiAgICAgKi9cbiAgICBLZXlib2FyZFJlc2l6ZVtcIklvbmljXCJdID0gXCJpb25pY1wiO1xuICAgIC8qKlxuICAgICAqIFRoZSB3aG9sZSBuYXRpdmUgV2ViIFZpZXcgd2lsbCBiZSByZXNpemVkIHdoZW4gdGhlIGtleWJvYXJkIHNob3dzL2hpZGVzLlxuICAgICAqIFRoaXMgYWZmZWN0cyB0aGUgYHZoYCByZWxhdGl2ZSB1bml0LlxuICAgICAqXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICovXG4gICAgS2V5Ym9hcmRSZXNpemVbXCJOYXRpdmVcIl0gPSBcIm5hdGl2ZVwiO1xuICAgIC8qKlxuICAgICAqIE5laXRoZXIgdGhlIGFwcCBub3IgdGhlIFdlYiBWaWV3IGFyZSByZXNpemVkLlxuICAgICAqXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICovXG4gICAgS2V5Ym9hcmRSZXNpemVbXCJOb25lXCJdID0gXCJub25lXCI7XG59KShLZXlib2FyZFJlc2l6ZSB8fCAoS2V5Ym9hcmRSZXNpemUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmaW5pdGlvbnMuanMubWFwIiwiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuY29uc3QgS2V5Ym9hcmQgPSByZWdpc3RlclBsdWdpbignS2V5Ym9hcmQnKTtcbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgS2V5Ym9hcmQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImZsZXgtY2VudGVyIHEtcGEtbWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC1oNSB0ZXh0LXdlaWdodC1ib2xkXCI+XG4gICAgICA8cS1pY29uIDpuYW1lPVwicmFkaW9JY29uc1wiIC8+XG4gICAgICB7eyByYWRpb1RleHQgfX0ge3sgZ2xvYmFsU3RvcmUuY3VzdG9tZXIgfX1cbiAgICAgIDxxLWljb24gOm5hbWU9XCJyYWRpb0ljb25zXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxxLXJhZGlvIHYtbW9kZWw9XCJhY3Rpb25cIiA6Y2xhc3M9XCJhY3Rpb24gPT09ICdsb2FkJyA/ICd0ZXh0LXByaW1hcnknIDogJ3RleHQtZ3JleS01J1wiIGNoZWNrZWQtaWNvbj1cInRhc2tfYWx0XCJcbiAgICAgICAgdW5jaGVja2VkLWljb249XCJwYW5vcmFtYV9maXNoX2V5ZVwiIHZhbD1cImxvYWRcIiBsYWJlbD1cIkNhcmdhclwiIEBjbGljaz1cInJldHVybkZvY3VzXCIgLz5cbiAgICAgIDxxLXJhZGlvIHYtbW9kZWw9XCJhY3Rpb25cIiA6Y2xhc3M9XCJhY3Rpb24gPT09ICdkb3dubG9hZCcgPyAndGV4dC1wcmltYXJ5JyA6ICd0ZXh0LWdyZXktNSdcIiBjaGVja2VkLWljb249XCJ0YXNrX2FsdFwiXG4gICAgICAgIHVuY2hlY2tlZC1pY29uPVwicGFub3JhbWFfZmlzaF9leWVcIiB2YWw9XCJkb3dubG9hZFwiIGxhYmVsPVwiRGVzY2FyZ2FyXCIgQGNsaWNrPVwicmV0dXJuRm9jdXNcIiAvPlxuICAgICAgPHEtcmFkaW8gdi1tb2RlbD1cImFjdGlvblwiIDpjbGFzcz1cImFjdGlvbiA9PT0gJ3Bob3RvJyA/ICd0ZXh0LXByaW1hcnknIDogJ3RleHQtZ3JleS01J1wiIGNoZWNrZWQtaWNvbj1cInRhc2tfYWx0XCJcbiAgICAgICAgdW5jaGVja2VkLWljb249XCJwYW5vcmFtYV9maXNoX2V5ZVwiIHZhbD1cInBob3RvXCIgbGFiZWw9XCJGb3RvZ3JhZmlhclwiIEBjbGljaz1cInRoaXMuJHJvdXRlci5wdXNoKCcvcGhvdG9zJylcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW5vbmVcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+QWxiYXLDoW48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgIDxxLWlucHV0IGRlbnNlIHYtbW9kZWw9XCJnbG9iYWxTdG9yZS5hZWRvY3VtZW50XCIgZGlzYWJsZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+QWdlbmNpYTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgPHEtaW5wdXQgZGVuc2Ugdi1tb2RlbD1cImdsb2JhbFN0b3JlLmFlaW5mby5hZ2VuY2lhLkNvZGlnb0RlU2VydmljaW9EZVRyYW5zcG9ydGVcIiBkaXNhYmxlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5CYXJyYXM8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgIDxxLWlucHV0IGRlbnNlIHYtbW9kZWw9XCJiYXJjb2RlXCIgcmVmPVwiYmFyY29kZWlucHV0XCIgQGtleXVwLmVudGVyPVwicmVhZEJhcmNvZGVcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLXNtXCI+XG4gICAgICA8cS1saW5lYXItcHJvZ3Jlc3MgOnZhbHVlPVwicHJvZ3Jlc3NcIiByb3VuZGVkIHN0cmlwZSBzaXplPVwiMTVweFwiIGNvbG9yPVwicG9zaXRpdmVcIiBjbGFzcz1cInEtbXQtc21cIiAvPlxuXG4gICAgICA8cS1zbGlkZS10cmFuc2l0aW9uPlxuICAgICAgICA8ZGl2IHYtc2hvdz1cInZpc2libGVFbmRcIiBjbGFzcz1cInRleHQtY2VudGVyIHEtcGEtc21cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtaDVcIj5Ub2RvIENhcmdhZG9cbiAgICAgICAgICAgIDxxLWljb24gY29sb3I9XCJwb3NpdGl2ZVwiIG5hbWU9XCJjaGVja19jaXJjbGVcIiAvPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3Etc2xpZGUtdHJhbnNpdGlvbj5cblxuICAgICAgPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJxLXB0LXhzXCIgc3R5bGU9XCJoZWlnaHQ6IDM4dmg7IG1heC13aWR0aDogOTV2dztcIj5cbiAgICAgICAgPHEtY2hpcCBzaXplPVwibWRcIiB2LWZvcj1cIml0ZW0gaW4gZ2xvYmFsU3RvcmUuYWVpbmZvLmxlY3R1cmFzXCIgOmtleT1cIml0ZW0uRGVzY3JpcGNpb25cIlxuICAgICAgICAgIDpjb2xvcj1cIml0ZW0uTnJvRFMgPyBhY3Rpb24gPT09ICdsb2FkJyA/ICdwb3NpdGl2ZScgOiAncHJpbWFyeScgOiAnJ1wiIHRleHQtY29sb3I9XCJ3aGl0ZVwiPlxuICAgICAgICAgIHt7IGl0ZW0uRGVzY3JpcGNpb24yIH19XG4gICAgICAgIDwvcS1jaGlwPlxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gQUxFUlQgRVJST1JTIC0tPlxuICAgIDxxLWRpYWxvZyBwZXJzaXN0ZW50IHYtbW9kZWw9XCJhbGVydFwiIEBrZXl1cC5lbnRlcj1cInBsYXlFcnJvclwiPlxuICAgICAgPHEtY2FyZD5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RXJyb3I8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwiYmctbmVnYXRpdmUgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIHt7IGFsZXJ0TXNnIH19XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJFTlRFTkRJRE9cIiBjb2xvcj1cInByaW1hcnlcIiB2LWNsb3NlLXBvcHVwIEBjbGljaz1cInJldHVybkZvY3VzXCIgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gICAgPHEtcGFnZS1zdGlja3kgcG9zaXRpb249XCJib3R0b21cIiA6b2Zmc2V0PVwiWzAsIDE4XVwiPlxuICAgICAgPHEtYnRuIHN0eWxlPVwid2lkdGg6IDk1dnc7XCIgY29sb3I9XCJhY2NlbnRcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBsYWJlbD1cIkNhcmdhciBvdHJhIGVudHJlZ2FcIiBuby1jYXBzXG4gICAgICAgIEBjbGljaz1cIm51ZXZhRW50cmVnYVwiIC8+XG4gICAgPC9xLXBhZ2Utc3RpY2t5PlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuaW1wb3J0IHsgdXNlR2xvYmFsU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9nbG9iYWxcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5pbXBvcnQgeyByZWYgfSBmcm9tICdAdnVlL3JlYWN0aXZpdHknO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCB9IGZyb20gJ0B2dWUvcnVudGltZS1jb3JlJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnQGNhcGFjaXRvci9rZXlib2FyZCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZXR1cCgpIHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBnbG9iYWxTdG9yZSA9IHVzZUdsb2JhbFN0b3JlKCk7XG4gICAgY29uc3QgYWN0aW9uID0gcmVmKCdsb2FkJyk7XG4gICAgaWYgKHJvdXRlci5jdXJyZW50Um91dGUudmFsdWUucXVlcnkuYWN0aW9uKSB7XG4gICAgICBhY3Rpb24udmFsdWUgPSByb3V0ZXIuY3VycmVudFJvdXRlLnZhbHVlLnF1ZXJ5LmFjdGlvblxuICAgIH1cbiAgICBjb25zdCBiYXJjb2RlID0gcmVmKCcnKTtcbiAgICBjb25zdCBiYXJjb2RlaW5wdXQgPSByZWYobnVsbCk7XG4gICAgY29uc3QgYXVkaW9FcnJvciA9IG5ldyBBdWRpbygnLi4vbWl4a2l0LXdyb25nLWxvbmctYnV6emVyLTk1NC53YXYnKTtcbiAgICBjb25zdCBhbGVydCA9IHJlZihmYWxzZSk7XG4gICAgY29uc3QgYWxlcnRNc2cgPSByZWYoJycpO1xuICAgIGNvbnN0IHByb2dyZXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gZ2xvYmFsU3RvcmUuYWVpbmZvLmxlY3R1cmFzLmxlbmd0aDtcbiAgICAgIGxldCB1cGxvYWRzID0gKGdsb2JhbFN0b3JlLmFlaW5mby5sZWN0dXJhcy5maWx0ZXIoaXRlbSA9PiBpdGVtLk5yb0RTID09PSB0cnVlKSkubGVuZ3RoO1xuICAgICAgcmV0dXJuIHVwbG9hZHMgLyB0b3RhbDtcbiAgICB9KVxuICAgIGNvbnN0IHJhZGlvSWNvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnZhbHVlID09PSAnbG9hZCcpIHtcbiAgICAgICAgcmV0dXJuICd1cGxvYWQnXG4gICAgICB9IGVsc2UgaWYgKGFjdGlvbi52YWx1ZSA9PT0gJ2Rvd25sb2FkJykge1xuICAgICAgICByZXR1cm4gJ2Rvd25sb2FkJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdwaG90b19jYW1lcmEnXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCByYWRpb1RleHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnZhbHVlID09PSAnbG9hZCcpIHtcbiAgICAgICAgcmV0dXJuICdDYXJnYW5kbydcbiAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLnZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgIHJldHVybiAnRGVzY2FyZ2FuZG8nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ0ZvdG9ncmFmaWFyJ1xuICAgICAgfVxuICAgIH0pXG4gICAgY29uc3QgdmlzaWJsZUVuZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGdsb2JhbFN0b3JlLmFlaW5mby5sZWN0dXJhcy5sZW5ndGg7XG4gICAgICBsZXQgdXBsb2FkcyA9IChnbG9iYWxTdG9yZS5hZWluZm8ubGVjdHVyYXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5Ocm9EUyA9PT0gdHJ1ZSkpLmxlbmd0aDtcbiAgICAgIGlmICh1cGxvYWRzIC8gdG90YWwgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBLZXlib2FyZC5hZGRMaXN0ZW5lcigna2V5Ym9hcmRXaWxsU2hvdycsIHJldHVybkZvY3VzKTtcbiAgICBLZXlib2FyZC5hZGRMaXN0ZW5lcigna2V5Ym9hcmREaWRTaG93JywgcmV0dXJuRm9jdXMpO1xuXG4gICAgZnVuY3Rpb24gcmV0dXJuRm9jdXMoKSB7XG4gICAgICBiYXJjb2RlLnZhbHVlID0gJyc7XG4gICAgICBiYXJjb2RlaW5wdXQudmFsdWUuZm9jdXMoKTtcbiAgICAgIEtleWJvYXJkLmhpZGUoKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiByZWFkQmFyY29kZSgpIHtcbiAgICAgIGxldCBvYiA9IHsgYWU6IGdsb2JhbFN0b3JlLmFlZG9jdW1lbnQsIHVkOiBiYXJjb2RlLnZhbHVlLCBlbXByZXNhOiBnbG9iYWxTdG9yZS5jdXN0b21lciB9XG4gICAgICBpZiAoY2hlY2tCYXJjb2RlKGFjdGlvbi52YWx1ZSkpIHtcbiAgICAgICAgaWYgKGFjdGlvbi52YWx1ZSA9PT0gJ2xvYWQnKSB7XG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBnbG9iYWxTdG9yZS51cGxvYWRVbml0KG9iKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgcmV0dXJuRm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBnbG9iYWxTdG9yZS5kb3dubG9hZFVuaXQob2IpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICByZXR1cm5Gb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIC8vc2V0RXN0aWxvc1xuXG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrQmFyY29kZShhY3Rpb24pIHtcbiAgICAgIGxldCBsZWN0dXJhcyA9IGdsb2JhbFN0b3JlLmFlaW5mby5sZWN0dXJhcztcbiAgICAgIGxldCBzZWFyY2ggPSBsZWN0dXJhcy5maWx0ZXIoaXRlbSA9PiBpdGVtLkRlc2NyaXBjaW9uID09PSBiYXJjb2RlLnZhbHVlKTtcbiAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMCkgeyAvL1NpIGVzIGRlIGVzdGUgcGVkaWRvXG4gICAgICAgIGxldCBlc3RhZG9BY3R1YWwgPSBzZWFyY2hbMF0uTnJvRFM7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdsb2FkJyAmJiBlc3RhZG9BY3R1YWwgPT09IHRydWUpIHsgLy9BY2Npb24gZGUgY2FyZ2FyIGFsZ28gcXVlIHlhIGVzdMOhIGNhcmdhZG9cbiAgICAgICAgICBhbGVydE1zZy52YWx1ZSA9ICdFc3RvIHlhIGVzdGEgY2FyZ2Fkby4nO1xuICAgICAgICAgIGFsZXJ0LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICBhdWRpb0Vycm9yLnBsYXkoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2Rvd25sb2FkJyAmJiBlc3RhZG9BY3R1YWwgPT09IG51bGwpIHsgLy9BY2Npb24gZGUgZGVzY2FyZ2FyIGFsZ28gcXVlIHlhIGVzdMOhIGRlc2NhcmdhZG9cbiAgICAgICAgICBhbGVydE1zZy52YWx1ZSA9ICdFc3RvIHlhIGVzdMOhIGRlc2NhcmdhZG8nO1xuICAgICAgICAgIGFsZXJ0LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICBhdWRpb0Vycm9yLnBsYXkoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7IC8vSXQncyBvayBjb250aW51ZVxuICAgICAgfSBlbHNlIHsgLy9ObyBlbmNvbnRyYWRvXG4gICAgICAgIGFsZXJ0TXNnLnZhbHVlID0gJ05vIHBlcnRlbmVjZSBhIGVzdGUgcGVkaWRvLidcbiAgICAgICAgYWxlcnQudmFsdWUgPSB0cnVlO1xuICAgICAgICBhdWRpb0Vycm9yLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwbGF5RXJyb3IoKSB7XG4gICAgICBhdWRpb0Vycm9yLnBsYXkoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnVldmFFbnRyZWdhKCkge1xuICAgICAgZ2xvYmFsU3RvcmUuY2hhbmdlQUUoKTtcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuRm9jdXMoKTtcbiAgICB9KVxuICAgIHJldHVybiB7XG4gICAgICBnbG9iYWxTdG9yZSxcbiAgICAgIGFjdGlvbixcbiAgICAgIHJhZGlvSWNvbnMsXG4gICAgICByYWRpb1RleHQsXG4gICAgICBiYXJjb2RlLFxuICAgICAgcmV0dXJuRm9jdXMsXG4gICAgICBiYXJjb2RlaW5wdXQsXG4gICAgICBwcm9ncmVzcyxcbiAgICAgIHJlYWRCYXJjb2RlLFxuICAgICAgYWxlcnQsXG4gICAgICBhbGVydE1zZyxcbiAgICAgIHBsYXlFcnJvcixcbiAgICAgIG51ZXZhRW50cmVnYSxcbiAgICAgIHZpc2libGVFbmRcblxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiZGVmYXVsdFNpemVzIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfd2l0aERpcmVjdGl2ZXMiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsTUFBTUEsaUJBQWU7QUFBQSxFQUNuQixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFQSxlQUFnQixLQUFLLFNBQVMsSUFBSTtBQUNoQyxTQUFPO0FBQUEsSUFDTCxXQUFXLFlBQVksT0FDbkIsY0FBZSxHQUFHLEtBQUssUUFBUSxPQUFPLE1BQU0sbUJBQXFCLENBQUMsYUFDbEUsV0FBWTtBQUFBLEVBQ2pCO0FBQ0g7QUFFQSxJQUFBLGtCQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUVILE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEs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
