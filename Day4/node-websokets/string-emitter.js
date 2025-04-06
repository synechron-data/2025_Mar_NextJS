const EventEmitter = require("events");

class StringEmitter extends EventEmitter {
    constructor(){
        super();
        this.run();
    }

    run() {
        const strArr = ["NodeJS", "ReactJS", "Angular", "ExtJS", "jQuery"];
        setInterval(() => {
            var str = strArr[Math.floor(Math.random() * strArr.length)];
            this.emit('data', str);
        }, 2000);
    }
}

module.exports = StringEmitter;