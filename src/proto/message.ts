// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.3
//   protoc               v5.28.1
// source: proto/message.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "";

export enum ListType {
  PROVIDERS = 0,
  UNRECOGNIZED = -1,
}

export function listTypeFromJSON(object: any): ListType {
  switch (object) {
    case 0:
    case "PROVIDERS":
      return ListType.PROVIDERS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListType.UNRECOGNIZED;
  }
}

export function listTypeToJSON(object: ListType): string {
  switch (object) {
    case ListType.PROVIDERS:
      return "PROVIDERS";
    case ListType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface HandshakeRequest {
  protocolVersion: string;
}

export interface HandshakeResponse {
  accepted: boolean;
  rejectionReason: string;
  protocolVersion: string;
}

export interface RequestList {
  type: ListType;
}

export interface ProviderEntry {
  id: string;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
}

export interface ListProviders {
  providers: ProviderEntry[];
}

export interface RequestProvider {
  id: string;
}

function createBaseHandshakeRequest(): HandshakeRequest {
  return { protocolVersion: "" };
}

export const HandshakeRequest = {
  encode(message: HandshakeRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.protocolVersion !== "") {
      writer.uint32(10).string(message.protocolVersion);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HandshakeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HandshakeRequest {
    return { protocolVersion: isSet(object.protocolVersion) ? globalThis.String(object.protocolVersion) : "" };
  },

  toJSON(message: HandshakeRequest): unknown {
    const obj: any = {};
    if (message.protocolVersion !== "") {
      obj.protocolVersion = message.protocolVersion;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HandshakeRequest>, I>>(base?: I): HandshakeRequest {
    return HandshakeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HandshakeRequest>, I>>(object: I): HandshakeRequest {
    const message = createBaseHandshakeRequest();
    message.protocolVersion = object.protocolVersion ?? "";
    return message;
  },
};

function createBaseHandshakeResponse(): HandshakeResponse {
  return { accepted: false, rejectionReason: "", protocolVersion: "" };
}

export const HandshakeResponse = {
  encode(message: HandshakeResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.accepted !== false) {
      writer.uint32(8).bool(message.accepted);
    }
    if (message.rejectionReason !== "") {
      writer.uint32(18).string(message.rejectionReason);
    }
    if (message.protocolVersion !== "") {
      writer.uint32(26).string(message.protocolVersion);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HandshakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.accepted = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rejectionReason = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.protocolVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HandshakeResponse {
    return {
      accepted: isSet(object.accepted) ? globalThis.Boolean(object.accepted) : false,
      rejectionReason: isSet(object.rejectionReason) ? globalThis.String(object.rejectionReason) : "",
      protocolVersion: isSet(object.protocolVersion) ? globalThis.String(object.protocolVersion) : "",
    };
  },

  toJSON(message: HandshakeResponse): unknown {
    const obj: any = {};
    if (message.accepted !== false) {
      obj.accepted = message.accepted;
    }
    if (message.rejectionReason !== "") {
      obj.rejectionReason = message.rejectionReason;
    }
    if (message.protocolVersion !== "") {
      obj.protocolVersion = message.protocolVersion;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HandshakeResponse>, I>>(base?: I): HandshakeResponse {
    return HandshakeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HandshakeResponse>, I>>(object: I): HandshakeResponse {
    const message = createBaseHandshakeResponse();
    message.accepted = object.accepted ?? false;
    message.rejectionReason = object.rejectionReason ?? "";
    message.protocolVersion = object.protocolVersion ?? "";
    return message;
  },
};

function createBaseRequestList(): RequestList {
  return { type: 0 };
}

export const RequestList = {
  encode(message: RequestList, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RequestList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestList {
    return { type: isSet(object.type) ? listTypeFromJSON(object.type) : 0 };
  },

  toJSON(message: RequestList): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = listTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestList>, I>>(base?: I): RequestList {
    return RequestList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestList>, I>>(object: I): RequestList {
    const message = createBaseRequestList();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseProviderEntry(): ProviderEntry {
  return { id: "", name: "" };
}

export const ProviderEntry = {
  encode(message: ProviderEntry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProviderEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderEntry {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: ProviderEntry): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProviderEntry>, I>>(base?: I): ProviderEntry {
    return ProviderEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProviderEntry>, I>>(object: I): ProviderEntry {
    const message = createBaseProviderEntry();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseProvider(): Provider {
  return { id: "", name: "" };
}

export const Provider = {
  encode(message: Provider, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Provider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Provider {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Provider): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Provider>, I>>(base?: I): Provider {
    return Provider.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Provider>, I>>(object: I): Provider {
    const message = createBaseProvider();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseListProviders(): ListProviders {
  return { providers: [] };
}

export const ListProviders = {
  encode(message: ListProviders, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.providers) {
      ProviderEntry.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ListProviders {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListProviders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.providers.push(ProviderEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListProviders {
    return {
      providers: globalThis.Array.isArray(object?.providers)
        ? object.providers.map((e: any) => ProviderEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListProviders): unknown {
    const obj: any = {};
    if (message.providers?.length) {
      obj.providers = message.providers.map((e) => ProviderEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListProviders>, I>>(base?: I): ListProviders {
    return ListProviders.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListProviders>, I>>(object: I): ListProviders {
    const message = createBaseListProviders();
    message.providers = object.providers?.map((e) => ProviderEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRequestProvider(): RequestProvider {
  return { id: "" };
}

export const RequestProvider = {
  encode(message: RequestProvider, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RequestProvider {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestProvider {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: RequestProvider): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestProvider>, I>>(base?: I): RequestProvider {
    return RequestProvider.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestProvider>, I>>(object: I): RequestProvider {
    const message = createBaseRequestProvider();
    message.id = object.id ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
