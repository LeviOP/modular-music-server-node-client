import { Client, encodeMessage, MessageType } from "../util.js";
import { ListProviders, RequestProvider } from "../proto/message.js";
import prompts from "prompts";

export default async function(client: Client, buffer: Buffer) {
    const message = ListProviders.decode(buffer);
    console.log("Received providers:", message.providers);
    const { id } = await prompts({
        type: "select",
        name: "id",
        message: "Select a provider",
        choices: message.providers.map((provider) => ({ title: provider.name, value: provider.id }))
    });

    getProvider(client, id);
}

function getProvider(client: Client, id: string) {
    console.log("Selected provider with the following id:", id);

    const request = RequestProvider.encode({ id }).finish();
    const message = encodeMessage(MessageType.MESSAGE_REQUESTPROVIDER, request);

    client.socket.write(message);
}
