const routes = [{
        path: "/",
        name: "main",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "/",
                name: "Catalogo",
                component: () =>
                    import ("pages/cliente/Catalogo.vue"),
            },
            {
                path: "/producto/:id",
                name: "DetalleMaceta",
                component: () =>
                    import ("pages/cliente/DetalleMaceta.vue"),
            },
            {
                path: "/gestion_productos",
                name: "GestionMacetas",
                component: () =>
                    import ("pages/admin/GestionMacetas.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('auth') == 'admin')
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/login",
                name: "Login",
                component: () =>
                    import ("pages/auth/Login.vue"),
            },
            {
                path: "/solicitud_reseteo",
                name: "SolicitudReseteo",
                component: () =>
                    import ("pages/auth/SolicitudReseteo.vue"),
            },
            {
                path: "/reseteo",
                name: "Reseteo",
                component: () =>
                    import ("pages/auth/Reseteo.vue"),
            },
            {
                path: "/crear_cuenta",
                name: "CrearCuenta",
                component: () =>
                    import ("pages/auth/CrearCuenta.vue"),
            },
            {
                path: "/tu-maceta",
                name: "TuMaceta",
                component: () =>
                    import ("pages/cliente/PersonalizacionMaceta.vue"),
            },
            {
                path: "/pedidos",
                name: "Pedidos",
                component: () =>
                    import ("pages/admin/CatalogoPedidos.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('auth') == 'admin')
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/detalle_pedido/:id",
                name: "Detalle Pedido",
                component: () =>
                    import ("pages/admin/DetallePedido.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('auth') == 'admin')
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/detalle_pedido_cliente/:id",
                name: "Detalle Pedido Cliente",
                component: () =>
                    import ("pages/cliente/pedidos/DetallePedido.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/estatus_pedido/:id",
                name: "Estatus Pedido",
                component: () =>
                    import ("pages/admin/EstatusPedido.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('auth') == 'admin')
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/estatus_pedido_cliente/:id",
                name: "Estatus Pedido Cliente",
                component: () =>
                    import ("pages/cliente/pedidos/EstatusPedido.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/contacto",
                name: "FormsContacto",
                component: () =>
                    import ("pages/cliente/FormsContacto.vue"),
            },
            {
                path: "/checkout",
                name: "Checkout",
                component: () =>
                    import ("pages/cliente/Checkout.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/confirmacion_compra",
                name: "ConfirmacionCompra",
                component: () =>
                    import ("pages/cliente/ConfirmacionCompra.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/nosotros",
                name: "SobreNosotros",
                component: () =>
                    import ("pages/cliente/SobreNosotros.vue"),
            },
            {
                path: "/mis-pedidos",
                name: "PedidosCliente",
                component: () =>
                    import ("pages/cliente/pedidos/PedidosCliente.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            },
            {
                path: "/direccion_envio",
                name: "DireccionEnvio",
                component: () =>
                    import ("pages/cliente/DireccionEnvio.vue"),
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('token'))
                        next();
                    else
                        next({ name: 'Catalogo' });
                }
            }
        ],
        // beforeEnter: (to, from, next) => {
        //     if (localStorage.getItem('token'))
        //         next();
        //     else
        //         next({ name: 'Login' });
        // }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () =>
            import ("pages/Error404.vue"),
    },
];

export default routes;