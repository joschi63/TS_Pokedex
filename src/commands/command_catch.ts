import { State } from "#src/state.js";

export async function commandCatch(state: State, name: string) {
    if (!name) {
        console.log("Please enter a pokemon's name after catch");
        state.readline.prompt();
        return;
    }

    try {
        const pokemon = state.location.fetchPokemon(name.toLocaleLowerCase());

        console.log(`Throwing a Pokeball at ${(await pokemon).name}...`);

        const catched = catchPokemon((await pokemon).base_experience);

        if (catched) {
            const caughtPokemon = await pokemon;
            console.log(`${caughtPokemon.name} was caught!`);
            console.log("You may now inspect it with the inspect command.");
            state.pokedex[caughtPokemon.name] = caughtPokemon;
            state.readline.prompt();
            return;
        }

        console.log(`${(await pokemon).name} escaped!`);
        state.readline.prompt();
        return;

    } catch {
        console.log("Error catching: ", name);
        console.log("Please try again and use a valid name!");
        state.readline.prompt();
        return;
    }
}

function catchPokemon(experience: number) {
    const maxExperience = 1025;

    const endChance = (maxExperience - experience) / maxExperience;

    if (endChance >= 1.0) {
        return true;
    }

    const chance = Math.random();

    return chance < endChance;
}