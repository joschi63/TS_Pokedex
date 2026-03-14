import { createInterface, Interface } from "node:readline";
import { getCommands } from "./command.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
    return {
        readline: createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: 'Pokedex > ',
        }),
        commands: getCommands(),
    };
}