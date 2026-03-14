import { commandExit } from "#src/commands/command_exit.js";
import { commandHelp } from "#src/commands/command_help.js";
import type { CLICommand, State } from "#src/state.js";
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
    }
    // can add more commands here
  };
}