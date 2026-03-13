import { createInterface } from "node:readline";
import { getCommands } from "./command.js";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Pokedex > ',
});

export function startREPL() {
    rl.prompt();
}

rl.on('line', (line: string) => {
    if (line.length === 0) {
        rl.prompt();
    } else {
        const input = cleanInput(line);
        const commands = getCommands();
        const command = commands[input[0]];

        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        command.callback(commands);

        if (command.name !== "exit") {
            rl.prompt();
        }
    }
})


export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}