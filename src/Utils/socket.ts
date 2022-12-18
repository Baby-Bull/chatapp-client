import { findDOMNode } from "react-dom";
import React, { useEffect } from "react";

const urlSocket = "ws://localhost:8080";

const webSocketClient = () => {

    let initialSocket: WebSocket;
    const eventsArray: Map<string, Array<any>> = new Map();

    const createNewWebSocket = () => {
        initialSocket = new WebSocket(urlSocket);

        initialSocket.onopen = () => {
            initialSocket.send(JSON.stringify({
                message_type: "connected",
                user_connecting_id: localStorage.getItem("userId")
            }));
        };

        initialSocket.onmessage = function (message) {
            console.log(message);
        };

        initialSocket.onclose = (message) => {
            console.log(message);

        }
    }

    localStorage.getItem("userId") && createNewWebSocket();

    return {
        emit(payload: any) {
            initialSocket.send(JSON.stringify(payload));
        },
        on(message: string, payload: any) {
            const currentEvents = eventsArray.get(message);
            eventsArray.set(message, currentEvents?.length ? [...currentEvents, payload] : [payload])
        },
        off(message: string, payload: any) {
            if (payload) {
                const currentEvents = eventsArray.get(message);
                if (currentEvents?.length) {
                    eventsArray.set(message, currentEvents?.filter(e => e !== payload))
                }
            } else {
                eventsArray.delete(message);
            }
        },
    }
};

const socketResult = (typeof window !== 'undefined') ? webSocketClient() : null;
//const socketResult =  null;

export default socketResult;