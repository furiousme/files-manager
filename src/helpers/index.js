import process from "node:process";
import os from "node:os";
import fs from "node:fs/promises";
import { commandsCoreMapping } from "../commands-core-mapping.js";

export const getUsername = () => {
    return process.argv.slice(2).find(el => el.startsWith("--username"))?.split("=")[1] ?? "Guest";
}

export const showGreeting = () => {
    console.log(colorText(`Welcome to the File Manager, ${getUsername()}! ${os.EOL}`));
}

export const showGoodbye = () => {
    console.log(colorText(`${os.EOL}Thank you for using File Manager, ${getUsername()}, goodbye! ${os.EOL}`));
}

export const getWorkDir = () => {
    return process.cwd();
}

export const changeWorkDir = (pathToDir) => {
    process.chdir(pathToDir);
}

export const showWorkDir = () => {
    console.log(colorText(`${os.EOL}You are currently in ${getWorkDir()} ${os.EOL}`, "green"))
}

export const getHomeDir = () => os.homedir();

export const promptForNextCommand = () => {
    console.log(colorText(`Please enter your command > ${os.EOL}`, "blue"));
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

    return option ? commandsCoreMapping[command].options[option].handler : commandsCoreMapping[command].handler;
}

export const getDirEntries = async () => {
    const currentWorkDir = getWorkDir();
    return await fs.readdir(currentWorkDir, { withFileTypes: true });
}

export const prepareDirEntriesToPrint = (entries) => {
    return entries.reduce((acc, el) => {
        const elType = el.isFile() ? "file" : "directory";
        const entry =  {
            name: el.name,
            type: elType
        }

        return elType === "directory" ? [entry, ...acc] : [...acc, entry];
    }, [])
}

export const checkIfExists = async (path) => {
	try {
		await fs.access(path);   
		return true;
	} catch (e) {
		return false
	}
}

const colors = {
    yellow: "33",
    blue: "34",
    green: "32"
};

export const colorText = (text, color = "yellow") => {
    return `\x1b[${colors[color]}m ${text} \x1b[0m`;
}