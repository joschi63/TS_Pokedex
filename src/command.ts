import { commandExit } from "#src/command_exit.js";
import { commandHelp } from "#src/command_help.js";
import type { CLICommand, State } from "#src/state.js";

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
    }
    // can add more commands here
  };
}