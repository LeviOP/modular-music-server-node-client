import { Client, encodeMessage, ensureDirExists, getDataDir, MessageType } from "../util.js";
import { FileType, Provider, RequestFile } from "@modular-music-server/protobufs";
import path from "node:path";
import { writeFile } from "node:fs/promises";

export default function(client: Client, buffer: Buffer) {
    const provider = Provider.decode(buffer);
    console.log("Received provider:", provider);
    saveProviderInfo(provider);
    downloadProviderClient(client, provider.id);
}

async function saveProviderInfo(provider: Provider) {
    const dataDir = getDataDir();
    await ensureDirExists(dataDir);
    const providersDir = path.join(dataDir, "providers");
    await ensureDirExists(providersDir);
    const providerDir = path.join(providersDir, provider.id);
    await ensureDirExists(providerDir);
    const infoPath = path.join(providerDir, "provider.json");
    await writeFile(infoPath, JSON.stringify(provider, null, 4));
}

function downloadProviderClient(client: Client, id: string) {
    console.log("Requesting client lua script for provider");

    const request = RequestFile.encode({ type: FileType.PROVIDER_CLIENT, name: id }).finish();
    const message = encodeMessage(MessageType.MESSAGE_REQUESTFILE, request);

    client.socket.write(message);
}
