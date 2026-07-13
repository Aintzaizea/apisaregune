async function obtenerPokemons() {
	const contenedor = document.querySelector("#galeria");
	contenedor.innerHTML = "<p>Cargando Pokémon...</p>";

	try {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
		const data = await res.json();

		const promesas = data.results.map(async function(pokemon) {
			const respuestaDetalle = await fetch(pokemon.url);
			return respuestaDetalle.json();
		});

		const detalles = await Promise.all(promesas);

		contenedor.innerHTML = "";

		detalles.forEach(function(pokemon) {
			const card = document.createElement("div");
			card.className = "pokemon-card";
			card.innerHTML = `
				<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
				<div class="nombre">${pokemon.name}</div>
			`;
			contenedor.appendChild(card);
		});
	} catch (error) {
		console.error("Error:", error);
		contenedor.innerHTML = "<p>Error al cargar los Pokémon</p>";
	}
}
obtenerPokemons();