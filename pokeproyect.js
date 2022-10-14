const print = (pokeData) => {

    const pokeDiv$$ = document.createElement("div")
	const pokeImg$$ = document.createElement("img");

    pokeDiv$$.appendChild(pokeImg$$)
    pokeDiv$$.className = "pokeCard"

    pokeImg$$.src = pokeData.sprites.front_default
    document.body.appendChild(pokeDiv$$)

}

for (let pokeNumber = 1; pokeNumber <= 151; pokeNumber++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNumber)
        .then((data) => data.json())
        .then((pokemon) => print(pokemon))
}

        
