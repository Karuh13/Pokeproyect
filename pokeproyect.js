let pokedex = [];

const initializePokedex = async (pokemonLimit = 151) => {
    const iterable = [...new Array(pokemonLimit)].map((empty, index) => index + 1);

    try {
        for(const index of iterable) {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            const result = await response.json();
            pokedex.push(result);
			
			const specieFetch = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + index);
			const specieInfo = await specieFetch.json();
			pokedex[index - 1].description = specieInfo.flavor_text_entries[17].flavor_text;
        }
    } catch (error) {
        console.log(error);
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
		pokeImg$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)
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

		pokeDiv$$.addEventListener("click", () => detailedView(pokeData, main$$))

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

const detailedView = async (pokeData, main$$) => {
	main$$.innerHTML = "";
	
	// Card with details
	const detailsCard$$ = document.createElement("div")
	detailsCard$$.className = "pokeDetails"

	// Name of the pokemon
	const pokeName$$ = document.createElement("h3");
	pokeName$$.innerHTML = pokeData.name;
	detailsCard$$.appendChild(pokeName$$);

	// Closing button
	const closingButton$$ = document.createElement("button")
	detailsCard$$.appendChild(closingButton$$)
	closingButton$$.innerHTML = "X"
	closingButton$$.className = "closing-button"
	closingButton$$.addEventListener("click", () => searchPokemon(document.querySelector("input")))

	// Div for animations, stats and description
	const informationDiv$$ = document.createElement("div")
	detailsCard$$.appendChild(informationDiv$$)

	// Div for both animations
	const animationsDiv$$ = document.createElement("div");
	informationDiv$$.appendChild(animationsDiv$$)

	// Animated front view of the pokemon 
	const pokeGifFront$$ = document.createElement("img");
    animationsDiv$$.appendChild(pokeGifFront$$);
    pokeGifFront$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
	pokeGifFront$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)

	// Animated back view of the pokemon 
	const pokeGifBack$$ = document.createElement("img");
    animationsDiv$$.appendChild(pokeGifBack$$);
    pokeGifBack$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.back_default;
	pokeGifBack$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)

	// Div for stats
	const statBox$$ = document.createElement("div")
	informationDiv$$.appendChild(statBox$$)

	// Stats
	for (statData of pokeData.stats){
		const stat$$ = document.createElement("span")
		stat$$.innerHTML = statData.stat.name + statData.base_stat
		statBox$$.appendChild(stat$$)
	}

	// Description
	const descriptionDiv$$ = document.createElement("div")
	descriptionDiv$$.innerHTML = pokeData.description
	informationDiv$$.appendChild(descriptionDiv$$)

	// Types
	const typeBox$$ = document.createElement("div");
	typeBox$$.className = "pokeBox-details";
	for (typing of pokeData.types) {
		const pokeType$$ = document.createElement("span");
		pokeType$$.innerHTML = typing.type.name.toUpperCase();
		pokeType$$.className = typing.type.name;
		typeBox$$.appendChild(pokeType$$);
	}
	detailsCard$$.appendChild(typeBox$$);
	
	
	main$$.appendChild(detailsCard$$)
}


const director = async () => {
	await initializePokedex();

    printPokemon(pokedex)

	const inputSearch$$ = document.querySelector("input");
	inputSearch$$.addEventListener("keyup", () => searchPokemon(inputSearch$$));
};

director();
