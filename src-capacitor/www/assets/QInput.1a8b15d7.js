import { i as inject, w as watch, o as onBeforeUnmount, a9 as formKey, g as getCurrentInstance, aa as useSizeProps, c as createComponent, ab as useSize, a as computed, h, ac as hMergeSlotSafely, r as ref, ad as debounce, ae as injectProp, af as onBeforeUpdate, O as stopAndPrevent, n as nextTick, ag as onDeactivated, ah as onActivated, f as onMounted, q as isRuntimeSsrPreHydration, Y as prevent, d as hSlot, Q as QIcon, ai as QSpinner, aj as Transition, ak as shouldIgnoreKey, U as client, Z as stop } from "./index.af93674c.js";
import { u as useDarkProps, a as useDark } from "./global.202de1e2.js";
import { b as between } from "./format.801e7424.js";
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    props.disable !== true && $form.bindComponent(proxy);
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((name) => {
  name.toLowerCase();
});
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props.angle;
      return {
        transform: props.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props.instantFeedback !== true && props.indeterminate !== true ? { transition: `stroke-dashoffset ${props.animationSpeed}ms ease 0s, stroke ${props.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props.thickness / 2));
    const viewBoxAttr = computed(() => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`);
    const normalized = computed(() => between(props.value, props.min, props.max));
    const strokeDashOffset = computed(() => circumference * (1 - (normalized.value - props.min) / (props.max - props.min)));
    const strokeWidth = computed(() => props.thickness / 2 * viewBox.value);
    function getCircle({ thickness, offset, color, cls }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props.centerColor !== void 0 && props.centerColor !== "transparent" && svgChild.push(h("circle", {
        class: `q-circular-progress__center text-${props.centerColor}`,
        fill: "currentColor",
        r: radius - strokeWidth.value / 2,
        cx: viewBox.value,
        cy: viewBox.value
      }));
      props.trackColor !== void 0 && props.trackColor !== "transparent" && svgChild.push(getCircle({
        cls: "track",
        thickness: strokeWidth.value,
        offset: 0,
        color: props.trackColor
      }));
      svgChild.push(getCircle({
        cls: "circle",
        thickness: strokeWidth.value,
        offset: strokeDashOffset.value,
        color: props.color
      }));
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props.showValue === true && child.push(h("div", {
        class: "q-circular-progress__text absolute-full row flex-center content-center",
        style: { fontSize: props.fontSize }
      }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)]));
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
const useFileEmits = ["rejected"];
const coreEmits = [
  ...useFileEmits,
  "start",
  "finish",
  "added",
  "removed"
];
const trueFn = () => true;
function getEmitsObject(emitsArray) {
  const emitsObject = {};
  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });
  return emitsObject;
}
getEmitsObject(coreEmits);
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(() => props.rules !== void 0 && props.rules !== null && props.rules.length > 0);
  const hasActiveRules = computed(() => props.disable !== true && hasRules.value === true);
  const hasError = computed(() => props.error === true || innerError.value === true);
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    if (innerLoading.value !== true && props.lazyRules !== true) {
      isDirtyModel.value = true;
    }
    const update = (err, msg) => {
      if (innerError.value !== err) {
        innerError.value = err;
      }
      const m = msg || void 0;
      if (innerErrorMessage.value !== m) {
        innerErrorMessage.value = m;
      }
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then((res) => {
      if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
        index === validateIndex && update(false);
        return true;
      }
      const msg = res.find((r) => r === false || typeof r === "string");
      index === validateIndex && update(msg !== void 0, msg);
      return msg === void 0;
    }, (e) => {
      if (index === validateIndex) {
        console.error(e);
        update(true);
      }
      return false;
    });
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length > 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(() => props.disable !== true && props.readonly !== true),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(() => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null);
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(() => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : ""));
  const contentClass = computed(() => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : ""));
  const hasLabel = computed(() => props.labelSlot === true || props.label !== void 0);
  const labelClass = computed(() => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : ""));
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    clearTimeout(focusoutTimer);
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(h("div", {
      class: "q-field__prepend q-field__marginal row no-wrap items-center",
      key: "prepend",
      onClick: prevent
    }, slots.prepend()));
    node.push(h("div", {
      class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
    }, getControlContainer()));
    hasError.value === true && props.noErrorIcon === false && node.push(getInnerAppendNode("error", [
      h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
    ]));
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(getInnerAppendNode("inner-loading-append", slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]));
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(getInnerAppendNode("inner-clearable-append", [
        h(QIcon, {
          class: "q-field__focusable-action",
          tag: "button",
          name: props.clearIcon || $q.iconSet.field.clear,
          tabindex: 0,
          type: "button",
          "aria-hidden": null,
          role: null,
          onClick: clearValue
        })
      ]));
    }
    slots.append !== void 0 && node.push(h("div", {
      class: "q-field__append q-field__marginal row no-wrap items-center",
      key: "append",
      onClick: prevent
    }, slots.append()));
    state.getInnerAppend !== void 0 && node.push(getInnerAppendNode("inner-append", state.getInnerAppend()));
    state.getControlChild !== void 0 && node.push(state.getControlChild());
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(h("div", {
      class: "q-field__prefix no-pointer-events row items-center"
    }, props.prefix));
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(state.getShadowControl());
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(h("div", {
        ref: state.targetRef,
        class: "q-field__native row",
        tabindex: -1,
        ...state.splitAttrs.attributes.value,
        "data-autofocus": props.autofocus === true || void 0
      }, slots.control(controlSlotScope.value)));
    }
    hasLabel.value === true && node.push(h("div", {
      class: labelClass.value
    }, hSlot(slots.label, props.label)));
    props.suffix !== void 0 && props.suffix !== null && node.push(h("div", {
      class: "q-field__suffix no-pointer-events row items-center"
    }, props.suffix));
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale")
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  Object.assign(proxy, { focus, blur });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    clearTimeout(focusoutTimer);
  });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp("^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?$"), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp("^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*"));
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(val);
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(start, selection === true ? end : start, "backward");
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(start, selection === true ? end : start, "backward");
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](h("input", {
      class: "hidden" + (className || ""),
      ...formAttrs.value
    }));
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change"
  ],
  setup(props, { emit, attrs }) {
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(() => props.type === "textarea" || props.autogrow === true);
    const isTypeText = computed(() => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type));
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = adjustHeight;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target || e.target.qComposing === true) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      const inp = inputRef.value;
      if (inp !== null) {
        const parentStyle = inp.parentNode.style;
        const { overflow } = inp.style;
        parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
        inp.style.height = "1px";
        inp.style.overflow = "hidden";
        inp.style.height = inp.scrollHeight + "px";
        inp.style.overflow = overflow;
        parentStyle.marginBottom = "";
      }
    }
    function onChange(e) {
      onComposition(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(() => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")),
      hasShadow: computed(() => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(() => hasValue.value === true || fieldValueIsFilled(props.displayValue)),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    return renderFn;
  }
});
export { QInput as Q, addFocusWaitFlag as a, addFocusFn as b, useFormInject as c, removeFocusWaitFlag as r, useFormProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUlucHV0LjFhOGIxNWQ3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS1jaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3BhdHRlcm5zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy91c2UtY2lyY3VsYXItcHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdXBsb2FkZXIvdXBsb2FkZXItY29yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZ2V0LWVtaXRzLW9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2NyZWF0ZS11cGxvYWRlci1jb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L3VzZS1tYXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24sIHJlcXVpcmVzUUZvcm0gfSkge1xuICBjb25zdCAkZm9ybSA9IGluamVjdChmb3JtS2V5LCBmYWxzZSlcblxuICBpZiAoJGZvcm0gIT09IGZhbHNlKSB7XG4gICAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvcnQgcHVibGljIG1ldGhvZCAoc28gaXQgY2FuIGJlIHVzZWQgaW4gUUZvcm0pXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kaXNhYmxlLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB0eXBlb2YgcmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyByZWdpc3RlciBjb21wb25lbnQgdG8gcGFyZW50IFFGb3JtXG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIC8vIHVucmVnaXN0ZXIgY29tcG9uZW50XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKHJlcXVpcmVzUUZvcm0gPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQYXJlbnQgUUZvcm0gbm90IGZvdW5kIG9uIHVzZUZvcm1DaGlsZCgpIScpXG4gIH1cbn1cbiIsIi8vIGZpbGUgcmVmZXJlbmNlZCBmcm9tIGRvY3NcblxuY29uc3RcbiAgaGV4ID0gL14jWzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLFxuICBoZXhhID0gL14jWzAtOWEtZkEtRl17NH0oWzAtOWEtZkEtRl17NH0pPyQvLFxuICBoZXhPckhleGEgPSAvXiMoWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17NH18WzAtOWEtZkEtRl17Nn18WzAtOWEtZkEtRl17OH0pJC8sXG4gIHJnYiA9IC9ecmdiXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSlcXCkkLyxcbiAgcmdiYSA9IC9ecmdiYVxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCgwfDBcXC5bMC05XStbMS05XXwwXFwuWzEtOV0rfDEpXFwpJC9cblxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdWkvdHlwZXMvYXBpL3ZhbGlkYXRpb24uZC50c1xuZXhwb3J0IGNvbnN0IHRlc3RQYXR0ZXJuID0ge1xuICBkYXRlOiB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZFxcL1swLTNdXFxkJC8udGVzdCh2KSxcbiAgdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCQvLnRlc3QodiksXG4gIGZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgdGltZU9yRnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQoOlswLTVdXFxkKT8kLy50ZXN0KHYpLFxuXG4gIC8vIC0tIFJGQyA1MzIyIC0tXG4gIC8vIC0tIEFkZGVkIGluIHYyLjYuNiAtLVxuICAvLyBUaGlzIGlzIGEgYmFzaWMgaGVscGVyIHZhbGlkYXRpb24uXG4gIC8vIEZvciBzb21ldGhpbmcgbW9yZSBjb21wbGV4IChsaWtlIFJGQyA4MjIpIHlvdSBzaG91bGQgd3JpdGUgYW5kIHVzZSB5b3VyIG93biBydWxlLlxuICAvLyBXZSB3b24ndCBiZSBhY2NlcHRpbmcgUFJzIHRvIGVuaGFuY2UgdGhlIG9uZSBiZWxvdyBiZWNhdXNlIG9mIHRoZSByZWFzb24gYWJvdmUuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBlbWFpbDogdiA9PiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHYpLFxuXG4gIGhleENvbG9yOiB2ID0+IGhleC50ZXN0KHYpLFxuICBoZXhhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpLFxuICBoZXhPckhleGFDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSxcblxuICByZ2JDb2xvcjogdiA9PiByZ2IudGVzdCh2KSxcbiAgcmdiYUNvbG9yOiB2ID0+IHJnYmEudGVzdCh2KSxcbiAgcmdiT3JSZ2JhQ29sb3I6IHYgPT4gcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuXG4gIGhleE9yUmdiQ29sb3I6IHYgPT4gaGV4LnRlc3QodikgfHwgcmdiLnRlc3QodiksXG4gIGhleGFPclJnYmFDb2xvcjogdiA9PiBoZXhhLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuICBhbnlDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSB8fCByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3Qodilcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZXN0UGF0dGVyblxufVxuIiwiY29uc3RcbiAgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuICBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICBjbGFzczJ0eXBlID0ge31cblxuJ0Jvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QnLnNwbGl0KCcgJykuZm9yRWFjaChuYW1lID0+IHtcbiAgY2xhc3MydHlwZVsgJ1tvYmplY3QgJyArIG5hbWUgKyAnXScgXSA9IG5hbWUudG9Mb3dlckNhc2UoKVxufSlcblxuZnVuY3Rpb24gdHlwZSAob2JqKSB7XG4gIHJldHVybiBvYmogPT09IG51bGwgPyBTdHJpbmcob2JqKSA6IGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwob2JqKSBdIHx8ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlKG9iaikgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAob2JqLmNvbnN0cnVjdG9yXG4gICAgJiYgIWhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJylcbiAgICAmJiAhaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgbGV0IGtleVxuICBmb3IgKGtleSBpbiBvYmopIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICByZXR1cm4ga2V5ID09PSB2b2lkIDAgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG4gIGxldFxuICAgIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuICAgIHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuICAgIGkgPSAxLFxuICAgIGRlZXAgPSBmYWxzZVxuICBjb25zdCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuICAgIGRlZXAgPSB0YXJnZXRcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbIDEgXSB8fCB7fVxuICAgIGkgPSAyXG4gIH1cblxuICBpZiAoT2JqZWN0KHRhcmdldCkgIT09IHRhcmdldCAmJiB0eXBlKHRhcmdldCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0YXJnZXQgPSB7fVxuICB9XG5cbiAgaWYgKGxlbmd0aCA9PT0gaSkge1xuICAgIHRhcmdldCA9IHRoaXNcbiAgICBpLS1cbiAgfVxuXG4gIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT09IG51bGwpIHtcbiAgICAgIGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdXG4gICAgICAgIGNvcHkgPSBvcHRpb25zWyBuYW1lIF1cblxuICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gdHlwZShjb3B5KSA9PT0gJ2FycmF5JykpKSB7XG4gICAgICAgICAgaWYgKGNvcHlJc0FycmF5KSB7XG4gICAgICAgICAgICBjb3B5SXNBcnJheSA9IGZhbHNlXG4gICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiB0eXBlKHNyYykgPT09ICdhcnJheScgPyBzcmMgOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29weSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBjb3B5XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG4iLCJpbXBvcnQgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG4vLyBhbHNvIHVzZWQgYnkgUUtub2JcbmV4cG9ydCBjb25zdCB1c2VDaXJjdWxhckNvbW1vblByb3BzID0ge1xuICAuLi51c2VTaXplUHJvcHMsXG5cbiAgbWluOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgbWF4OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDEwMFxuICB9LFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGNlbnRlckNvbG9yOiBTdHJpbmcsXG4gIHRyYWNrQ29sb3I6IFN0cmluZyxcblxuICBmb250U2l6ZTogU3RyaW5nLFxuXG4gIC8vIHJhdGlvXG4gIHRoaWNrbmVzczoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwLjIsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPj0gMCAmJiB2IDw9IDFcbiAgfSxcblxuICBhbmdsZToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgc2hvd1ZhbHVlOiBCb29sZWFuLFxuICByZXZlcnNlOiBCb29sZWFuLFxuXG4gIGluc3RhbnRGZWVkYmFjazogQm9vbGVhblxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNpemUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB7IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgfSBmcm9tICcuL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuXG5jb25zdFxuICByYWRpdXMgPSA1MCxcbiAgZGlhbWV0ZXIgPSAyICogcmFkaXVzLFxuICBjaXJjdW1mZXJlbmNlID0gZGlhbWV0ZXIgKiBNYXRoLlBJLFxuICBzdHJva2VEYXNoQXJyYXkgPSBNYXRoLnJvdW5kKGNpcmN1bWZlcmVuY2UgKiAxMDAwKSAvIDEwMDBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaXJjdWxhclByb2dyZXNzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUNpcmN1bGFyQ29tbW9uUHJvcHMsXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhbmltYXRpb25TcGVlZDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNjAwXG4gICAgfSxcblxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuXG4gICAgY29uc3Qgc3ZnU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiBwcm9wcy5hbmdsZVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHByb3BzLnJldmVyc2UgIT09ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgICAgICAgICA/IGBzY2FsZTNkKC0xLCAxLCAxKSByb3RhdGUzZCgwLCAwLCAxLCAkeyAtOTAgLSBhbmdsZSB9ZGVnKWBcbiAgICAgICAgICA6IGByb3RhdGUzZCgwLCAwLCAxLCAkeyBhbmdsZSAtIDkwIH1kZWcpYFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjaXJjbGVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmluc3RhbnRGZWVkYmFjayAhPT0gdHJ1ZSAmJiBwcm9wcy5pbmRldGVybWluYXRlICE9PSB0cnVlXG4gICAgICAgID8geyB0cmFuc2l0aW9uOiBgc3Ryb2tlLWRhc2hvZmZzZXQgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zIGVhc2UgMHMsIHN0cm9rZSAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZWAgfVxuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IHZpZXdCb3ggPSBjb21wdXRlZCgoKSA9PiBkaWFtZXRlciAvICgxIC0gcHJvcHMudGhpY2tuZXNzIC8gMikpXG5cbiAgICBjb25zdCB2aWV3Qm94QXR0ciA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgJHsgdmlld0JveC52YWx1ZSAvIDIgfSAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgfSAkeyB2aWV3Qm94LnZhbHVlIH1gXG4gICAgKVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGNvbXB1dGVkKCgpID0+IGJldHdlZW4ocHJvcHMudmFsdWUsIHByb3BzLm1pbiwgcHJvcHMubWF4KSlcblxuICAgIGNvbnN0IHN0cm9rZURhc2hPZmZzZXQgPSBjb21wdXRlZCgoKSA9PiBjaXJjdW1mZXJlbmNlICogKFxuICAgICAgMSAtIChub3JtYWxpemVkLnZhbHVlIC0gcHJvcHMubWluKSAvIChwcm9wcy5tYXggLSBwcm9wcy5taW4pXG4gICAgKSlcblxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGhpY2tuZXNzIC8gMiAqIHZpZXdCb3gudmFsdWUpXG5cbiAgICBmdW5jdGlvbiBnZXRDaXJjbGUgKHsgdGhpY2tuZXNzLCBvZmZzZXQsIGNvbG9yLCBjbHMgfSkge1xuICAgICAgcmV0dXJuIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX18nICsgY2xzICsgKGNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJyksXG4gICAgICAgIHN0eWxlOiBjaXJjbGVTdHlsZS52YWx1ZSxcbiAgICAgICAgZmlsbDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHRoaWNrbmVzcyxcbiAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiBzdHJva2VEYXNoQXJyYXksXG4gICAgICAgICdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldCxcbiAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIGN5OiB2aWV3Qm94LnZhbHVlLFxuICAgICAgICByOiByYWRpdXNcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHN2Z0NoaWxkID0gW11cblxuICAgICAgcHJvcHMuY2VudGVyQ29sb3IgIT09IHZvaWQgMCAmJiBwcm9wcy5jZW50ZXJDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAgICAgY2xhc3M6IGBxLWNpcmN1bGFyLXByb2dyZXNzX19jZW50ZXIgdGV4dC0keyBwcm9wcy5jZW50ZXJDb2xvciB9YCxcbiAgICAgICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgICByOiByYWRpdXMgLSBzdHJva2VXaWR0aC52YWx1ZSAvIDIsXG4gICAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgICAgY3k6IHZpZXdCb3gudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLnRyYWNrQ29sb3IgIT09ICd0cmFuc3BhcmVudCcgJiYgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICd0cmFjaycsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgY29sb3I6IHByb3BzLnRyYWNrQ29sb3JcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICdjaXJjbGUnLFxuICAgICAgICAgIHRoaWNrbmVzczogc3Ryb2tlV2lkdGgudmFsdWUsXG4gICAgICAgICAgb2Zmc2V0OiBzdHJva2VEYXNoT2Zmc2V0LnZhbHVlLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvclxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fc3ZnJyxcbiAgICAgICAgICBzdHlsZTogc3ZnU3R5bGUudmFsdWUsXG4gICAgICAgICAgdmlld0JveDogdmlld0JveEF0dHIudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0sIHN2Z0NoaWxkKVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5zaG93VmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fdGV4dCBhYnNvbHV0ZS1mdWxsIHJvdyBmbGV4LWNlbnRlciBjb250ZW50LWNlbnRlcicsXG4gICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IHByb3BzLmZvbnRTaXplIH1cbiAgICAgICAgfSwgc2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwID8gc2xvdHMuZGVmYXVsdCgpIDogWyBoKCdkaXYnLCBub3JtYWxpemVkLnZhbHVlKSBdKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3MgcS1jaXJjdWxhci1wcm9ncmVzcy0tJHsgcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IHByb3BzLm1pbixcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiBwcm9wcy5tYXgsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/IHZvaWQgMCA6IG5vcm1hbGl6ZWQudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuaW50ZXJuYWwsIGNoaWxkKSkgLy8gXCJpbnRlcm5hbFwiIGlzIHVzZWQgYnkgUUtub2JcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHN0b3AsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmZ1bmN0aW9uIGZpbHRlckZpbGVzIChmaWxlcywgcmVqZWN0ZWRGaWxlcywgZmFpbGVkUHJvcFZhbGlkYXRpb24sIGZpbHRlckZuKSB7XG4gIGNvbnN0IGFjY2VwdGVkRmlsZXMgPSBbXVxuXG4gIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgaWYgKGZpbHRlckZuKGZpbGUpID09PSB0cnVlKSB7XG4gICAgICBhY2NlcHRlZEZpbGVzLnB1c2goZmlsZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZWplY3RlZEZpbGVzLnB1c2goeyBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsZSB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gYWNjZXB0ZWRGaWxlc1xufVxuXG5mdW5jdGlvbiBzdG9wQW5kUHJldmVudERyYWcgKGUpIHtcbiAgZSAmJiBlLmRhdGFUcmFuc2ZlciAmJiAoZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JylcbiAgc3RvcEFuZFByZXZlbnQoZSlcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVQcm9wcyA9IHtcbiAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gIGFjY2VwdDogU3RyaW5nLFxuICBjYXB0dXJlOiBTdHJpbmcsXG4gIG1heEZpbGVTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heFRvdGFsU2l6ZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBtYXhGaWxlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBmaWx0ZXI6IEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGaWxlRW1pdHMgPSBbICdyZWplY3RlZCcgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBlZGl0YWJsZSxcbiAgZG5kLFxuICBnZXRGaWxlSW5wdXQsXG4gIGFkZEZpbGVzVG9RdWV1ZVxufSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBkbmRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCBleHRlbnNpb25zID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmFjY2VwdCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmFjY2VwdC5zcGxpdCgnLCcpLm1hcChleHQgPT4ge1xuICAgICAgICBleHQgPSBleHQudHJpbSgpXG4gICAgICAgIGlmIChleHQgPT09ICcqJykgeyAvLyBzdXBwb3J0IFwiKlwiXG4gICAgICAgICAgcmV0dXJuICcqLydcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChleHQuZW5kc1dpdGgoJy8qJykpIHsgLy8gc3VwcG9ydCBcImltYWdlLypcIiBvciBcIiovKlwiXG4gICAgICAgICAgZXh0ID0gZXh0LnNsaWNlKDAsIGV4dC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHQudG9VcHBlckNhc2UoKVxuICAgICAgfSlcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IG1heEZpbGVzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4RmlsZXMsIDEwKSlcbiAgY29uc3QgbWF4VG90YWxTaXplTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4VG90YWxTaXplLCAxMCkpXG5cbiAgZnVuY3Rpb24gcGlja0ZpbGVzIChlKSB7XG4gICAgaWYgKGVkaXRhYmxlLnZhbHVlKSB7XG4gICAgICBpZiAoZSAhPT0gT2JqZWN0KGUpKSB7XG4gICAgICAgIGUgPSB7IHRhcmdldDogbnVsbCB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldCAhPT0gbnVsbCAmJiBlLnRhcmdldC5tYXRjaGVzKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHN0b3AgcHJvcGFnYXRpb24gaWYgaXQncyBub3QgYSByZWFsIHBvaW50ZXIgZXZlbnRcbiAgICAgICAgZS5jbGllbnRYID09PSAwICYmIGUuY2xpZW50WSA9PT0gMCAmJiBzdG9wKGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBnZXRGaWxlSW5wdXQoKVxuICAgICAgICBpbnB1dCAmJiBpbnB1dCAhPT0gZS50YXJnZXQgJiYgaW5wdXQuY2xpY2soZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRGaWxlcyAoZmlsZXMpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUgJiYgZmlsZXMpIHtcbiAgICAgIGFkZEZpbGVzVG9RdWV1ZShudWxsLCBmaWxlcylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzRmlsZXMgKGUsIGZpbGVzVG9Qcm9jZXNzLCBjdXJyZW50RmlsZUxpc3QsIGFwcGVuZCkge1xuICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZmlsZXNUb1Byb2Nlc3MgfHwgZS50YXJnZXQuZmlsZXMpXG4gICAgY29uc3QgcmVqZWN0ZWRGaWxlcyA9IFtdXG5cbiAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgaWYgKHJlamVjdGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbWl0KCdyZWplY3RlZCcsIHJlamVjdGVkRmlsZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGZpbGUgdHlwZXNcbiAgICBpZiAocHJvcHMuYWNjZXB0ICE9PSB2b2lkIDAgJiYgZXh0ZW5zaW9ucy52YWx1ZS5pbmRleE9mKCcqLycpID09PSAtMSkge1xuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ2FjY2VwdCcsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucy52YWx1ZS5zb21lKGV4dCA9PiAoXG4gICAgICAgICAgZmlsZS50eXBlLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChleHQpXG4gICAgICAgICAgfHwgZmlsZS5uYW1lLnRvVXBwZXJDYXNlKCkuZW5kc1dpdGgoZXh0KVxuICAgICAgICApKVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgbWF4IGZpbGUgc2l6ZVxuICAgIGlmIChwcm9wcy5tYXhGaWxlU2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zdCBtYXhGaWxlU2l6ZSA9IHBhcnNlSW50KHByb3BzLm1heEZpbGVTaXplLCAxMClcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZS1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnNpemUgPD0gbWF4RmlsZVNpemVcbiAgICAgIH0pXG5cbiAgICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG4gICAgfVxuXG4gICAgLy8gQ29yZG92YS9pT1MgYWxsb3dzIHNlbGVjdGluZyBtdWx0aXBsZSBmaWxlcyBldmVuIHdoZW4gdGhlXG4gICAgLy8gbXVsdGlwbGUgYXR0cmlidXRlIGlzIG5vdCBzcGVjaWZpZWQuIFdlIGFsc28gbm9ybWFsaXplIGRyYWcnbidkcm9wcGVkXG4gICAgLy8gZmlsZXMgaGVyZTpcbiAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZmlsZXMgPSBbIGZpbGVzWyAwIF0gXVxuICAgIH1cblxuICAgIC8vIENvbXB1dGUga2V5IHRvIHVzZSBmb3IgZWFjaCBmaWxlXG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGZpbGUuX19rZXkgPSBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aCArIGZpbGUubGFzdE1vZGlmaWVkICsgZmlsZS5uYW1lICsgZmlsZS5zaXplXG4gICAgfSlcblxuICAgIC8vIEF2b2lkIGR1cGxpY2F0ZSBmaWxlc1xuICAgIGNvbnN0IGZpbGVuYW1lTWFwID0gY3VycmVudEZpbGVMaXN0Lm1hcChlbnRyeSA9PiBlbnRyeS5fX2tleSlcbiAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZHVwbGljYXRlJywgZmlsZSA9PiB7XG4gICAgICByZXR1cm4gZmlsZW5hbWVNYXAuaW5jbHVkZXMoZmlsZS5fX2tleSkgPT09IGZhbHNlXG4gICAgfSlcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG5cbiAgICBpZiAocHJvcHMubWF4VG90YWxTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBzaXplID0gYXBwZW5kID09PSB0cnVlXG4gICAgICAgID8gY3VycmVudEZpbGVMaXN0LnJlZHVjZSgodG90YWwsIGZpbGUpID0+IHRvdGFsICsgZmlsZS5zaXplLCAwKVxuICAgICAgICA6IDBcblxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC10b3RhbC1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHNpemUgKz0gZmlsZS5zaXplXG4gICAgICAgIHJldHVybiBzaXplIDw9IG1heFRvdGFsU2l6ZU51bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGN1c3RvbSBmaWx0ZXIgZnVuY3Rpb24/XG4gICAgaWYgKHR5cGVvZiBwcm9wcy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkRmlsZXMgPSBwcm9wcy5maWx0ZXIoZmlsZXMpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZmlsdGVyJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEZpbGVzLmluY2x1ZGVzKGZpbGUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tYXhGaWxlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBsZXQgZmlsZXNOdW1iZXIgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QubGVuZ3RoXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LWZpbGVzJywgKCkgPT4ge1xuICAgICAgICBmaWxlc051bWJlcisrXG4gICAgICAgIHJldHVybiBmaWxlc051bWJlciA8PSBtYXhGaWxlc051bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmlsZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdvdmVyIChlKSB7XG4gICAgc3RvcEFuZFByZXZlbnREcmFnKGUpXG4gICAgZG5kLnZhbHVlICE9PSB0cnVlICYmIChkbmQudmFsdWUgPSB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25EcmFnbGVhdmUgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudChlKVxuICAgIGUucmVsYXRlZFRhcmdldCAhPT0gZG5kUmVmLnZhbHVlICYmIChkbmQudmFsdWUgPSBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcCAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50RHJhZyhlKVxuICAgIGNvbnN0IGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBhZGRGaWxlc1RvUXVldWUobnVsbCwgZmlsZXMpXG4gICAgfVxuXG4gICAgZG5kLnZhbHVlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERuZE5vZGUgKHR5cGUpIHtcbiAgICBpZiAoZG5kLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IGRuZFJlZixcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fZG5kIGFic29sdXRlLWZ1bGxgLFxuICAgICAgICBvbkRyYWdlbnRlcjogc3RvcEFuZFByZXZlbnREcmFnLFxuICAgICAgICBvbkRyYWdvdmVyOiBzdG9wQW5kUHJldmVudERyYWcsXG4gICAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgICBvbkRyb3BcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcGlja0ZpbGVzLCBhZGRGaWxlcyB9KVxuXG4gIHJldHVybiB7XG4gICAgcGlja0ZpbGVzLFxuICAgIGFkZEZpbGVzLFxuICAgIG9uRHJhZ292ZXIsXG4gICAgcHJvY2Vzc0ZpbGVzLFxuICAgIGdldERuZE5vZGUsXG4gICAgbWF4RmlsZXNOdW1iZXIsXG4gICAgbWF4VG90YWxTaXplTnVtYmVyXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgaXNSZWYsIGNvbXB1dGVkLCB3YXRjaCwgcHJvdmlkZSwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lci9RU3Bpbm5lci5qcydcbmltcG9ydCBRQ2lyY3VsYXJQcm9ncmVzcyBmcm9tICcuLi9jaXJjdWxhci1wcm9ncmVzcy9RQ2lyY3VsYXJQcm9ncmVzcy5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VGaWxlLCB7IHVzZUZpbGVQcm9wcywgdXNlRmlsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS5qcydcblxuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaHVtYW5TdG9yYWdlU2l6ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IHVwbG9hZGVyS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5mdW5jdGlvbiBnZXRQcm9ncmVzc0xhYmVsIChwKSB7XG4gIHJldHVybiAocCAqIDEwMCkudG9GaXhlZCgyKSArICclJ1xufVxuXG5leHBvcnQgY29uc3QgY29yZVByb3BzID0ge1xuICAuLi51c2VEYXJrUHJvcHMsXG4gIC4uLnVzZUZpbGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuXG4gIHNxdWFyZTogQm9vbGVhbixcbiAgZmxhdDogQm9vbGVhbixcbiAgYm9yZGVyZWQ6IEJvb2xlYW4sXG5cbiAgbm9UaHVtYm5haWxzOiBCb29sZWFuLFxuICBhdXRvVXBsb2FkOiBCb29sZWFuLFxuICBoaWRlVXBsb2FkQnRuOiBCb29sZWFuLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCBjb3JlRW1pdHMgPSBbXG4gIC4uLnVzZUZpbGVFbWl0cyxcbiAgJ3N0YXJ0JywgJ2ZpbmlzaCcsICdhZGRlZCcsICdyZW1vdmVkJ1xuXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVuZGVyZXIgKGdldFBsdWdpbikge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIHNsb3RzLCBlbWl0LCBwcm94eSB9ID0gdm1cbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICBmdW5jdGlvbiB1cGRhdGVGaWxlU3RhdHVzIChmaWxlLCBzdGF0dXMsIHVwbG9hZGVkU2l6ZSkge1xuICAgIGZpbGUuX19zdGF0dXMgPSBzdGF0dXNcblxuICAgIGlmIChzdGF0dXMgPT09ICdpZGxlJykge1xuICAgICAgZmlsZS5fX3VwbG9hZGVkID0gMFxuICAgICAgZmlsZS5fX3Byb2dyZXNzID0gMFxuICAgICAgZmlsZS5fX3NpemVMYWJlbCA9IGh1bWFuU3RvcmFnZVNpemUoZmlsZS5zaXplKVxuICAgICAgZmlsZS5fX3Byb2dyZXNzTGFiZWwgPSAnMC4wMCUnXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgIHByb3h5LiRmb3JjZVVwZGF0ZSgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmaWxlLl9fdXBsb2FkZWQgPSBzdGF0dXMgPT09ICd1cGxvYWRlZCdcbiAgICAgID8gZmlsZS5zaXplXG4gICAgICA6IHVwbG9hZGVkU2l6ZVxuXG4gICAgZmlsZS5fX3Byb2dyZXNzID0gc3RhdHVzID09PSAndXBsb2FkZWQnXG4gICAgICA/IDFcbiAgICAgIDogTWF0aC5taW4oMC45OTk5LCBmaWxlLl9fdXBsb2FkZWQgLyBmaWxlLnNpemUpXG5cbiAgICBmaWxlLl9fcHJvZ3Jlc3NMYWJlbCA9IGdldFByb2dyZXNzTGFiZWwoZmlsZS5fX3Byb2dyZXNzKVxuICAgIHByb3h5LiRmb3JjZVVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBmaWxlczogcmVmKFtdKSxcbiAgICBxdWV1ZWRGaWxlczogcmVmKFtdKSxcbiAgICB1cGxvYWRlZEZpbGVzOiByZWYoW10pLFxuICAgIHVwbG9hZGVkU2l6ZTogcmVmKDApLFxuXG4gICAgdXBkYXRlRmlsZVN0YXR1cyxcbiAgICBpc0FsaXZlICgpIHtcbiAgICAgIHJldHVybiB2bS5pc0RlYWN0aXZhdGVkICE9PSB0cnVlICYmIHZtLmlzVW5tb3VudGVkICE9PSB0cnVlXG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgZ2V0UGx1Z2luKHsgcHJvcHMsIHNsb3RzLCBlbWl0LCBoZWxwZXJzOiBzdGF0ZSB9KSlcblxuICBjb25zdCB1cGxvYWRTaXplID0gcmVmKDApXG4gIGNvbnN0IGVkaXRhYmxlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZSlcblxuICBpZiAoc3RhdGUuaXNCdXN5ID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5pc0J1c3kgPSByZWYoZmFsc2UpXG4gIH1cblxuICBjb25zdCBkbmQgPSByZWYoZmFsc2UpXG5cbiAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuXG4gIHByb3ZpZGUodXBsb2FkZXJLZXksIHJlbmRlcklucHV0KVxuXG4gIGNvbnN0IHtcbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXMsXG4gICAgb25EcmFnb3ZlcixcbiAgICBvbkRyYWdsZWF2ZSxcbiAgICBwcm9jZXNzRmlsZXMsXG4gICAgZ2V0RG5kTm9kZSxcbiAgICBtYXhGaWxlc051bWJlcixcbiAgICBtYXhUb3RhbFNpemVOdW1iZXJcbiAgfSA9IHVzZUZpbGUoeyBlZGl0YWJsZSwgZG5kLCBnZXRGaWxlSW5wdXQsIGFkZEZpbGVzVG9RdWV1ZSB9KVxuXG4gIGNvbnN0IGNhbkFkZEZpbGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICYmIHN0YXRlLmlzVXBsb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgLy8gaWYgc2luZ2xlIHNlbGVjdGlvbiBhbmQgbm8gZmlsZXMgYXJlIHF1ZXVlZDpcbiAgICAmJiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgfHwgc3RhdGUucXVldWVkRmlsZXMudmFsdWUubGVuZ3RoID09PSAwKVxuICAgIC8vIGlmIG1heC1maWxlcyBpcyBzZXQgYW5kIGN1cnJlbnQgbnVtYmVyIG9mIGZpbGVzIGRvZXMgbm90IGV4Y2VlZHMgaXQ6XG4gICAgJiYgKHByb3BzLm1heEZpbGVzID09PSB2b2lkIDAgfHwgc3RhdGUuZmlsZXMudmFsdWUubGVuZ3RoIDwgbWF4RmlsZXNOdW1iZXIudmFsdWUpXG4gICAgLy8gaWYgbWF4LXRvdGFsLXNpemUgaXMgc2V0IGFuZCBjdXJyZW50IHVwbG9hZCBzaXplIGRvZXMgbm90IGV4Y2VlZHMgaXQ6XG4gICAgJiYgKHByb3BzLm1heFRvdGFsU2l6ZSA9PT0gdm9pZCAwIHx8IHVwbG9hZFNpemUudmFsdWUgPCBtYXhUb3RhbFNpemVOdW1iZXIudmFsdWUpXG4gIClcblxuICBjb25zdCBjYW5VcGxvYWQgPSBjb21wdXRlZCgoKSA9PlxuICAgIGVkaXRhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgJiYgc3RhdGUuaXNCdXN5LnZhbHVlICE9PSB0cnVlXG4gICAgJiYgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAmJiBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5sZW5ndGggPiAwXG4gIClcblxuICBjb25zdCB1cGxvYWRQcm9ncmVzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB1cGxvYWRTaXplLnZhbHVlID09PSAwXG4gICAgICA/IDBcbiAgICAgIDogc3RhdGUudXBsb2FkZWRTaXplLnZhbHVlIC8gdXBsb2FkU2l6ZS52YWx1ZVxuICApKVxuXG4gIGNvbnN0IHVwbG9hZFByb2dyZXNzTGFiZWwgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9ncmVzc0xhYmVsKHVwbG9hZFByb2dyZXNzLnZhbHVlKSlcbiAgY29uc3QgdXBsb2FkU2l6ZUxhYmVsID0gY29tcHV0ZWQoKCkgPT4gaHVtYW5TdG9yYWdlU2l6ZSh1cGxvYWRTaXplLnZhbHVlKSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS11cGxvYWRlciBjb2x1bW4gbm8td3JhcCdcbiAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLXVwbG9hZGVyLS1ib3JkZXJlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLXNxdWFyZSBuby1ib3JkZXItcmFkaXVzJyA6ICcnKVxuICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWZsYXQgbm8tc2hhZG93JyA6ICcnKVxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkIHEtdXBsb2FkZXItLWRpc2FibGUnIDogJycpXG4gICAgKyAoZG5kLnZhbHVlID09PSB0cnVlID8gJyBxLXVwbG9hZGVyLS1kbmQnIDogJycpXG4gIClcblxuICBjb25zdCBjb2xvckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS11cGxvYWRlcl9faGVhZGVyJ1xuICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKyAocHJvcHMudGV4dENvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMudGV4dENvbG9yIH1gIDogJycpXG4gIClcblxuICB3YXRjaChzdGF0ZS5pc1VwbG9hZGluZywgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgaWYgKG9sZFZhbCA9PT0gZmFsc2UgJiYgbmV3VmFsID09PSB0cnVlKSB7XG4gICAgICBlbWl0KCdzdGFydCcpXG4gICAgfVxuICAgIGVsc2UgaWYgKG9sZFZhbCA9PT0gdHJ1ZSAmJiBuZXdWYWwgPT09IGZhbHNlKSB7XG4gICAgICBlbWl0KCdmaW5pc2gnKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5hYm9ydCgpXG4gICAgICBzdGF0ZS51cGxvYWRlZFNpemUudmFsdWUgPSAwXG4gICAgICB1cGxvYWRTaXplLnZhbHVlID0gMFxuICAgICAgcmV2b2tlSW1nVVJMcygpXG4gICAgICBzdGF0ZS5maWxlcy52YWx1ZSA9IFtdXG4gICAgICBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZSA9IFtdXG4gICAgICBzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlID0gW11cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVVcGxvYWRlZEZpbGVzICgpIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIGJhdGNoUmVtb3ZlRmlsZXMoWyAndXBsb2FkZWQnIF0sICgpID0+IHtcbiAgICAgICAgc3RhdGUudXBsb2FkZWRGaWxlcy52YWx1ZSA9IFtdXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVF1ZXVlZEZpbGVzICgpIHtcbiAgICBiYXRjaFJlbW92ZUZpbGVzKFsgJ2lkbGUnLCAnZmFpbGVkJyBdLCAoeyBzaXplIH0pID0+IHtcbiAgICAgIHVwbG9hZFNpemUudmFsdWUgLT0gc2l6ZVxuICAgICAgc3RhdGUucXVldWVkRmlsZXMudmFsdWUgPSBbXVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBiYXRjaFJlbW92ZUZpbGVzIChzdGF0dXNMaXN0LCBjYikge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVkID0ge1xuICAgICAgZmlsZXM6IFtdLFxuICAgICAgc2l6ZTogMFxuICAgIH1cblxuICAgIGNvbnN0IGxvY2FsRmlsZXMgPSBzdGF0ZS5maWxlcy52YWx1ZS5maWx0ZXIoZiA9PiB7XG4gICAgICBpZiAoc3RhdHVzTGlzdC5pbmRleE9mKGYuX19zdGF0dXMpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICByZW1vdmVkLnNpemUgKz0gZi5zaXplXG4gICAgICByZW1vdmVkLmZpbGVzLnB1c2goZilcblxuICAgICAgZi5fX2ltZyAhPT0gdm9pZCAwICYmIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGYuX19pbWcuc3JjKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KVxuXG4gICAgaWYgKHJlbW92ZWQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgc3RhdGUuZmlsZXMudmFsdWUgPSBsb2NhbEZpbGVzXG4gICAgICBjYihyZW1vdmVkKVxuICAgICAgZW1pdCgncmVtb3ZlZCcsIHJlbW92ZWQuZmlsZXMpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRmlsZSAoZmlsZSkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlKSB7IHJldHVybiB9XG5cbiAgICBpZiAoZmlsZS5fX3N0YXR1cyA9PT0gJ3VwbG9hZGVkJykge1xuICAgICAgc3RhdGUudXBsb2FkZWRGaWxlcy52YWx1ZSA9IHN0YXRlLnVwbG9hZGVkRmlsZXMudmFsdWUuZmlsdGVyKGYgPT4gZi5fX2tleSAhPT0gZmlsZS5fX2tleSlcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlsZS5fX3N0YXR1cyA9PT0gJ3VwbG9hZGluZycpIHtcbiAgICAgIGZpbGUuX19hYm9ydCgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdXBsb2FkU2l6ZS52YWx1ZSAtPSBmaWxlLnNpemVcbiAgICB9XG5cbiAgICBzdGF0ZS5maWxlcy52YWx1ZSA9IHN0YXRlLmZpbGVzLnZhbHVlLmZpbHRlcihmID0+IHtcbiAgICAgIGlmIChmLl9fa2V5ICE9PSBmaWxlLl9fa2V5KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGYuX19pbWcgIT09IHZvaWQgMCAmJiB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChmLl9faW1nLnNyYylcblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlID0gc3RhdGUucXVldWVkRmlsZXMudmFsdWUuZmlsdGVyKGYgPT4gZi5fX2tleSAhPT0gZmlsZS5fX2tleSlcbiAgICBlbWl0KCdyZW1vdmVkJywgWyBmaWxlIF0pXG4gIH1cblxuICBmdW5jdGlvbiByZXZva2VJbWdVUkxzICgpIHtcbiAgICBzdGF0ZS5maWxlcy52YWx1ZS5mb3JFYWNoKGYgPT4ge1xuICAgICAgZi5fX2ltZyAhPT0gdm9pZCAwICYmIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGYuX19pbWcuc3JjKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRGaWxlSW5wdXQgKCkge1xuICAgIHJldHVybiBpbnB1dFJlZi52YWx1ZVxuICAgICAgfHwgcm9vdFJlZi52YWx1ZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdxLXVwbG9hZGVyX19pbnB1dCcpWyAwIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZpbGVzVG9RdWV1ZSAoZSwgZmlsZUxpc3QpIHtcbiAgICBjb25zdCBsb2NhbEZpbGVzID0gcHJvY2Vzc0ZpbGVzKGUsIGZpbGVMaXN0LCBzdGF0ZS5maWxlcy52YWx1ZSwgdHJ1ZSlcblxuICAgIGlmIChsb2NhbEZpbGVzID09PSB2b2lkIDApIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGZpbGVJbnB1dCA9IGdldEZpbGVJbnB1dCgpXG4gICAgaWYgKGZpbGVJbnB1dCAhPT0gdm9pZCAwICYmIGZpbGVJbnB1dCAhPT0gbnVsbCkge1xuICAgICAgZmlsZUlucHV0LnZhbHVlID0gJydcbiAgICB9XG5cbiAgICBsb2NhbEZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBzdGF0ZS51cGRhdGVGaWxlU3RhdHVzKGZpbGUsICdpZGxlJylcbiAgICAgIHVwbG9hZFNpemUudmFsdWUgKz0gZmlsZS5zaXplXG5cbiAgICAgIGlmIChwcm9wcy5ub1RodW1ibmFpbHMgIT09IHRydWUgJiYgZmlsZS50eXBlLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aCgnSU1BR0UnKSkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBpbWcuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSlcbiAgICAgICAgZmlsZS5fX2ltZyA9IGltZ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBzdGF0ZS5maWxlcy52YWx1ZSA9IHN0YXRlLmZpbGVzLnZhbHVlLmNvbmNhdChsb2NhbEZpbGVzKVxuICAgIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlID0gc3RhdGUucXVldWVkRmlsZXMudmFsdWUuY29uY2F0KGxvY2FsRmlsZXMpXG4gICAgZW1pdCgnYWRkZWQnLCBsb2NhbEZpbGVzKVxuICAgIHByb3BzLmF1dG9VcGxvYWQgPT09IHRydWUgJiYgc3RhdGUudXBsb2FkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwbG9hZCAoKSB7XG4gICAgY2FuVXBsb2FkLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLnVwbG9hZCgpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRCdG4gKHNob3csIGljb24sIGZuKSB7XG4gICAgaWYgKHNob3cgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHR5cGU6ICdhJyxcbiAgICAgICAga2V5OiBpY29uLFxuICAgICAgICBpY29uOiAkcS5pY29uU2V0LnVwbG9hZGVyWyBpY29uIF0sXG4gICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgIGRlbnNlOiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZCA9IHZvaWQgMFxuXG4gICAgICBpZiAoaWNvbiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gcGlja0ZpbGVzXG4gICAgICAgIGNoaWxkID0gcmVuZGVySW5wdXRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBmblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRQnRuLCBkYXRhLCBjaGlsZClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJbnB1dCAoKSB7XG4gICAgcmV0dXJuIGgoJ2lucHV0Jywge1xuICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9faW5wdXQgb3ZlcmZsb3ctaGlkZGVuIGFic29sdXRlLWZ1bGwnLFxuICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgdGl0bGU6ICcnLCAvLyB0cnkgdG8gcmVtb3ZlIGRlZmF1bHQgdG9vbHRpcFxuICAgICAgYWNjZXB0OiBwcm9wcy5hY2NlcHQsXG4gICAgICBtdWx0aXBsZTogcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyAnbXVsdGlwbGUnIDogdm9pZCAwLFxuICAgICAgY2FwdHVyZTogcHJvcHMuY2FwdHVyZSxcbiAgICAgIG9uTW91c2Vkb3duOiBzdG9wLCAvLyBuZWVkIHRvIHN0b3AgcmVmb2N1cyBmcm9tIFFCdG5cbiAgICAgIG9uQ2xpY2s6IHBpY2tGaWxlcyxcbiAgICAgIG9uQ2hhbmdlOiBhZGRGaWxlc1RvUXVldWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SGVhZGVyICgpIHtcbiAgICBpZiAoc2xvdHMuaGVhZGVyICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBzbG90cy5oZWFkZXIoc2xvdFNjb3BlLnZhbHVlKVxuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9faGVhZGVyLWNvbnRlbnQgY29sdW1uJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAgcS1ndXR0ZXIteHMnXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBnZXRCdG4oc3RhdGUucXVldWVkRmlsZXMudmFsdWUubGVuZ3RoID4gMCwgJ3JlbW92ZVF1ZXVlJywgcmVtb3ZlUXVldWVkRmlsZXMpLFxuICAgICAgICAgIGdldEJ0bihzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlLmxlbmd0aCA+IDAsICdyZW1vdmVVcGxvYWRlZCcsIHJlbW92ZVVwbG9hZGVkRmlsZXMpLFxuXG4gICAgICAgICAgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaChRU3Bpbm5lciwgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3NwaW5uZXInIH0pXG4gICAgICAgICAgICA6IG51bGwsXG5cbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAnY29sIGNvbHVtbiBqdXN0aWZ5LWNlbnRlcicgfSwgW1xuICAgICAgICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX190aXRsZScgfSwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgICAgICAgICA6IG51bGwsXG5cbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX19zdWJ0aXRsZScgfSwgW1xuICAgICAgICAgICAgICB1cGxvYWRTaXplTGFiZWwudmFsdWUgKyAnIC8gJyArIHVwbG9hZFByb2dyZXNzTGFiZWwudmFsdWVcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSksXG5cbiAgICAgICAgICBnZXRCdG4oY2FuQWRkRmlsZXMudmFsdWUsICdhZGQnKSxcbiAgICAgICAgICBnZXRCdG4ocHJvcHMuaGlkZVVwbG9hZEJ0biA9PT0gZmFsc2UgJiYgY2FuVXBsb2FkLnZhbHVlID09PSB0cnVlLCAndXBsb2FkJywgc3RhdGUudXBsb2FkKSxcbiAgICAgICAgICBnZXRCdG4oc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUsICdjbGVhcicsIHN0YXRlLmFib3J0KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXN0ICgpIHtcbiAgICBpZiAoc2xvdHMubGlzdCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gc2xvdHMubGlzdChzbG90U2NvcGUudmFsdWUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlLmZpbGVzLnZhbHVlLm1hcChmaWxlID0+IGgoJ2RpdicsIHtcbiAgICAgIGtleTogZmlsZS5fX2tleSxcbiAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9fZmlsZSByZWxhdGl2ZS1wb3NpdGlvbidcbiAgICAgICAgKyAocHJvcHMubm9UaHVtYm5haWxzICE9PSB0cnVlICYmIGZpbGUuX19pbWcgIT09IHZvaWQgMCA/ICcgcS11cGxvYWRlcl9fZmlsZS0taW1nJyA6ICcnKVxuICAgICAgICArIChcbiAgICAgICAgICBmaWxlLl9fc3RhdHVzID09PSAnZmFpbGVkJ1xuICAgICAgICAgICAgPyAnIHEtdXBsb2FkZXJfX2ZpbGUtLWZhaWxlZCdcbiAgICAgICAgICAgIDogKGZpbGUuX19zdGF0dXMgPT09ICd1cGxvYWRlZCcgPyAnIHEtdXBsb2FkZXJfX2ZpbGUtLXVwbG9hZGVkJyA6ICcnKVxuICAgICAgICApLFxuICAgICAgc3R5bGU6IHByb3BzLm5vVGh1bWJuYWlscyAhPT0gdHJ1ZSAmJiBmaWxlLl9faW1nICE9PSB2b2lkIDBcbiAgICAgICAgPyB7IGJhY2tncm91bmRJbWFnZTogJ3VybChcIicgKyBmaWxlLl9faW1nLnNyYyArICdcIiknIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtdXBsb2FkZXJfX2ZpbGUtaGVhZGVyIHJvdyBmbGV4LWNlbnRlciBuby13cmFwJ1xuICAgICAgfSwgW1xuICAgICAgICBmaWxlLl9fc3RhdHVzID09PSAnZmFpbGVkJ1xuICAgICAgICAgID8gaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19maWxlLXN0YXR1cycsXG4gICAgICAgICAgICBuYW1lOiAkcS5pY29uU2V0LnR5cGUubmVnYXRpdmUsXG4gICAgICAgICAgICBjb2xvcjogJ25lZ2F0aXZlJ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgOiBudWxsLFxuXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX19maWxlLWhlYWRlci1jb250ZW50IGNvbCcgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX190aXRsZScgfSwgWyBmaWxlLm5hbWUgXSksXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19zdWJ0aXRsZSByb3cgaXRlbXMtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgZmlsZS5fX3NpemVMYWJlbCArICcgLyAnICsgZmlsZS5fX3Byb2dyZXNzTGFiZWxcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcblxuICAgICAgICBmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkaW5nJ1xuICAgICAgICAgID8gaChRQ2lyY3VsYXJQcm9ncmVzcywge1xuICAgICAgICAgICAgdmFsdWU6IGZpbGUuX19wcm9ncmVzcyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZpbGUuX19wcm9ncmVzcyA9PT0gMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgOiBoKFFCdG4sIHtcbiAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgICAgaWNvbjogJHEuaWNvblNldC51cGxvYWRlclsgZmlsZS5fX3N0YXR1cyA9PT0gJ3VwbG9hZGVkJyA/ICdkb25lJyA6ICdjbGVhcicgXSxcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgcmVtb3ZlRmlsZShmaWxlKSB9XG4gICAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgXSkpXG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHN0YXRlLmlzVXBsb2FkaW5nLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmFib3J0KClcbiAgICBzdGF0ZS5maWxlcy52YWx1ZS5sZW5ndGggPiAwICYmIHJldm9rZUltZ1VSTHMoKVxuICB9KVxuXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7XG4gICAgcGlja0ZpbGVzLFxuICAgIGFkZEZpbGVzLFxuICAgIHJlc2V0LFxuICAgIHJlbW92ZVVwbG9hZGVkRmlsZXMsXG4gICAgcmVtb3ZlUXVldWVkRmlsZXMsXG4gICAgcmVtb3ZlRmlsZSxcbiAgICB1cGxvYWQsXG4gICAgYWJvcnQ6IHN0YXRlLmFib3J0XG4gIH1cblxuICAvLyBUT0RPOiB0aGUgcmVzdWx0IG9mIHRoaXMgY29tcHV0ZWQsIGVzcGVjaWFsbHkgdGhlIGR5bmFtaWMgcGFydCwgaXNuJ3QgY3VycmVudGx5IHR5cGVkXG4gIC8vIFRoaXMgcmVzdWx0IGluIGFuIGVycm9yIHdpdGggVm9sYXIgd2hlbiBhY2Nlc3NpbmcgdGhlIHN0YXRlIChlZy4gZmlsZXMgYXJyYXkpXG4gIGNvbnN0IHNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7XG4gICAgICBjYW5BZGRGaWxlczogY2FuQWRkRmlsZXMudmFsdWUsXG4gICAgICBjYW5VcGxvYWQ6IGNhblVwbG9hZC52YWx1ZSxcbiAgICAgIHVwbG9hZFNpemVMYWJlbDogdXBsb2FkU2l6ZUxhYmVsLnZhbHVlLFxuICAgICAgdXBsb2FkUHJvZ3Jlc3NMYWJlbDogdXBsb2FkUHJvZ3Jlc3NMYWJlbC52YWx1ZVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHN0YXRlKSB7XG4gICAgICBhY2NbIGtleSBdID0gaXNSZWYoc3RhdGVbIGtleSBdKSA9PT0gdHJ1ZVxuICAgICAgICA/IHN0YXRlWyBrZXkgXS52YWx1ZVxuICAgICAgICA6IHN0YXRlWyBrZXkgXVxuICAgIH1cblxuICAgIC8vIFRPRE86IChRdjMpIFB1dCB0aGUgUVVwbG9hZGVyIGluc3RhbmNlIHVuZGVyIGByZWZgXG4gICAgLy8gcHJvcGVydHkgZm9yIGNvbnNpc3RlbmN5IGFuZCBmbGV4aWJpbGl0eVxuICAgIC8vIHJldHVybiB7IHJlZjogeyAuLi5hY2MsIC4uLnB1YmxpY01ldGhvZHMgfSB9XG4gICAgcmV0dXJuIHsgLi4uYWNjLCAuLi5wdWJsaWNNZXRob2RzIH1cbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljTWV0aG9kcylcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgaCgnZGl2JywgeyBjbGFzczogY29sb3JDbGFzcy52YWx1ZSB9LCBnZXRIZWFkZXIoKSksXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS11cGxvYWRlcl9fbGlzdCBzY3JvbGwnIH0sIGdldExpc3QoKSksXG4gICAgICBnZXREbmROb2RlKCd1cGxvYWRlcicpXG4gICAgXVxuXG4gICAgc3RhdGUuaXNCdXN5LnZhbHVlID09PSB0cnVlICYmIGNoaWxkcmVuLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9fb3ZlcmxheSBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICB9LCBbIGgoUVNwaW5uZXIpIF0pXG4gICAgKVxuXG4gICAgY29uc3QgZGF0YSA9IHsgcmVmOiByb290UmVmLCBjbGFzczogY2xhc3Nlcy52YWx1ZSB9XG5cbiAgICBpZiAoY2FuQWRkRmlsZXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkRyYWdvdmVyLCBvbkRyYWdsZWF2ZSB9KVxuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBjaGlsZHJlbilcbiAgfVxufVxuIiwiY29uc3QgdHJ1ZUZuID0gKCkgPT4gdHJ1ZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZW1pdHNBcnJheSkge1xuICBjb25zdCBlbWl0c09iamVjdCA9IHt9XG5cbiAgZW1pdHNBcnJheS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgZW1pdHNPYmplY3RbIHZhbCBdID0gdHJ1ZUZuXG4gIH0pXG5cbiAgcmV0dXJuIGVtaXRzT2JqZWN0XG59XG4iLCJpbXBvcnQgeyBjb3JlUHJvcHMsIGNvcmVFbWl0cywgZ2V0UmVuZGVyZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL3VwbG9hZGVyL3VwbG9hZGVyLWNvcmUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgZ2V0RW1pdHNPYmplY3QgZnJvbSAnLi9wcml2YXRlL2dldC1lbWl0cy1vYmplY3QuanMnXG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vcHJpdmF0ZS9pcy5qcydcblxuY29uc3QgY29yZUVtaXRzT2JqZWN0ID0gZ2V0RW1pdHNPYmplY3QoY29yZUVtaXRzKVxuXG5leHBvcnQgZGVmYXVsdCAoeyBuYW1lLCBwcm9wcywgZW1pdHMsIGluamVjdFBsdWdpbiB9KSA9PiBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lLFxuXG4gIHByb3BzOiB7XG4gICAgLi4uY29yZVByb3BzLFxuICAgIC4uLnByb3BzXG4gIH0sXG5cbiAgZW1pdHM6IGlzT2JqZWN0KGVtaXRzKSA9PT0gdHJ1ZVxuICAgID8geyAuLi5jb3JlRW1pdHNPYmplY3QsIC4uLmVtaXRzIH1cbiAgICA6IFsgLi4uY29yZUVtaXRzLCAuLi5lbWl0cyBdLFxuXG4gIHNldHVwICgpIHtcbiAgICByZXR1cm4gZ2V0UmVuZGVyZXIoaW5qZWN0UGx1Z2luKVxuICB9XG59KVxuIiwiLyoqXG4gKiBCYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vamNob29rL3V1aWQtcmFuZG9tXG4gKi9cblxubGV0XG4gIGJ1ZixcbiAgYnVmSWR4ID0gMFxuY29uc3QgaGV4Qnl0ZXMgPSBuZXcgQXJyYXkoMjU2KVxuXG4vLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgaGV4Qnl0ZXNbIGkgXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcbn1cblxuLy8gVXNlIGJlc3QgYXZhaWxhYmxlIFBSTkdcbmNvbnN0IHJhbmRvbUJ5dGVzID0gKCgpID0+IHtcbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICBjb25zdCBsaWIgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xuICAgID8gY3J5cHRvXG4gICAgOiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgICAgICAgIDogdm9pZCAwXG4gICAgICApXG5cbiAgaWYgKGxpYiAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKGxpYi5yYW5kb21CeXRlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbGliLnJhbmRvbUJ5dGVzXG4gICAgfVxuICAgIGlmIChsaWIuZ2V0UmFuZG9tVmFsdWVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBuID0+IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShuKVxuICAgICAgICBsaWIuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKVxuICAgICAgICByZXR1cm4gYnl0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbiA9PiB7XG4gICAgY29uc3QgciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IG47IGkgPiAwOyBpLS0pIHtcbiAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKVxuICAgIH1cbiAgICByZXR1cm4gclxuICB9XG59KSgpXG5cbi8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbi8vIFJlZHVjZSBtZW1vcnkgdXNhZ2UgYnkgZGVjcmVhc2luZyB0aGlzIG51bWJlciAobWluIDE2KVxuLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG5jb25zdCBCVUZGRVJfU0laRSA9IDQwOTZcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGlmIChidWYgPT09IHZvaWQgMCB8fCAoYnVmSWR4ICsgMTYgPiBCVUZGRVJfU0laRSkpIHtcbiAgICBidWZJZHggPSAwXG4gICAgYnVmID0gcmFuZG9tQnl0ZXMoQlVGRkVSX1NJWkUpXG4gIH1cblxuICBjb25zdCBiID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmLCBidWZJZHgsIChidWZJZHggKz0gMTYpKVxuICBiWyA2IF0gPSAoYlsgNiBdICYgMHgwZikgfCAweDQwXG4gIGJbIDggXSA9IChiWyA4IF0gJiAweDNmKSB8IDB4ODBcblxuICByZXR1cm4gaGV4Qnl0ZXNbIGJbIDAgXSBdICsgaGV4Qnl0ZXNbIGJbIDEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMiBdIF0gKyBoZXhCeXRlc1sgYlsgMyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA0IF0gXSArIGhleEJ5dGVzWyBiWyA1IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDYgXSBdICsgaGV4Qnl0ZXNbIGJbIDcgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgOCBdIF0gKyBoZXhCeXRlc1sgYlsgOSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyAxMCBdIF0gKyBoZXhCeXRlc1sgYlsgMTEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTIgXSBdICsgaGV4Qnl0ZXNbIGJbIDEzIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDE0IF0gXSArIGhleEJ5dGVzWyBiWyAxNSBdIF1cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZvcm1DaGlsZCBmcm9tICcuLi91c2UtZm9ybS1jaGlsZC5qcydcbmltcG9ydCB7IHRlc3RQYXR0ZXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGF0dGVybnMuanMnXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5jb25zdCBsYXp5UnVsZXNWYWx1ZXMgPSBbIHRydWUsIGZhbHNlLCAnb25kZW1hbmQnIF1cblxuZXhwb3J0IGNvbnN0IHVzZVZhbGlkYXRlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHt9LFxuXG4gIGVycm9yOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICBub0Vycm9ySWNvbjogQm9vbGVhbixcblxuICBydWxlczogQXJyYXksXG4gIHJlYWN0aXZlUnVsZXM6IEJvb2xlYW4sXG4gIGxhenlSdWxlczoge1xuICAgIHR5cGU6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKG51bGwpXG5cbiAgdXNlRm9ybUNoaWxkKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gIGxldCB2YWxpZGF0ZUluZGV4ID0gMCwgdW53YXRjaFJ1bGVzXG5cbiAgY29uc3QgaGFzUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJ1bGVzICE9PSB2b2lkIDBcbiAgICAmJiBwcm9wcy5ydWxlcyAhPT0gbnVsbFxuICAgICYmIHByb3BzLnJ1bGVzLmxlbmd0aCA+IDBcbiAgKVxuXG4gIGNvbnN0IGhhc0FjdGl2ZVJ1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgJiYgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGhhc0Vycm9yID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5lcnJvciA9PT0gdHJ1ZSB8fCBpbm5lckVycm9yLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBlcnJvck1lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLmVycm9yTWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZXJyb3JNZXNzYWdlLmxlbmd0aCA+IDBcbiAgICAgID8gcHJvcHMuZXJyb3JNZXNzYWdlXG4gICAgICA6IGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlXG4gICkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKCkgPT4ge1xuICAgIHZhbGlkYXRlSWZOZWVkZWQoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnJlYWN0aXZlUnVsZXMsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHVud2F0Y2hSdWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hSdWxlcyA9IHdhdGNoKCgpID0+IHByb3BzLnJ1bGVzLCAoKSA9PiB7XG4gICAgICAgICAgdmFsaWRhdGVJZk5lZWRlZCh0cnVlKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1bndhdGNoUnVsZXMgIT09IHZvaWQgMCkge1xuICAgICAgdW53YXRjaFJ1bGVzKClcbiAgICAgIHVud2F0Y2hSdWxlcyA9IHZvaWQgMFxuICAgIH1cbiAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICB3YXRjaChmb2N1c2VkLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICAgICAvLyBEb24ndCByZS10cmlnZ2VyIGlmIGl0J3MgYWxyZWFkeSBpbiBwcm9ncmVzcztcbiAgICAgICAgLy8gSXQgbWlnaHQgbWVhbiB0aGF0IGZvY3VzIHN3aXRjaGVkIHRvIHN1Ym1pdCBidG4gYW5kXG4gICAgICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAgICAgJiYgaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICB2YWxpZGF0ZUluZGV4KytcbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IG51bGxcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKGhhc0FjdGl2ZVJ1bGVzLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBpZiAoaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLmxhenlSdWxlcyAhPT0gdHJ1ZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgaWYgKGlubmVyRXJyb3IudmFsdWUgIT09IGVycikge1xuICAgICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG0gPSBtc2cgfHwgdm9pZCAwXG5cbiAgICAgIGlmIChpbm5lckVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbSkge1xuICAgICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1cbiAgICAgIH1cblxuICAgICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBydWxlID0gcHJvcHMucnVsZXNbIGkgXVxuICAgICAgbGV0IHJlc1xuXG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzID0gcnVsZSh2YWwpXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlSWZOZWVkZWQgKGNoYW5nZWRSdWxlcykge1xuICAgIGlmIChcbiAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICYmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWUgfHwgKHByb3BzLmxhenlSdWxlcyAhPT0gdHJ1ZSAmJiBjaGFuZ2VkUnVsZXMgIT09IHRydWUpKVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXMgIT09IHZvaWQgMCAmJiB1bndhdGNoUnVsZXMoKVxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzICYgcHJvcHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyByZXNldFZhbGlkYXRpb24sIHZhbGlkYXRlIH0pXG4gIGluamVjdFByb3AocHJveHksICdoYXNFcnJvcicsICgpID0+IGhhc0Vycm9yLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcblxuICAgIHZhbGlkYXRlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ZW5lclJFID0gL15vbltBLVpdL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXR0cnMsIHZub2RlKSB7XG4gIGNvbnN0IGFjYyA9IHtcbiAgICBsaXN0ZW5lcnM6IHJlZih7fSksXG4gICAgYXR0cmlidXRlczogcmVmKHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChrZXkgIT09ICdjbGFzcycgJiYga2V5ICE9PSAnc3R5bGUnICYmIGxpc3RlbmVyUkUudGVzdChrZXkpID09PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzWyBrZXkgXSA9IGF0dHJzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHZub2RlLnByb3BzKSB7XG4gICAgICBpZiAobGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgbGlzdGVuZXJzWyBrZXkgXSA9IHZub2RlLnByb3BzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjYy5hdHRyaWJ1dGVzLnZhbHVlID0gYXR0cmlidXRlc1xuICAgIGFjYy5saXN0ZW5lcnMudmFsdWUgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZSlcblxuICB1cGRhdGUoKVxuXG4gIHJldHVybiBhY2Ncbn1cbiIsImxldCBxdWV1ZSA9IFtdXG5sZXQgd2FpdEZsYWdzID0gW11cblxuZnVuY3Rpb24gY2xlYXJGbGFnIChmbGFnKSB7XG4gIHdhaXRGbGFncyA9IHdhaXRGbGFncy5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuICB3YWl0RmxhZ3MucHVzaChmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcblxuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCAmJiBxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgLy8gb25seSBjYWxsIGxhc3QgZm9jdXMgaGFuZGxlciAoY2FuJ3QgZm9jdXMgbXVsdGlwbGUgdGhpbmdzIGF0IG9uY2UpXG4gICAgcXVldWVbIHF1ZXVlLmxlbmd0aCAtIDEgXSgpXG4gICAgcXVldWUgPSBbXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c0ZuIChmbikge1xuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZuKClcbiAgfVxuICBlbHNlIHtcbiAgICBxdWV1ZS5wdXNoKGZuKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c0ZuIChmbikge1xuICBxdWV1ZSA9IHF1ZXVlLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZm4pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi91c2UtdmFsaWRhdGUuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuL3VzZS1zcGxpdC1hdHRycy5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGdldFRhcmdldFVpZCAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCA/IGBmXyR7IHVpZCgpIH1gIDogdmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmcsXG5cbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJywgJ3BvcHVwLXNob3cnLCAncG9wdXAtaGlkZScgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmllbGRTdGF0ZSAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGF0dHJzLCBwcm94eSwgdm5vZGUgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG5cbiAgcmV0dXJuIHtcbiAgICBpc0RhcmssXG5cbiAgICBlZGl0YWJsZTogY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICApLFxuXG4gICAgaW5uZXJMb2FkaW5nOiByZWYoZmFsc2UpLFxuICAgIGZvY3VzZWQ6IHJlZihmYWxzZSksXG4gICAgaGFzUG9wdXBPcGVuOiBmYWxzZSxcblxuICAgIHNwbGl0QXR0cnM6IHVzZVNwbGl0QXR0cnMoYXR0cnMsIHZub2RlKSxcbiAgICB0YXJnZXRVaWQ6IHJlZihnZXRUYXJnZXRVaWQocHJvcHMuZm9yKSksXG5cbiAgICByb290UmVmOiByZWYobnVsbCksXG4gICAgdGFyZ2V0UmVmOiByZWYobnVsbCksXG4gICAgY29udHJvbFJlZjogcmVmKG51bGwpXG5cbiAgICAvKipcbiAgICAgKiB1c2VyIHN1cHBsaWVkIGFkZGl0aW9uYWxzOlxuXG4gICAgICogaW5uZXJWYWx1ZSAtIGNvbXB1dGVkXG4gICAgICogZmxvYXRpbmdMYWJlbCAtIGNvbXB1dGVkXG4gICAgICogaW5wdXRSZWYgLSBjb21wdXRlZFxuXG4gICAgICogZmllbGRDbGFzcyAtIGNvbXB1dGVkXG4gICAgICogaGFzU2hhZG93IC0gY29tcHV0ZWRcblxuICAgICAqIGNvbnRyb2xFdmVudHMgLSBPYmplY3Qgd2l0aCBmbihlKVxuXG4gICAgICogZ2V0Q29udHJvbCAtIGZuXG4gICAgICogZ2V0SW5uZXJBcHBlbmQgLSBmblxuICAgICAqIGdldENvbnRyb2xDaGlsZCAtIGZuXG4gICAgICogZ2V0U2hhZG93Q29udHJvbCAtIGZuXG4gICAgICogc2hvd1BvcHVwIC0gZm5cbiAgICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgc2xvdHMsIGF0dHJzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgZm9jdXNvdXRUaW1lclxuXG4gIGlmIChzdGF0ZS5oYXNWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMubW9kZWxWYWx1ZSkpXG4gIH1cblxuICBpZiAoc3RhdGUuZW1pdFZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5lbWl0VmFsdWUgPSB2YWx1ZSA9PiB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5jb250cm9sRXZlbnRzID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb250cm9sRXZlbnRzID0ge1xuICAgICAgb25Gb2N1c2luOiBvbkNvbnRyb2xGb2N1c2luLFxuICAgICAgb25Gb2N1c291dDogb25Db250cm9sRm9jdXNvdXRcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgY2xlYXJWYWx1ZSxcbiAgICBvbkNvbnRyb2xGb2N1c2luLFxuICAgIG9uQ29udHJvbEZvY3Vzb3V0LFxuICAgIGZvY3VzXG4gIH0pXG5cbiAgaWYgKHN0YXRlLmNvbXB1dGVkQ291bnRlciA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29tcHV0ZWRDb3VudGVyID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmNvdW50ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICgnJyArIHByb3BzLm1vZGVsVmFsdWUpLmxlbmd0aFxuICAgICAgICAgIDogKEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUgPyBwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCA6IDApXG5cbiAgICAgICAgY29uc3QgbWF4ID0gcHJvcHMubWF4bGVuZ3RoICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHByb3BzLm1heGxlbmd0aFxuICAgICAgICAgIDogcHJvcHMubWF4VmFsdWVzXG5cbiAgICAgICAgcmV0dXJuIGxlbiArIChtYXggIT09IHZvaWQgMCA/ICcgLyAnICsgbWF4IDogJycpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBpc0RpcnR5TW9kZWwsXG4gICAgaGFzUnVsZXMsXG4gICAgaGFzRXJyb3IsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9ID0gdXNlVmFsaWRhdGUoc3RhdGUuZm9jdXNlZCwgc3RhdGUuaW5uZXJMb2FkaW5nKVxuXG4gIGNvbnN0IGZsb2F0aW5nTGFiZWwgPSBzdGF0ZS5mbG9hdGluZ0xhYmVsICE9PSB2b2lkIDBcbiAgICA/IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlKVxuICAgIDogY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuXG4gIGNvbnN0IHNob3VsZFJlbmRlckJvdHRvbSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuYm90dG9tU2xvdHMgPT09IHRydWVcbiAgICB8fCBwcm9wcy5oaW50ICE9PSB2b2lkIDBcbiAgICB8fCBoYXNSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmNvdW50ZXIgPT09IHRydWVcbiAgICB8fCBwcm9wcy5lcnJvciAhPT0gbnVsbFxuICApXG5cbiAgY29uc3Qgc3R5bGVUeXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5maWxsZWQgPT09IHRydWUpIHsgcmV0dXJuICdmaWxsZWQnIH1cbiAgICBpZiAocHJvcHMub3V0bGluZWQgPT09IHRydWUpIHsgcmV0dXJuICdvdXRsaW5lZCcgfVxuICAgIGlmIChwcm9wcy5ib3JkZXJsZXNzID09PSB0cnVlKSB7IHJldHVybiAnYm9yZGVybGVzcycgfVxuICAgIGlmIChwcm9wcy5zdGFuZG91dCkgeyByZXR1cm4gJ3N0YW5kb3V0JyB9XG4gICAgcmV0dXJuICdzdGFuZGFyZCdcbiAgfSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS1maWVsZCByb3cgbm8td3JhcCBpdGVtcy1zdGFydCBxLWZpZWxkLS0keyBzdHlsZVR5cGUudmFsdWUgfWBcbiAgICArIChzdGF0ZS5maWVsZENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAgOiAnJylcbiAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1yb3VuZGVkJyA6ICcnKVxuICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tc3F1YXJlJyA6ICcnKVxuICAgICsgKGZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWZsb2F0JyA6ICcnKVxuICAgICsgKGhhc0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1sYWJlbGVkJyA6ICcnKVxuICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kZW5zZScgOiAnJylcbiAgICArIChwcm9wcy5pdGVtQWxpZ25lZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taXRlbS1hbGlnbmVkIHEtaXRlbS10eXBlJyA6ICcnKVxuICAgICsgKHN0YXRlLmlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGFyaycgOiAnJylcbiAgICArIChzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgPyAnIHEtZmllbGQtLWF1dG8taGVpZ2h0JyA6ICcnKVxuICAgICsgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWZvY3VzZWQnIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWVycm9yJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWhpZ2hsaWdodGVkJyA6ICcnKVxuICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSAmJiBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLXdpdGgtYm90dG9tJyA6ICcnKVxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRpc2FibGVkJyA6IChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcmVhZG9ubHknIDogJycpKVxuICApXG5cbiAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fY29udHJvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCdcbiAgICArIChwcm9wcy5iZ0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmJnQ29sb3IgfWAgOiAnJylcbiAgICArIChcbiAgICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJyB0ZXh0LW5lZ2F0aXZlJ1xuICAgICAgICA6IChcbiAgICAgICAgICAgIHR5cGVvZiBwcm9wcy5zdGFuZG91dCA9PT0gJ3N0cmluZycgJiYgcHJvcHMuc3RhbmRvdXQubGVuZ3RoID4gMCAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gYCAkeyBwcm9wcy5zdGFuZG91dCB9YFxuICAgICAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5sYWJlbFNsb3QgPT09IHRydWUgfHwgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICApXG5cbiAgY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzJ1xuICAgICsgKHByb3BzLmxhYmVsQ29sb3IgIT09IHZvaWQgMCAmJiBoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5sYWJlbENvbG9yIH1gIDogJycpXG4gIClcblxuICBjb25zdCBjb250cm9sU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgIGVkaXRhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICBmb2N1c2VkOiBzdGF0ZS5mb2N1c2VkLnZhbHVlLFxuICAgIGZsb2F0aW5nTGFiZWw6IGZsb2F0aW5nTGFiZWwudmFsdWUsXG4gICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICBlbWl0VmFsdWU6IHN0YXRlLmVtaXRWYWx1ZVxuICB9KSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtcmVhZG9ubHknIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZm9yLCB2YWwgPT4ge1xuICAgIC8vIGRvbid0IHRyYW5zZm9ybSB0YXJnZXRVaWQgaW50byBhIGNvbXB1dGVkXG4gICAgLy8gcHJvcCBhcyBpdCB3aWxsIGJyZWFrIFNTUlxuICAgIHN0YXRlLnRhcmdldFVpZC52YWx1ZSA9IGdldFRhcmdldFVpZCh2YWwpXG4gIH0pXG5cbiAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyICgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0UmVmICE9PSB2b2lkIDAgJiYgc3RhdGUudGFyZ2V0UmVmLnZhbHVlXG5cbiAgICBpZiAodGFyZ2V0ICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSkge1xuICAgICAgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gdHJ1ZSB8fCAodGFyZ2V0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleF0nKSlcbiAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgIGFkZEZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gYmx1ciAoKSB7XG4gICAgcmVtb3ZlRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgaWYgKGVsICE9PSBudWxsICYmIHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpKSB7XG4gICAgICBlbC5ibHVyKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c2luIChlKSB7XG4gICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnZm9jdXMnLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3Vzb3V0IChlLCB0aGVuKSB7XG4gICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4gIT09IHZvaWQgMCAmJiB0aGVuKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJWYWx1ZSAoZSkge1xuICAgIC8vIHByZXZlbnQgYWN0aXZhdGluZyB0aGUgZmllbGQgYnV0IGtlZXAgZm9jdXMgb24gZGVza3RvcFxuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICBjb25zdCBlbCA9IChzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWUpIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7IC8vIFRPRE8gdnVlM1xuICAgICAgLy8gZG8gbm90IGxldCBmb2N1cyBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIGFzIGl0IHdpbGwgbWFrZSB0aGUgbmF0aXZlIGZpbGUgZGlhbG9nXG4gICAgICAvLyBhcHBlYXIgZm9yIGFub3RoZXIgc2VsZWN0aW9uXG4gICAgICBzdGF0ZS5pbnB1dFJlZi52YWx1ZS52YWx1ZSA9IG51bGxcbiAgICB9XG5cbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgZW1pdCgnY2xlYXInLCBwcm9wcy5tb2RlbFZhbHVlKVxuXG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgcmVzZXRWYWxpZGF0aW9uKClcblxuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHNsb3RzLnByZXBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMucHJlcGVuZCgpKVxuICAgIClcblxuICAgIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBnZXRDb250cm9sQ29udGFpbmVyKCkpXG4gICAgKVxuXG4gICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9FcnJvckljb24gPT09IGZhbHNlICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnZXJyb3InLCBbXG4gICAgICAgIGgoUUljb24sIHsgbmFtZTogJHEuaWNvblNldC5maWVsZC5lcnJvciwgY29sb3I6ICduZWdhdGl2ZScgfSlcbiAgICAgIF0pXG4gICAgKVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgfHwgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZShcbiAgICAgICAgICAnaW5uZXItbG9hZGluZy1hcHBlbmQnLFxuICAgICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICAgIDogWyBoKFFTcGlubmVyLCB7IGNvbG9yOiBwcm9wcy5jb2xvciB9KSBdXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlICYmIHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItY2xlYXJhYmxlLWFwcGVuZCcsIFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2ZvY3VzYWJsZS1hY3Rpb24nLFxuICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IG51bGwsXG4gICAgICAgICAgICByb2xlOiBudWxsLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmdldENvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHN0YXRlLmdldENvbnRyb2woKSlcbiAgICB9XG4gICAgLy8gaW50ZXJuYWwgdXNhZ2Ugb25seTpcbiAgICBlbHNlIGlmIChzbG90cy5yYXdDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzbG90cy5yYXdDb250cm9sKCkpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3RzLmNvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS50YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93JyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDBcbiAgICAgICAgfSwgc2xvdHMuY29udHJvbChjb250cm9sU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlXG4gICAgICB9LCBoU2xvdChzbG90cy5sYWJlbCwgcHJvcHMubGFiZWwpKVxuICAgIClcblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZSAmJiBoYXNDb3VudGVyID09PSBmYWxzZSAmJiBtc2cgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKVxuICAgIH0sIFtcbiAgICAgIHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZVxuICAgICAgICA/IG1haW5cbiAgICAgICAgOiBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmllbGQtbWVzc2FnZScgfSwgKCkgPT4gbWFpbiksXG5cbiAgICAgIGhhc0NvdW50ZXIgPT09IHRydWVcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb3VudGVyJ1xuICAgICAgICB9LCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDAgPyBzbG90cy5jb3VudGVyKCkgOiBzdGF0ZS5jb21wdXRlZENvdW50ZXIudmFsdWUpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lckFwcGVuZE5vZGUgKGtleSwgY29udGVudCkge1xuICAgIHJldHVybiBjb250ZW50ID09PSBudWxsXG4gICAgICA/IG51bGxcbiAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICBrZXksXG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGNvbnRlbnQpXG4gIH1cblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgYmx1ciB9KVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBpZiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmZvciA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZS50YXJnZXRVaWQudmFsdWUgPSBnZXRUYXJnZXRVaWQoKVxuICAgIH1cblxuICAgIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyRmllbGQgKCkge1xuICAgIGNvbnN0IGxhYmVsQXR0cnMgPSBzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgJiYgc2xvdHMuY29udHJvbCA9PT0gdm9pZCAwXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICAgIH1cbiAgICAgIDogYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgcmV0dXJuIGgoJ2xhYmVsJywge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbi8vIGxlYXZlIE5BTUVEX01BU0tTIGF0IHRvcCBvZiBmaWxlIChjb2RlIHJlZmVyZW5jZWQgZnJvbSBkb2NzKVxuY29uc3QgTkFNRURfTUFTS1MgPSB7XG4gIGRhdGU6ICcjIyMjLyMjLyMjJyxcbiAgZGF0ZXRpbWU6ICcjIyMjLyMjLyMjICMjOiMjJyxcbiAgdGltZTogJyMjOiMjJyxcbiAgZnVsbHRpbWU6ICcjIzojIzojIycsXG4gIHBob25lOiAnKCMjIykgIyMjIC0gIyMjIycsXG4gIGNhcmQ6ICcjIyMjICMjIyMgIyMjIyAjIyMjJ1xufVxuXG5jb25zdCBUT0tFTlMgPSB7XG4gICcjJzogeyBwYXR0ZXJuOiAnW1xcXFxkXScsIG5lZ2F0ZTogJ1teXFxcXGRdJyB9LFxuXG4gIFM6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJyB9LFxuICBOOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScgfSxcblxuICBBOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgYTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH0sXG5cbiAgWDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIHg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9XG59XG5cbmNvbnN0IEtFWVMgPSBPYmplY3Qua2V5cyhUT0tFTlMpXG5LRVlTLmZvckVhY2goa2V5ID0+IHtcbiAgVE9LRU5TWyBrZXkgXS5yZWdleCA9IG5ldyBSZWdFeHAoVE9LRU5TWyBrZXkgXS5wYXR0ZXJuKVxufSlcblxuY29uc3RcbiAgdG9rZW5SZWdleE1hc2sgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBLRVlTLmpvaW4oJycpICsgJ10pfCguKScsICdnJyksXG4gIGVzY1JlZ2V4ID0gL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nXG5cbmNvbnN0IE1BUktFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMSlcblxuZXhwb3J0IGNvbnN0IHVzZU1hc2tQcm9wcyA9IHtcbiAgbWFzazogU3RyaW5nLFxuICByZXZlcnNlRmlsbE1hc2s6IEJvb2xlYW4sXG4gIGZpbGxNYXNrOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICB1bm1hc2tlZFZhbHVlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgPiAtMSkge1xuICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSBsb2NhbE1hc2tNYXJrZWQubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHBhZCArPSBNQVJLRVJcbiAgICAgIH1cblxuICAgICAgbG9jYWxNYXNrTWFya2VkID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIHBhZFBvcykgKyBwYWQgKyBsb2NhbE1hc2tNYXJrZWQuc2xpY2UocGFkUG9zKVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbE1hc2tNYXJrZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tJbnRlcm5hbHMgKCkge1xuICAgIGhhc01hc2sudmFsdWUgPSBwcm9wcy5tYXNrICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzLm1hc2subGVuZ3RoID4gMFxuICAgICAgJiYgZ2V0SXNUeXBlVGV4dCgpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbXB1dGVkVW5tYXNrID0gdm9pZCAwXG4gICAgICBtYXNrTWFya2VkID0gJydcbiAgICAgIG1hc2tSZXBsYWNlZCA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgbG9jYWxDb21wdXRlZE1hc2sgPSBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdID09PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5tYXNrXG4gICAgICAgIDogTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSxcbiAgICAgIGZpbGxDaGFyID0gdHlwZW9mIHByb3BzLmZpbGxNYXNrID09PSAnc3RyaW5nJyAmJiBwcm9wcy5maWxsTWFzay5sZW5ndGggPiAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2VuUmVnZXhNYXNrLCAoXywgY2hhcjEsIGVzYywgdG9rZW4sIGNoYXIyKSA9PiB7XG4gICAgICBpZiAodG9rZW4gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjID0gVE9LRU5TWyB0b2tlbiBdXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICBuZWdhdGVDaGFyID0gYy5uZWdhdGVcbiAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPycpXG4gICAgICAgICAgZmlyc3RNYXRjaCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcpPycpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlc2MgIT09IHZvaWQgMCkge1xuICAgICAgICB1bm1hc2tDaGFyID0gJ1xcXFwnICsgKGVzYyA9PT0gJ1xcXFwnID8gJycgOiBlc2MpXG4gICAgICAgIG1hc2sucHVzaChlc2MpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgYyA9IGNoYXIxICE9PSB2b2lkIDAgPyBjaGFyMSA6IGNoYXIyXG4gICAgICAgIHVubWFza0NoYXIgPSBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFxcXFxcXFxcXCcgOiBjLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcXFxcXCQmJylcbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0XG4gICAgICB1bm1hc2tNYXRjaGVyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgJ14nXG4gICAgICAgICsgdW5tYXNrLmpvaW4oJycpXG4gICAgICAgICsgJygnICsgKHVubWFza0NoYXIgPT09ICcnID8gJy4nIDogJ1teJyArIHVubWFza0NoYXIgKyAnXScpICsgJyspPydcbiAgICAgICAgKyAnJCdcbiAgICAgICksXG4gICAgICBleHRyYWN0TGFzdCA9IGV4dHJhY3QubGVuZ3RoIC0gMSxcbiAgICAgIGV4dHJhY3RNYXRjaGVyID0gZXh0cmFjdC5tYXAoKHJlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgZmlsbENoYXJFc2NhcGVkICsgJyonICsgcmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGV4dHJhY3RMYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXicgKyByZVxuICAgICAgICAgICAgKyAnKCcgKyAobmVnYXRlQ2hhciA9PT0gJycgPyAnLicgOiBuZWdhdGVDaGFyKSArICcrKT8nXG4gICAgICAgICAgICArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnJCcgOiBmaWxsQ2hhckVzY2FwZWQgKyAnKicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcmUpXG4gICAgICB9KVxuXG4gICAgY29tcHV0ZWRNYXNrID0gbWFza1xuICAgIGNvbXB1dGVkVW5tYXNrID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHVubWFza01hdGNoID0gdW5tYXNrTWF0Y2hlci5leGVjKHZhbClcbiAgICAgIGlmICh1bm1hc2tNYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSB1bm1hc2tNYXRjaC5zbGljZSgxKS5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBleHRyYWN0TWF0Y2ggPSBbXSxcbiAgICAgICAgZXh0cmFjdE1hdGNoZXJMZW5ndGggPSBleHRyYWN0TWF0Y2hlci5sZW5ndGhcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIHN0ciA9IHZhbDsgaSA8IGV4dHJhY3RNYXRjaGVyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbSA9IGV4dHJhY3RNYXRjaGVyWyBpIF0uZXhlYyhzdHIpXG5cbiAgICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKG0uc2hpZnQoKS5sZW5ndGgpXG4gICAgICAgIGV4dHJhY3RNYXRjaC5wdXNoKC4uLm0pXG4gICAgICB9XG4gICAgICBpZiAoZXh0cmFjdE1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RNYXRjaC5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIG1hc2tNYXJrZWQgPSBtYXNrLm1hcCh2ID0+ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogTUFSS0VSKSkuam9pbignJylcbiAgICBtYXNrUmVwbGFjZWQgPSBtYXNrTWFya2VkLnNwbGl0KE1BUktFUikuam9pbihmaWxsQ2hhcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tWYWx1ZSAocmF3VmFsLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZywgaW5wdXRUeXBlKSB7XG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZCxcbiAgICAgIGVuZFJldmVyc2UgPSBpbnAudmFsdWUubGVuZ3RoIC0gZW5kLFxuICAgICAgdW5tYXNrZWQgPSB1bm1hc2tWYWx1ZShyYXdWYWwpXG5cbiAgICAvLyBVcGRhdGUgaGVyZSBzbyB1bm1hc2sgdXNlcyB0aGUgb3JpZ2luYWwgZmlsbENoYXJcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZyA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGNvbnN0XG4gICAgICBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrZWQpLFxuICAgICAgbWFza2VkID0gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKHByZU1hc2tlZClcbiAgICAgICAgOiBwcmVNYXNrZWQsXG4gICAgICBjaGFuZ2VkID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gbWFza2VkXG5cbiAgICAvLyBXZSB3YW50IHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiIHNvIHdlIHNldCB2YWx1ZSBpbW1lZGlhdGVseVxuICAgIGlucC52YWx1ZSAhPT0gbWFza2VkICYmIChpbnAudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBjaGFuZ2VkID09PSB0cnVlICYmIChpbm5lclZhbHVlLnZhbHVlID0gbWFza2VkKVxuXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wICYmIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyBtYXNrUmVwbGFjZWQubGVuZ3RoIDogMFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZScgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvciwgY3Vyc29yKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoWyAnZGVsZXRlQ29udGVudEJhY2t3YXJkJywgJ2RlbGV0ZUNvbnRlbnRGb3J3YXJkJyBdLmluZGV4T2YoaW5wdXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICBlbmQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChtYXNrZWQubGVuZ3RoID4gcHJlTWFza2VkLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlKSArIDEpKSArIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGVuZFxuXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSArIDEpKSlcblxuICAgICAgICAgIGlmIChjdXJzb3IgPT09IDEgJiYgZW5kID09PSAxKSB7XG4gICAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGN1cnNvciwgY3Vyc29yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBtYXNrZWQubGVuZ3RoIC0gZW5kUmV2ZXJzZVxuICAgICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZCkgLSAxKVxuICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvciwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbCA9IHByb3BzLnVubWFza2VkVmFsdWUgPT09IHRydWVcbiAgICAgID8gdW5tYXNrVmFsdWUobWFza2VkKVxuICAgICAgOiBtYXNrZWRcblxuICAgIFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKSAhPT0gdmFsICYmIGVtaXRWYWx1ZSh2YWwsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ3Vyc29yRm9yUGFzdGUgKGlucCwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShpbnAudmFsdWUpKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgc3RhcnQpKVxuXG4gICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQsICdmb3J3YXJkJylcbiAgfVxuXG4gIGNvbnN0IG1vdmVDdXJzb3IgPSB7XG4gICAgbGVmdCAoaW5wLCBzdGFydCwgZW5kLCBzZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IG5vTWFya0JlZm9yZSA9IG1hc2tNYXJrZWQuc2xpY2Uoc3RhcnQgLSAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBzdGFydCsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIHN0YXJ0IF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBzdGFydCBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodChpbnAsIDAsIDApXG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKFxuICAgICAgICBzdGFydCxcbiAgICAgICAgc2VsZWN0aW9uID09PSB0cnVlID8gZW5kIDogc3RhcnQsICdiYWNrd2FyZCdcbiAgICAgIClcbiAgICB9LFxuXG4gICAgcmlnaHQgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGhcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGVuZCArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgZW5kID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgZW5kID0gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdChpbnAsIGxpbWl0LCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbiA/IHN0YXJ0IDogZW5kLCBlbmQsICdmb3J3YXJkJylcbiAgICB9LFxuXG4gICAgbGVmdFJldmVyc2UgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGlucC52YWx1ZS5sZW5ndGgpXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobG9jYWxNYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgc3RhcnQgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgc3RhcnQgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgMCwgMClcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzZWxlY3Rpb24gPT09IHRydWUgPyBlbmQgOiBzdGFydCwgJ2JhY2t3YXJkJ1xuICAgICAgKVxuICAgIH0sXG5cbiAgICByaWdodFJldmVyc2UgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGgsXG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQobGltaXQpLFxuICAgICAgICBub01hcmtCZWZvcmUgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgZW5kICsgMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgZW5kICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBlbmQgPSBpXG4gICAgICAgICAgZW5kID4gMCAmJiBub01hcmtCZWZvcmUgPT09IHRydWUgJiYgZW5kLS1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgZW5kIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBlbmQgLSAxIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLmxlZnRSZXZlcnNlKGlucCwgbGltaXQsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uID09PSB0cnVlID8gc3RhcnQgOiBlbmQsIGVuZCwgJ2ZvcndhcmQnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTWFza2VkS2V5ZG93biAoZSkge1xuICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkgeyAvLyBMZWZ0IC8gUmlnaHRcbiAgICAgIGNvbnN0IGZuID0gbW92ZUN1cnNvclsgKGUua2V5Q29kZSA9PT0gMzkgPyAncmlnaHQnIDogJ2xlZnQnKSArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnUmV2ZXJzZScgOiAnJykgXVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGZuKGlucCwgc3RhcnQsIGVuZCwgZS5zaGlmdEtleSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0LCBlbmQsIHRydWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS5rZXlDb2RlID09PSA0NiAvLyBEZWxldGVcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBzdGFydCwgZW5kLCB0cnVlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnKSB7IHJldHVybiAnJyB9XG5cbiAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbWFza1ZhbHVlUmV2ZXJzZSh2YWwpXG4gICAgfVxuXG4gICAgY29uc3QgbWFzayA9IGNvbXB1dGVkTWFza1xuXG4gICAgbGV0IHZhbEluZGV4ID0gMCwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IDA7IG1hc2tJbmRleCA8IG1hc2subGVuZ3RoOyBtYXNrSW5kZXgrKykge1xuICAgICAgY29uc3RcbiAgICAgICAgdmFsQ2hhciA9IHZhbFsgdmFsSW5kZXggXSxcbiAgICAgICAgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWZcbiAgICAgICAgdmFsQ2hhciA9PT0gbWFza0RlZiAmJiB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh2YWxDaGFyICE9PSB2b2lkIDAgJiYgbWFza0RlZi5yZWdleC50ZXN0KHZhbENoYXIpKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKVxuICAgICAgICAgIDogdmFsQ2hhclxuICAgICAgICB2YWxJbmRleCsrXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hc2tWYWx1ZVJldmVyc2UgKHZhbCkge1xuICAgIGNvbnN0XG4gICAgICBtYXNrID0gY29tcHV0ZWRNYXNrLFxuICAgICAgZmlyc3RUb2tlbkluZGV4ID0gbWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGxldCB2YWxJbmRleCA9IHZhbC5sZW5ndGggLSAxLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gbWFzay5sZW5ndGggLSAxOyBtYXNrSW5kZXggPj0gMCAmJiB2YWxJbmRleCA+IC0xOyBtYXNrSW5kZXgtLSkge1xuICAgICAgY29uc3QgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGxldCB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ID0gbWFza0RlZiArIG91dHB1dFxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4LS1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG91dHB1dCA9IChtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcikgOiB2YWxDaGFyKSArIG91dHB1dFxuICAgICAgICAgIHZhbEluZGV4LS1cbiAgICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXG4gICAgICAgIH0gd2hpbGUgKGZpcnN0VG9rZW5JbmRleCA9PT0gbWFza0luZGV4ICYmIHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVubWFza1ZhbHVlICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycgfHwgY29tcHV0ZWRVbm1hc2sgPT09IHZvaWQgMFxuICAgICAgPyAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBjb21wdXRlZFVubWFzaygnJyArIHZhbCkgOiB2YWwpXG4gICAgICA6IGNvbXB1dGVkVW5tYXNrKHZhbClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXaXRoTWFzayAodmFsKSB7XG4gICAgaWYgKG1hc2tSZXBsYWNlZC5sZW5ndGggLSB2YWwubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlICYmIHZhbC5sZW5ndGggPiAwXG4gICAgICA/IG1hc2tSZXBsYWNlZC5zbGljZSgwLCAtdmFsLmxlbmd0aCkgKyB2YWxcbiAgICAgIDogdmFsICsgbWFza1JlcGxhY2VkLnNsaWNlKHZhbC5sZW5ndGgpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyVmFsdWUsXG4gICAgaGFzTWFzayxcbiAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgIG9uTWFza2VkS2V5ZG93blxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZUZvcm1Qcm9wcyA9IHtcbiAgbmFtZTogU3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtQXR0cnMgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoe1xuICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgfSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5qZWN0IChmb3JtQXR0cnMgPSB7fSkge1xuICByZXR1cm4gKGNoaWxkLCBhY3Rpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNoaWxkWyBhY3Rpb24gXShcbiAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICBjbGFzczogJ2hpZGRlbicgKyAoY2xhc3NOYW1lIHx8ICcnKSxcbiAgICAgICAgLi4uZm9ybUF0dHJzLnZhbHVlXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUlucHV0TmFtZUF0dHIgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lIHx8IHByb3BzLmZvcilcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHR5cGVHdWFyZCkge1xuICBmdW5jdGlvbiBnZXRGb3JtRG9tUHJvcHMgKCkge1xuICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGR0ID0gJ0RhdGFUcmFuc2ZlcicgaW4gd2luZG93XG4gICAgICAgID8gbmV3IERhdGFUcmFuc2ZlcigpXG4gICAgICAgIDogKCdDbGlwYm9hcmRFdmVudCcgaW4gd2luZG93XG4gICAgICAgICAgICA/IG5ldyBDbGlwYm9hcmRFdmVudCgnJykuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIGlmIChPYmplY3QobW9kZWwpID09PSBtb2RlbCkge1xuICAgICAgICAoJ2xlbmd0aCcgaW4gbW9kZWxcbiAgICAgICAgICA/IEFycmF5LmZyb20obW9kZWwpXG4gICAgICAgICAgOiBbIG1vZGVsIF1cbiAgICAgICAgKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgIGR0Lml0ZW1zLmFkZChmaWxlKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogZHQuZmlsZXNcbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZUd1YXJkID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMudHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Rm9ybURvbVByb3BzKClcbiAgICB9KVxuICAgIDogY29tcHV0ZWQoZ2V0Rm9ybURvbVByb3BzKVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IGZhbHNlXG4gICAgICBvbklucHV0KGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS50eXBlID09PSAnY29tcG9zaXRpb251cGRhdGUnXG4gICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlXG4gICAgICAmJiB0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgY29uc3QgaXNDb21wb3NpbmcgPSBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICA/IGlzUGxhaW5UZXh0LnRlc3QoZS5kYXRhKSA9PT0gZmFsc2VcbiAgICAgICAgOiBpc0phcGFuZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0NoaW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzS29yZWFuLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZVxuXG4gICAgICBpZiAoaXNDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHVzZU1hc2ssIHsgdXNlTWFza1Byb3BzIH0gZnJvbSAnLi91c2UtbWFzay5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUZpbGVGb3JtRG9tUHJvcHMgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS1kb20tcHJvcHMuanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5wdXQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZU1hc2tQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7IHJlcXVpcmVkOiBmYWxzZSB9LFxuXG4gICAgc2hhZG93VGV4dDogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcblxuICAgIGRlYm91bmNlOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBhdXRvZ3JvdzogQm9vbGVhbiwgLy8gbWFrZXMgYSB0ZXh0YXJlYVxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdwYXN0ZScsICdjaGFuZ2UnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB0ZW1wID0ge31cbiAgICBsZXQgZW1pdENhY2hlZFZhbHVlID0gTmFOLCB0eXBlZE51bWJlciwgc3RvcFZhbHVlV2F0Y2hlciwgZW1pdFRpbWVyLCBlbWl0VmFsdWVGblxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgIGhhc01hc2ssXG4gICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgICBvbk1hc2tlZEtleWRvd25cbiAgICB9ID0gdXNlTWFzayhwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZilcblxuICAgIGNvbnN0IGZvcm1Eb21Qcm9wcyA9IHVzZUZpbGVGb3JtRG9tUHJvcHMocHJvcHMsIC8qIHR5cGUgZ3VhcmQgKi8gdHJ1ZSlcbiAgICBjb25zdCBoYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChpbm5lclZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IG9uQ29tcG9zaXRpb24gPSB1c2VLZXlDb21wb3NpdGlvbihvbklucHV0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlzVGV4dGFyZWEgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyB8fCBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzVHlwZVRleHQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICAgIClcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgb25QYXN0ZSxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlLFxuICAgICAgICBvbkJsdXI6IG9uRmluaXNoRWRpdGluZyxcbiAgICAgICAgb25Gb2N1czogc3RvcFxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uS2V5ZG93biA9IG9uTWFza2VkS2V5ZG93blxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uQW5pbWF0aW9uZW5kID0gYWRqdXN0SGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgcm93czogcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyA/IDYgOiB2b2lkIDAsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RleHRhcmVhLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBhdHRycy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnMucm93cyA9IDFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgbG9zZSB0aGUgbmF0aXZlIGlucHV0IHZhbHVlXG4gICAgLy8gc28gd2UgbmVlZCB0byByZWF0dGFjaCBpdCBkeW5hbWljYWxseVxuICAgIC8vIChsaWtlIHR5cGU9XCJwYXNzd29yZFwiIDwtPiB0eXBlPVwidGV4dFwiOyBzZWUgIzEyMDc4KVxuICAgIHdhdGNoKCgpID0+IHByb3BzLnR5cGUsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RvcFZhbHVlV2F0Y2hlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuXG4gICAgICAgICAgaWYgKFN0cmluZyh2KSA9PT0gZW1pdENhY2hlZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVyVmFsdWUudmFsdWUgIT09IHYpIHtcbiAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZSA9IHZcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0eXBlZE51bWJlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b2dyb3csIHZhbCA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIGlmIGl0IGhhcyBhIG51bWJlciBvZiByb3dzIHNldCByZXNwZWN0IGl0XG4gICAgICBlbHNlIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBhdHRycy5yb3dzID4gMCkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVuc2UsICgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBpbnB1dFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICAgICAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0ICgpIHtcbiAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGlucHV0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXN0ZSAoZSkge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlucCA9IGUudGFyZ2V0XG4gICAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZShpbnAsIGlucC5zZWxlY3Rpb25TdGFydCwgaW5wLnNlbGVjdGlvbkVuZClcbiAgICAgIH1cblxuICAgICAgZW1pdCgncGFzdGUnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGlmICghZSB8fCAhZS50YXJnZXQgfHwgZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHZhbCwgZmFsc2UsIGUuaW5wdXRUeXBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZSh2YWwpXG5cbiAgICAgICAgaWYgKGlzVHlwZVRleHQudmFsdWUgPT09IHRydWUgJiYgZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgfSA9IGUudGFyZ2V0XG5cbiAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCAmJiBzZWxlY3Rpb25FbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgdmFsLmluZGV4T2YoZS50YXJnZXQudmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2UgbmVlZCB0byB0cmlnZ2VyIGl0IGltbWVkaWF0ZWx5IHRvbyxcbiAgICAgIC8vIHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiXG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBzdG9wV2F0Y2hlcikge1xuICAgICAgZW1pdFZhbHVlRm4gPSAoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlICE9PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB2YWwgJiYgZW1pdENhY2hlZFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPSB2YWxcblxuICAgICAgICAgIHN0b3BXYXRjaGVyID09PSB0cnVlICYmIChzdG9wVmFsdWVXYXRjaGVyID0gdHJ1ZSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcblxuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9PT0gdmFsICYmIChlbWl0Q2FjaGVkVmFsdWUgPSBOYU4pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXRWYWx1ZUZuID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICB0eXBlZE51bWJlciA9IHRydWVcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGVib3VuY2UgIT09IHZvaWQgMCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICAgIGVtaXRUaW1lciA9IHNldFRpbWVvdXQoZW1pdFZhbHVlRm4sIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZUZuKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgZnVuY3Rpb24gYWRqdXN0SGVpZ2h0ICgpIHtcbiAgICAgIGNvbnN0IGlucCA9IGlucHV0UmVmLnZhbHVlXG4gICAgICBpZiAoaW5wICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudFN0eWxlID0gaW5wLnBhcmVudE5vZGUuc3R5bGVcbiAgICAgICAgY29uc3QgeyBvdmVyZmxvdyB9ID0gaW5wLnN0eWxlXG5cbiAgICAgICAgLy8gcmVzZXQgaGVpZ2h0IG9mIHRleHRhcmVhIHRvIGEgc21hbGwgc2l6ZSB0byBkZXRlY3QgdGhlIHJlYWwgaGVpZ2h0XG4gICAgICAgIC8vIGJ1dCBrZWVwIHRoZSB0b3RhbCBjb250cm9sIHNpemUgdGhlIHNhbWVcbiAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gKGlucC5zY3JvbGxIZWlnaHQgLSAxKSArICdweCdcbiAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9ICcxcHgnXG4gICAgICAgIGlucC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG5cbiAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9IGlucC5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgIGlucC5zdHlsZS5vdmVyZmxvdyA9IG92ZXJmbG93XG4gICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UgKGUpIHtcbiAgICAgIG9uQ29tcG9zaXRpb24oZSlcblxuICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICBlbWl0KCdjaGFuZ2UnLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaEVkaXRpbmcgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG5cbiAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG4gICAgICBkZWxldGUgdGVtcC52YWx1ZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHVzZSBzZXRUaW1lb3V0IGluc3RlYWQgb2YgdGhpcy4kbmV4dFRpY2tcbiAgICAgIC8vIHRvIGF2b2lkIGEgYnVnIHdoZXJlIGZvY3Vzb3V0IGlzIG5vdCBlbWl0dGVkIGZvciB0eXBlIGRhdGUvdGltZS93ZWVrLy4uLlxuICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1clZhbHVlICgpIHtcbiAgICAgIHJldHVybiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgID8gdGVtcC52YWx1ZVxuICAgICAgICA6IChpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJycpXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIG9uRmluaXNoRWRpdGluZygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmaWVsZENsYXNzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBgcS0keyBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcgfWBcbiAgICAgICAgKyAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUgPyAnIHEtdGV4dGFyZWEtLWF1dG9ncm93JyA6ICcnKVxuICAgICAgKSxcblxuICAgICAgaGFzU2hhZG93OiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgJiYgdHlwZW9mIHByb3BzLnNoYWRvd1RleHQgPT09ICdzdHJpbmcnXG4gICAgICAgICYmIHByb3BzLnNoYWRvd1RleHQubGVuZ3RoID4gMFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG5cbiAgICAgIGVtaXRWYWx1ZSxcblxuICAgICAgaGFzVmFsdWUsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0Jywge1xuICAgICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICdxLWZpZWxkX19uYXRpdmUgcS1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBwcm9wcy5pbnB1dENsYXNzXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgICAuLi5pbnB1dEF0dHJzLnZhbHVlLFxuICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlLFxuICAgICAgICAgIC4uLihcbiAgICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAgICAgICA/IHsgdmFsdWU6IGdldEN1clZhbHVlKCkgfVxuICAgICAgICAgICAgICA6IGZvcm1Eb21Qcm9wcy52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdldFNoYWRvd0NvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSBxLWZpZWxkX19zaGFkb3cgYWJzb2x1dGUtYm90dG9tIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgICAgKyAoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyB0ZXh0LW5vLXdyYXAnKVxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdpbnZpc2libGUnIH0sIGdldEN1clZhbHVlKCkpLFxuICAgICAgICAgIGgoJ3NwYW4nLCBwcm9wcy5zaGFkb3dUZXh0KVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW5kZXJGbiA9IHVzZUZpZWxkKHN0YXRlKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIGZvY3VzLFxuICAgICAgc2VsZWN0LFxuICAgICAgZ2V0TmF0aXZlRWxlbWVudDogKCkgPT4gaW5wdXRSZWYudmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlbmRlckZuXG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSWUsc0JBQVUsRUFBRSxVQUFVLGlCQUFpQixpQkFBaUI7QUFDckUsUUFBTSxRQUFRLE9BQU8sU0FBUyxLQUFLO0FBRW5DLE1BQUksVUFBVSxPQUFPO0FBQ25CLFVBQU0sRUFBRSxPQUFPLFVBQVUsbUJBQW9CO0FBRzdDLFdBQU8sT0FBTyxPQUFPLEVBQUUsVUFBVSxnQkFBZSxDQUFFO0FBRWxELFVBQU0sTUFBTSxNQUFNLFNBQVMsU0FBTztBQUNoQyxVQUFJLFFBQVEsTUFBTTtBQUNoQixlQUFPLG9CQUFvQixjQUFjLGdCQUFpQjtBQUMxRCxjQUFNLGdCQUFnQixLQUFLO0FBQUEsTUFDNUIsT0FDSTtBQUNILGNBQU0sY0FBYyxLQUFLO0FBQUEsTUFDMUI7QUFBQSxJQUNQLENBQUs7QUFHRCxVQUFNLFlBQVksUUFBUSxNQUFNLGNBQWMsS0FBSztBQUVuRCxvQkFBZ0IsTUFBTTtBQUVwQixZQUFNLFlBQVksUUFBUSxNQUFNLGdCQUFnQixLQUFLO0FBQUEsSUFDM0QsQ0FBSztBQUFBLEVBQ0YsV0FDUSxrQkFBa0IsTUFBTTtBQUMvQixZQUFRLE1BQU0sMkNBQTJDO0FBQUEsRUFDMUQ7QUFDSDtBQ2hDQSxNQUNFLE1BQU0sc0NBQ04sT0FBTyxzQ0FDUCxZQUFZLG9FQUNaLE1BQU0seUhBQ04sT0FBTztBQUdGLE1BQU0sY0FBYztBQUFBLEVBQ3pCLE1BQU0sT0FBSyw4QkFBOEIsS0FBSyxDQUFDO0FBQUEsRUFDL0MsTUFBTSxPQUFLLDhCQUE4QixLQUFLLENBQUM7QUFBQSxFQUMvQyxVQUFVLE9B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
