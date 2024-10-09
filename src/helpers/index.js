import process from "node:process";
import os from "node:os";
import { commandsCoreMapping } from "../commands-core-mapping.js";

export const getUsername = () => {
    return process.argv.slice(2).find(el => el.startsWith("--username"))?.split("=")[1] ?? "Guest";
}

export const showGreeting = () => {
    console.log(`Welcome to the File Manager, ${getUsername()}! ${os.EOL}`);
}

export const showGoodbye = () => {
    console.log(`${os.EOL}Thank you for using File Manager, ${getUsername()}, goodbye! ${os.EOL}`);
}

export const getWorkDir = () => {
    return process.cwd();
}

export const changeWorkDir = (pathToDir) => {
    try {
        process.chdir(pathToDir);
    } catch (e) {
        console.error("error while changing directory");
    }
}

export const showWorkDir = () => {
    console.log(`You are currently in ${getWorkDir()} ${os.EOL}`)
}

export const getHomeDir = () => os.homedir();

export const promptForNextCommand = () => {
    console.log(`Please enter your command > ${os.EOL}`);
}

export const showErrorMessage = (message) => {
    console.log(`${os.EOL}*** ${message} *** ${os.EOL}`);
}

export const getCommandOption = (args) => {
    if (args[0]?.startsWith("--")) return args[0].slice(2);
}

export const validateInput = (command, args) => {
    const isValidCommand = command in commandsCoreMapping;

    if (!isValidCommand) return false;

    const option = getCommandOption(args);

    if (option) {
        return commandsCoreMapping[command].options && option in commandsCoreMapping[command].options;
    } 

    const requiredArgsNum = commandsCoreMapping[command].args?.length;

    return  requiredArgsNum ? requiredArgsNum === args.length : true;
}

export const getCommandHandler = (command, args) => {
    const option = getCommandOption(args);

    return option ? commandsCoreMapping[command][option].handler : commandsCoreMapping[command].handler;
}