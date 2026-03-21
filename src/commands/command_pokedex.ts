import { State } from "#src/state.js";

export function commandPokedex(state: State) {
    const pokedex = state.pokedex;

    if (Object.keys(pokedex).length === 0) {
        console.log("There are no pokemons caught yet!");
        state.readline.prompt();
        return;
    }
    console.log("Your Pokedex:");
    for (let pokemon of Object.keys(pokedex)) {
        console.log(` - ${pokedex[pokemon].name}`)
    }
    state.readline.prompt();
    return;
}