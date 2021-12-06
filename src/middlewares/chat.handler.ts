//@ts-ignore erreur d'ide
import { IUser } from "../models/index.ts";
//@ts-ignore erreur d'ide
import * as actions from './actions.ts';
//@ts-ignore erreur d'ide
import type { ChannelType } from './actions.ts';

type ClientType = {
    socket: WebSocket, 
    user?: IUser
}

//@ts-ignore erreur d'ide
const clients = new Map<number, ClientType>();
let clientId = 0;

function dispatchAll(msg: string): void {
    //@ts-ignore erreur d'ide
    for (const client: ClientType of clients.values()) {
        client.socket.send(msg);
    }
}

function dispatch(msg: string): void {
    //@ts-ignore erreur d'ide
    for (const id of clients.keys()) {
        const client: ClientType|undefined = clients.get(id);

        if (client && id === clientId) {
            client.socket.send(msg);
        }
    }
}

function dispatchBroadcast(msg: string): void {
    //@ts-ignore erreur d'ide
    for (const id of clients.keys()) {
        const client: ClientType|undefined = clients.get(id);

        if (client && id !== clientId) {
            client.socket.send(msg);
        }
    }
}

type DataType = { 
    channel: string, 
    type: ChannelType, 
    data: Record<string, any>
}

export function ChatHandler(socket: WebSocket) {
    const id = ++clientId;

    clients.set(id, { socket });

    socket.onopen = () => {
        console.log("socket opened");
        dispatchAll(JSON.stringify({
            message: `Connected: [${id}]`
        }));

        dispatch(JSON.stringify({
            channel: 'identity',
            type: 'ask',
            data: {
                id
            }
        }));
    };

    socket.onmessage = e => {
        const data: DataType = JSON.parse(e.data);
        const { channel, type, data: _data } = data;

        if (`${type}_${channel}` in actions) {
            //@ts-ignore
            const func: actions.ActionType = actions[`${type}_${channel}`];
            func.apply(null, [channel, type, _data, clients, dispatch, dispatchBroadcast, dispatchAll])
        } else {
            console.log(data);
        }
    };

    socket.onerror = () => console.log(`[${id}]: socket errored`);

    socket.onclose = () => clients.delete(id);
}