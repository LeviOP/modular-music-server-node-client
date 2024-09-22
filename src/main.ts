import { HandshakeRequest, ListType, RequestList } from "./proto/message.js";
import * as net from "node:net";
import { Client, decodeMessage, encodeMessage, MessageType } from "./util.js";
import handlers from "./handlers/index.js";

const socketClient = new net.Socket();
socketClient.connect({
    host: "localhost",
    port: 8080
});

const client: Client = {};

export function startup() {
    const request = RequestList.encode({
        type: ListType.PROVIDERS
    }).finish();
    const message = encodeMessage(MessageType.MESSAGE_REQUESTLIST, request);

    socketClient.write(message);
}

function makeHandshakeRequest() {
    const handshake = HandshakeRequest.encode({
        protocolVersion: "0.0.1"
    }).finish();
    const message = encodeMessage(MessageType.MESSAGE_HANDSHAKE_REQUEST, handshake);

    socketClient.write(message);
}

socketClient.on("connect", () => {
    console.log("connected!");
    makeHandshakeRequest();
});

socketClient.on("data", (data) => {
    const [type, message] = decodeMessage(data);
    const handler = handlers.get(type);
    if (handler === undefined) {
        console.log("Message with no registered handler:", type);
        return;
    }
    handler(client, message);
});

socketClient.on("close", () => {
    console.log("closing connection");
});
