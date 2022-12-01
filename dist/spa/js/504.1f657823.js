"use strict";(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[504],{4504:(e,a,o)=>{o.r(a),o.d(a,{default:()=>q});var s=o(3673);const n=e=>((0,s.dD)("data-v-edb4186c"),e=e(),(0,s.Cn)(),e),r={class:"form-holder"},t=n((()=>(0,s._)("p",{class:"titulo q-pb-md"},"Resetear Contraseña",-1))),c={class:"content"},l={class:"campo password q-pb-xl"},d={class:"campo confirmacion-password"},i={class:"campo botones"};function m(e,a,o,n,m,u){const p=(0,s.up)("q-input"),w=(0,s.up)("q-btn"),g=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(g,{class:"flex flex-center"},{default:(0,s.w5)((()=>[(0,s._)("form",r,[t,(0,s._)("div",c,[(0,s._)("div",l,[(0,s.Wm)(p,{filled:"",type:"password",modelValue:n.state.password,"onUpdate:modelValue":a[0]||(a[0]=e=>n.state.password=e),label:"Contraseña",hint:"La contraseña debe tener más de 8 caracteres, contener 1 letra mayúscula y 1 número",maxlength:"50","lazy-rules":"",rules:[e=>e&&e.length>7||"La contraseñan debe tener al menos 8 caracteres",e=>e&&e.length<50||"La contraseñan debe tener menos de 50 caracteres",e=>e&&-1!=e.search(/[A-Z]/)||"La contraseña debe tener una letra mayúscula",e=>e&&-1!=e.search(/[0-9]/)||"La contraseña debe tener un número"]},null,8,["modelValue","rules"])]),(0,s._)("div",d,[(0,s.Wm)(p,{filled:"",type:"password",modelValue:n.state.confirmacionPassword,"onUpdate:modelValue":a[1]||(a[1]=e=>n.state.confirmacionPassword=e),label:"Confirmación de contraseña",hint:"Ingresa la contraseña de nuevo",maxlength:"50","lazy-rules":"",rules:[e=>e&&e.length>7||"La contraseñan debe tener al menos 8 caracteres",e=>e&&e.length<50||"La contraseñan debe tener menos de 50 caracteres",e=>e===n.state.password||"Las contraseñas no coinciden"]},null,8,["modelValue","rules"])]),(0,s._)("div",i,[(0,s.Wm)(w,{size:"1rem",class:"q-px-xl q-py-xs",color:"primary",label:"ACTUALIZAR",onClick:n.onSubmit},null,8,["onClick"]),(0,s.Wm)(w,{flat:"",size:"1rem",class:"q-px-xl q-py-xs",color:"primary",label:"CANCELAR",onClick:a[2]||(a[2]=e=>this.$router.go(-1))})])])])])),_:1})}o(9544);var u=o(1959),p=o(5474),w=o(8825),g=o(9582);const h={name:"Reseteo",setup(){document.title="Resetear Contraseña";const e=(0,g.yj)(),a=(0,g.tv)(),o=(0,s.Fl)((()=>e.params.correo)).value,n=(0,w.Z)(),r=(0,u.qj)({correo:o,password:"",confirmacionPassword:""});function t(){r.password.length<8||r.confirmacionPassword.length<8?n.notify({color:"red-5",textColor:"white",icon:"warning",message:"Corrige los campos en rojo."}):r.password===r.confirmacionPassword?(n.loading.show(),p.api.post("/Cliente/CambiarPassword",{Correo:r.correo,Password:r.password}).then((e=>{n.notify({color:"green-4",textColor:"white",icon:"check",message:"Contraseña actualizada correctamente."}),a.push("/login")})).catch((e=>{n.notify({color:"red-5",textColor:"white",icon:"warning",message:"Ha ocurrido un error. Inténtelo de nuevo."})})).finally((()=>{n.loading.hide()}))):n.notify({color:"red-5",textColor:"white",icon:"warning",message:"Las contraseñas no coinciden."})}return{state:r,onSubmit:t}}};var f=o(4260),b=o(4379),C=o(4842),y=o(8240),x=o(7518),v=o.n(x);const L=(0,f.Z)(h,[["render",m],["__scopeId","data-v-edb4186c"]]),q=L;v()(h,"components",{QPage:b.Z,QInput:C.Z,QBtn:y.Z})}}]);