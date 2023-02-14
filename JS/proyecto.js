// PRODUCTOS
const productos = [
    // Geles
    {
        id: "gel_1",
        titulo: "Gel polish 1",
        imagen: "./img/img7.jpg",
        categoria: {
            nombre: "Geles",
            id: "geles"
        },
        precio: 1000
    },
    {
        id: "gel_1",
        titulo: "Gel polish 2",
        imagen: "./img/img8.jpg",
        categoria: {
            nombre: "Geles",
            id: "geles"
        },
        precio: 1000
    },
    {
        id: "gel_1",
        titulo: "Gel polish 3",
        imagen: "./img/img9.jpg",
        categoria: {
            nombre: "Geles",
            id: "geles"
        },
        precio: 1000
    },
    {
        id: "gel_1",
        titulo: "Gel polish 4",
        imagen: "./img/img10.jpg",
        categoria: {
            nombre: "Geles",
            id: "geles"
        },
        precio: 1000
    },

    // Esmaltes
    {
        id: "esmalte1",
        titulo: "Esmalte 1",
        imagen: "./img/img1.jpg",
        categoria: {
            nombre: "Esmaltes",
            id: "esmaltes"
        },
        precio: 1000
    },
    {
        id: "esmalte2",
        titulo: "Esmalte 2",
        imagen: "./img/img2.jpg",
        categoria: {
            nombre: "Esmaltes",
            id: "esmaltes"
        },
        precio: 1000
    },
    {
        id: "esmalte3",
        titulo: "Esmalte 3",
        imagen: "./img/img3.jpg",
        categoria: {
            nombre: "Esmaltes",
            id: "esmaltes"
        },
        precio: 1000
    },
    {
        id: "esmalte4",
        titulo: "Esmalte 4",
        imagen: "./img/img4.jpg",
        categoria: {
            nombre: "Esmaltes",
            id: "esmaltes"
        },
        precio: 1000
    },

    // Acrilicos y poligel
    {
        id: "acripoly1",
        titulo: "Kit dip",
        imagen: "./img/img5.jpg",
        categoria: {
            nombre: "Acrilicos y polygel",
            id: "acripoly"
        },
        precio: 1000
    },

    // Herramientas
    {
        id: "minitorno",
        titulo: "Mini torno",
        imagen: "./img/img6.jpg",
        categoria: {
            nombre: "Herramientas",
            id: "herramientas"
        },
        precio: 1000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesSeccion = document.querySelectorAll(".boton__seccion");
const tituloSeccion = document.querySelector("#titulo-seccion");
let botonesAgregar = document.querySelector(".producto__agregar");
const unidades = document.querySelector("#unidades");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
    
                    <img class="producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto__propiedades">
                        <h3 class="producto__titulo">${producto.titulo}</h3>
                        <p class="producto__precio">$${producto.precio}</p>
                        <button class="producto__agregar" id= "${producto.id}">Agregar</button>
                    </div>
                `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}


cargarProductos(productos);

botonesSeccion.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesSeccion.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "nuevos_productos") {

            const productoSeccion = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloSeccion.innerText = productoSeccion.categoria.nombre;



            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else {
            tituloSeccion.innerText = "Nuevos Productos";
            cargarProductos(productos);

        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto__agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const ProductosEnCarrito = [];

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (ProductosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = ProductosEnCarrito.findIndex(producto => producto.id === idBoton);
        ProductosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        ProductosEnCarrito.push(productoAgregado);
    }

   
    actualizarUnidades();
    localStorage.setItem("unidades".JSON.stringify(ProductosEnCarrito));
}

function actualizarUnidades() {
    let nuevoUnidades = ProductosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    unidades.innerText = nuevoUnidades;
}