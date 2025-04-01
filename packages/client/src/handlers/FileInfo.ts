import { Client } from "../util.js";
import { FileInfo } from "@modular-music-server/protobufs";

export default function(client: Client, buffer: Buffer) {
    const message = FileInfo.decode(buffer);
    console.log("Received file transfer info:", message);
    client.downloads.push({
        type: message.type,
        name: message.name,
        totalSize: message.size,
        currentSize: 0,
        data: Buffer.alloc(0)
    });
    console.log(client.downloads);
}
