import { type Pokemon } from "#src/types/pokemon.type.js";
import { State } from "#src/state.js";

export function commandInspect(state: State, name: string) {
    const pokemon: Pokemon = state.pokedex[name];

    if (!pokemon) {
        console.log("you didn't catch the pokemon yet");
        state.readline.prompt();
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(
        `Stats:\n${pokemon.stats
            .map(stat =>  `  - ${stat.stat.name}: ${stat.base_stat}`)
            .join("\n")}`
        );
    console.log(
        `Types:\n${pokemon.types
            .map(type => `  - ${type.type.name}`)
            .join("\n")}`
        );
}