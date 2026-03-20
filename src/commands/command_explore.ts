import { State } from "#src/state.js";

export async function commandExplore(state: State, locationName: string) {
    if (!locationName) {
        console.log("Please enter a location name after the explore command");
        state.readline.prompt();
        return;
    }
    
    try {
        const location = await state.location.fetchLocation(locationName);
        console.log(`Exploring ${locationName}...`);

        for (let pokemone of location.pokemon_encounters) {
            console.log(pokemone.pokemon.name);
        }

        state.readline.prompt();

    } catch { 
        console.log("Error with searching for location ", locationName);
        console.log("Please enter a valid location name");
        state.readline.prompt();
        return;
    }

   
}