import { startREPL } from "#src/repl.js";
import { initState } from "./state.js";

async function main() {
    const state = initState();
    try {
        await startREPL(state);
    } catch (e) {
        console.log("Error occured: ", e)
    }
    
}

main();