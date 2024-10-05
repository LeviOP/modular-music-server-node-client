import { BinaryWriter } from "@bufbuild/protobuf/wire";
import { Socket } from "net";

export interface Client {
    serverProtocolVersion?: string;
    socket: Socket;
}

export const enum MessageType {
    MESSAGE_HANDSHAKE_REQUEST = 0,
    MESSAGE_HANDSHAKE_RESPONSE,
    MESSAGE_REQUESTLIST,
    MESSAGE_LISTPROVIDERS,
    MESSAGE_REQUESTPROVIDER
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
