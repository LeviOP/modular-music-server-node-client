import { HandshakeRequest, ListType, RequestList } from "@modular-music-server/protobufs";
import { Socket } from "node:net";
import { Client, encodeMessage, MessageType } from "./util.js";
import handlers from "./handlers/index.js";
import prompts from "prompts";

const socket = new Socket();
socket.connect({
    host: "localhost",
    port: 6065
});

const client: Client = {
    socket,
    downloads: [],
    providers: []
};


export async function startup() {
    const { choice } = await prompts({
        type: "select",
        name: "choice",
        message: "do something",
        choices: [
            { title: "Run downloaded provider", value: "run" },
            { title: "Download proviers", value: "download" }
        ]
    });
    if (choice === "run") {
        console.log(client.providers);
    } else if (choice === "download") {
        const request = RequestList.encode({
            type: ListType.PROVIDERS
        }).finish();
        const message = encodeMessage(MessageType.MESSAGE_REQUESTLIST, request);

        socket.write(message);
    }
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

const enum State {
    TYPE = 0,
    LENGTH,
    DATA
}

let state: State = State.TYPE;
let data: Buffer = Buffer.alloc(0);
let current: { type: number, length: number, data: Buffer } = {
    type: 0,
    length: 0,
    data: Buffer.alloc(0)
};

socket.on("data", (newdata) => {
    data = Buffer.concat([data, newdata]);
    out: while (data.byteLength > 0) {
        // console.log("contents:", data.toString());
        switch (state) {
            case State.TYPE:
                current.type = data.readUint8(0);
                data = data.subarray(1);
                state = State.LENGTH;
                break;
            case State.LENGTH:
                if (data.byteLength < 4) break out;
                current.length = data.readUint32BE(0);
                data = data.subarray(4);
                state = State.DATA;
                break;
            case State.DATA:
                if (data.byteLength < current.length) {
                    // There is more data coming down the pipe
                    current.data = Buffer.concat([current.data, data]);
                    data = Buffer.alloc(0);
                    current.length -= data.byteLength;
                } else {
                    // We have received all of the data for this message
                    current.data = Buffer.concat([current.data, data.subarray(0, current.length)]);
                    data = data.subarray(current.length);
                    if (current.length < 0) {
                        console.log("something has gone terribly wrong: our buffer length is less than zero");
                        break;
                    }
                    handleMessage(current.type, current.data);
                    current = { type: 0, length: 0, data: Buffer.alloc(0) };
                    state = State.TYPE;
                }
                break;
        }

    }
});

function handleMessage(type: MessageType, message: Buffer) {
    const handler = handlers.get(type);
    if (handler === undefined) {
        console.log("Message with no registered handler:", type);
        return;
    }
    handler(client, message);
}

socket.on("close", () => {
    console.log("closing connection");
});
