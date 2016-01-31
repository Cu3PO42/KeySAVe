// Type definitions for fs-extra
// Project: https://github.com/jprichardson/node-fs-extra
// Definitions by: midknight41 <https://github.com/midknight41>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/fs-extra.d.ts

///<reference path="../node/node.d.ts"/>
///<reference path="../bluebird/bluebird.d.ts"/>

declare module "fs-extra" {
	import stream = require("stream");

	export interface Stats {
		isFile(): boolean;
		isDirectory(): boolean;
		isBlockDevice(): boolean;
		isCharacterDevice(): boolean;
		isSymbolicLink(): boolean;
		isFIFO(): boolean;
		isSocket(): boolean;
		dev: number;
		ino: number;
		mode: number;
		nlink: number;
		uid: number;
		gid: number;
		rdev: number;
		size: number;
		blksize: number;
		blocks: number;
		atime: Date;
		mtime: Date;
		ctime: Date;
	}

	export interface FSWatcher {
		close(): void;
	}

	export class ReadStream extends stream.Readable { }
	export class WriteStream extends stream.Writable { }

	//extended methods
	export function copy(src: string, dest: string, callback?: (err: Error) => void): void;
	export function copyAsync(src: string, dest: string): Promise<void>;
	export function copy(src: string, dest: string, filter: (src: string) => boolean, callback?: (err: Error) => void): void;
	export function copyAsync(src: string, dest: string, filter: (src: string) => boolean): Promise<void>;

	export function copySync(src: string, dest: string): void;
	export function copySync(src: string, dest: string, filter: (src: string) => boolean): void;

	export function createFile(file: string, callback?: (err: Error) => void): void;
	export function createFileAsync(file: string): Promise<void>;
	export function createFileSync(file: string): void;

	export function move(src: string, dest: string, options: { clobber?: boolean, limit?: number }, callback: (err: Error) => void): void;
	export function moveAsync(src: string, dest: string, options: { clobber?: boolean, limit?: number }): Promise<void>;
	export function move(src: string, dest: string, callback: (err: Error) => void): void;
	export function moveAsync(src: string, dest: string): Promise<void>;

	export function mkdirs(dir: string, callback?: (err: Error) => void): void;
	export function mkdirsAsync(dir: string): Promise<void>;
	export function mkdirp(dir: string, callback?: (err: Error) => void): void;
	export function mkdirpAsync(dir: string): Promise<void>;
	export function mkdirs(dir: string, options?: MkdirOptions, callback?: (err: Error) => void): void;
	export function mkdirsAsync(dir: string, options?: MkdirOptions): Promise<void>;
	export function mkdirp(dir: string, options?: MkdirOptions, callback?: (err: Error) => void): void;
	export function mkdirpAsync(dir: string, options?: MkdirOptions): Promise<void>;
	export function mkdirsSync(dir: string, options?: MkdirOptions): void;
	export function mkdirpSync(dir: string, options?: MkdirOptions): void;

	export function outputFile(file: string, data: any, callback?: (err: Error) => void): void;
	export function outputFileAsync(file: string, data: any): Promise<void>;
	export function outputFileSync(file: string, data: any): void;

	export function outputJson(file: string, data: any, callback?: (err: Error) => void): void;
	export function outputJsonAsync(file: string, data: any): Promise<void>;
	export function outputJSON(file: string, data: any, callback?: (err: Error) => void): void;
	export function outputJSONAsync(file: string, data: any): Promise<void>;
	export function outputJsonSync(file: string, data: any): void;
	export function outputJSONSync(file: string, data: any): void;

	export function readJson(file: string, callback?: (err: Error) => void): void;
	export function readJsonAsync(file: string): Promise<void>;
	export function readJson(file: string, options?: OpenOptions, callback?: (err: Error) => void): void;
	export function readJsonAsync(file: string, options?: OpenOptions): Promise<void>;
	export function readJSON(file: string, callback?: (err: Error) => void): void;
	export function readJSONAsync(file: string): Promise<void>;
	export function readJSON(file: string, options?: OpenOptions, callback?: (err: Error) => void): void;
	export function readJSONAsync(file: string, options?: OpenOptions): Promise<void>;

