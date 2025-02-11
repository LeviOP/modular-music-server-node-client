import { BinaryWriter } from "@bufbuild/protobuf/wire";
import { Socket } from "net";
import { FileType } from "@modular-music-server/protobufs";
import path from "node:path";
import { existsSync, stat } from "fs";
import { mkdir, readdir } from "node:fs/promises";
import { readFile } from "node:fs";

export interface Download {
    type: FileType;
    name: string;
    totalSize: number;
    currentSize: number;
    data: Buffer;
}

export interface Provider {
    name: string;
    id: string;
    author: string;
}

export interface Client {
    serverProtocolVersion?: string;
    socket: Socket;
    downloads: Download[];
    providers: Provider[];
}

export const enum MessageType {
    MESSAGE_HANDSHAKE_REQUEST = 0,
    MESSAGE_HANDSHAKE_RESPONSE,
    MESSAGE_REQUESTLIST,
    MESSAGE_LISTPROVIDERS,
    MESSAGE_REQUESTPROVIDER,
    MESSAGE_PROVIDER,
    MESSAGE_REQUESTFILE,
    MESSAGE_FILEINFO,
    MESSAGE_FILECHUNK
}

export function getDataDir(): string {
    const homeDir = process.env["HOME"];
    if (homeDir === undefined) {
        // HACK: maybe deal with this? Home should always be set (posix etc)
        throw Error("HOME is not set!");
    };
    // HACK: actually follow xdg base directory spec variables
    const dataDir = path.join(homeDir, ".local/share/node-mms-client");
    return dataDir;
}

export function ensureDirExists(path: string) {
    return new Promise<void>((resolve, reject) => {
        stat(path, (err, stats) => {
            if (err) {
                if (err.code === "ENOENT") resolve(mkdir(path));
                else reject(err);
            } else {
                if (!stats.isDirectory) reject("Path is not a directory!");
                else resolve();
            }
        });
    });
}

export async function parseProviders(dataDir: string): Promise<Provider[]> {
    const providersDir = path.join(dataDir, "providers");
    if (!existsSync(providersDir)) return [];
    const files = await readdir(providersDir, { withFileTypes: true });
    const providers: Provider[] = [];
    for (const file of files) {
        if (!file.isDirectory) continue;
        const providerInfoPath = path.join(providersDir, file.name, "provider.json");

        const providerInfoRaw = await readFileSafe(providerInfoPath);
        if (providerInfoRaw === null) continue;
        let providerInfo: unknown;
        try {
            providerInfo = JSON.parse(providerInfoRaw);
        } catch (e) {
            console.log("Couldn't parse JSON:", e);
            continue;
        }
        providers.push(providerInfo as Provider);
    }
    return providers;
}

export async function readFileSafe(path: string): Promise<string | null> {
    return new Promise((resolve) => {
        readFile(path, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                if (err.code === "ENOENT") console.log(path, "does not exist!");
                resolve(null);
            }
            resolve(data);
        });
    });
}

export function encodeMessage(type: MessageType, data: Uint8Array): Uint8Array {
    const writer = new BinaryWriter();

    const typeBuffer = new Uint8Array(1);
    const typeView = new DataView(typeBuffer.buffer);
    typeView.setUint8(0, type);
    writer.raw(typeBuffer);

    const lengthBuffer = new Uint8Array(4);
    const lengthView = new DataView(lengthBuffer.buffer);
    lengthView.setUint32(0, data.byteLength, false);
    writer.raw(lengthBuffer);

    writer.raw(data);
    return writer.finish();
}

export function decodeMessage(data: Buffer): [MessageType, Buffer] {
    const messageType = data.readUint8(0);
    const messageLength = data.readUint32BE(1);
    const messageData = data.subarray(5, 5 + messageLength);

    return [messageType, messageData];
}
