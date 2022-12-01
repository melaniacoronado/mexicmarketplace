"use strict";(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[517],{5517:(e,o,t)=>{t.r(o),t.d(o,{default:()=>k});var a=t(3673),l=t(8880);const n=(0,a._)("h5",{class:"text-primary"},"Iniciar Sesión",-1),r=(0,a._)("div",{class:"linea bg-primary"},null,-1),s=(0,a.Uk)(" ¿Olvidaste tu contraseña? "),i=(0,a.Uk)(" Crear cuenta "),c={class:"botones"};function d(e,o,t,d,m,u){const p=(0,a.up)("q-input"),g=(0,a.up)("router-link"),w=(0,a.up)("q-btn"),f=(0,a.up)("q-form"),y=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(y,{class:"flex flex-center"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{onSubmit:(0,l.iM)(d.onSubmit,["prevent"]),onReset:d.onClean,class:"login-form"},{default:(0,a.w5)((()=>[n,r,(0,a.Wm)(p,{filled:"",type:"email",modelValue:d.state.correo,"onUpdate:modelValue":o[0]||(o[0]=e=>d.state.correo=e),label:"Correo",hint:"Ej. juan.perez@gmail.com","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e.includes("@")||"Por favor, escriba un correo válido"]},null,8,["modelValue","rules"]),(0,a.Wm)(p,{filled:"",type:"password",modelValue:d.state.password,"onUpdate:modelValue":o[1]||(o[1]=e=>d.state.password=e),label:"Contraseña",hint:"contraseña123","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío"]},null,8,["modelValue","rules"]),(0,a.Wm)(g,{to:"/solicitud_reseteo",class:"text-primary"},{default:(0,a.w5)((()=>[s])),_:1}),(0,a.Wm)(g,{to:"/crear_cuenta",class:"text-primary"},{default:(0,a.w5)((()=>[i])),_:1}),(0,a._)("div",c,[(0,a.Wm)(w,{size:"1rem",class:"q-px-xl q-py-xs",color:"primary",label:"ACCEDER",type:"submit"}),(0,a.Wm)(w,{flat:"",size:"1rem",class:"q-px-xl q-py-xs",type:"reset",color:"primary",label:"LIMPIAR"})])])),_:1},8,["onSubmit","onReset"])])),_:1})}t(9544),t(5363);var m=t(1959),u=t(5474),p=t(8825),g=t(9582),w=t(51);const f={name:"Login",setup(){document.title="Iniciar Sesión";const e=(0,p.Z)(),o=(0,g.tv)(),t=(0,m.qj)({correo:"",password:""});function l(){t.correo="",t.password=""}async function n(){if(""==t.correo||""==t.password)return void e.notify({color:"red-5",textColor:"white",icon:"warning",message:"Por favor, llena todos los campos."});e.loading.show();const a=await u.api.post("Cliente/Login",{correo:t.correo,password:t.password}).catch((()=>{e.notify({color:"red-5",textColor:"white",icon:"warning",message:"Credenciales incorrectas."})})).finally((()=>{e.loading.hide()}));if(201===a.status&&o.push({name:"Reseteo",params:{correo:t.correo}}),200==a.status){localStorage.setItem("clienteID",a.data.payload.clienteId),localStorage.setItem("emailCliente",a.data.payload.emailCliente),localStorage.setItem("nombreCliente",a.data.payload.nombreCliente),localStorage.setItem("apellidosCliente",a.data.payload.apellidoCliente),localStorage.setItem("telefonoCliente",a.data.payload.telefonoCliente),localStorage.setItem("token",a.data.payload.token);var l=(0,w.Z)(a.data.payload.token);localStorage.setItem("auth",l.auth),window.dispatchEvent(new CustomEvent("token-localstorage-changed",{detail:{storage:localStorage.getItem("token")}})),window.dispatchEvent(new CustomEvent("nombre-localstorage-changed",{detail:{storage:localStorage.getItem("nombreCliente")}})),e.notify({color:"green-4",textColor:"white",icon:"check",message:"Inicio de sesión exitoso."}),location.replace("/")}}return(0,a.bv)((()=>{})),{state:t,onClean:l,onSubmit:n}}};var y=t(4260),C=t(4379),h=t(5269),b=t(4842),v=t(8240),I=t(7518),x=t.n(I);const S=(0,y.Z)(f,[["render",d]]),k=S;x()(f,"components",{QPage:C.Z,QForm:h.Z,QInput:b.Z,QBtn:v.Z})}}]);