import { showGoodbye, showGreeting, showWorkDir, changeWorkDir, getHomeDir, promptForNextCommand, validateInput,
    showErrorMessage,
    getCommandHandler
 } from "./src/helpers/index.js";

const startFileManager = () => {
    showGreeting();
    changeWorkDir(getHomeDir());
    showWorkDir();
    promptForNextCommand();

    process.on('SIGINT', () => {
        showGoodbye();
        process.exit(0);
    });

    const commandsStream = process.stdin;

    commandsStream.on('data', async (data) => {
        const [command, ...args] = data.toString().trim().split(" ");
        const isInputValid = validateInput(command, args);

        if (!isInputValid) {
            showErrorMessage("Invalid input");
            promptForNextCommand();
            return;
        }

        try {
            const handleCommand = getCommandHandler(command, args);
            await handleCommand(args);
            showWorkDir();
            promptForNextCommand();
        } catch (e) {
            showErrorMessage("Operation failed");
            // console.log(e);
            promptForNextCommand();
        }
    })
}

startFileManager();