import{Q as i}from"./QInput.558b6acb.js";import{Q as c}from"./QPage.f252a6e0.js";import{b as u}from"./global.c23c0a78.js";import{_ as m,r as d,x as p,y as f,z as _,J as s,C as h,D as g,A as v,a7 as x}from"./index.1885129a.js";import{u as y}from"./use-quasar.aea8cf37.js";import"./format.801e7424.js";import"./axios.ce4e764a.js";const b={setup(){const e=u();e.aeinfo="",e.aedocument="";const o=y(),a=d("");async function t(){if(a.value.trim()){let n={albaran:a.value,empresa:e.customer},r=await e.getDeliveryInfo(n);r?(a.value="",o.notify({type:"negative",message:r,position:"center",timeout:1e4,actions:[{label:"",icon:"close",color:"white",handler:()=>{}}]})):e.aedocument=a.value}}return{globalStore:e,numae:a,searchae:t}}},V={class:"text-center text-h4 text-weight-bold"},w=s("hr",null,null,-1),Q={class:"q-pa-md"},q=s("span",null,"N\xFAmero de Albar\xE1n de Entrega",-1);function D(e,o,a,t,l,n){return p(),f(c,{class:"flex-center q-pa-md"},{default:_(()=>[s("div",V,[h(" Cliente "+g(t.globalStore.customer)+" ",1),w]),s("div",Q,[q,v(i,{modelValue:t.numae,"onUpdate:modelValue":o[0]||(o[0]=r=>t.numae=r),onKeyup:x(t.searchae,["enter"]),filled:"",autofocus:"",hint:"Pistolear AE a cargar o descargar"},null,8,["modelValue","onKeyup"])])]),_:1})}var k=m(b,[["render",D]]);export{k as default};
