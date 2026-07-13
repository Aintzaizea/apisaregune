const selectCategoria = document.querySelector("#categoria");
const inputPrecio = document.querySelector("#precioMax");
const inputNombre = document.querySelector("#nombre");
const btnBuscar = document.querySelector("#btnBuscar");
const todosProductos = document.querySelector("#btnTodos")
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

let categorias = [];
let productos = [];
const contenedor = document.querySelector("#productos");
async function obtenerProductos () {
    contenedor.innerHTML = "<p>Cargando productos</p>"; //mensaje mientras cargan productos
    try {
       
        const respuesta = await fetch("https://dummyjson.com/products?limit=0");
        const datos = await respuesta.json();
        productos = datos.products;
        
        productos.sort(function(a, b) {
        return b.rating - a.rating;
});
        pintarProductos(productos.slice(0, 8));
        console.log(productos);

    } catch (error) {
        console.error("No se pueden cargar los datos", error.message);
    }

}
function pintarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(function(producto) {
        contenedor.innerHTML += 
        `<a class="pintado" href="" target="_self">
            <h3>${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <p>${producto.price} €</p>
            <p>${capitalizar(producto.category)}</p>
        </a>`
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