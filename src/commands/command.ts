import { commandExit } from "#src/commands/command_exit.js";
import { commandHelp } from "#src/commands/command_help.js";
import type { CLICommand, State } from "#src/state.js";
import { commandCatch } from "./command_catch.js";
import { commandExplore } from "./command_explore.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map_back.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: (state: State) => commandExit(state),
    },
    help: {
        name: "help",
        description: "Shows help for usage",
        callback: (state: State) => commandHelp(state),
    },
    map: {
        name: "map",
        description: "Shows next 20 Poke-locations",
        callback: (state: State) => commandMap(state),
    },
    mapb: {
        name: "mapb",
        description: "Shows previous 20 Poke-locations",
        callback: (state: State) => commandMapBack(state),
    },
    explore: {
      name: "explore",
      description: "Returns the name of the pokemon living in this area",
      callback: async (state: State, ...args: string[]) => await commandExplore(state, args[0]),
    },
    catch: {
      name: "catch",
      description: "Gives you a try to catch a specific pokemon",
      callback: async (state: State, ...args: string[]) => await commandCatch(state, args[0]),
    },
    inspect: {
      name: "inspect",
      description: "Gives you details about pokemon you've caught",
      callback: async (state: State, ...args: string[]) => await commandInspect(state, args[0]),
    }
  };
}