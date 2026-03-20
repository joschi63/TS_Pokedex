import { createInterface, Interface } from "node:readline";
import { getCommands } from "./commands/command.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    location: PokeAPI;
    nextLocationsURL: string | null;
    previousLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
    return {
        readline: createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: 'Pokedex > ',
        }),
        commands: getCommands(),
        location: new PokeAPI(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=0&limit=20",
        previousLocationsURL: null,
        pokedex: {},
    };
}