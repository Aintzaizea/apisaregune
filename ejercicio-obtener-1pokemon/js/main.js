// Ejercicio obtener tarjeta de Pikachu de la pokeapi:
/** */
// Contenidos del Dom
const contenedor = document.querySelector('.contain')
// numero random entre 1 y 151
const random = Math.floor(Math.random() * 151) + 1;

// convertir el randpom a string
const randomString = random.toString();

// Función para obtener datos
const obtenerPokemon = async (randomString) => {

    try {
        // URL
        const URL = `https://pokeapi.co/api/v2/pokemon/${randomString}`;
        // const URL = 'https://pokeapi.co/api/v2/pokemon/pikachu'

        // Hacer la petición y almacenar la respuesta en una constante
        const response = await fetch(URL);

        // Convertir la respuesta a lenguaje  JSON (objeto js)
        const datos = await response.json();

        // Extraer la información que necesitamos
        const imagen = datos.sprites.front_default; // ruta de la imagen 
        const nombre = datos.name; // nombre del pokemon
        const id = datos.id; // id del pokemon
        const tipos = datos.types.map(type => type.type.name).join(', '); // tipos del pokemon
        const altura = datos.height; // altura del pokemon
        const peso = datos.weight; // peso del pokemon


        // pintar el pokemon
            // crear los elementos para almacenar los datos del pokemon
            const div = document.createElement('div');
            div.classList = "card";

            const img = document.createElement('img');
            img.src = imagen;

            const h2 = document.createElement('h2');
            h2.textContent = nombre;
            
            const pId = document.createElement('p');
            pId.textContent = `ID: ${id}`;
            
            const pTipos = document.createElement('p');
            pTipos.textContent = `Tipos: ${tipos}`;

            const pAltura = document.createElement('p');
            pAltura.textContent = `Altura: ${altura}`;
            
            const pPeso = document.createElement('p');
            pPeso.textContent = `Peso: ${peso}`;

            
            // agregar los datos a los elementos
            div.appendChild(img);
            div.appendChild(h2);
            div.appendChild(pId);
            div.appendChild(pTipos);
            div.appendChild(pAltura);
            div.appendChild(pPeso);

            // agregar el div al contenedor
            contenedor.appendChild(div);

    } catch (error) {
        console.log(error)
    }
} 

obtenerPokemon(randomString);