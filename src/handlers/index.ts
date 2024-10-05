import { Client, MessageType } from "../util.js";

import HandshakeResponse from "./HandshakeResponse.js";
import ListProviders from "./ListProviders.js";

const handlers = new Map<MessageType, (client: Client, buffer: Buffer) => void>([
    [MessageType.MESSAGE_HANDSHAKE_RESPONSE, HandshakeResponse],
    [MessageType.MESSAGE_LISTPROVIDERS, ListProviders]
]);

export default handlers;
