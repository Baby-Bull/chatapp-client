import { findDOMNode } from "react-dom";
import { useEffect } from "react";


const SocketHandle = () => {

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

export default SocketHandle;