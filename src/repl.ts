import { createInterface } from "node:readline";
import { getCommands } from "./command.js";
import { State } from "./state.js";

export function startREPL(state: State) {
    state.readline.prompt();

    state.readline.on('line', (line: string) => {
    if (line.length === 0) {
        state.readline.prompt();
    } else {
        const input = cleanInput(line);
        const command = state.commands[input[0]];

        if (!command) {
            console.log("Unknown command");
            state.readline.prompt();
            return;
        }

        try {
            command.callback(state);
        } catch (e) {
            console.log("Error occured: " + e)
        }

        if (command.name !== "exit") {
            state.readline.prompt();
        }
    }
})
}




export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}