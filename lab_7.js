const EventEmitter = require("events");

const bus = new EventEmitter();

bus.on("message", (data) => {
    console.log(`User received message: ${data.text}`);
});

bus.on("message", (data) => {
    console.log(`Logger saved message from ${data.sender}`);
});

bus.on("message", (data) => {
    console.log(`Notification sent about new message`);
});

bus.emit("message", {
    sender: "Alice",
    text: "Hello from another entity!"
});