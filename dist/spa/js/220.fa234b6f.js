(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[220],{27:e=>{e.exports={numero:528184665106}},9220:(e,o,l)=>{"use strict";l.r(o),l.d(o,{default:()=>z});l(71);var a=l(3673),t=l(8880);const r=e=>((0,a.dD)("data-v-6206d476"),e=e(),(0,a.Cn)(),e),n=r((()=>(0,a._)("div",{class:"tools q-pb-xl"},[(0,a._)("div",{class:"titulo"},"Contacto")],-1))),s=r((()=>(0,a._)("h4",{class:"fit row justify-center q-pb-md text-primary"},"¿Quieres una meceta personalizada según tus necesidades? Completa el formulario para hacer tu pedido.",-1))),i={class:"box"},c={class:"box"},d={class:"box-descripcion"},u={class:"fit row justify-center q-pb-md"},p=r((()=>(0,a._)("h4",{class:"fit row justify-center q-pb-md text-primary"},"O también puedes mandar un mensaje de WhatsApp",-1))),m={class:"fit row justify-center q-pt-md"},f={class:"box-descripcion"},b={class:"fit row justify-center q-pb-md"};function g(e,o,l,r,g,h){const v=(0,a.up)("q-input"),y=(0,a.up)("q-btn"),w=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(w,null,{default:(0,a.w5)((()=>[n,s,(0,a._)("form",{class:"container",onSubmit:o[5]||(o[5]=(0,t.iM)(((...e)=>r.enviarCorreo&&r.enviarCorreo(...e)),["prevent"]))},[(0,a._)("div",i,[(0,a.Wm)(v,{filled:"",type:"text",modelValue:r.state.nombre,"onUpdate:modelValue":o[0]||(o[0]=e=>r.state.nombre=e),label:"Nombre",hint:"Ej. Juan",maxlength:"50","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e&&e.length<50||"El nombre debe tener menos de 50 caracteres"]},null,8,["modelValue","rules"]),(0,a.Wm)(v,{filled:"",type:"text",modelValue:r.state.apellidos,"onUpdate:modelValue":o[1]||(o[1]=e=>r.state.apellidos=e),label:"Apellidos",hint:"Ej. Pérez González",maxlength:"50","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e&&e.length<50||"Los apellidos deben tener menos de 50 caracteres"]},null,8,["modelValue","rules"])]),(0,a._)("div",c,[(0,a.Wm)(v,{filled:"",type:"email",modelValue:r.state.correo,"onUpdate:modelValue":o[2]||(o[2]=e=>r.state.correo=e),label:"Correo",hint:"Ej. juan.perez@gmail.com",maxlength:"50","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e.includes("@")||"Por favor, escriba un correo válido",e=>e&&e.length<50||"El correo debe tener menos de 50 caracteres"]},null,8,["modelValue","rules"]),(0,a.Wm)(v,{filled:"",type:"tel",mask:"phone",modelValue:r.state.telefonoMail,"onUpdate:modelValue":o[3]||(o[3]=e=>r.state.telefonoMail=e),label:"Teléfono",hint:"Ej. (818) 323 - 8328","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e&&16==e.length||"El número de teléfono debe tener 10 dígitos"]},null,8,["modelValue","rules"])]),(0,a._)("div",d,[(0,a.Wm)(v,{filled:"",type:"textarea",modelValue:r.state.descripcionMail,"onUpdate:modelValue":o[4]||(o[4]=e=>r.state.descripcionMail=e),maxlength:"501",autogrow:"",label:"Descripción","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e&&e.length<500||"El correo debe tener menos de 500 caracteres"]},null,8,["modelValue","rules"])]),(0,a._)("div",u,[(0,a.Wm)(y,{type:"submit",color:"primary",padding:".8rem 4rem",label:"Enviar"})])],32),p,(0,a._)("form",{class:"container",onSubmit:o[7]||(o[7]=(0,t.iM)(((...e)=>r.enviarWA&&r.enviarWA(...e)),["prevent"]))},[(0,a._)("div",m,[(0,a._)("div",f,[(0,a.Wm)(v,{filled:"",type:"textarea",modelValue:r.state.descripcionWA,"onUpdate:modelValue":o[6]||(o[6]=e=>r.state.descripcionWA=e),maxlength:"501",autogrow:"",label:"Descripción","lazy-rules":"",rules:[e=>e&&e.length>0||"Este campo no puede estar vacío",e=>e&&e.length<500||"El correo debe tener menos de 500 caracteres"]},null,8,["modelValue","rules"])])]),(0,a._)("div",b,[(0,a.Wm)(y,{type:"submit",color:"primary",padding:".8rem 2rem",label:"Abrir WhatsApp"})])],32)])),_:1})}l(5363);var h=l(5474),v=l(1959),y=l(8825),w=l(27),x=l.n(w);const W={name:"GestionMacetas",setup(e,o){document.title="Contacto";const l=(0,y.Z)(),a=(0,v.qj)({nombre:"",correo:"",telefonoMail:null,telefonoWA:null,apellidos:"",descripcionMail:"",descripcionWA:""});async function t(){if(""==a.nombre||""==a.correo||""==a.telefonoMail||""==a.apellidos||""==a.descripcionMail)return void l.notify({color:"red-5",textColor:"white",icon:"warning",message:"Por favor, llena todos los campos."});if(a.telefonoMail.length<16)return void l.notify({color:"red-5",textColor:"white",icon:"warning",message:"Corrige los campos en rojo."});l.loading.show();const e=await(0,h.api)({url:"/Forms",method:"POST",data:{nombre:a.nombre,apellidos:a.apellidos,telefono:a.telefonoMail,correo:a.correo,descripcion:a.descripcionMail}});200==e.status&&(l.loading.hide(),l.notify({color:"green-4",textColor:"white",icon:"check",message:"En breve, alguien se pondrá en contacto con usted."}))}function r(){if(""!=a.descripcionWA){var e=`${x().numero}`;e=e.replace(/[^a-zA-Z0-9]/g,"");var o="https://api.whatsapp.com/send?phone="+e+"&text="+a.descripcionWA;window.open(o,"_blank")}else l.notify({color:"red-5",textColor:"white",icon:"warning",message:"Por favor, llena todos los campos."})}return{state:a,enviarCorreo:t,enviarWA:r}}};var V=l(4260),E=l(4379),_=l(4842),C=l(8240),j=l(7518),A=l.n(j);const M=(0,V.Z)(W,[["render",g],["__scopeId","data-v-6206d476"]]),z=M;A()(W,"components",{QPage:E.Z,QInput:_.Z,QBtn:C.Z})}}]);