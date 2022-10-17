const pokedex =[];

/* const header = () => {
    const header$$ = document.querySelector("header")
    const pokeLogo$$ = document.createElement("img");
    pokeLogo$$.src = "./assets/Pokemon_logo.png"

    header$$.appendChild(pokeLogo$$)
    
}

header() */

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
        
        const pokeImg$$ = document.createElement("img");
        pokeDiv$$.appendChild(pokeImg$$);
        
        const pokeName$$ = document.createElement("h3");
        pokeDiv$$.appendChild(pokeName$$);
        
        const typeBox$$ = document.createElement("div");
        typeBox$$.className = "pokeBox";
        for (typing of pokeData.types){
            const pokeType$$ = document.createElement("span");
            pokeType$$.innerText = typing.type.name.toUpperCase();
            pokeType$$.className = typing.type.name;
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
        
        main$$.appendChild(pokeDiv$$);
    }

}

/* Need to convert this into an async function */
function director () {
    initializePokedex();

    setTimeout(() => printPokemon(pokedex), 2000);
}

director()