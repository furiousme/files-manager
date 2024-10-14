import { goUpper, goToDir, printDirEntries } from "./nwd/index.js";
import { printFile, createNewFile, renameFile, copy, deleteFile, moveFile } from "./fs/index.js";
import { showEOL, showCpus, showHomeDir, showUsername, showArchitecture } from "./os/index.js";

const noop = () => {
    console.log('noop handler was found')
};

export const commandsCoreMapping = {
    "up": {
        handler: goUpper,
    },
    "cd": {
        handler: goToDir,
        args: ["path_to_directory"]
    },
    "ls": {
        handler: printDirEntries,
    },
    "cat": {
        handler: printFile,
        args: ["path_to_file"]
    },
    "add": {
        handler: createNewFile,
        args: ["new_file_name"]
    },
    "rn": {
        handler: renameFile,
        args: ["path_to_file", "new_filename"]
    },
    "cp": {
        handler: copy,
        args: ["path_to_file", "path_to_new_directory"]
    },
    "mv": {
        handler: moveFile,
        args: ["path_to_file", "path_to_new_directory"]
    },
    "rm": {
        handler: deleteFile,
        args: ["path_to_file"]  
    },
    "os": {
        options: {
            "EOL": {
                handler: showEOL,
            },
            "cpus": {
                handler: showCpus,
            },
            "homedir": {
                handler: showHomeDir,
            },
            "username": {
                handler: showUsername,
            },
            "architecture": {
                handler: showArchitecture,
            }
        }
    },
    "hash": {
        handler: noop,
        args: ["path_to_file"]
    },
    "compress": {
        handler: noop,
        args: ["path_to_file path_to_destination"]
    },
    "decompress": {
        handler: noop,
        args: ["path_to_file path_to_destination"]
    }
}