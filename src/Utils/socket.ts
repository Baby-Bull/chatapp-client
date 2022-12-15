import { findDOMNode } from "react-dom";
import React, { useEffect } from "react";
import { messageError } from "../Components/Redux/Chatting/action";

const socketHandle = () => {

    const socket = new WebSocket("ws://localhost:8080");
    // const payloadClient = {
    //     content_message: textmessage?.current?.value,
    //     message_type: "chat_message_personal_sent",
    //     content_type: "text",
    //     chatroom_id: clientIDSample,
    //     sender_id: sessionStorage.getItem("userId"),
    //     time: Date.now()
    // }

    useEffect(() => {
        socket.onopen = function (e) {
            socket.send(JSON.stringify({
                message_type: "connected",
                user_connecting_id: sessionStorage.getItem("userId")
            }));
        };

        socket.onmessage = (message) => {
            console.log(message);
        };

        socket.onerror = function (error) {
            alert(error);
        }

        socket.onclose = () => {
            console.log("socket has been closed successful");
        }
    }, [])

}

const urlSocket = "ws://localhost:8080";

const webSocketClient = () => {

    let initialSocket: WebSocket;
    const eventsArray: Map<string, Array<any>> = new Map();

    const createNewWebSocket = () => {
        initialSocket = new WebSocket(urlSocket);

        initialSocket.onopen = () => {
            initialSocket.send(JSON.stringify({
                message_type: "connected",
                user_connecting_id: sessionStorage.getItem("userId")
            }));
        };

        initialSocket.onmessage = function (message) {
            console.log(message);
        };

        initialSocket.onclose = (message) => {
            console.log(message);

        }
    }
    useEffect(() => {
        createNewWebSocket();
    }, [])

    return {
        emit(message: string, payload: any) {
            initialSocket.send(JSON.stringify(payload));
            console.log(message);

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

export {
    webSocketClient,
    socketHandle
};