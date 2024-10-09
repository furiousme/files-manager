const noop = () => {
    console.log('noop handler was found')
};

export const commandsCoreMapping = {
    "up": {
        handler: noop,
    },
    "cd": {
        handler: noop,
        args: ["path_to_directory"]
    },
    "ls": {
        handler: noop,
    },
    "cat": {
        handler: noop,
        args: ["path_to_file"]
    },
    "add": {
        handler: noop,
        args: ["new_file_name"]
    },
    "rn": {
        handler: noop,
        args: ["path_to_file", "new_filename"]
    },
    "cp": {
        handler: noop,
        args: ["path_to_file", "path_to_new_directory"]
    },
    "mv": {
        handler: noop,
        args: ["path_to_file", "path_to_new_directory"]
    },
    "rm": {
        handler: noop,
        args: ["path_to_file"]  
    },
    "os": {
        options: {
            "EOL": {
                handler: noop,
            },
            "cpus": {
                handler: noop,
            },
            "homedir": {
                handler: noop,
            },
            "username": {
                handler: noop,
            },
            "architecture": {
                handler: noop,
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