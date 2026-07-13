// Buscador de personaje Rick and Morty: Muestra: nombre, imagen, especie y estado.
// Contenidos del Dom
const form = document.querySelector("form");
const input = document.querySelector("input");
const contenedor = document.querySelector(".contain");


// Función para obtener datos
const obtenerPersonaje = async (personaje) => {
    try {
        const URL = `https://rickandmortyapi.com/api/character/?name=${personaje}`;

        // Hacer la petición y almacenar la respuesta en una constante
        const response = await fetch(URL);
    
        // 1. Limpiar el contenedor antes de cada nueva búsqueda
        contenedor.innerHTML = "";

        // Convertir la respuesta a lenguaje  JSON (objeto js)
        const datos = await response.json();

        // Mostrar los datos en la consola para verificar que se obtuvieron correctamente y que datos incluyen
        console.log(datos);

        // ForEach para pintar los personajes en el contenedor 
        datos.results.forEach((personaje) => {
            // Extraer la información que se requiera
            const name = personaje.name;
            const image = personaje.image;
            const species = personaje.species;
            const status = personaje.status;

            // creaer los elementos para almacenar los datos del personaje
            const div = document.createElement('div');
            div.classList.add('personaje');

            const personName = document.createElement('h2');
            personName.textContent = name;

            // agregar los datos a los elementos
            const personImage = document.createElement('img');
            personImage.src = image;

            const personSpecies = document.createElement('p');
            personSpecies.textContent = `Especie: ${species}`;

            const personStatus = document.createElement('p');
            personStatus.textContent = `Estado: ${status}`;

            // agregar los elementos al div
            div.append(personName, personImage, personSpecies, personStatus);
            // agregar el div al contenedor
            contenedor.appendChild(div);

            // Limpiar el input
            input.value = "";

        });
    } catch (error) {
        console.log('Error', error.message)
    }
}

// Eventos para el boton
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const personaje = input.value.trim().toLowerCase();
    if (personaje) {
        obtenerPersonaje(personaje);
    }
});