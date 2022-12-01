"use strict";(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[426],{3426:(e,a,t)=>{t.r(a),t.d(a,{default:()=>X});var r=t(3673),l=t(2323);const s=e=>((0,r.dD)("data-v-6f60d200"),e=e(),(0,r.Cn)(),e),i={id:"catalogo"},o={key:0},n={class:"tools"},c=s((()=>(0,r._)("div",{class:"titulo"},"Catálogo de productos",-1))),u={class:"sorting"},m={class:"selects"},d={class:"search-bar"},p={class:"catalogo-macetas"},g={key:0,class:"mensaje"},b=s((()=>(0,r._)("h4",null,[(0,r.Uk)("No se encontraron productos "),(0,r._)("br"),(0,r.Uk)(" basados en tu búsqueda")],-1))),v={key:1};function f(e,a,t,s,f,w){const _=(0,r.up)("q-icon"),h=(0,r.up)("q-select"),y=(0,r.up)("q-btn"),C=(0,r.up)("q-input"),k=(0,r.up)("Maceta"),q=(0,r.up)("q-spinner-hourglass"),I=(0,r.up)("q-page");return(0,r.wg)(),(0,r.j4)(I,{class:"flex flex-center"},{default:(0,r.w5)((()=>[(0,r._)("div",i,[e.state.cargaCompletada?((0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("div",n,[c,(0,r._)("div",u,[(0,r._)("div",m,[(0,r.Wm)(h,{class:"select",filled:"",dense:"",modelValue:e.state.material,"onUpdate:modelValue":a[0]||(a[0]=a=>e.state.material=a),options:e.state.materiales,label:"Producto"},{prepend:(0,r.w5)((()=>[(0,r.Wm)(_,{name:"sort"})])),_:1},8,["modelValue","options"]),(0,r.Wm)(h,{class:"select",filled:"",dense:"",modelValue:e.state.precio,"onUpdate:modelValue":a[1]||(a[1]=a=>e.state.precio=a),options:e.state.precios,label:"Precios"},{prepend:(0,r.w5)((()=>[(0,r.Wm)(_,{name:"sort"})])),_:1},8,["modelValue","options"]),(0,r.Wm)(y,{onClick:a[2]||(a[2]=a=>e.limpiarFiltros()),icon:"clear","text-color":"primary",flat:"",dense:""})]),(0,r._)("div",d,[(0,r.Wm)(C,{filled:"",dense:"",id:"search-bar",color:"primary",modelValue:e.state.userInput,"onUpdate:modelValue":a[3]||(a[3]=a=>e.state.userInput=a),label:"Busca tu producto"},{prepend:(0,r.w5)((()=>[(0,r.Wm)(_,{name:"search"})])),_:1},8,["modelValue"])])])]),(0,r._)("div",p,[0==e.state.numMacetas?((0,r.wg)(),(0,r.iD)("div",g,[(0,r.Wm)(_,{name:"search",size:"5em"}),b])):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.filter(),((e,a)=>((0,r.wg)(),(0,r.iD)("div",{class:"maceta",key:a},[(0,r.Wm)(k,(0,l.vs)((0,r.F4)(e)),null,16)])))),128))])])):((0,r.wg)(),(0,r.iD)("div",v,[(0,r.Wm)(q,{class:"progress_center",color:"negative",size:"30em",thickness:10})]))])])),_:1})}var w=t(1959),_=t(5474);const h={class:"img-holder"},y=["src"],C={class:"label material bg-secondary"},k={class:"info"},q={class:"wrapper"},I={class:"titulo"},M={class:"precio"},W={class:"descripcion"};function Z(e,a,t,s,i,o){return(0,r.wg)(),(0,r.iD)("div",{id:"maceta",onClick:a[0]||(a[0]=a=>this.$router.push(`/producto/${e.id}`))},[(0,r._)("div",h,[(0,r._)("img",{src:e.imagen,alt:"imagen de la maceta"},null,8,y),(0,r._)("div",C,(0,l.zw)(e.material),1)]),(0,r._)("div",k,[(0,r._)("div",q,[(0,r._)("div",I,(0,l.zw)(e.nombre),1),(0,r._)("div",M,(0,l.zw)(e.formatter(e.precio))+" MXN",1)]),(0,r._)("div",W,(0,l.zw)(e.descripcion),1)])])}const D=(0,r.aZ)({name:"Maceta",props:{id:{type:Number,required:!0},imagen:{type:String,required:!0},nombre:{type:String,required:!0},descripcion:{type:String,required:!0},precio:{type:Number,required:!0},material:{type:String,required:!0}},setup(){function e(e){return new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:2}).format(e)}return{formatter:e}}});var V=t(4260);const x=(0,V.Z)(D,[["render",Z],["__scopeId","data-v-6587139d"]]),z=x,S=(0,r.aZ)({name:"Catalogo",components:{Maceta:z},setup(){document.title="Catálogo";const e=(0,w.qj)({userInput:null,material:null,precio:null,macetas:[],numMacetas:null,materiales:[],precios:[{value:0,label:"$100-599",min:100,max:599},{value:1,label:"$600-799",min:600,max:799},{value:2,label:">$800",min:800,max:9999999}],cargaCompletada:!1});async function a(){await _.api.get("/Material").then((a=>{a.data.payload.forEach((a=>{e.materiales.push({value:a.materialId,label:a.nombreMaterial})}))})),e.materiales.sort(((e,a)=>e.label<a.label?-1:e.label>a.label?1:0))}function t(){let a=e.macetas;return e.userInput&&(a=a.filter((a=>{let t=a.nombre.toLowerCase(),r=a.material.toLowerCase();return t.includes(e.userInput.toLowerCase())||r.includes(e.userInput.toLowerCase())}))),e.material&&(a=a.filter((a=>a.material.toLowerCase().includes(e.material.label.toLowerCase())))),e.precio&&(a=a.filter((a=>a.precio>=e.precio.min&&a.precio<=e.precio.max))),e.numMacetas=a.length,a}function l(){e.userInput=null,e.material=null,e.precio=null}return(0,r.bv)((async()=>{a(),await _.api.get("/Maceta",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((a=>{a.data.payload.forEach((a=>{e.macetas.push({id:a.macetaID,imagen:a.imagenMaceta,nombre:a.nombreMaceta,descripcion:a.descripcion,precio:a.precio,material:a.nombreMaterial})})),e.cargaCompletada=!0}))})),{state:e,filter:t,limpiarFiltros:l}}});var L=t(4379),N=t(8516),Q=t(4554),F=t(8240),U=t(4842),$=t(3282),j=t(7518),B=t.n(j);const P=(0,V.Z)(S,[["render",f],["__scopeId","data-v-6f60d200"]]),X=P;B()(S,"components",{QPage:L.Z,QSelect:N.Z,QIcon:Q.Z,QBtn:F.Z,QInput:U.Z,QSpinnerHourglass:$.Z})}}]);