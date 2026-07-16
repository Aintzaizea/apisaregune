const ACCESS_KEY = "plwqN1Kn8UetNigmG2OvpErdADREpbIHRz31cefT3_k";
const contenedor = document.getElementById("contenedor")
async function obtenerFotos() {
  try {
    const respuesta = await fetch(
      "https://api.unsplash.com/search/photos?query=nature&per_page=12",
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    const datos = await respuesta.json();

    console.log(datos.results);
    pintarFotos(datos.results);
       
  } catch (error) {
    console.error("Error:", error);
  }
}
  function pintarFotos(fotos) {
  fotos.forEach(element => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const img = document.createElement("img");
    img.src = element.urls.regular;
    img.alt = "Foto";

    const nombreFotografo = document.createElement("p");
    nombreFotografo.textContent = element.user.username;

    const botonFavorito = document.createElement("button");
    botonFavorito.textContent = "🤍";

  tarjeta.appendChild(img);
  tarjeta.appendChild(nombreFotografo);
  tarjeta.appendChild(botonFavorito);
  contenedor.appendChild(tarjeta);
});}
obtenerFotos();