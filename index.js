import { showGoodbye, showGreeting, showWorkDir, changeWorkDir, getHomeDir, promptForNextCommand, validateInput,
    showErrorMessage
 } from "./src/helpers/index.js";

const handleCommand = (command, args) => {
    console.log("Command: ", command);
    console.log("Args: ", args);
}

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

    commandsStream.on('data', (data) => {
        const [command, ...args] = data.toString().trim().split(" ");
        const isInputValid = validateInput(command, args);

        if (!isInputValid) {
            showErrorMessage("Invalid input");
            promptForNextCommand();
            return;
        }

        try {
            handleCommand(command, args);
        } catch (e) {
            showErrorMessage("Operation failed");
            promptForNextCommand();
        }
    })
}

startFileManager();