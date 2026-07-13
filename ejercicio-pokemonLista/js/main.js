async function obtenerPokemon() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12"); // Pedimos la lista de Pokémon.

    const datos = await respuesta.json(); // Pasamos la respuesta a JSON.

    datos.results.forEach (async(element) => { // Recorremos cada Pokémon de la lista.
        const datosPokemon =  await fetch (element.url) // Pedimos los datos de este Pokémon.

        const respuesta2 = await datosPokemon.json(); // Convertimos esos datos a JSON.
      
    console.log(respuesta2); // Miramos los datos en la consola.

    const tarjeta = document.createElement("div"); // Creamos una tarjeta para mostrar el Pokémon.
    tarjeta.classList.add("tarjeta");

    const parrafo = document.createElement("p"); // Creamos el texto con el nombre.
    parrafo.textContent = respuesta2.name;

    const contenedor = document.querySelector(".container"); // Buscamos el contenedor de la página.

    const imagen = document.createElement("img"); // Creamos la imagen del Pokémon.
    imagen.src = respuesta2.sprites.front_default;

    tarjeta.appendChild(parrafo); // Metemos el nombre dentro de la tarjeta.
    tarjeta.appendChild(imagen); // Metemos la imagen dentro de la tarjeta.

    contenedor.appendChild(tarjeta); // Añadimos la tarjeta al contenedor.

    });
  } catch (error) {
    console.error("No se pueden cargar los datos:", error.message); // Si algo falla, mostramos un mensaje.
    alert("No se pueden cargar los datos");
  }
}

obtenerPokemon(); // Llamamos a la función para que se ejecute.