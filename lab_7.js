const EventEmitter = require("events");

const bus = new EventEmitter();

function subscribe(eventName, listener) {
    bus.on(eventName, listener);

    return function unsubscribe() {
        bus.off(eventName, listener);
    }
}

const unsubscribeUser = subscribe("message", (data) => {
    console.log(`User received message: ${data.text}`);
});

const unsubscribeLogger = subscribe("message", (data) => {
    console.log(`Logger saved message from ${data.sender}`);
});

const unsubscribeNotification = subscribe("message", () => {
    console.log("Notification sent about new message");
});

bus.emit("message", {
    sender: "Alice",
    text: "First message"
});

console.log("--- User unsubscribed ---");

unsubscribeUser();

bus.emit("message", {
    sender: "Bob",
    text: "Second message"
});

unsubscribeLogger();
unsubscribeNotification();