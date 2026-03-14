import { ShallowLocations } from "../pokeapi.js";
import { State } from "../state.js";

export async function commandMap(state: State) {
    if (!state.nextLocationsURL) {
        console.log("you're on the last page");
        return;
    }

    const locations: ShallowLocations = await state.location.fetchLocations(state.nextLocationsURL);
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