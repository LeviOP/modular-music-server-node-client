import { Client } from "../util.js";
import { HandshakeResponse } from "@modular-music-server/protobufs";
import { startup } from "../main.js";

export default function(client: Client, buffer: Buffer) {
    const message = HandshakeResponse.decode(buffer);
    if (!message.accepted) {
        console.log("Handshake not accepted! Reason:", message.rejectionReason);
        return;
    }

    client.serverProtocolVersion = message.protocolVersion;
    console.log("Handshake accepted with version", message.protocolVersion);
    startup();
}
