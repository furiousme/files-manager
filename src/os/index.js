import os from "node:os";

export const showEOL = () => {
    console.log(`${os.EOL}EOL (escaped): ${JSON.stringify(os.EOL)}`);
}

export const showCpus = () => {
    const cpus = os.cpus();

    console.log(`${os.EOL}Total: ${cpus.length}${os.EOL}`);

    cpus.forEach((el, ind) => {
        console.log(`CPU ${ind + 1}:
        model: ${el.model}
        clock rate: ${(el.speed / 1000).toFixed(2)} GHz`);
    });
}   

export const showHomeDir = () => {
    console.log(`${os.EOL}Homedir: ${os.homedir()}`);
}

export const showUsername = () => {
    console.log(`${os.EOL}Username: ${os.userInfo().username}`);
}

export const showArchitecture = () => {
    console.log(`${os.EOL}Architecture: ${os.arch()}`);
}