import process from "node:process";
import path from "node:path";
import { getWorkDir, getHomeDir, changeWorkDir, getDirEntries, prepareDirEntriesToPrint } from "../helpers/index.js";

export const goUpper = () => {
    const currentWorkDir = getWorkDir();
    const homeDir = getHomeDir();

    if (currentWorkDir === homeDir) return;

    process.chdir("../");
}

export const goToDir = (args) => {
    const dirPath = args[0];
    const currentWorkDir = getWorkDir();
    const homeDir = getHomeDir();
    const pathToMove = path.resolve(currentWorkDir, dirPath);
    
    if (pathToMove.startsWith(homeDir)) {
        changeWorkDir(pathToMove);
    }
}

export const printDirEntries = async () => {
    const entries = await getDirEntries();
    const normalizedDirContent =  prepareDirEntriesToPrint(entries);

    console.table(normalizedDirContent); 
}