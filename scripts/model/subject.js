var observer = require('./observer');
class subject {
    constructor() {
        this.observers = [];
    }

    async subscribe(observer) {
        this.observers.push(observer);
    }

    async unsubscribe(observer){
        var index = this.observers.indexOf(observer);
        if(index > -1) {
            this.observers.splice(index, 1);
        }
    }

    async notify(args) {
        for(var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(args);
        }
    }
}

module.exports = subject;