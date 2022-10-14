const printPokemon = (pokeData) => {

    const pokeDiv$$ = document.createElement("div");
	const pokeImg$$ = document.createElement("img");
    const pokeGif$$ = document.createElement("img");
    const pokeName$$ = document.createElement("h3");

    pokeDiv$$.appendChild(pokeImg$$);
    pokeDiv$$.appendChild(pokeName$$);
    pokeDiv$$.appendChild(pokeGif$$);
    
    pokeDiv$$.className = "pokeCard";
    
    pokeImg$$.src = pokeData.sprites.front_default;
    pokeGif$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
    pokeGif$$.width *= 0.5;
    pokeName$$.innerText = pokeData.name;
    
    document.body.appendChild(pokeDiv$$);

}

for (let pokeNumber = 1; pokeNumber <= 151; pokeNumber++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNumber)
        .then((data) => data.json())
        .then((pokemon) => printPokemon(pokemon))
}

        
