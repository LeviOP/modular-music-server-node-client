import { Client, MessageType } from "../util.js";

import HandshakeResponse from "./HandshakeResponse.js";
import ListProviders from "./ListProviders.js";
import Provider from "./Provider.js";
import FileInfo from "./FileInfo.js";
import FileChunk from "./FileChunk.js";

const handlers = new Map<MessageType, (client: Client, buffer: Buffer) => void>([
    [MessageType.MESSAGE_HANDSHAKE_RESPONSE, HandshakeResponse],
    [MessageType.MESSAGE_LISTPROVIDERS, ListProviders],
    [MessageType.MESSAGE_PROVIDER, Provider],
    [MessageType.MESSAGE_FILEINFO, FileInfo],
    [MessageType.MESSAGE_FILECHUNK, FileChunk]
]);
export default handlers;
