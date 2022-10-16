const printPokemon = (pokeData) => {
    
    const pokeDiv$$ = document.createElement("div");
	
    const pokeImg$$ = document.createElement("img");
    pokeDiv$$.appendChild(pokeImg$$);
    
    const pokeName$$ = document.createElement("h3");
    pokeDiv$$.appendChild(pokeName$$);
    
    const typeBox$$ = document.createElement("div");
    for (typing of pokeData.types){
        const pokeType$$ = document.createElement("span");
        pokeType$$.innerText = typing.type.name;
        pokeType$$.className = "pokeType";
        typeBox$$.appendChild(pokeType$$);
    }
    pokeDiv$$.appendChild(typeBox$$);
    
    const pokeGif$$ = document.createElement("img");
    pokeDiv$$.appendChild(pokeGif$$);

    
    pokeDiv$$.className = "pokeCard";
    
    pokeImg$$.src = pokeData.sprites.front_default;
    pokeGif$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
    pokeGif$$.width *= 0.5;
    pokeName$$.innerText = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
    
    document.body.appendChild(pokeDiv$$);

}

for (let pokeNumber = 1; pokeNumber <= 151; pokeNumber++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNumber)
        .then((data) => data.json())
        .then((pokemon) => printPokemon(pokemon))
}

        
