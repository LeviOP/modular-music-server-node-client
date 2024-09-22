import { Client, MessageType } from "../util.js";
import HandshakeResponse from "./HandshakeResponse.js";

const handlers = new Map<MessageType, (client: Client, buffer: Buffer) => void>([
    [MessageType.MESSAGE_HANDSHAKE_RESPONSE, HandshakeResponse]
]);

export default handlers;
