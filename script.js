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

			pokemon.id = result.id;

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
			
			pokemon.cry = "https://play.pokemonshowdown.com/audio/cries/src/" + pokemon.name.split("-").join("") + ".wav";

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
			pokeImg$$.classList.add("shiny");
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
			(pokemon) => pokemon.name.includes(input.value.toLowerCase()) 
			|| String(pokemon.id).includes(input.value)
			|| pokemon.types.includes(input.value.toLowerCase())
		)
	);
};

const detailedView = async (pokeData, main$$, pokeDiv$$) => {
	pokeDiv$$.classList.add("hidden");
	const pokeDetailsDiv$$ = document.createElement("div")
	pokeDiv$$.parentNode.insertBefore(pokeDetailsDiv$$, pokeDiv$$.nextSibling);


	
	// Card with details
	pokeDetailsDiv$$.className = "pokeDetails"
	
	// Cry
	const cryDiv$$ = document.createElement("div")
	cryDiv$$.innerHTML =`<audio autoplay="autoplay"><source src=${pokeData.cry} type="audio/x-wav"></audio>`;
	pokeDetailsDiv$$.appendChild(cryDiv$$)
	
	// Name of the pokemon
	const pokeName$$ = document.createElement("h3");
	pokeName$$.innerHTML = pokeData.name;
	pokeDetailsDiv$$.appendChild(pokeName$$);

	// Genus of the pokemon
	const genusP$$ = document.createElement("p")
	genusP$$.innerHTML = pokeData.genus
	pokeDetailsDiv$$.appendChild(genusP$$)

	// Closing button
	const closingButton$$ = document.createElement("button")
	pokeDetailsDiv$$.appendChild(closingButton$$)
	closingButton$$.innerHTML = "X"
	closingButton$$.className = "closing-button"
	closingButton$$.addEventListener("click", () => {
		pokeDiv$$.classList.remove("hidden");
		pokeDetailsDiv$$.remove()
	})
	
	// Div for stats + animation
	const statAndAnimationDiv$$ = document.createElement("div")
	statAndAnimationDiv$$.className = "stat-animation"
	pokeDetailsDiv$$.appendChild(statAndAnimationDiv$$)

	// Div for stats
	const statBox$$ = document.createElement("div")
	statBox$$.className = "stats-box"
	statAndAnimationDiv$$.appendChild(statBox$$)

	// Stats
	for (stat in pokeData.stats){
		const stat$$ = document.createElement("div")

		const statName$$ = document.createElement("span")
		statName$$.innerHTML = stat;
		stat$$.appendChild(statName$$)

		const statBar$$ = document.createElement("span")
		statBar$$.className = "statBar"
		stat$$.appendChild(statBar$$)

		const statValue$$ = document.createElement("span")
		statValue$$.innerHTML = pokeData.stats[stat]
		stat$$.appendChild(statValue$$)

		statBox$$.appendChild(stat$$)
	}
	
	// Div for both animations
	const animationsDiv$$ = document.createElement("div");
	animationsDiv$$.className = "animations"
	statAndAnimationDiv$$.appendChild(animationsDiv$$)
	

	// Animated front view of the pokemon (depends on shiny attribute)
	const pokeGifFront$$ = document.createElement("img");
    animationsDiv$$.appendChild(pokeGifFront$$);
	if (pokeData.shiny) {
		pokeGifFront$$.classList.add("shiny")
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
		pokeGifBack$$.classList.add("shiny")
		pokeGifBack$$.src = pokeData.shiny_back_animation;
		pokeGifBack$$.title = "Shiny " + pokeData.name[0].toUpperCase() + pokeData.name.slice(1) + "!!!";

	} else {
		pokeGifBack$$.src = pokeData.default_back_animation;
		pokeGifBack$$.title = pokeData.name[0].toUpperCase() + pokeData.name.slice(1)
		
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
	pokeDetailsDiv$$.appendChild(typeBox$$);

	// Description
	const descriptionP$$ = document.createElement("p")
	descriptionP$$.innerHTML = pokeData.flavor_text
	descriptionP$$.className = "description"
	pokeDetailsDiv$$.appendChild(descriptionP$$)

	pokeDetailsDiv$$.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}


const init = async () => {

	await initializePokedex();

    printPokemon(pokedex)

	const inputSearch$$ = document.querySelector("input");
	inputSearch$$.disabled = false
	inputSearch$$.addEventListener("keyup", () => searchPokemon(inputSearch$$));

	const clearSearch$$ = document.querySelector("#clearSearch")
	clearSearch$$.addEventListener("click", () => {
		inputSearch$$.value = "";
		searchPokemon(inputSearch$$)
	})

};

init();
