const print = (pokemons) => {

    for (pokemonNumber in pokemons.results) {

        pokemonNumber = Number(pokemonNumber) + 1;
        const pokeDiv$$ = document.createElement("div")
		const pokeImg$$ = document.createElement("img");

        pokeDiv$$.appendChild(pokeImg$$)

        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber)
        .then((rawPokeData) =>rawPokeData.json())
        .then((pokeData) => {

            pokeImg$$.src = pokeData.sprites.front_default
            document.body.appendChild(pokeDiv$$)

        })
    }
}

fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
	.then((data) => data.json())
	.then((pokemons) => print(pokemons) /* console.log(pokemons) */);
