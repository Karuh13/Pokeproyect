const pokedex =[];

const initializePokedex = () => {
    for (let pokeNumber = 1; pokeNumber <= 151; pokeNumber++) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNumber)
        .then((data) => data.json())
        .then((pokemon) => pokedex.push(pokemon))
    }
}

const printPokemon = (pokedex) => {
    const main$$ = document.querySelector("main")
    main$$.innerHTML = ""

    for (const pokeData of pokedex) {
        const pokeDiv$$ = document.createElement("div");
        
        const pokeName$$ = document.createElement("h3");
        pokeDiv$$.appendChild(pokeName$$);

        const pokeImg$$ = document.createElement("img");
        pokeDiv$$.appendChild(pokeImg$$);
        
        const typeBox$$ = document.createElement("div");
        typeBox$$.className = "pokeBox";
        for (typing of pokeData.types){
            const pokeType$$ = document.createElement("span");
            pokeType$$.innerText = typing.type.name.toUpperCase();
            pokeType$$.className = typing.type.name;
            typeBox$$.appendChild(pokeType$$);
        }
        pokeDiv$$.appendChild(typeBox$$);
        
        /* const pokeGif$$ = document.createElement("img");
        pokeDiv$$.appendChild(pokeGif$$);
        pokeGif$$.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokeGif$$.width *= 0.5; */
    
        
        pokeDiv$$.className = "pokeCard";
        
        pokeImg$$.src = pokeData.sprites.front_default;
        pokeName$$.innerText = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
        
        main$$.appendChild(pokeDiv$$);
    }

}

const searchPokemon = (input) => {
    printPokemon(pokedex.filter((pokemon) => pokemon.name.includes(input.value)));
}

/* Need to convert this into an async function */
const director = () => {
    initializePokedex();

    setTimeout(() => printPokemon(pokedex), 1000);

    const inputSearch$$ = document.querySelector("input");
    inputSearch$$.addEventListener("keyup", () => searchPokemon(inputSearch$$))
}

director()