var ve=Object.defineProperty,ye=Object.defineProperties;var _e=Object.getOwnPropertyDescriptors;var oe=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var q=(t,e,o)=>e in t?ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,z=(t,e)=>{for(var o in e||(e={}))Ce.call(e,o)&&q(t,o,e[o]);if(oe)for(var o of oe(e))be.call(e,o)&&q(t,o,e[o]);return t},O=(t,e)=>ye(t,_e(e));var H=(t,e,o)=>(q(t,typeof e!="symbol"?e+"":e,o),o);import{d as A,r as D,o as v,c as C,a as u,t as L,F as x,p as ke,b as $e,e as g,f as Z,g as E,h as a,w as d,i as G,n as K,j as B,k as we,l as U,m as ae,q as Q,s as Ee,u as re,v as De,x as ne,y as Fe,z as Se,A as Pe,B as Me}from"./vendor.908f723a.js";const Ao={},Te=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerpolicy&&(i.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?i.credentials="include":l.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(l){if(l.ep)return;l.ep=!0;const i=o(l);fetch(l.href,i)}};Te();var S=(t,e)=>{const o=t.__vccOpts||t;for(const[n,l]of e)o[n]=l;return o};const Y=t=>(ke("data-v-c64669ae"),t=t(),$e(),t),Be=Y(()=>u("p",null,[g(" Recommended IDE setup: "),u("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode"),g(" + "),u("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar")],-1)),Ae=Y(()=>u("p",null,[g("See "),u("code",null,"README.md"),g(" for more information.")],-1)),Le=Y(()=>u("p",null,[u("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Docs "),g(" | "),u("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Docs")],-1)),Ie=Y(()=>u("p",null,[g(" Edit "),u("code",null,"components/HelloWorld.vue"),g(" to test hot module replacement. ")],-1)),Ve=A({props:{msg:null},setup(t){const e=D(0);return(o,n)=>(v(),C(x,null,[u("h1",null,L(t.msg),1),Be,Ae,Le,u("button",{type:"button",onClick:n[0]||(n[0]=l=>e.value++)},"count is: "+L(e.value),1),Ie],64))}});var ue=S(Ve,[["__scopeId","data-v-c64669ae"]]);const We=t=>new Promise((e,o)=>{let n={code:200,msg:"\u64CD\u4F5C\u6210\u529F",time:"1646138954653",currentPage:null,pageSize:null,totalPage:0,total:0,pageList:null,errors:null,data:{children:[],ids:null,operateBtn:null,id:"824039851459346432",roleName:"\u533F\u540D",roleCode:"anon",isDefault:1,priorityLevel:0,createTime:"2021-03-23 22:00:11",updateTime:"2022-03-01 20:49:14",disabled:0,root:!1}};setTimeout(()=>{e(n)},2e3)}),Ne=t=>new Promise((e,o)=>{let n={code:500,msg:"\u64CD\u4F5C\u5931\u8D25",time:"1646138954653",currentPage:null,pageSize:null,totalPage:0,total:0,pageList:null,errors:null,data:{children:[],ids:null,operateBtn:null,id:"824039851459346432",roleName:"\u533F\u540D",roleCode:"anon",isDefault:1,priorityLevel:0,createTime:"2021-03-23 22:00:11",updateTime:"2022-03-01 20:49:14",disabled:0,root:!1}};setTimeout(()=>{e(n)},3e3)}),ze=A({name:"UserForm",components:{HelloWorld:ue},props:{msg:{type:String,default:"\u54C8\u54C8"},runMode:{type:String}},setup(){return{form:Z({name:"111",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}),doSubmit:async()=>await We(),doUpdate:()=>Ne()}}}),He=u("span",{class:"text-gray-500"},"-",-1),xe=u("p",null,"dsaklfajslj",-1),Re=u("p",null,"dsaklfajslj",-1),Oe=u("p",null,"dsaklfajslj",-1),je=u("p",null,"dsaklfajslj",-1),Ue=u("p",null,"dsaklfajslj",-1);function Ye(t,e,o,n,l,i){const s=E("el-input"),r=E("el-form-item"),c=E("el-option"),y=E("el-select"),P=E("el-date-picker"),F=E("el-col"),W=E("el-time-picker"),I=E("el-switch"),f=E("el-checkbox"),M=E("el-checkbox-group"),m=E("el-radio"),$=E("el-radio-group"),R=E("el-form");return v(),C(x,null,[u("div",null,"\u5F53\u524D\u6A21\u5F0F:"+L(t.runMode)+" "+L(t.msg),1),a(R,{ref:"formRef",model:t.form,"label-width":"120px"},{default:d(()=>[a(r,{label:"Activity name"},{default:d(()=>[a(s,{modelValue:t.form.name,"onUpdate:modelValue":e[0]||(e[0]=h=>t.form.name=h)},null,8,["modelValue"])]),_:1}),a(r,{label:"Activity zone"},{default:d(()=>[a(y,{modelValue:t.form.region,"onUpdate:modelValue":e[1]||(e[1]=h=>t.form.region=h),placeholder:"please select your zone"},{default:d(()=>[a(c,{label:"Zone one",value:"shanghai"}),a(c,{label:"Zone two",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity time"},{default:d(()=>[a(F,{span:11},{default:d(()=>[a(P,{modelValue:t.form.date1,"onUpdate:modelValue":e[2]||(e[2]=h=>t.form.date1=h),type:"date",placeholder:"Pick a date",style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(F,{span:2,class:"text-center"},{default:d(()=>[He]),_:1}),a(F,{span:11},{default:d(()=>[a(W,{modelValue:t.form.date2,"onUpdate:modelValue":e[3]||(e[3]=h=>t.form.date2=h),placeholder:"Pick a time",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1}),a(r,{label:"Instant delivery"},{default:d(()=>[a(I,{modelValue:t.form.delivery,"onUpdate:modelValue":e[4]||(e[4]=h=>t.form.delivery=h)},null,8,["modelValue"])]),_:1}),a(r,{label:"Activity type"},{default:d(()=>[a(M,{modelValue:t.form.type,"onUpdate:modelValue":e[5]||(e[5]=h=>t.form.type=h)},{default:d(()=>[a(f,{label:"Online activities",name:"type"}),a(f,{label:"Promotion activities",name:"type"}),a(f,{label:"Offline activities",name:"type"}),a(f,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity type"},{default:d(()=>[a(M,{modelValue:t.form.type,"onUpdate:modelValue":e[6]||(e[6]=h=>t.form.type=h)},{default:d(()=>[a(f,{label:"Online activities",name:"type"}),a(f,{label:"Promotion activities",name:"type"}),a(f,{label:"Offline activities",name:"type"}),a(f,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity type"},{default:d(()=>[a(M,{modelValue:t.form.type,"onUpdate:modelValue":e[7]||(e[7]=h=>t.form.type=h)},{default:d(()=>[a(f,{label:"Online activities",name:"type"}),a(f,{label:"Promotion activities",name:"type"}),a(f,{label:"Offline activities",name:"type"}),a(f,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity type"},{default:d(()=>[a(M,{modelValue:t.form.type,"onUpdate:modelValue":e[8]||(e[8]=h=>t.form.type=h)},{default:d(()=>[a(f,{label:"Online activities",name:"type"}),a(f,{label:"Promotion activities",name:"type"}),a(f,{label:"Offline activities",name:"type"}),a(f,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity type"},{default:d(()=>[a(M,{modelValue:t.form.type,"onUpdate:modelValue":e[9]||(e[9]=h=>t.form.type=h)},{default:d(()=>[a(f,{label:"Online activities",name:"type"}),a(f,{label:"Promotion activities",name:"type"}),a(f,{label:"Offline activities",name:"type"}),a(f,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),xe,Re,Oe,je,Ue,a(r,{label:"Resources"},{default:d(()=>[a($,{modelValue:t.form.resource,"onUpdate:modelValue":e[10]||(e[10]=h=>t.form.resource=h)},{default:d(()=>[a(m,{label:"Sponsor"}),a(m,{label:"Venue"})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"Activity form"},{default:d(()=>[a(s,{modelValue:t.form.desc,"onUpdate:modelValue":e[11]||(e[11]=h=>t.form.desc=h),type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])],64)}var V=S(ze,[["render",Ye]]);const de=(t,{props:e={},app:o=void 0,elm:n=null}={})=>{let l=n,i=a(t,e);return o&&o._context&&(i.appContext=o._context),l&&i?G(i,l):typeof document!="undefined"&&(l=document.createElement("div"),G(i,l)),{vNode:i,el:l}},Xe=(t,{props:e={},app:o=void 0,elm:n=null}={})=>{let l=n,i=a(t,e);return o&&o._context&&(i.appContext=o._context),l&&G(null,l),l=null,i=null,{vNode:i,el:l}};const qe=A({name:"Message",props:{msg:{type:String,required:!0},icon:{type:String,required:!1},iconColor:{type:String,required:!1,default:"red"}}}),Je={class:"message-wrapper"},Ge={class:"success msg-box"},Ze={class:"left-box"},Ke=["innerHTML"],Qe={class:"right-box"},et={class:"msg"};function tt(t,e,o,n,l,i){return v(),C("div",Je,[u("div",Ge,[u("div",Ze,[t.icon?(v(),C("span",{key:0,class:"icon iconfont",style:K({color:t.iconColor}),innerHTML:t.icon},null,12,Ke)):B("",!0)]),u("div",Qe,[u("span",et,L(t.msg),1)])])])}var le=S(qe,[["render",tt],["__scopeId","data-v-4096a6fa"]]);const ot={name:"Welcome"};function nt(t,e,o,n,l,i){return v(),C("h1",null,"SlsahLayer")}var lt=S(ot,[["render",nt]]);const st=A({name:"LayerHeader",props:["min","max","title","info","id","drag"],data(){return{full:!1,moved:!1,move:{startX:0,startY:0,elmStartX:0,elmStartY:0},homePosition:{width:0,height:0,left:0,top:0}}},directives:{},emits:["close","toggleSize","minSize"],methods:{onClose(){this.$emit("close")},onToggleSize(){this.$emit("toggleSize")},onMinSize(){this.$emit("minSize")},onMouseDown(t){if(!this.drag)return;const e=document.getElementById(this.id);!e||(document.onmousemove=this.onMouseMove,document.onmouseup=this.onmouseup,this.move.startX=t.clientX,this.move.startY=t.clientY,this.move.elmStartX=e==null?void 0:e.offsetLeft,this.move.elmStartY=e==null?void 0:e.offsetTop,this.moved=!0,e.classList.remove("slash-trans"))},onMouseMove(t){const e=t.clientX-this.move.startX,o=t.clientY-this.move.startY;if(this.moved){const n=document.getElementById(this.id);if(n){let l=o+this.move.elmStartY,i=e+this.move.elmStartX,s=window.innerHeight-n.offsetHeight,r=window.innerWidth-n.offsetWidth;l=l>0?l:0,i=i>0?i:0,l=l<s?l:s,i=i<r?i:r,n.style.top=l+"px",n.style.left=i+"px"}}},onmouseup(){const t=document.getElementById(this.id);t==null||t.classList.add("slash-trans"),this.moved=!1,document.onmousemove=null}}}),it={class:"title"},at={class:"header-tool"},rt={key:0,class:"iconfont",title:"\u8BF4\u660E"};function ut(t,e,o,n,l,i){return v(),C("div",{onDblclick:e[4]||(e[4]=we((...s)=>t.onToggleSize&&t.onToggleSize(...s),["self"])),onMousedown:e[5]||(e[5]=(...s)=>t.onMouseDown&&t.onMouseDown(...s))},[u("span",it,L(t.title),1),u("span",at,[t.info?(v(),C("i",rt,"\uE65A")):B("",!0),t.min?(v(),C("i",{key:1,class:"iconfont",onClick:e[0]||(e[0]=(...s)=>t.onMinSize&&t.onMinSize(...s)),title:"\u6700\u5C0F\u5316"},"\uE622")):B("",!0),t.full?(v(),C("i",{key:2,class:"iconfont",onClick:e[1]||(e[1]=(...s)=>t.onToggleSize&&t.onToggleSize(...s)),title:"\u6700\u5C0F\u5316"},"\uE749")):B("",!0),t.max&&!t.full?(v(),C("i",{key:3,class:"iconfont",onClick:e[2]||(e[2]=(...s)=>t.onToggleSize&&t.onToggleSize(...s)),title:"\u6700\u5927\u5316"},"\uE70E")):B("",!0),u("i",{class:"iconfont",onClick:e[3]||(e[3]=s=>t.onClose()),title:"\u5173\u95ED"},"\uE661")])],32)}var dt=S(st,[["render",ut]]),ct=A({render(){const t=this.content;let e=this.props;return a(t,z({ref:"targetRef"},e))},props:{content:{type:Object},props:{type:Object}},setup(t,e){const{props:o,content:n}=U(t),l=D();return{props:o,content:n,doSubmit:()=>{if(l.value.doSubmit)return l.value.doSubmit()},targetRef:l}}});const ft=A({name:"LayerFooter",props:{id:{type:String},btnList:{type:Object}},emits:["btnClick"],methods:{},setup(t,e){return{onClick:function(n){e.emit("btnClick",n)}}}}),mt={class:"layer-footer"},pt={class:"footer-tool"},ht=["disabled","onClick"];function gt(t,e,o,n,l,i){return v(),C("div",mt,[u("div",pt,[(v(!0),C(x,null,ae(t.btnList,(s,r)=>(v(),C("button",{href:"javascript:void(0)",disabled:s.curLoading,class:Q([s.className,"btn"]),onClick:c=>t.onClick(r)},L(s.name),11,ht))),256))])])}var vt=S(ft,[["render",gt]]);const ce="layer_",se="root_",j="default",yt="full",J={title:"\u5F39\u51FA\u6846",max:!0,min:!0,header:!0,footer:!0,autoCloseTime:0,loadingTime:200,successDecide:t=>{console.error("\u8BF7\u914D\u7F6EsuccessDecide\u624D\u80FD\u4F7F\u7528\u8868\u5355\u5F39\u6846")},areaDef:{sm:{width:400,height:600,top:120},md:{width:800,height:600,top:100},lg:{width:1200,height:800,top:60},default:{width:800,height:600,top:120}}};class k{static checkPromise(e){return e&&e.then}static getMaxZIndex(){let o=[...document.querySelectorAll("*")].map(n=>+window.getComputedStyle(n).zIndex||0);return o.length?Math.max(...o):0}static uuid(){function e(){return((1+Math.random())*65536|0).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}static createId(){return ce+k.uuid()}static getViewPortWidth(){return document.documentElement.clientWidth||document.body.offsetWidth||document.body.clientWidth}static getViewPortHeight(){return document.documentElement.clientHeight||document.body.clientHeight}static getAbsolutePosition(e,o){const n={left:-o.clientLeft,top:-o.clientTop,right:0,bottom:0};let l=o;for(;l!=e&&l!=document;)n.left=n.left+l.offsetLeft+l.clientLeft,n.top=n.top+l.offsetTop+l.clientTop,l=l.parentNode;return isNaN(e.scrollLeft)?(n.right=document.documentElement.scrollWidth-n.left,n.bottom=document.documentElement.scrollHeight-n.top):(n.right=e.scrollWidth-n.left,n.bottom=e.scrollHeight-n.top),n}static mergeJson(e,o){for(const n in o)e[n]==null&&(e[n]=o[n]);return e}static leftMergeJson(e,o){for(const n in o)o[n]!=null&&(e[n]=o[n]);return e}static coverJson(e,o){for(const n in o)e[n]=o[n];return e}static deepClone(e){const o=typeof e.splice=="function"?[]:{};if(e&&typeof e=="object"){for(const n in e)e[n]&&typeof e[n]=="object"?o[n]=k.deepClone(e[n]):o[n]=e[n];return o}return e}}function _t(){const{proxy:t}=Ee();return{proxy:t}}const Ct=A({name:"LayerWrapper",components:{LayerFooter:vt,LayerContent:ct,LayerHeader:dt},data(){return{full:!1,moved:!1,drag:!0,sWin:!1,homePosition:{width:200,height:0,left:0,top:0},sWinHomePosition:{width:0,height:0,left:0,top:0}}},props:{options:{type:Object,required:!0}},methods:{onToggleSize(){!this.dbFull||(this.full?this.doRestoreSize():this.doFullScreen())},doRestoreSize(){const t=document.getElementById(this.id);if(t){this.setPosition(this.homePosition),this.sWin=!1,this.drag=!0;const e=t.getElementsByClassName("footer");if(e&&e.length>0){const o=e[0];o.style.position=""}}this.full=!1},setPosition(t){const e=document.getElementById(this.id);e&&(e.style.width=t.width+"px",e.style.height=t.height+"px",e.style.top=t.top+"px",e.style.left=t.left+"px")},doFullScreen(){const t=document.getElementById(this.id);if(!t)return;k.getViewPortWidth();const e=k.getViewPortHeight();this.homePosition.left=t.offsetLeft,this.homePosition.top=t.offsetTop,this.homePosition.height=t.offsetHeight,this.homePosition.width=t.offsetWidth,t.style.width="100%",t.style.height=e+"px",t.style.top=0+"px",t.style.left=0+"px";const o=t.getElementsByClassName("footer");if(o&&o.length>0){const n=o[0];n.style.position="absolute"}this.full=!0},doRearrange(){const t=document.getElementsByClassName(".slash-layer-swin");if(t){let e=0;for(let o=0;o<t.length;o++){let n=t[o],l=n.offsetHeight;n.offsetWidth;let i=120/l;n.style.top=e+"px",e+=l*i+10}}},doMinSize(){if(!this.id)return;let t=document.getElementById(this.id);if(!t)return;this.drag=!1,this.sWinHomePosition.left=t.offsetLeft,this.sWinHomePosition.top=t.offsetTop,this.sWinHomePosition.height=t.offsetHeight,this.sWinHomePosition.width=t.offsetWidth;let e=200/t.offsetWidth,o=120/t.offsetHeight;t.style.transform=`scale(${e},${o})`,t.style.left=k.getViewPortWidth()-t.offsetWidth*e+"px";let n=document.querySelectorAll(".slash-layer-swin"),l=0;if(n)for(let i=0;i<n.length;i++){let r=n[i].offsetHeight,c=120/r;l+=r*c+10}t.style.top=l+"px",t.classList.add("slash-layer-swin"),this.sWin=!0},doSwinToNormal(){const t=document.getElementById(this.id);t&&(t.style.transform="",t.classList.remove("slash-layer-swin"),t.style.width=this.sWinHomePosition.width+"px",t.style.height=this.sWinHomePosition.height+"px",t.style.top=this.sWinHomePosition.top+"px",t.style.left=this.sWinHomePosition.left+"px"),this.drag=!0,this.sWin=!1,this.onTop(),this.doRearrange()},onClose(){p.close(this.id),this.$props.options.closeCallBack&&this.$props.options.closeCallBack()},onTop(){p.top(this.id)},doInit(){this.$props.options.position&&this.setPosition(this.$props.options.position)}},mounted(){this.onTop()},created(){this.doInit()},setup(t,e){const{id:o,title:n,position:l,autoCloseTime:i,runMode:s,content:r,loadingTime:c,footer:y,header:P,loadingText:F,dbFull:W,allowMove:I}=U(t.options),f=D(Z(t.options.btn));!f.value&&y&&(y.value=!1),s&&(r.value.props.runMode=s.value);const M=D(!!(typeof c!="undefined"||c)),m=D(),$=D(),R=D(null),h=D("calc(100% - 80px)");y.value===!1&&P.value===!1?h.value="100%":(y.value===!1||P.value===!1)&&(h.value="calc(100% - 40px)");const fe=()=>{console.log(11111111111111)},me=()=>{const{targetRef:w}=U($.value);if(w==null&&console.error("\u76EE\u6807\u8868\u5355\u4E3A\u7A7A"),w.value.doSubmit){const _=w.value.doSubmit();return k.checkPromise(_)?_:new Promise((T,N)=>{if(typeof _=="object")return T(_);N(_)})}else return new Promise((_,T)=>{T("\u672A\u627E\u5230\u76EE\u6807\u8868\u5355\u63D0\u4EA4\u65B9\u6CD5doSubmit")})},pe=()=>{const{targetRef:w}=U($.value);if(w==null&&console.error("\u76EE\u6807\u8868\u5355\u4E3A\u7A7A"),w.value.doUpdate){const _=w.value.doUpdate();return k.checkPromise(_)?_:new Promise((T,N)=>{if(typeof _=="object")return T(_);N(_)})}else return new Promise((_,T)=>{T("\u672A\u627E\u5230\u76EE\u6807\u8868\u5355\u63D0\u4EA4\u65B9\u6CD5doUpdate")})},te=(w,_)=>{if(f.value)for(let T=0;T<f.value.length;T++){const N=f.value[T];N.curLoading=w}M.value=w,_&&F&&(F.value=_)},he=()=>{for(let w=0;w<f.value.length;w++){const _=f.value[w];_.curLoading=!1}M.value=!1},ge=w=>{if(te(!0),f.value){const _=f.value[w];_.loading&&(M.value=!0,F&&(F.value=_.loadingText)),_.callback&&_.callback(R,_.data)}};return c&&setTimeout(()=>{te(!1)},c.value),re(()=>{const{proxy:w}=_t();R.value=w}),{id:o,title:n,wrapperRef:m,allowMove:I,position:l,footer:y,dbFull:W,doTest:fe,contentRef:$,onBtnCLick:ge,header:P,btnList:f,content:r,contentHeight:h,loadingText:F,loadingState:M,cancelLoading:he,doSubmit:me,doUpdate:pe}}}),bt={class:"layer-content"};function kt(t,e,o,n,l,i){const s=E("layer-header"),r=E("layer-content"),c=E("layer-footer"),y=De("slash-loading");return v(),C("div",{ref:"wrapperRef",onMousedown:e[1]||(e[1]=(...P)=>t.onTop&&t.onTop(...P)),class:Q(["layer-wrapper",t.options.className])},[t.header?(v(),ne(s,{key:0,class:"layer-header",title:t.options.title,max:t.options.max,info:t.options.info,id:t.options.id,min:t.options.min,drag:t.allowMove,onClose:t.onClose,onToggleSize:t.onToggleSize,onMinSize:t.doMinSize},null,8,["title","max","info","id","min","drag","onClose","onToggleSize","onMinSize"])):B("",!0),Fe((v(),C("div",{class:"content-wrapper",style:K({height:t.contentHeight})},[u("div",bt,[a(r,{ref:"contentRef",content:t.content.component,props:t.content.props},null,8,["content","props"])])],4)),[[y,{state:t.loadingState,text:t.loadingText}]]),t.footer?(v(),ne(c,{key:1,onBtnClick:t.onBtnCLick,id:t.options.id,btnList:t.btnList},null,8,["onBtnClick","id","btnList"])):B("",!0),t.sWin?(v(),C("div",{key:2,class:"s-win",onClick:e[0]||(e[0]=(...P)=>t.doSwinToNormal&&t.doSwinToNormal(...P))})):B("",!0)],34)}var ie=S(Ct,[["render",kt]]);const $t=A({name:"Images",props:{imgList:{type:Array}},data(){return{moved:!1,move:{startX:0,startY:0,elmStartX:0,elmStartY:0}}},methods:{onMouseDown(t){t.preventDefault();const e=this.previewWarpRefDom;!e||(document.onmousemove=this.onMouseMove,document.onmouseup=this.onmouseup,this.move.startX=t.clientX,this.move.startY=t.clientY,this.move.elmStartX=e==null?void 0:e.offsetLeft,this.move.elmStartY=e==null?void 0:e.offsetTop,this.moved=!0)},onMouseMove(t){console.log("\u9F20\u6807\u5750\u6807:{}",t.clientX,t.clientY);const e=t.clientX-this.move.startX,o=t.clientY-this.move.startY;if(this.moved){const n=this.previewWarpRefDom;if(n){let l=o+this.move.elmStartY,i=e+this.move.elmStartX;n.style.top=l+"px",n.style.left=i+"px"}}},onmouseup(){console.log("\u53D6\u6D88\u79FB\u52A8"),this.previewWarpRefDom,this.moved=!1,document.onmousemove=null}},setup(t){const e=Z(t.imgList),o=D(null),n=D(null),l=D(1),i=D(0);e.length>0&&(o.value=e[0],e[0].current=!0);const s=m=>{if(o.value&&m!=o.value.index&&F(),e.length>0)for(const $ of e)$.current=!1;o.value=e[m],o.value.index=m,e[m].current=!0},r=()=>{if(o.value){const $=(o.value.index+1)%e.length;s($)}},c=m=>{const $=m.wheelDelta||m.detail;console.log($),$>0&&I(),$<0&&f()};re(()=>{if(n.value){let m=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";n.value.addEventListener(m,c)}else console.error("\u9F20\u6807\u6EDA\u52A8\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25")});const y=()=>{i.value+=90},P=()=>{i.value-=90},F=()=>{i.value=0,l.value=1,n.value&&(n.value.style.left=0,n.value.style.top=0)},W=()=>{if(o.value){const m=o.value.index,$=m-1>=0?m-1:e.length-1;s($)}},I=()=>{let m=l.value+.1;m=m>3?3:m,l.value=m},f=()=>{let m=l.value-.1;m=m<.5?.5:m,l.value=m};return{currentImg:o,switchImg:(m,$)=>{s($),m.current=!0,o.value=m,o.value.index=$},innerImgList:e,nextPicture:r,previousPicture:W,previewWarpRefDom:n,enlargePicture:I,scaleRef:l,rotateRef:i,reducePicture:f,antiClockwisePicture:P,clockWisePicture:y,reductionPicture:F}}}),wt={class:"image-box"},Et={key:0,class:"image-current-box"},Dt=["src"],Ft={class:"image-preview-tool"},St={class:"image-preview-box"},Pt=["onMouseenter","src"];function Mt(t,e,o,n,l,i){return v(),C("div",wt,[t.currentImg?(v(),C("div",Et,[u("div",{class:"image-preview-warp",onMousedown:e[0]||(e[0]=(...s)=>t.onMouseDown&&t.onMouseDown(...s)),style:K({transform:`rotate(${t.rotateRef}deg) scale(${t.scaleRef})`}),ref:"previewWarpRefDom"},[u("img",{class:"image-current",src:t.currentImg.src},null,8,Dt)],36),u("div",Ft,[u("span",{onClick:e[1]||(e[1]=(...s)=>t.reductionPicture&&t.reductionPicture(...s)),class:"icon iconfont"},"\uE62F"),u("span",{onClick:e[2]||(e[2]=(...s)=>t.previousPicture&&t.previousPicture(...s)),class:"icon iconfont"},"\uE601"),u("span",{onClick:e[3]||(e[3]=(...s)=>t.nextPicture&&t.nextPicture(...s)),class:"icon iconfont"},"\uE6B7"),u("span",{onClick:e[4]||(e[4]=(...s)=>t.enlargePicture&&t.enlargePicture(...s)),class:"icon iconfont"},"\uEC14"),u("span",{onClick:e[5]||(e[5]=(...s)=>t.reducePicture&&t.reducePicture(...s)),class:"icon iconfont"},"\uEC13"),u("span",{onClick:e[6]||(e[6]=(...s)=>t.clockWisePicture&&t.clockWisePicture(...s)),class:"icon iconfont"},"\uE66A"),u("span",{onClick:e[7]||(e[7]=(...s)=>t.antiClockwisePicture&&t.antiClockwisePicture(...s)),class:"icon iconfont"},"\uE66B")])])):B("",!0),u("div",St,[(v(!0),C(x,null,ae(t.innerImgList,(s,r)=>(v(),C("img",{onMouseenter:c=>t.switchImg(s,r),class:Q([s.current?"select":"","image-preview"]),src:s.src},null,42,Pt))),256))])])}var Tt=S($t,[["render",Mt],["__scopeId","data-v-9eda7c18"]]);class ee{static getOpenPosition(e,o){const n=o.areaDef;typeof e=="undefined"&&!n&&console.error("\u672A\u6307\u5B9A\u4F4D\u7F6E\u548C\u9884\u8BBE\u4F4D\u7F6E");let l={};return typeof e=="undefined"?l=n[j]:typeof e=="string"?n[e]?l=n[e]:e===yt&&(l={width:k.getViewPortWidth(),height:k.getViewPortHeight(),top:0,left:0}):typeof e=="object"&&(l=e),Object.keys(l).length==0&&console.warn("\u672A\u6307\u5B9A\u533A\u57DF\u5927\u5C0F"),typeof l.width=="undefined"&&(l.width=n[j].width),typeof l.height=="undefined"&&(l.height=n[j].height),typeof l.left=="undefined"&&(l.left=ee.getRelativeLeft(l.width)),typeof l.top=="undefined"&&(l.top=n[j].top),l}static getRelativeLeft(e){return k.getViewPortWidth()/2-e/2}}var Bt=ee;let At=null;const b=class{constructor(){H(this,"elm")}static init(e,o){if(b.app=o,e==null)b.configure=J;else{let n=k.deepClone(e);n=k.mergeJson(n,J),n.areaDef=k.coverJson(J.areaDef,e.areaDef),b.configure=n,console.log("\u5168\u91CF\u914D\u7F6E\u4FE1\u606F",n)}return b}static modal(e){b.open(e)}static confirm(e){let o=this,n=null;return typeof e=="object"?n=e:e&&typeof e=="string"&&(n={},n.msg=e),n!=null&&!n.title&&(n.title="\u63D0\u793A"),new Promise(function(l,i){const s={title:n==null?void 0:n.title,max:!1,min:!1,footer:!0,header:!0,autoCloseTime:0,loadingTime:0,mask:!0,position:{width:300,top:80,height:130},content:{component:le,props:n},closeCallBack:(r,c)=>{b.close(r),i(c)},btn:[{name:"\u53D6\u6D88",className:"",callback:(r,c)=>{b.close(r.value.id),i(c)}},{name:"\u786E\u8BA4",className:"btn-primary",callback:(r,c)=>{b.close(r.value.id),l(c)}}]};o.open(s)})}static createForm(e){let o=this;return new Promise((n,l)=>{let i=O(z({},e),{runMode:"create",closeCallBack(s,r){l(r)},btn:[{name:"\u53D6\u6D88",className:"",loading:!0,callback:(s,r)=>{l(r),b.close(s.value.id)}},{name:"\u63D0\u4EA4",className:"btn-primary",loading:!0,loadingText:"\u6B63\u5728\u63D0\u4EA4\u4E2D",callback:(s,r)=>{s.value.doSubmit().then(c=>{const y=this.configure.successDecide(c);this.autoInfo(y),y.result&&b.close(s.value.id),n(y)}).catch(c=>{if(c){const y=this.configure.successDecide(c);this.autoInfo(y),l(y)}console.log("\u81EA\u52A8\u63D0\u4EA4\u5931\u8D25",c)}).finally(()=>{s.value.cancelLoading()})}}]});o.form(i)})}static autoInfo(e){e.result?this.success(e.msg):this.error(e.msg)}static updateForm(e){let o=this;return new Promise((n,l)=>{let i=O(z({},e),{runMode:"update",closeCallBack(s,r){l(r)},btn:[{name:"\u53D6\u6D88",className:"",loading:!0,callback:(s,r)=>{b.close(s.value.id),l(r)}},{name:"\u4FDD\u5B58",className:"btn-primary",loading:!0,loadingText:"\u6B63\u5728\u4FEE\u6539\u4E2D",callback:(s,r)=>{s.value.doUpdate().then(c=>{const y=this.configure.successDecide(c);this.autoInfo(y),y.result&&b.close(s.value.id),n(y)}).catch(c=>{if(c){const y=this.configure.successDecide(c);this.autoInfo(y)}console.error("\u81EA\u52A8\u63D0\u4EA4\u5931\u8D25",c)}).finally(()=>{s.value.cancelLoading()})}}]});o.form(i)})}static readForm(e){let o=this;return new Promise((n,l)=>{let i=O(z({},e),{runMode:"read",closeCallBack(s,r){l(r)},btn:[{name:"\u786E\u5B9A",className:"btn-primary",loading:!0,loadingText:"\u6B63\u5728\u4FEE\u6539\u4E2D",callback:(s,r)=>{b.close(s.value.id)}}]});o.form(i)})}static form(e){let o={title:e.title,max:!0,min:!0,footer:!0,header:!0,loadingTime:200,autoCloseTime:0,position:{width:800,top:80},content:e.content},n=k.leftMergeJson(o,e);return this.open(n)}static success(e){let o={};return o.iconColor="#67c23a",o.icon="&#xe616;",typeof e=="string"&&(o.msg=e),typeof e=="object"&&(o=k.leftMergeJson(o,e)),b.message(o)}static error(e){let o={};o.iconColor="#ff0000",o.icon="&#xe633;",typeof e=="string"&&(o.msg=e),typeof e=="object"&&(o=k.leftMergeJson(o,e)),this.message(o)}static info(e){let o={};o.iconColor="#474444",o.icon="&#xe649;",typeof e=="string"&&(o.msg=e),typeof e=="object"&&(o=k.leftMergeJson(o,e)),this.message(o)}static images(e){const o={title:"",max:!1,min:!1,footer:!1,header:!0,className:"layer-images",autoCloseTime:0,loadingTime:0,position:"full",content:{component:Tt,props:e}};this.open(o)}static message(e){let o=e.msg.length*25>200?e.msg.length*20:200;const n={title:e.title,max:!1,min:!1,footer:!1,header:!1,className:"layer-msg",loadingTime:0,autoCloseTime:2e3,position:{top:40,width:o,height:50},content:{component:le,props:e}};this.open(n)}static createHtmlDom(e){let o=document.createElement("div");if(e.mask){o.id=`${se}${e.id}`,o.className="slash-layer-mask";const n=document.createElement("div");typeof e.id=="string"&&(n.id=e.id),n.className="slash-layer",o.appendChild(n)}else o=document.createElement("div"),typeof e.id=="string"&&(o.id=e.id),o.className="slash-layer";document.body.appendChild(o)}static open(e){const o=this.getOpenConfigure(e);typeof o.id=="undefined"&&(o.id=`${ce}_${k.createId()}`),console.log("\u5F39\u6846\u53C2\u6570:",o),this.createHtmlDom(o);const n=document.getElementById(o.id),{el:l,vNode:i}=de(ie,{props:{options:o,class:o.theme},app:this.app,elm:n});At=i,o.autoCloseTime&&o.autoCloseTime>0&&setTimeout(()=>{b.close(o.id)},o.autoCloseTime)}static closeAll(){let e=document.querySelectorAll(".slash-layer");e&&e.forEach(o=>{b.close(o.id)})}static top(e){if(!e)return;let o=k.getMaxZIndex(),n=document.querySelectorAll(".slash-layer");n&&n.forEach(i=>{o===parseInt(i.style.zIndex)&&(i.style.zIndex=`${o-1}`)});let l=document.getElementById(e);l&&(l.style.zIndex=""+o)}static close(e){if(!e)return;const o=document.getElementById(e),n=document.getElementById(`${se}${e}`);n&&(n.style.background="transparent"),o&&(o.classList.add("slash-top-fadeout"),setTimeout(()=>{o&&(Xe(ie,{app:this.app,elm:o}),o.remove()),n&&n.remove()},500))}static copyOpenConfigure(e){let o=e.content,n=JSON.parse(JSON.stringify(e));return n.content=o,n.btn=e.btn,n.closeCallBack=e.closeCallBack,n}static getOpenConfigure(e){let o=b.copyOpenConfigure(e);const n=typeof b.configure=="undefined"?{}:b.configure;return o.title||(o.title=n.title),typeof o.header=="undefined"&&(n.header?o.header=n.header:o.header=!1),typeof o.footer=="undefined"&&(o.footer=n.footer),o.title||(o.title=n.title),typeof o.max=="undefined"&&(o.max=n.max),typeof o.min=="undefined"&&(o.min=n.min),typeof o.autoCloseTime=="undefined"&&(o.autoCloseTime=n.autoCloseTime),typeof o.loadingText=="undefined"&&(n.loadingText?o.loadingText=n.loadingText:o.loadingText="\u6B63\u5728\u52A0\u8F7D\u4E2D"),typeof o.loadingTime=="undefined"&&(o.loadingTime=n.loadingTime),typeof o.content=="undefined"&&(o.content={component:lt}),typeof o.theme=="undefined"&&typeof n.theme!="undefined"&&(o.theme=n.theme),typeof o.dbFull=="undefined"&&(n.dbFull?o.dbFull=n.dbFull:o.dbFull=!0),typeof o.allowMove=="undefined"&&(n.allowMove?o.allowMove=n.allowMove:o.allowMove=!1),o.position=Bt.getOpenPosition(o.position,this.configure),o}getRelativePosition(e){return e&&(e.left=this.getRelativeLeft(e.width)),e}getRelativeLeft(e){return k.getViewPortWidth()/2-e/2}};let p=b;H(p,"configure"),H(p,"wrapId","slash_layer"),H(p,"app");const Lt={name:"GlobalConfigurationDemo",data(){return{src:"../assets/1.jpg"}},setup(){return{test:()=>{p.open({})}}},methods:{customSizeModal(){p.open({position:{width:400,height:400}})},notMaxModal(){p.open({max:!1})},notDbFullModal(){p.open({dbFull:!1})},notMinModal(){p.open({min:!1})},notMove(){p.open({move:!1})},customPositionModal(){p.modal({position:{top:200,left:100,width:400,height:400}})},open(){this.$layer.open({})},confirm(){p.confirm("\u60A8\u786E\u5B9A\u8981\u5220\u9664\u4E48?").then(t=>{alert("\u70B9\u51FB\u4E86\u786E\u8BA4\u6309\u94AE")}).catch(t=>{alert("\u70B9\u51FB\u4E86\u53D6\u6D88\u6309\u94AE")})},modal(t){p.modal({title:`${t}\u5C3A\u5BF8\u6A21\u6001\u6846\u793A\u4F8B`,position:t,content:{component:ue,parent:this,props:{msg:"\u53C2\u6570\u4F20\u9012"}}})},error(){p.error("\u6211\u662F\u9519\u8BEF\u63D0\u793A\u4FE1\u606F")},success(){p.success("\u6211\u662F\u6210\u529F\u63D0\u793A\u6D88\u606F")},info(){p.info("\u6211\u662F\u666E\u901A\u63D0\u793A\u6D88\u606F")},createForm(){p.createForm({title:"\u521B\u5EFA",mask:!0,content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}}}).then(()=>{alert("\u6210\u529F\u53CD\u9988")}).catch(()=>{alert("\u53D6\u6D88\u53CD\u9988")})},updateForm(){this.$layer.updateForm({title:"\u521B\u5EFA\u7528\u6237",content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}}}).then(()=>{alert("\u6210\u529F\u53CD\u9988")}).catch(()=>{alert("\u53D6\u6D88\u53CD\u9988")})},readForm(){p.readForm({title:"\u521B\u5EFA\u7528\u6237",content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}}})},getSrc(t){return new URL(t,Ao.url).href},closeAll(){p.closeAll()},images(){p.images({imgList:[{src:this.getSrc("/src/assets/1.jpg")},{src:this.getSrc("/src/assets/3.jpg")},{src:this.getSrc("/src/assets/2.jpg")}]})}}},It=u("h2",null," \u6A21\u6001\u6846\u793A\u4F8B ",-1),Vt=u("h3",null,"\u5C3A\u5BF8",-1),Wt=g("\u9ED8\u8BA4\u65E0\u914D\u7F6E\u60C5\u51B5\u6A21\u6001\u6846"),Nt=g("\u9884\u8BBESM\u5C3A\u5BF8\u6A21\u6001\u6846"),zt=g("\u9884\u8BBEMD\u5C3A\u5BF8\u6A21\u6001\u6846"),Ht=g("\u9884\u8BBELG\u5C3A\u5BF8\u6A21\u6001\u6846"),xt=g("\u5168\u5C4F\u6A21\u6001\u6846"),Rt=u("h3",null,"\u81EA\u5B9A\u4E49\u5C3A\u5BF8\u4F4D\u7F6E",-1),Ot=g("\u81EA\u5B9A\u4E49\u5927\u5C0F400*400"),jt=g("\u81EA\u5B9A\u4E49\u4F4D\u7F6E\u548C\u5927\u5C0F"),Ut=u("h3",null,"\u81EA\u5B9A\u4E49\u64CD\u4F5C",-1),Yt=g("\u53D6\u6D88\u6700\u5C0F\u5316\u6309\u94AE"),Xt=g("\u53D6\u6D88\u6700\u5927\u5316\u6309\u94AE"),qt=g("\u53D6\u6D88\u53CC\u51FB\u5168\u5C4F"),Jt=g("\u5173\u95ED\u62D6\u52A8"),Gt=u("h2",null," \u63D0\u793A\u6846\u793A\u4F8B ",-1),Zt=g("\u786E\u8BA4\u6846"),Kt=g("\u6210\u529F"),Qt=g("\u5931\u8D25"),eo=g("\u63D0\u793A"),to=u("h2",null," \u8868\u5355 ",-1),oo=g("\u521B\u5EFA\u6A21\u5F0F\u8868\u5355"),no=g("\u4FEE\u6539\u6A21\u5F0F\u8868\u5355"),lo=g("\u53EA\u8BFB\u6A21\u5F0F\u8868\u5355"),so=u("h2",null,"\u5176\u4ED6",-1),io=g("\u56FE\u7247\u67E5\u770B\u5668"),ao=u("h2",null,"\u529F\u80FD\u6027\u64CD\u4F5C",-1),ro=g("\u5173\u95ED\u5168\u90E8");function uo(t,e,o,n,l,i){const s=E("el-button");return v(),C(x,null,[It,Vt,a(s,{type:"primary",onClick:e[0]||(e[0]=r=>i.open())},{default:d(()=>[Wt]),_:1}),a(s,{type:"primary",onClick:e[1]||(e[1]=r=>i.modal("sm"))},{default:d(()=>[Nt]),_:1}),a(s,{type:"primary",onClick:e[2]||(e[2]=r=>i.modal("md"))},{default:d(()=>[zt]),_:1}),a(s,{type:"primary",onClick:e[3]||(e[3]=r=>i.modal("lg"))},{default:d(()=>[Ht]),_:1}),a(s,{type:"primary",onClick:e[4]||(e[4]=r=>i.modal("full"))},{default:d(()=>[xt]),_:1}),Rt,a(s,{type:"default",onClick:e[5]||(e[5]=r=>i.customSizeModal())},{default:d(()=>[Ot]),_:1}),a(s,{type:"default",onClick:e[6]||(e[6]=r=>i.customPositionModal())},{default:d(()=>[jt]),_:1}),Ut,a(s,{type:"default",onClick:e[7]||(e[7]=r=>i.notMinModal())},{default:d(()=>[Yt]),_:1}),a(s,{type:"default",onClick:e[8]||(e[8]=r=>i.notMaxModal())},{default:d(()=>[Xt]),_:1}),a(s,{type:"default",onClick:e[9]||(e[9]=r=>i.notDbFullModal())},{default:d(()=>[qt]),_:1}),a(s,{type:"default",onClick:e[10]||(e[10]=r=>i.notMove())},{default:d(()=>[Jt]),_:1}),Gt,a(s,{type:"primary",onClick:i.confirm},{default:d(()=>[Zt]),_:1},8,["onClick"]),a(s,{type:"success",onClick:i.success},{default:d(()=>[Kt]),_:1},8,["onClick"]),a(s,{type:"danger",onClick:i.error},{default:d(()=>[Qt]),_:1},8,["onClick"]),a(s,{type:"info",onClick:i.info},{default:d(()=>[eo]),_:1},8,["onClick"]),to,a(s,{type:"primary",onClick:i.createForm},{default:d(()=>[oo]),_:1},8,["onClick"]),a(s,{type:"primary",onClick:i.updateForm},{default:d(()=>[no]),_:1},8,["onClick"]),a(s,{type:"primary",onClick:i.readForm},{default:d(()=>[lo]),_:1},8,["onClick"]),so,a(s,{type:"primary",onClick:i.images},{default:d(()=>[io]),_:1},8,["onClick"]),ao,a(s,{type:"primary",onClick:e[11]||(e[11]=r=>i.closeAll())},{default:d(()=>[ro]),_:1})],64)}var co=S(Lt,[["render",uo]]);const fo={};function mo(t,e){return v(),C("button",{class:"slash-button",onClick:e[0]||(e[0]=o=>t.$emit("click",o))}," \u54C8\u54C8\u54C8 ")}var po=S(fo,[["render",mo],["__scopeId","data-v-46ed4d30"]]);const ho={install(t){t.component("my-button",po)}},go={install:(t,e)=>{t.config.globalProperties.$layer=p.init(e,t)}},vo=A({name:"Loading",props:["describe"]}),yo={class:"slash-loading"},_o={class:"loading-content"},Co=u("span",{class:"iconfont icon-jiazai loading-icon"},null,-1),bo={class:"loading-describe"};function ko(t,e,o,n,l,i){return v(),C("div",yo,[u("div",_o,[Co,u("span",bo,L(t.describe),1)])])}var $o=S(vo,[["render",ko]]);const wo=t=>{t.directive("slash-loading",(e,o,n)=>{let l=!1,i="\u6B63\u5728\u52A0\u8F7D\u4E2D";if(typeof o.value=="boolean"?l=o.value:typeof o.value=="object"&&(Se(o.value.state)?l=o.value.state.value:o.value.state&&(l=o.value.state),o.value.text?i=o.value.text:o.arg&&(i=o.arg)),l){const s=D(i);let{el:r,vNode:c}=de($o,{props:{describe:s.value},app:t});e.appendChild(r)}else{const s=e.getElementsByClassName("slash-loading");s&&s.length>0&&s[0].remove()}})},Eo={install(t){wo(t)}},Do=[ho,go,Eo],Fo={install(t,e){Do.forEach(o=>{var n;(n=o.install)==null||n.call(o,t,e)})}};const So={name:"App",components:{GlobalConfigurationDemo:co},methods:{test(){},open(){p.success({title:"",iconColor:"red",msg:"\u54C8\u54C8\u54C8\u54C8\u54C8"})},success(){p.success({title:"",iconColor:"red",msg:"\u54C8\u54C8\u54C8\u54C8\u54C8"})},danger(){p.error("\u9519\u8BEF\u4FE1\u606F")},success2(){p.success("\u6211\u662F\u7B2C\u4E8C\u6211\u662F\u7B2C\u4E8C\u79CD\u53C2\u6570\u6211\u662F\u7B2C\u4E8C\u79CD\u53C2\u6570\u6211\u662F\u7B2C\u4E8C\u79CD\u53C2\u6570\u79CD\u53C2\u6570")},info(){p.info("\u54C8\u54C8\u54C8")},confirm(){p.confirm({title:"\u786E\u8BA4",msg:"\u6211\u662F\u786E\u8BA4\u6D88\u606F"}).then(t=>{}).catch(t=>{})},createForm(){p.createForm({title:"\u521B\u5EFA\u7528\u6237",content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}},header:!1,footer:!1,btn:[],autoCloseTime:0,closeCallBack:function(t,e){throw new Error("Function not implemented.")},max:!1,min:!1})},updateForm(){this.$layer.updateForm({title:"\u521B\u5EFA\u7528\u6237",content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}}})},readForm(){this.$layer.readForm({title:"\u521B\u5EFA\u7528\u6237",content:{component:V,props:{msg:"\u521B\u5EFA\u7528\u6237"}}})}}},Po=u("h1",null," \u5168\u5C40\u914D\u7F6E ",-1);function Mo(t,e,o,n,l,i){const s=E("global-configuration-demo");return v(),C("div",null,[Po,a(s)])}var To=S(So,[["render",Mo]]);const Bo={title:"\u81EA\u5B9A\u4E49\u5168\u5C40\u6807\u9898",max:!1,min:!1,header:!0,loadingTime:500,dbFull:!0,allowMove:!0,successDecide(t){return console.log(t),t.code==200?{msg:t.msg,result:!0,data:t.data}:{msg:t.msg,result:!1,data:t.data}}};let X=Pe(To);X.config.globalProperties.$systemName="\u7528\u6237\u7BA1\u7406\u7CFB\u7EDF";X.use(Me);X.use(Fo,Bo);X.mount("#app");