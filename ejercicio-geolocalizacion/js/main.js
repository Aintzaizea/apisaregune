const ejer1 = document.querySelector ("#ejer1");
const ejer2 = document.querySelector ("#ejer2");
const ejer3 = document.querySelector ("#ejer3");
const ejer4 = document.querySelector ("#ejer4");


// EJERCICIO 1: Geocodificar una dirección
async function geoLocalizacion() {
  try {
    const URL = "https://nominatim.openstreetmap.org/search?format=json&q=Plaza+de+la+Virgen+Blanca+1+Vitoria-Gasteiz";
    
    const respuesta = await fetch (URL, {
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
        
        const respuesta2 = await fetch (URL2, {
            headers: {
                'User-Agent': 'MiAppEducativa/1.0 (contacto@miapp.com)',
                'Accept-Language': 'es'
            }
        });
        
        if (respuesta2.status === 429) {
            throw new Error("Límite de peticiones de la API excedido (429).");
        }

        const datos2 = await respuesta2.json();
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

// Única llamada para arrancar tu aplicación
iniciarEjercicios();


// EJERCICIO 3: Buscador de lugares con Nominatim
const result3 = document.querySelector ("#resultado3");
const leaflet = document.querySelector ("#mapaLeaflet3");
const busqueda3 = document.querySelector ("#busqueda");
const boton3 = document.querySelector ("#botonBuscar3");


