const ACCESS_KEY = "plwqN1Kn8UetNigmG2OvpErdADREpbIHRz31cefT3_k";
const contenedor = document.getElementById("contenedor");

const state = {
  fotos: [],
  favoritos: JSON.parse(localStorage.getItem("favoritos")) || []
};

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(state.favoritos));
}

function toggleFavorito(id) {
  if (state.favoritos.includes(id)) {
    state.favoritos = state.favoritos.filter(favId => favId !== id);
  } else {
    state.favoritos.push(id);
  }
  guardarFavoritos();
  pintarGaleria();
}

async function obtenerFotos() {
  
  try {
    const respuesta = await fetch(
      "https://api.unsplash.com/search/photos?query=nature&per_page=20",
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    const datos = await respuesta.json();
    state.fotos = datos.results;
    pintarGaleria();
  } catch (error) {
    console.error("Error:", error);
  }
}

function pintarSkeleton() {
  contenedor.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton");
    contenedor.appendChild(skeleton);
  }
}
document.getElementById("cerrarModal").addEventListener("click", () => {
document.getElementById("modal").classList.add("oculto");
});

function pintarGaleria() {
  contenedor.innerHTML = "";
  document.getElementById("contador").textContent = ` ❤️ ${state.favoritos.length}`;

  state.fotos.forEach(element => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const img = document.createElement("img");
    img.src = element.urls.regular;
    img.alt = "Foto";img.addEventListener("click", () => {
      document.getElementById("modalImg").src = element.urls.full;
      document.getElementById("modal").classList.remove("oculto");
});

    const nombreFotografo = document.createElement("p");
    nombreFotografo.textContent = element.user.name;

    const botonFavorito = document.createElement("button");
    botonFavorito.textContent = state.favoritos.includes(element.id) ? "❤️" : "♡";

    botonFavorito.addEventListener("click", () => {
      toggleFavorito(element.id);
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(nombreFotografo);
    tarjeta.appendChild(botonFavorito);
    contenedor.appendChild(tarjeta);
  });
}
pintarSkeleton();
obtenerFotos();