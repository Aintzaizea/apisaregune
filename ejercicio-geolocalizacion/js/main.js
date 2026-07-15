const ejer1 = document.querySelector ("#ejer1");
const ejer2 = document.querySelector ("#ejer2");
const ejer3 = document.querySelector ("#ejer3");
const ejer4 = document.querySelector ("#ejer4");

let ultimaPeticion = 0;

async function fetchControlado(url, opciones) {
  const ahora = Date.now();
  const tiempoDesdeUltima = ahora - ultimaPeticion;
  const esperaMinima = 1000;

  if (tiempoDesdeUltima < esperaMinima) {
    await new Promise(resolve => setTimeout(resolve, esperaMinima - tiempoDesdeUltima));
  }

  ultimaPeticion = Date.now();
  return fetch(url, opciones);
}

// EJERCICIO 1: Geocodificar una dirección
async function geoLocalizacion() {
  try {
    const URL = "https://nominatim.openstreetmap.org/search?format=json&q=Plaza+de+la+Virgen+Blanca+1+Vitoria-Gasteiz";
    
    const respuesta = await fetchControlado (URL, {
        headers: {
            'User-Agent': 'MiAppEducativa/1.0 (contacto@miapp.com)',
            'Accept-Language': 'es'
        }
    });
    
    // Verificamos si la API nos ha bloqueado por exceso de uso
    if (respuesta.status === 429) {
        throw new Error("Límite de peticiones de la API excedido (429).");
    }

    const datos = await respuesta.json();
    console.log(datos);
    
    const resultado = datos[0];
    
    console.log("Ejercicio 1 correcto:", resultado);
    ejer1.innerHTML = `<div class="geo1">Latitud: ${resultado.lat}, Longitud: ${resultado.lon}</div>`;
    
  } catch (error) {
        console.error("Error en Ejercicio 1:", error);
        ejer1.innerHTML = `<div class="error" style="color: red;">Error 1: ${error.message}</div>`;
  }
}


// EJERCICIO 2: Geocodificación inversa
async function geoInversa() {
    try {
        const URL2 = "https://nominatim.openstreetmap.org/reverse?format=json&lat=42.8467&lon=-2.6734";
        
        const respuesta2 = await fetchControlado (URL2, {
            headers: {
                'User-Agent': 'MiAppEducativa/1.0 (contacto@miapp.com)',
                'Accept-Language': 'es'
            }
        });
        
        if (respuesta2.status === 429) {
            throw new Error("Límite de peticiones de la API excedido (429).");
        }

        const datos2 = await respuesta2.json();
        console.log(datos2);
        console.log("Ejercicio 2 correcto:", datos2);
    
        // Controlamos que no falle si la API cambia 'city' por 'town' o 'village'
        const ciudad = datos2.address.city || datos2.address.town || datos2.address.village || "No disponible";

        ejer2.innerHTML = `
            <div class="geo2">
                <p><strong>Dirección completa:</strong> ${datos2.display_name}</p>
                <p><strong>Calle:</strong> ${datos2.address.road || "No disponible"}</p> 
                <p><strong>Ciudad:</strong> ${ciudad}</p>
                <p><strong>Código postal:</strong> ${datos2.address.postcode || "No disponible"}</p>
            </div>`;

    } catch (error) {
        console.error("Error en Ejercicio 2:", error);
        ejer2.innerHTML = `<div class="error" style="color: red;">Error 2: ${error.message}</div>`;
    }
}


// ==========================================
// FUNCIÓN CONTROLADORA DE FLUJO (SEGURO)
// ==========================================
async function iniciarEjercicios() {
    console.log("Iniciando Ejercicio 1...");
    await geoLocalizacion(); // Ejecuta el 1 y espera a que termine completamente
    
    console.log("Pausa de seguridad de 1.5 segundos para evitar bloqueo CORS/429...");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa real entre peticiones
    
    console.log("Iniciando Ejercicio 2...");
    await geoInversa(); // Ejecuta el 2 de forma segura
}


// EJERCICIO 3: Buscador de lugares con Nominatim
const result3 = document.querySelector ("#resultado3");
const leaflet = document.querySelector ("#mapaLeaflet3");
const busqueda3 = document.querySelector ("#busqueda");
const boton3 = document.querySelector ("#botonBuscar3");
let mapa3 = null;

boton3.addEventListener("click", async () => {
    const direccion = busqueda3.value.trim();
    console.log(direccion);
    
try {
    const URL3 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

    const respuesta3 = await fetchControlado (URL3, {
        headers: {
            'User-Agent': 'MiAppEducativa/1.0 (contacto@miapp.com)',
            'Accept-Language': 'es'
        }
    }); 
    if (respuesta3.status === 429) {
            throw new Error("Límite de peticiones de la API excedido (429).");
        }
    
        const datos3 = await respuesta3.json();
        console.log(datos3);
        if (datos3.length === 0) {
            result3.innerHTML = `<div class="error" style="color: red;">No se ha encontrado ninguna dirección. Prueba con otra búsqueda.</div>`;
            return; 
}
        const resultado3 = datos3[0];
        console.log("Ejercicio 3 correcto:", datos3);
        result3.innerHTML = `<div class="geo3">
                                <p>Dirección: ${resultado3.display_name} </p> 
                                <p>Longitud: ${resultado3.lon}</p> 
                                <p>Latitud: ${resultado3.lat} </p>                
                            </div>`;
        if (mapa3 !== null) { mapa3.remove(); }
        mapa3 = L.map('mapaLeaflet3').setView([resultado3.lat, resultado3.lon], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
                }).addTo(mapa3);

            L.marker([resultado3.lat, resultado3.lon]).addTo(mapa3);
        

} catch (error) {
        console.error ("Error en Ejercicio 3:", error);
        result3.innerHTML = `<div class="error" style="color: red;">Error 3: ${error.message}</div>`;
    }

});


//EJERCICIO 4 Comparativa de servicios de mapas


// Única llamada para arrancar tu aplicación
iniciarEjercicios();
