const EventEmitter = require("events");

const bus = new EventEmitter();

function subscribe(eventName, listener) {
    bus.on(eventName, listener);

    return function unsubscribe() {
        bus.off(eventName, listener);
    }
}

function sendMessage(sender, text) {
    bus.emit("message", {
        sender,
        text
    });
}

const unsubscribeAlice = subscribe("message", (data) => {
    if (data.sender !== "Alice"){
        console.log(`Alice received message from ${data.sender}: ${data.text}`);
    }
});

const unsubscribeBob = subscribe("message", (data) => {
    if (data.sender !== "Bob") {
        console.log(`Bob received message from ${data.sender}: ${data.text}`);
    }
});

const unsubscribeLogger = subscribe("message", (data) => {
    console.log(`Logger saved message: "${data.text}" from ${data.sender}`);
});

console.log("=== Communication started ===");

sendMessage("Alice", "Hello, Bob!");
sendMessage("Bob", "Hi, Alice!");

console.log("--- Bob unsubscribed ---");

unsubscribeBob();

sendMessage("Alice", "Bob should not receive this message.");

unsubscribeAlice();
unsubscribeLogger();

console.log("=== Communication finished ===");