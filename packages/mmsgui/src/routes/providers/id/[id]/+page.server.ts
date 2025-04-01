import { localData } from "$lib/local";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getProviderClient } from "client";
import { LuaState } from "node-lua";

export const load: PageServerLoad = async ({ params: { id } }) => {
    const provider = localData.providers.find((provider) => provider.id === id);
    if (provider === undefined) throw error(404);

    if (provider.clientDownloaded) startLua(provider.id);

    return {
        provider
    };
};

function startLua(id: string) {
    const path = getProviderClient(id);
    const L = new LuaState();
    L.openLibs();

    L.newTable();

    L.getGlobal("package");
    L.getField(-1, "loaded");


    const result = L.doFile(path);
    console.log("result:", result);
}
