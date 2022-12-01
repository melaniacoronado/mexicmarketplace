"use strict";(self["webpackChunkmacodesgin"]=self["webpackChunkmacodesgin"]||[]).push([[298],{1298:(a,e,o)=>{o.r(e),o.d(e,{default:()=>j});var t=o(3673),r=o(2323);const c=a=>((0,t.dD)("data-v-d45cf49a"),a=a(),(0,t.Cn)(),a),l={id:"detalle-maceta"},i={class:"detalle"},n={class:"titulo"},d={class:"nombre"},s={class:"img-holder"},m=["src"],u={class:"descripcion q-pt-md"},g=c((()=>(0,t._)("span",null,"Descripción: ",-1))),p=c((()=>(0,t._)("div",{class:"linea"},null,-1))),v={class:"config-maceta"},y={class:"precio"},b={class:"selector-colores"},f=c((()=>(0,t._)("label",null,"Color",-1))),C={class:"wrapper"},I=["id","onClick"],M={class:"cantidad"},_=c((()=>(0,t._)("label",null,"Cantidad",-1))),h=c((()=>(0,t._)("div",{class:"vendedor_contenedor"},[(0,t._)("label",null,"Vendedor"),(0,t._)("p",{class:"vendedor"},"Armandoç Flores")],-1)));function D(a,e,o,c,D,k){const w=(0,t.up)("q-btn"),z=(0,t.up)("q-input"),S=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(S,{class:"flex flex-center"},{default:(0,t.w5)((()=>[(0,t._)("div",l,[(0,t._)("div",i,[(0,t._)("div",n,[(0,t.Wm)(w,{icon:"keyboard_backspace",color:"primary",size:"1.2rem",padding:"0px 0px",flat:"",onClick:e[0]||(e[0]=a=>this.$router.push("/"))}),(0,t._)("span",d,(0,r.zw)(a.state.maceta.nombreMaceta),1)]),(0,t._)("div",s,[(0,t.Wm)(w,{class:"zoom",icon:"zoom_out_map",color:"white","text-color":"primary",onClick:e[1]||(e[1]=e=>a.expandirImagen())}),(0,t._)("img",{src:a.state.maceta.imagenMaceta,id:"main-image",alt:"imagen maceta"},null,8,m)]),(0,t._)("div",u,[g,(0,t.Uk)((0,r.zw)(a.state.maceta.descripcion),1)])]),p,(0,t._)("div",v,[(0,t._)("div",y,(0,r.zw)(a.formatter(a.state.maceta.precio))+" MXN",1),(0,t._)("div",b,[f,(0,t._)("div",C,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.state.colores,((e,o)=>((0,t.wg)(),(0,t.iD)("div",{id:`circulo-${e.colorId}`,class:"circulo",key:o,style:(0,r.j5)(`background-color:#${e.codigoColor}`),onClick:o=>a.seleccionarColor(e.colorId)},null,12,I)))),128))])]),(0,t._)("div",M,[_,(0,t.Wm)(z,{filled:"",dense:"",modelValue:a.state.cantidad,"onUpdate:modelValue":e[2]||(e[2]=e=>a.state.cantidad=e),modelModifiers:{number:!0},type:"number",label:"Cantidad",rules:[a=>a>0||"Ingrese un valor mayor a 0"]},null,8,["modelValue","rules"])]),h,(0,t.Wm)(w,{color:"primary",onClick:e[3]||(e[3]=e=>a.agregarAlCarrito()),label:"Agregar al carrito",padding:"10px 5px"})])])])),_:1})}var k=o(1959),w=o(5474),z=o(9582),S=o(8825),x=o(3617);const A=(0,t.aZ)({name:"DetalleMaceta",setup(){document.title="Detalle Maceta";const a=(0,S.Z)(),e=(0,z.yj)(),o=(0,x.oR)(),r=(0,t.Fl)((()=>e.params.id)).value,c=(0,k.qj)({cantidad:null,maceta:{descripcion:"",imagenMaceta:"",macetaID:-1,nombreColor:"",nombreMaceta:"",nombreMaterial:"",precio:0},color:null,colores:[],medida:null,medidas:[]});function l(a){return new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:2}).format(a)}function i(){const e=document.createElement("div");e.innerHTML=`<div class="overlay">\n                    <img src="${c.maceta.imagenMaceta}" alt="imagen maceta">\n                </div>`,document.body.appendChild(e),e.addEventListener("click",(()=>document.body.removeChild(e))),a.notify({message:"Da click en cualquier parte para salir",color:"primary"})}function n(a){c.color=a;let e=document.getElementById(`circulo-${a}`);e.classList.add("selected");let o=document.querySelectorAll(".circulo");o.forEach((e=>{e.id!==`circulo-${a}`&&e.classList.remove("selected")}))}function d(a){c.medida=a;let e=document.getElementById(`medida-${a}`);e.classList.add("selected");let o=document.querySelectorAll(".medida");o.forEach((e=>{e.id!==`medida-${a}`&&e.classList.remove("selected")}))}async function s(){null!==c.color?(c.medida=1,null!==c.medida?null!==c.cantidad?localStorage.getItem("clienteID")?await(0,w.api)({url:"/CarritoCompras/AgregarItem",method:"POST",data:{ClienteID:localStorage.getItem("clienteID"),MacetaID:c.maceta.macetaID,Cantidad:c.cantidad,Color:c.color,Medida:c.medida,Forma:-1,Personalizada:!1},headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((e=>{a.notify({message:"Se ha agregado al carrito de compras",color:"primary"});let t={cantidad:c.cantidad,imagenMaceta:c.maceta.imagenMaceta,itemCarritoCompraID:e.data.payload.num,macetaID:c.maceta.macetaID,nombreColor:c.colores.find((a=>a.colorId==c.color)).nombreColor,nombreForma:"-",nombreMaceta:c.maceta.nombreMaceta,nombreMaterial:c.maceta.nombreMaterial,nombreMedida:c.medidas.find((a=>a.medidaID==c.medida)).nombreMedida,precio:c.maceta.precio,personalizada:!1};o.commit("carritocompras/addItem",t)})).catch((()=>{a.notify({message:"No se pudo agregar al carrito de compras",color:"negative"})})):a.notify({message:"Debes ingresar a tu cuenta para agregar al carrito",color:"primary"}):a.notify({message:"Ingresa una cantidad",color:"negative"}):a.notify({message:"Selecciona una medida",color:"negative"})):a.notify({message:"Selecciona un color",color:"negative"})}return(0,t.bv)((async()=>{await w.api.get("/Color").then((a=>c.colores=a.data.payload)),await w.api.get("/Medida").then((a=>c.medidas=a.data.payload)),await w.api.get(`/Maceta/${r}`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((a=>c.maceta=a.data.payload))})),{state:c,formatter:l,expandirImagen:i,seleccionarColor:n,seleccionarMedida:d,agregarAlCarrito:s}}});var $=o(4260),q=o(4379),E=o(8240),F=o(4842),L=o(7518),Z=o.n(L);const B=(0,$.Z)(A,[["render",D],["__scopeId","data-v-d45cf49a"]]),j=B;Z()(A,"components",{QPage:q.Z,QBtn:E.Z,QInput:F.Z})}}]);