	export function readJsonSync(file: string, options?: OpenOptions): void;
	export function readJSONSync(file: string, options?: OpenOptions): void;

	export function remove(dir: string, callback?: (err: Error) => void): void;
	export function removeAsync(dir: string): Promise<void>;
	export function removeSync(dir: string): void;
	// export function delete(dir: string, callback?: (err: Error) => void): void;
	// export function deleteAsync(dir: string): Promise<void>;
	// export function deleteSync(dir: string): void;

	export function writeJson(file: string, object: any, callback?: (err: Error) => void): void;
	export function writeJsonAsync(file: string, object: any): Promise<void>;
	export function writeJson(file: string, object: any, options?: OpenOptions, callback?: (err: Error) => void): void;
	export function writeJsonAsync(file: string, object: any, options?: OpenOptions): Promise<void>;
	export function writeJSON(file: string, object: any, callback?: (err: Error) => void): void;
	export function writeJSONAsync(file: string, object: any): Promise<void>;
	export function writeJSON(file: string, object: any, options?: OpenOptions, callback?: (err: Error) => void): void;
	export function writeJSONAsync(file: string, object: any, options?: OpenOptions): Promise<void>;

	export function writeJsonSync(file: string, object: any, options?: OpenOptions): void;
	export function writeJSONSync(file: string, object: any, options?: OpenOptions): void;

