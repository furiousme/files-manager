import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { writeFile, rename, copyFile } from 'node:fs/promises';
import { getWorkDir, checkIfExists } from "../helpers/index.js";


export const printFile = async (args) => {
    const fileName = args[0];
    const currentWorkDir = getWorkDir();
    const filePath = path.resolve(currentWorkDir, fileName);
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    console.log(os.EOL);
    console.log(fileContent);
}

export const createNewFile = async (args) => {
    const fileName = args[0];
    const currentWorkDir = getWorkDir();
    const filePath = path.resolve(currentWorkDir, fileName);

	return writeFile(filePath, "", {flag: "wx"});
}

export const renameFile = async (args) => {
    const [oldFilePath, newFileName] = args;
    const currentWorkDir = getWorkDir();
    const newFilePath = path.resolve(currentWorkDir, newFileName)
	const newFileExists = await checkIfExists(newFilePath);

	if (newFileExists) {
		throw new Error("File already exists");
	}

	return rename(oldFilePath, newFilePath); 
}

export const copy = async (args) => {
	const [sourcePath, destinationPath] = args;

	return copyFile(sourcePath, destinationPath, fs.constants.COPYFILE_EXCL);
};

export const deleteFile = async (args) => {
    const [pathToFile] = args;

    await fs.unlink(pathToFile);
}

export const moveFile = async (args) => {
    const [pathToFile, pathToNewDirectory] = args;

    await copy([pathToFile, pathToNewDirectory]);
    await deleteFile([pathToFile]);
}
