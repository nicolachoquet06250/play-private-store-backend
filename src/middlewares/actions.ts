//@ts-ignore erreur d'ide
import { IUser } from "../models/index.ts";

export enum ChannelType {
    ASK = 'ask',
    GIVE = 'give',
    RECEIVED = 'received'
}

type DispatchCallbackType = (msg: string) => void;

export type ActionCallback = (
    channel: string, 
    type: ChannelType, 
    data: Record<string, any>, 
    //@ts-ignore erreur d'ide
    clients: Map<number, { socket: WebSocket, user?: IUser }>, 
    dispatch: DispatchCallbackType,
    dispatchBroadcast: DispatchCallbackType, 
    dispatchAll: DispatchCallbackType
) => void;

export const give_identity = (
    channel: string, 
    _type: ChannelType, 
    data: Record<string, any>, 
    //@ts-ignore erreur d'ide
    clients: Map<number, { socket: WebSocket, user?: IUser }>, 
    dispatch: DispatchCallbackType,
    _dispatchBroadcast: DispatchCallbackType, 
    _dispatchAll: DispatchCallbackType
): void => {
    const { user, id } = data;
    
    const client = clients.get(parseInt(id));

    if (client) {
        clients.set(parseInt(id), {
            socket: client.socket,
            user
        });
    }

    console.log(clients.get(parseInt(id))?.user, id);
    
    dispatch(JSON.stringify({
        channel,
        type: ChannelType.RECEIVED
    }));
};

export const give_notify = (
    channel: string, 
    type: ChannelType, 
    data: Record<string, any>, 
    //@ts-ignore erreur d'ide
    _clients: Map<number, { socket: WebSocket, user?: IUser }>, 
    _dispatch: DispatchCallbackType,
    dispatchBroadcast: DispatchCallbackType, 
    _dispatchAll: DispatchCallbackType
): void => {
    const { appId } = data;

    dispatchBroadcast(JSON.stringify({
        channel, type,
        data: {
            appId
        }
    }));
};