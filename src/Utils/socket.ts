import { getItemFromCookie } from "./storage";

const urlSocket =
   // "wss://funky-brass-papyrus.glitch.me:8080" ||
    "ws://localhost:8080";

//using eventsArray to storage elements that contain two properties: 
//1.event's title (work as a key for array handle)  2.action handling this event(add new message, push new notifications, ...)
//event's title work as key to match exactly an event with another handle.
//data from onMessage socket contains event's title and payload get from server(used to update new state for client)
const webSocketClient = () => {

    let tryReconnectFn: any;
    let retries: 0;
    let initialSocket: WebSocket;
    let isClosed: boolean;
    const eventsArray: Map<string, Array<any>> = new Map();

    const emitInternal = (event: any, payload: any) => {
        const handlersOfEvent = eventsArray.get(event);
        if (handlersOfEvent?.length) {
            handlersOfEvent.forEach((handler) => {
                handler(payload);
            });
        }
    };

    const createNewWebSocket = () => {
        tryReconnectFn = () => {
            retries += 1;
            isClosed = retries >= 5;
            if (!isClosed) {
                window.setTimeout(() => {
                    createNewWebSocket();
                    emitInternal("reconnected", null);
                }, 3000);
            }
        };

        initialSocket = new WebSocket(urlSocket);

        initialSocket.onopen = () => {
            initialSocket.send(JSON.stringify({
                message_type: "connected",
                user_connecting_id: getItemFromCookie("USER_TOKEN")
            }));

            // if (retries > 0) {
            //     emitInternal("reconnected", null);
            //     retries = 0;
            //   }
            //   emitInternal("connected", e);
            isClosed = false;
        };

        //whenever have any sign as a message from server, all of the event (actions/handles) in eventArray are activated
        initialSocket.onmessage = function (e: any) {
            const messageReceived = JSON.parse(e.data);
            const entries = Object.entries(messageReceived ?? {});
            // separate array events into single event with arguments are payload received from server
            if (entries.length) {
                entries.forEach(([event, payload]) => emitInternal(event, payload));
            }
        };

        //initialSocket.onclose = tryReconnectFn;

        initialSocket.onclose = function (e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function () {
                createNewWebSocket();
            }, 1000);
        };

    }

    createNewWebSocket();

    return {
        emit(payload: any) {
            initialSocket.send(JSON.stringify(payload));
        },
        on(event: string, action: any) {
            const currentEvents = eventsArray.get(event);
            eventsArray.set(event, currentEvents?.length ? [...currentEvents, action] : [action])
            console.log(eventsArray.get(event));
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
        reconnect() {
            createNewWebSocket();
            emitInternal("reconnected", null);
        },
    }
};

const socketResult =
    (typeof window !== 'undefined') ?
        webSocketClient()
        : null;

export default socketResult;