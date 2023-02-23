let productos;
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesSeccion = document.querySelectorAll(".boton__seccion");
const tituloSeccion = document.querySelector("#titulo-seccion");
let botonesAgregar = document.querySelectorAll(".producto__agregar");
const unidades = document.querySelector("#unidades");

async function fetchData() {
  const response = await fetch('http://localhost:3000/productos');
  const data = await response.json();
  return data;
}

async function obtenerProductos() {
  try {
    const response = await fetchData();
    productos = response.productos;
    cargarProductos(productos);
  } catch (error) {
    console.error(error);
  }
}

obtenerProductos();

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
          <button class="producto__agregar" id="${producto.id}">Agregar</button>
        </div>
      `;
    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

botonesSeccion.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesSeccion.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "nuevos_productos") {
      const seccionId = e.currentTarget.id;

      const productoSeccion = productos.find(producto => producto.categoria && producto.categoria.id === seccionId);

      tituloSeccion.innerText = productoSeccion.categoria.nombre;
      const productosBoton = productos.filter(producto => producto.categoria.id === seccionId);
      cargarProductos(productosBoton);
    } else {
      tituloSeccion.innerText = "Nuevos Productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto__agregar");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarUnidades();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productosEnCarrito.find(producto => producto.id === idBoton);
  let producto;
  if (productoAgregado) {
    productoAgregado.cantidad++;
  } else {

    producto = productos.find(producto => producto.id === idBoton);
    producto.cantidad = 1;
    productosEnCarrito.push(producto);

  }

  actualizarUnidades();
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarUnidades() {
  let nuevoUnidades = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  unidades.innerText = nuevoUnidades;
}