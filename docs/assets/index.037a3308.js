import{r as _,a as m,o as c,c as u,b as d,F as h,d as y,u as v,e as g,f as k,w as b,g as N,t as L,h as C,i as E,j as B}from"./vendor.9be59a0b.js";const $=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};$();var w=[{compName:"Button",compZhName:"\u6309\u94AE",compDesc:"\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE",compClassName:"button"}];const x={class:"my-kit-doc"},O={setup(a){const t=_({links:w.map(o=>({path:`/${o.compName}`,name:o.compZhName}))});return(o,n)=>{const e=m("router-link"),r=m("router-view");return c(),u("div",x,[d("aside",null,[(c(!0),u(h,null,y(v(t).links,(s,i)=>(c(),k(e,{key:i,to:s.path},{default:b(()=>[N(L(s.name),1)]),_:2},1032,["to"]))),128))]),d("main",null,[g(r)])])}}};var P=(a,t)=>{const o=a.__vccOpts||a;for(const[n,e]of t)o[n]=e;return o};const S={};function A(a,t){return c(),u("button",{class:"my-button",onClick:t[0]||(t[0]=o=>a.$emit("click",o))}," sdaljfalsj ")}var V=P(S,[["render",A],["__scopeId","data-v-c3febaac"]]);const l={install(a){a.component("my-button",V)}},j={install(a){var t;(t=l.install)==null||t.call(l,a)}},D="modulepreload",p={},F="./",I=function(t,o){return!o||o.length===0?t():Promise.all(o.map(n=>{if(n=`${F}${n}`,n in p)return;p[n]=!0;const e=n.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const s=document.createElement("link");if(s.rel=e?"stylesheet":D,e||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),e)return new Promise((i,f)=>{s.addEventListener("load",i),s.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())},R=[{title:"\u6309\u94AE",name:"Button",path:"/Button",component:()=>I(()=>import("./readme.a411cec9.js"),["assets/readme.a411cec9.js","assets/vendor.9be59a0b.js"])}],q={history:C(),routes:R,scrollBehavior(a,t){if(a.path!==t.path)return{top:0}}},H=E(q);B(O).use(H).use(j).mount("#app");