	export function rename(oldPath: string, newPath: string, callback?: (err: Error) => void): void;
	export function renameAsync(oldPath: string, newPath: string): Promise<void>;
	export function renameSync(oldPath: string, newPath: string): void;
	export function truncate(fd: number, len: number, callback?: (err: Error) => void): void;
	export function truncateAsync(fd: number, len: number): Promise<void>;
	export function truncateSync(fd: number, len: number): void;
	export function chown(path: string, uid: number, gid: number, callback?: (err: Error) => void): void;
	export function chownAsync(path: string, uid: number, gid: number): Promise<void>;
	export function chownSync(path: string, uid: number, gid: number): void;
	export function fchown(fd: number, uid: number, gid: number, callback?: (err: Error) => void): void;
	export function fchownAsync(fd: number, uid: number, gid: number): Promise<void>;
	export function fchownSync(fd: number, uid: number, gid: number): void;
	export function lchown(path: string, uid: number, gid: number, callback?: (err: Error) => void): void;
	export function lchownAsync(path: string, uid: number, gid: number): Promise<void>;
	export function lchownSync(path: string, uid: number, gid: number): void;
	export function chmod(path: string, mode: number, callback?: (err: Error) => void): void;
	export function chmodAsync(path: string, mode: number): Promise<void>;
	export function chmod(path: string, mode: string, callback?: (err: Error) => void): void;
	export function chmodAsync(path: string, mode: string): Promise<void>;
	export function chmodSync(path: string, mode: number): void;
	export function chmodSync(path: string, mode: string): void;
	export function fchmod(fd: number, mode: number, callback?: (err: Error) => void): void;
	export function fchmodAsync(fd: number, mode: number): Promise<void>;
	export function fchmod(fd: number, mode: string, callback?: (err: Error) => void): void;
	export function fchmodAsync(fd: number, mode: string): Promise<void>;
	export function fchmodSync(fd: number, mode: number): void;
	export function fchmodSync(fd: number, mode: string): void;
	export function lchmod(path: string, mode: string, callback?: (err: Error) => void): void;
	export function lchmodAsync(path: string, mode: string): Promise<void>;
	export function lchmod(path: string, mode: number, callback?: (err: Error) => void): void;
	export function lchmodAsync(path: string, mode: number): Promise<void>;
	export function lchmodSync(path: string, mode: number): void;
	export function lchmodSync(path: string, mode: string): void;
	export function stat(path: string, callback?: (err: Error, stats: Stats) => void): void;
	export function statAsync(path: string): Promise<Stats>;
	export function lstat(path: string, callback?: (err: Error, stats: Stats) => void): void;
	export function lstatAsync(path: string): Promise<Stats>;
	export function fstat(fd: number, callback?: (err: Error, stats: Stats) => void): void;
	export function fstatAsync(fd: number): Promise<Stats>;
	export function statSync(path: string): Stats;
	export function lstatSync(path: string): Stats;
	export function fstatSync(fd: number): Stats;
	export function link(srcpath: string, dstpath: string, callback?: (err: Error) => void): void;
	export function linkAsync(srcpath: string, dstpath: string): Promise<void>;
	export function linkSync(srcpath: string, dstpath: string): void;
	export function symlink(srcpath: string, dstpath: string, type?: string, callback?: (err: Error) => void): void;
	export function symlinkAsync(srcpath: string, dstpath: string, type?: string): Promise<void>;
	export function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
	export function readlink(path: string, callback?: (err: Error, linkString: string) => void): void;
	export function readlinkAsync(path: string): Promise<string>;
	export function realpath(path: string, callback?: (err: Error, resolvedPath: string) => void): void;
	export function realpathAsync(path: string): Promise<string>;
	export function realpath(path: string, cache: string, callback: (err: Error, resolvedPath: string) => void): void;
	export function realpathAsync(path: string, cache: string): Promise<string>;
	export function realpathSync(path: string, cache?: boolean): string;
	export function unlink(path: string, callback?: (err: Error) => void): void;
	export function unlinkAsync(path: string): Promise<void>;
	export function unlinkSync(path: string): void;
	export function rmdir(path: string, callback?: (err: Error) => void): void;
	export function rmdirAsync(path: string): Promise<void>;
	export function rmdirSync(path: string): void;
	export function mkdir(path: string, mode?: number, callback?: (err: Error) => void): void;
	export function mkdirAsync(path: string, mode?: number): Promise<void>;
	export function mkdir(path: string, mode?: string, callback?: (err: Error) => void): void;
	export function mkdirAsync(path: string, mode?: string): Promise<void>;
	export function mkdirSync(path: string, mode?: number): void;
	export function mkdirSync(path: string, mode?: string): void;
	export function readdir(path: string, callback?: (err: Error, files: string[]) => void ): void;
	export function readdirAsync(path: string): Promise<string[]>;
	export function readdirSync(path: string): string[];
	export function close(fd: number, callback?: (err: Error) => void): void;
	export function closeAsync(fd: number): Promise<void>;
	export function closeSync(fd: number): void;
	export function open(path: string, flags: string, mode?: string, callback?: (err: Error, fs: number) => void): void;
	export function openAsync(path: string, flags: string, mode?: string): Promise<number>;
	export function openSync(path: string, flags: string, mode?: string): number;
	export function utimes(path: string, atime: number, mtime: number, callback?: (err: Error) => void): void;
	export function utimesAsync(path: string, atime: number, mtime: number): Promise<void>;
	export function utimesSync(path: string, atime: number, mtime: number): void;
	export function futimes(fd: number, atime: number, mtime: number, callback?: (err: Error) => void): void;
	export function futimesAsync(fd: number, atime: number, mtime: number): Promise<void>;
	export function futimesSync(fd: number, atime: number, mtime: number): void;
	export function fsync(fd: number, callback?: (err: Error) => void): void;
	export function fsyncAsync(fd: number): Promise<void>;
	export function fsyncSync(fd: number): void;
	export function write(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number, callback?: (err: Error, written: number, buffer: NodeBuffer) => void): void;
	export function writeAsync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): Promise<[number, NodeBuffer]>;
	export function writeSync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): number;
	export function read(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number, callback?: (err: Error, bytesRead: number, buffer: NodeBuffer) => void ): void;
	export function readAsync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): Promise<[number, NodeBuffer]>;
	export function readSync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): number;
	export function readFile(filename: string, encoding: string, callback: (err: Error, data: string) => void ): void;
	export function readFileAsync(filename: string, encoding: string): Promise<string>;
	export function readFile(filename: string, options: OpenOptions, callback: (err: Error, data: string) => void ): void;
	export function readFileAsync(filename: string, options: OpenOptions): Promise<string>;
	export function readFile(filename: string, callback: (err: Error, data: NodeBuffer) => void ): void;
	export function readFileAsync(filename: string): Promise<NodeBuffer>;
	export function readFileSync(filename: string): NodeBuffer;
	export function readFileSync(filename: string, encoding: string): string;
	export function readFileSync(filename: string, options: OpenOptions): string;
	export function writeFile(filename: string, data: any, encoding?: string, callback?: (err: Error) => void): void;
	export function writeFileAsync(filename: string, data: any, encoding?: string): Promise<void>;
	export function writeFile(filename: string, data: any, options?: OpenOptions, callback?: (err: Error) => void): void;
	export function writeFileAsync(filename: string, data: any, options?: OpenOptions): Promise<void>;
	export function writeFileSync(filename: string, data: any, encoding?: string): void;
	export function writeFileSync(filename: string, data: any, option?: OpenOptions): void;
	export function appendFile(filename: string, data: any, encoding?: string, callback?: (err: Error) => void): void;
	export function appendFileAsync(filename: string, data: any, encoding?: string): Promise<void>;
	export function appendFile(filename: string, data: any,option?: OpenOptions, callback?: (err: Error) => void): void;
	export function appendFileAsync(filename: string, data: any,option?: OpenOptions): Promise<void>;
	export function appendFileSync(filename: string, data: any, encoding?: string): void;
	export function appendFileSync(filename: string, data: any, option?: OpenOptions): void;
	export function watchFile(filename: string, listener: { curr: Stats; prev: Stats; }): void;
	export function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: { curr: Stats; prev: Stats; }): void;
	export function unwatchFile(filename: string, listener?: Stats): void;
	export function watch(filename: string, options?: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
	export function exists(path: string, callback?: (exists: boolean) => void ): void;
    export function existsAsync(path: string): Promise<boolean>;
	export function existsSync(path: string): boolean;
    export function ensureDir(path: string, cb: (err: Error) => void): void;
    export function ensureDirAsync(path: string): Promise<void>;
    export function ensureDirSync(path: string): void;
	export function ensureFile(path: string, cb: (err: Error) => void): void;
	export function ensureFileAsync(path: string): Promise<void>;
	export function ensureFileSync(path: string): void;
	export function ensureLink(path: string, cb: (err: Error) => void): void;
	export function ensureLinkAsync(path: string): Promise<void>;
	export function ensureLinkSync(path: string): void;
	export function ensureSymlink(path: string, cb: (err: Error) => void): void;
	export function ensureSymlinkAsync(path: string): Promise<void>;
	export function ensureSymlinkSync(path: string): void;
    export function emptyDir(path: string, callback?: (err: Error) => void): void;
    export function emptyDirAsync(path: string): Promise<void>;
    export function emptyDirSync(path: string): boolean;

	export interface OpenOptions {
		encoding?: string;
		flag?: string;
	}

	export interface MkdirOptions {
		fs?: any;
		mode?: number;
	}

	export interface ReadStreamOptions {
		flags?: string;
		encoding?: string;
		fd?: number;
		mode?: number;
		bufferSize?: number;
	}
	export interface WriteStreamOptions {
		flags?: string;
		encoding?: string;
		string?: string;
	}
	export function createReadStream(path: string, options?: ReadStreamOptions): ReadStream;
	export function createWriteStream(path: string, options?: WriteStreamOptions): WriteStream;
	export function createOutputStream(path: string, options?: WriteStreamOptions): WriteStream;
}
