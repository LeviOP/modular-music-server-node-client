import { localData } from "$lib/local";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        providers: localData.providers
    };
};
