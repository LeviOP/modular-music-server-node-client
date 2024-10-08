import { HandshakeRequest, ListType, RequestList } from "./proto/message.js";
import { Socket } from "node:net";
import { Client, decodeMessage, encodeMessage, MessageType } from "./util.js";
import handlers from "./handlers/index.js";

const socket = new Socket();
socket.connect({
    host: "localhost",
    port: 6065
});

const client: Client = {
    socket
};

export function startup() {
    const request = RequestList.encode({
        type: ListType.PROVIDERS
    }).finish();
    const message = encodeMessage(MessageType.MESSAGE_REQUESTLIST, request);

    socket.write(message);
}

function makeHandshakeRequest() {
    const handshake = HandshakeRequest.encode({
        protocolVersion: "0.0.1"
    }).finish();
    const message = encodeMessage(MessageType.MESSAGE_HANDSHAKE_REQUEST, handshake);

    socket.write(message);
}

socket.on("connect", () => {
    console.log("connected!");
    makeHandshakeRequest();
});

socket.on("data", (data) => {
    const [type, message] = decodeMessage(data);
    const handler = handlers.get(type);
    if (handler === undefined) {
        console.log("Message with no registered handler:", type);
        return;
    }
    handler(client, message);
});

socket.on("close", () => {
    console.log("closing connection");
});
