let pokedex = [];

const initializePokedex = async (pokemonLimit = 151) => {
    const iterable = [...new Array(pokemonLimit)].map((empty, index) => index + 1);

    try {
        for(const index of iterable) {
			const pokemon = {}
			// Information of each pokemon (object) added to de pokedex array
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            const result = await response.json();

			pokemon.name = result.name;

			pokemon.shiny_sprite = result.sprites.front_shiny;
			pokemon.shiny_front_animation = result.sprites.versions["generation-v"]["black-white"].animated.front_shiny;
			pokemon.shiny_back_animation = result.sprites.versions["generation-v"]["black-white"].animated.back_shiny;

			pokemon.default_sprite = result.sprites.front_default;
			pokemon.default_front_animation = result.sprites.versions["generation-v"]["black-white"].animated.front_default;
			pokemon.default_back_animation = result.sprites.versions["generation-v"]["black-white"].animated.back_default;

			pokemon.types = []
			for (const typing of result.types) {
				pokemon.types.push(typing.type.name)
			}

			pokemon.stats = {}
			for (statData of result.stats){
				pokemon.stats[statData.stat.name] = statData.base_stat;

			}

			
			// Shiny attribute added to each pokemon object
			pokemon.shiny = Math.floor((Math.random() * 20) + 1) === 1 ? true : false;
			
			// Fetch for falvor text, genus and habitat
			const specieFetch = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + index);
			const specieInfo = await specieFetch.json();
			
			// First english flavor text added to each pokemon as homonym attribute
			let flavor_text;
			for (quote of specieInfo.flavor_text_entries) {
				if (quote.language.name === "en"){
					flavor_text = quote.flavor_text;
					break;
				}
			}
			pokemon.flavor_text = flavor_text.split("\f").join(" ");
			
			// English genus added to each pokemon as homonym attribute
			let genus;
			for (languageVariant of specieInfo.genera){
				if (languageVariant.language.name === "en"){
					genus = languageVariant.genus;
					break;
				}
			}
			pokemon.genus = genus;
			
			// Habitat added to each pokemon as homonym attribute
			pokemon.habitat = specieInfo.habitat.name
			
			pokedex.push(pokemon);
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

		// Sprite (depends on shiny attribute)
		const pokeImg$$ = document.createElement("img");
		pokeDiv$$.appendChild(pokeImg$$);
		if (pokeData.shiny) {
			pokeImg$$.src = pokeData.shiny_sprite;
			pokeImg$$.title = "Shiny " + pokeData.name[0].toUpperCase() + pokeData.name.slice(1) + "!!!";
			
		} else {
		pokeImg$$.src = pokeData.default_sprite;
		pokeImg$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);

		}

		// Types
		const typeBox$$ = document.createElement("div");
		typeBox$$.className = "pokeBox";
		for (type of pokeData.types) {
			const pokeType$$ = document.createElement("span");
			pokeType$$.innerHTML = type.toUpperCase();
			pokeType$$.className = type;
			typeBox$$.appendChild(pokeType$$);
		}
		pokeDiv$$.appendChild(typeBox$$);

		pokeDiv$$.addEventListener("click", () => detailedView(pokeData, main$$, pokeDiv$$))

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

const detailedView = async (pokeData, main$$, pokeDiv$$) => {
	pokeDiv$$.innerHTML = "";

	
	// Card with details
	/* const pokeDiv$$ = document.createElement("div") */
	pokeDiv$$.className = "pokeDetails"

	// Name of the pokemon
	const pokeName$$ = document.createElement("h3");
	pokeName$$.innerHTML = pokeData.name;
	pokeDiv$$.appendChild(pokeName$$);

	// Closing button
	const closingButton$$ = document.createElement("button")
	pokeDiv$$.appendChild(closingButton$$)
	closingButton$$.innerHTML = "X"
	closingButton$$.className = "closing-button"
	closingButton$$.addEventListener("click", () => searchPokemon(document.querySelector("input")))

	// Div for animations and stats + description
	const informationDiv$$ = document.createElement("div")
	informationDiv$$.className= "information"
	pokeDiv$$.appendChild(informationDiv$$)

	// Div for both animations
	const animationsDiv$$ = document.createElement("div");
	animationsDiv$$.className = "animations"
	informationDiv$$.appendChild(animationsDiv$$)

	// Animated front view of the pokemon (depends on shiny attribute)
	const pokeGifFront$$ = document.createElement("img");
    animationsDiv$$.appendChild(pokeGifFront$$);
	if (pokeData.shiny) {
		pokeGifFront$$.src = pokeData.shiny_front_animation;
		pokeGifFront$$.title = "Shiny " + pokeData.name[0].toUpperCase() + pokeData.name.slice(1) + "!!!";

	} else {
		pokeGifFront$$.src = pokeData.default_front_animation;
		pokeGifFront$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)
		
	}

	// Animated back view of the pokemon 
	const pokeGifBack$$ = document.createElement("img");
    animationsDiv$$.appendChild(pokeGifBack$$);
	if (pokeData.shiny) {
		pokeGifBack$$.src = pokeData.shiny_back_animation;
		pokeGifBack$$.title = "Shiny " + pokeData.name[0].toUpperCase() + pokeData.name.slice(1) + "!!!";

	} else {
		pokeGifBack$$.src = pokeData.default_back_animation;
		pokeGifBack$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)
		
	}

	// Div for stats + description
	const statAndDescriptionDiv$$ = document.createElement("div")
	statAndDescriptionDiv$$.className = "stat-description"
	informationDiv$$.appendChild(statAndDescriptionDiv$$)

	// Div for stats
	const statBox$$ = document.createElement("div")
	statBox$$.className = "stats-box"
	statAndDescriptionDiv$$.appendChild(statBox$$)


	// Stats
	for (statData in pokeData.stats){
		const stat$$ = document.createElement("div")
		// Need to refactor this
		stat$$.innerHTML = `${statData}----${pokeData.stats[statData]}`
		statBox$$.appendChild(stat$$)
	}

	// Description
	const descriptionP$$ = document.createElement("p")
	descriptionP$$.innerHTML = pokeData.flavor_text
	descriptionP$$.className = "description"
	statAndDescriptionDiv$$.appendChild(descriptionP$$)

	// Types
	const typeBox$$ = document.createElement("div");
	typeBox$$.className = "pokeBox";
	for (type of pokeData.types) {
		const pokeType$$ = document.createElement("span");
		pokeType$$.innerHTML = type.toUpperCase();
		pokeType$$.className = type;
		typeBox$$.appendChild(pokeType$$);
	}
	pokeDiv$$.appendChild(typeBox$$);

	pokeDiv$$.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}


const init = async () => {

	await initializePokedex();

    printPokemon(pokedex)

	const inputSearch$$ = document.querySelector("input");
	inputSearch$$.addEventListener("keyup", () => searchPokemon(inputSearch$$));

	const clearSearch$$ = document.querySelector("#clearSearch")
	clearSearch$$.addEventListener("click", () => {
		inputSearch$$.value = "";
		searchPokemon(inputSearch$$)
	})

};

init();
