"use strict";(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[377],{7377:(e,o,a)=>{a.r(o),a.d(o,{default:()=>q});var r=a(3673);const t=e=>((0,r.dD)("data-v-a116867e"),e=e(),(0,r.Cn)(),e),n=t((()=>(0,r._)("h5",{class:"text-primary"},"Recuperar Contraseña",-1))),l=t((()=>(0,r._)("div",{class:"linea bg-primary"},null,-1))),s={class:"botones q-pt-md"};function c(e,o,a,t,c,i){const u=(0,r.up)("q-input"),p=(0,r.up)("q-btn"),m=(0,r.up)("q-form"),d=(0,r.up)("q-page");return(0,r.wg)(),(0,r.j4)(d,{class:"flex flex-center"},{default:(0,r.w5)((()=>[(0,r.Wm)(m,{onSubmit:t.onSubmit,class:"reseteo-form"},{default:(0,r.w5)((()=>[n,l,(0,r.Wm)(u,{filled:"",type:"email",modelValue:t.state.correo,"onUpdate:modelValue":o[0]||(o[0]=e=>t.state.correo=e),label:"Correo",hint:"Ej. juan.perez@gmail.com","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e.includes("@")||"Por favor, escriba un correo válido"]},null,8,["modelValue","rules"]),(0,r._)("div",s,[(0,r.Wm)(p,{size:"1rem",class:"q-px-xl q-py-xs",color:"primary",label:"RECUPERAR",onClick:t.onSubmit},null,8,["onClick"]),(0,r.Wm)(p,{flat:"",size:"1rem",class:"q-px-xl q-py-xs",type:"reset",color:"primary",label:"REGRESAR",onClick:o[1]||(o[1]=e=>this.$router.push("/login"))})])])),_:1},8,["onSubmit"])])),_:1})}a(9544);var i=a(1959),u=a(5474),p=a(8825),m=a(9582);const d={name:"SolicitudReseteo",setup(){document.title="Recuperar Contraseña";const e=(0,p.Z)(),o=(0,m.tv)(),a=(0,i.qj)({correo:""});async function r(){""!=a.correo?(e.loading.show(),u.api.post(`Cliente/Reseteo/${a.correo}`).then((()=>{e.notify({color:"green-4",textColor:"white",icon:"check",message:"Se ha enviado un correo con las instrucciones para recuperar su contraseña"}),o.push("/login")})).catch((o=>{e.notify({color:"red-5",textColor:"white",icon:"warning",message:"No existe una cuenta de usuario asociada al correo proporcionado."})})).finally((()=>{e.loading.hide()}))):e.dialog({title:"Error",message:"Por favor, llene todos los campos",color:"negative"})}return{state:a,onSubmit:r}}};var g=a(4260),f=a(4379),h=a(5269),b=a(4842),v=a(8240),y=a(7518),C=a.n(y);const x=(0,g.Z)(d,[["render",c],["__scopeId","data-v-a116867e"]]),q=x;C()(d,"components",{QPage:f.Z,QForm:h.Z,QInput:b.Z,QBtn:v.Z})}}]);