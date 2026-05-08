const EventEmitter = require("events");

const bus = new EventEmitter();

bus.on("message", (data) => {
    console.log(`User received message: ${data.text}`);
});

bus.emit("message", {
    text: "Hello from another entity!"
});