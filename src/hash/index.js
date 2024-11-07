import { createHash } from "node:crypto";
import path from "node:path";
import os from "node:os";
import { createReadStream } from 'node:fs';
import { getWorkDir } from "../helpers/index.js";

export const calculateHash = (args) => {
    return new Promise((res, rej) => {
        const pathToFile = args[0];
        const hash = createHash('sha256');
        const currentWorkDir = getWorkDir();
        const resolvedPath = path.resolve(currentWorkDir, pathToFile);
        const contentStream = createReadStream(resolvedPath);
    
        contentStream.on('data', (chunk) => {
            hash.update(chunk);
        });
    
        contentStream.on('end', () => {
            const contentHash = hash.digest('hex');
            console.log(`${os.EOL}${contentHash}`);
            res();
        })
        
        contentStream.on('error', (e) => {
            rej(e);
        });  
    } )  
}