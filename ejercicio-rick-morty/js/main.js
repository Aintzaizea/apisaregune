async function obtenerPersonaje (nombre) {
    try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?name=${nombre}`);
        const datos = await respuesta.json();

        if (datos.error) {
            alert("No encuentro el personaje");
            return;
        }
    const contenedor = document.querySelector("#resultado");
    contenedor.innerHTML = ""; // limpia resultados anteriores

    datos.results.forEach((personaje) => {
    contenedor.innerHTML += 
        `<div class="tarjeta">
            <h3>${personaje.name}</h3>
            <img src="${personaje.image}" alt="${personaje.name}">
            <p>Especie: ${personaje.species}</p>
            <p>Estado: ${personaje.status}</p>
        </div>`
});
    console.log(datos);

    } catch (error) {
        console.error("No se pueden cargar los datos", error.message);
    }
  
}
const formulario = document.querySelector("#buscador")
    formulario.addEventListener("submit", (evento) =>{
      evento.preventDefault();
    const nombrePers = document.querySelector("#inputNombre").value;
    obtenerPersonaje(nombrePers);
});

