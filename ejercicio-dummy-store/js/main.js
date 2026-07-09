const selectCategoria = document.querySelector("#categoria");
const inputPrecio = document.querySelector("#precioMax");
const inputNombre = document.querySelector("#nombre");
const btnBuscar = document.querySelector("#btnBuscar");
const todosProductos = document.querySelector("#btnTodos")

let categorias = [];
let productos = [];
const contenedor = document.querySelector("#productos");
async function obtenerProductos () {
    try {
        const respuesta = await fetch("https://dummyjson.com/products?limit=0");
        const datos = await respuesta.json();
        productos = datos.products;
        productos.sort(function(a, b) {
        return b.rating - a.rating;
});
        pintarProductos(productos.slice(0, 10));
        console.log(productos);

    } catch (error) {
        console.error("No se pueden cargar los datos", error.message);
    }

}
function pintarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(function(producto) {
        contenedor.innerHTML += 
        `<div class="pintado">
            <h3>${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.thumbnail}">
            <p>Precio: ${producto.price}</p>
            <p>Categoría: ${producto.category}</p>
        </div>`
    });
}

function aplicarFiltros() {
    const categoriaSeleccionada = selectCategoria.value;
    const precioMaximo = parseInt(inputPrecio.value);
    const nombreBuscado = inputNombre.value;
    

    const resultado = productos.filter(function(producto) {
            return (categoriaSeleccionada === "" || categoriaSeleccionada === producto.category) 
            && (isNaN(precioMaximo) || producto.price <= precioMaximo)
            && (nombreBuscado === "" || producto.title.toLowerCase().includes(nombreBuscado.toLowerCase()));
    }); 
    
    pintarProductos(resultado);       
}

selectCategoria.addEventListener("change", aplicarFiltros);
inputPrecio.addEventListener("input", aplicarFiltros);
btnBuscar.addEventListener("click", function() {
    aplicarFiltros();
    inputNombre.value = "";
});
todosProductos.addEventListener("click", function() {
    productos.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
    pintarProductos(productos);
});



async function obtenerCategorias() {
    try {
        const respuesta = await fetch("https://dummyjson.com/products/categories");
        const datos = await respuesta.json();
        categorias = datos;
        pintarCategorias();
    } catch (error) {
        console.error("No se pueden cargar las categorías", error.message);
    }
}

function pintarCategorias() {
    categorias.forEach(function(categoria) {
        selectCategoria.innerHTML += `<option value="${categoria.slug}">${categoria.name}</option>`;
    });
}

obtenerCategorias();
obtenerProductos ();