import{r as S,a as n,h as i,c as _,aa as O,ab as w,ax as q,Q as z,u as B,d as C,g as P,O as $,i as R,l as T}from"./index.c6e9e2f2.js";import{u as j,a as E}from"./global.b41e9797.js";import{u as V,c as A}from"./QInput.4db2613a.js";function D(e,c){const l=S(null),s=n(()=>e.disable!==!0?null:i("span",{ref:l,class:"no-outline",tabindex:-1}));function b(r){const o=c.value;r!==void 0&&r.type.indexOf("key")===0?o!==null&&document.activeElement!==o&&o.contains(document.activeElement)===!0&&o.focus():l.value!==null&&(r===void 0||o!==null&&o.contains(r.target)===!0)&&l.value.focus()}return{refocusTargetEl:s,refocusTarget:b}}var F={xs:30,sm:35,md:40,lg:50,xl:60};const K=i("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24","aria-hidden":"true"},[i("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),i("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var G=_({name:"QRadio",props:{...j,...O,...V,modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},emits:["update:modelValue"],setup(e,{slots:c,emit:l}){const{proxy:s}=P(),b=E(e,s.$q),r=w(e,F),o=S(null),{refocusTargetEl:g,refocusTarget:m}=D(e,o),d=n(()=>q(e.modelValue)===q(e.val)),x=n(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(e.disable===!0?" disabled":"")+(b.value===!0?" q-radio--dark":"")+(e.dense===!0?" q-radio--dense":"")+(e.leftLabel===!0?" reverse":"")),y=n(()=>{const t=e.color!==void 0&&(e.keepColor===!0||d.value===!0)?` text-${e.color}`:"";return`q-radio__inner relative-position q-radio__inner--${d.value===!0?"truthy":"falsy"}${t}`}),a=n(()=>(d.value===!0?e.checkedIcon:e.uncheckedIcon)||null),f=n(()=>e.disable===!0?-1:e.tabindex||0),v=n(()=>{const t={type:"radio"};return e.name!==void 0&&Object.assign(t,{"^checked":d.value===!0?"checked":void 0,name:e.name,value:e.val}),t}),h=A(v);function u(t){t!==void 0&&($(t),m(t)),e.disable!==!0&&d.value!==!0&&l("update:modelValue",e.val,t)}function Q(t){(t.keyCode===13||t.keyCode===32)&&$(t)}function I(t){(t.keyCode===13||t.keyCode===32)&&u(t)}return Object.assign(s,{set:u}),()=>{const t=a.value!==null?[i("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[i(z,{class:"q-radio__icon",name:a.value})])]:[K];e.disable!==!0&&h(t,"unshift"," q-radio__native q-ma-none q-pa-none");const k=[i("div",{class:y.value,style:r.value},t)];g.value!==null&&k.push(g.value);const p=e.label!==void 0?B(c.default,[e.label]):C(c.default);return p!==void 0&&k.push(i("div",{class:"q-radio__label q-anchor--skip"},p)),i("div",{ref:o,class:x.value,tabindex:f.value,role:"radio","aria-label":e.label,"aria-checked":d.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:u,onKeydown:Q,onKeyup:I},k)}}});const L={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function M(){const{props:e,proxy:c}=P(),{$q:l}=c,s=R(T,()=>{console.error("QPageSticky needs to be child of QLayout")}),b=n(()=>{const a=e.position;return{top:a.indexOf("top")>-1,right:a.indexOf("right")>-1,bottom:a.indexOf("bottom")>-1,left:a.indexOf("left")>-1,vertical:a==="top"||a==="bottom",horizontal:a==="left"||a==="right"}}),r=n(()=>s.header.offset),o=n(()=>s.right.offset),g=n(()=>s.footer.offset),m=n(()=>s.left.offset),d=n(()=>{let a=0,f=0;const v=b.value,h=l.lang.rtl===!0?-1:1;v.top===!0&&r.value!==0?f=`${r.value}px`:v.bottom===!0&&g.value!==0&&(f=`${-g.value}px`),v.left===!0&&m.value!==0?a=`${h*m.value}px`:v.right===!0&&o.value!==0&&(a=`${-h*o.value}px`);const u={transform:`translate(${a}, ${f})`};return e.offset&&(u.margin=`${e.offset[1]}px ${e.offset[0]}px`),v.vertical===!0?(m.value!==0&&(u[l.lang.rtl===!0?"right":"left"]=`${m.value}px`),o.value!==0&&(u[l.lang.rtl===!0?"left":"right"]=`${o.value}px`)):v.horizontal===!0&&(r.value!==0&&(u.top=`${r.value}px`),g.value!==0&&(u.bottom=`${g.value}px`)),u}),x=n(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function y(a){const f=C(a.default);return i("div",{class:x.value,style:d.value},e.expand===!0?f:[i("div",f)])}return{$layout:s,getStickyContent:y}}var H=_({name:"QPageSticky",props:L,setup(e,{slots:c}){const{getStickyContent:l}=M();return()=>l(c)}});export{G as Q,H as a};
