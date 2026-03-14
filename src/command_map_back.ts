import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMapBack(state: State) {
    if (!state.previousLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    const locations: ShallowLocations = await state.location.fetchLocations(state.previousLocationsURL);
    state.nextLocationsURL = locations.next ?? null;
    state.previousLocationsURL = locations.previous ?? null;

    if (!Array.isArray(locations.results) || locations.results.length === 0) {
        console.log("No locations found.");
        return;
    }

    for (const location of locations.results) {
        console.log(location.name);
    }
    state.readline.prompt();
}