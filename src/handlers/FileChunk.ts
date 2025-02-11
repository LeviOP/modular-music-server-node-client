import { Client, Download, ensureDirExists, getDataDir } from "../util.js";
import { FileChunk, FileType } from "@modular-music-server/protobufs";
import path from "path";
import { writeFile } from "fs/promises";

export default function(client: Client, buffer: Buffer) {
    const message = FileChunk.decode(buffer);
    console.log("Received file chunk!");
    const transferIndex = client.downloads.findIndex((download) => download.type === message.type && download.name === message.name);
    if (transferIndex === -1) {
        console.log("There is something going seriously wrong here.");
        return;
    }
    const transfer = client.downloads[transferIndex];

    transfer.data = Buffer.concat([transfer.data, message.data]);
    transfer.currentSize += message.size;
    console.log(client.downloads);
    if (transfer.currentSize === transfer.totalSize) {
        handleDownload(transfer);
        client.downloads.splice(transferIndex, 1);
    }
}

async function handleDownload(transfer: Download) {
    console.log("Some download finished!");
    if (transfer.type === FileType.PROVIDER_CLIENT) {
        const dataDir = getDataDir();
        await ensureDirExists(dataDir);
        const providersDir = path.join(dataDir, "providers");
        await ensureDirExists(providersDir);
        const providerDir = path.join(providersDir, transfer.name);
        await ensureDirExists(providerDir);
        const clientPath = path.join(providerDir, "client.lua");
        writeFile(clientPath, transfer.data);
    } else {
        console.log("we can't handle this type of download yet!");
    }
}
