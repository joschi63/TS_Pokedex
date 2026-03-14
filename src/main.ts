import { startREPL } from "#src/repl.js";
import { initState } from "./state.js";

function main() {
    const state = initState();
    startREPL(state);
}

main();