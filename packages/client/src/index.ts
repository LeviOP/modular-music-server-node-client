import { existsSync } from "node:fs";
import { getDataDir, parseProviders, type ProviderInfo } from "./util";
import * as path from "node:path";

interface LocalData {
    providers: ProviderInfo[];
}

export async function loadLocalData(): Promise<LocalData> {
    const dataDir = getDataDir();
    if (!existsSync(dataDir)) return { providers: [] };
    const providers = await parseProviders(dataDir);
    return { providers };
}

export function getProviderClient(id: string): string {
    const dataDir = getDataDir();
    return path.join(dataDir, "providers", id, "client.lua");
}
