let pokedex = [];

const initializePokedex = async (pokemonLimit = 151) => {
    const iterable = [...new Array(pokemonLimit)].map((empty, index) => index + 1);

    for(const index of iterable) {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        const result = await response.json();
        pokedex.push(result);  
    }  
}

const printPokemon = (pokedex) => {
	const main$$ = document.querySelector("main");
	main$$.innerHTML = "";

	for (const pokeData of pokedex) {
		// Card
		const pokeDiv$$ = document.createElement("div");
		pokeDiv$$.className = "pokeCard";

		// Name of the pokemon
		const pokeName$$ = document.createElement("h3");
		pokeName$$.innerHTML = pokeData.name;
		pokeDiv$$.appendChild(pokeName$$);

		// Sprite
		const pokeImg$$ = document.createElement("img");
		pokeImg$$.src = pokeData.sprites.front_default;
		pokeDiv$$.appendChild(pokeImg$$);

		// Types
		const typeBox$$ = document.createElement("div");
		typeBox$$.className = "pokeBox";
		for (typing of pokeData.types) {
			const pokeType$$ = document.createElement("span");
			pokeType$$.innerHTML = typing.type.name.toUpperCase();
			pokeType$$.className = typing.type.name;
			typeBox$$.appendChild(pokeType$$);
		}
		pokeDiv$$.appendChild(typeBox$$);

		/* const pokeGif$$ = document.createElement("img");
        pokeDiv$$.appendChild(pokeGif$$);
        pokeGif$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokeGif$$.width *= 0.5; */

		main$$.appendChild(pokeDiv$$);
	}
};

const searchPokemon = (input) => {
	printPokemon(
		pokedex.filter(
			(pokemon) => pokemon.name.includes(input.value) || String(pokemon.id).includes(input.value)
		)
	);
};


const director = async () => {
	await initializePokedex();

    printPokemon(pokedex)

	const inputSearch$$ = document.querySelector("input");
	inputSearch$$.addEventListener("keyup", () => searchPokemon(inputSearch$$));
};

director();
