import { createReadStream, createWriteStream } from "node:fs";
import zlib from 'node:zlib';
import path from 'path';
import { unlink } from 'node:fs/promises';
import { getWorkDir } from "../helpers/index.js";

export const compressFile = async (args) => {
	return new Promise((res, rej) => {
		const [readFilePath, writeFilePath] = args;
		const currentWorkDir = getWorkDir();
		const resolvedReadFilePath = path.resolve(currentWorkDir, readFilePath);
		const contentStream = createReadStream(resolvedReadFilePath);
		const writableStream = createWriteStream(path.resolve(currentWorkDir, writeFilePath));
		const compressStream = zlib.createBrotliCompress();
	
		contentStream.pipe(compressStream).pipe(writableStream).on("close", () => {
			unlink(resolvedReadFilePath);
			res();
		}).on("error", (err) => {
			console.log(err);
			rej();
		});
	})
};

export const decompressFile = async (args) => {
	return new Promise((res, rej) => {
		const [readFilePath, writeFilePath] = args;
		const currentWorkDir = getWorkDir();
		const resolvedReadFilePath = path.resolve(currentWorkDir, readFilePath);
		const decompressStream = zlib.createBrotliDecompress();
		const contentStream = createReadStream(resolvedReadFilePath);
		const writableStream = createWriteStream(path.resolve(currentWorkDir, writeFilePath));
	
		contentStream.pipe(decompressStream).pipe(writableStream).on("close", () => {
			unlink(resolvedReadFilePath);
			res();
		}).on("error", (err) => {
			console.log(err);
			rej();
		});
	})
};