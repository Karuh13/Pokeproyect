const print = (pokeData) => {

    const pokeDiv$$ = document.createElement("div");
	const pokeImg$$ = document.createElement("img");
    const pokeGif$$ = document.createElement("img");

    pokeDiv$$.appendChild(pokeImg$$);
    pokeDiv$$.appendChild(pokeGif$$);

    pokeDiv$$.className = "pokeCard";

    pokeImg$$.src = pokeData.sprites.front_default;
    pokeGif$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
    
    pokeGif$$.width *= 0.5;
    document.body.appendChild(pokeDiv$$);

}

for (let pokeNumber = 1; pokeNumber <= 151; pokeNumber++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNumber)
        .then((data) => data.json())
        .then((pokemon) => print(pokemon))
}

        
